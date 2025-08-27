import { NextRequest } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis as UpstashRedis } from '@upstash/redis';
import { logger } from '@/lib/logger';
import { redis } from '@/lib/redis';
import { createHash } from 'crypto';

const up = UpstashRedis.fromEnv();
const ipLimit = new Ratelimit({ redis: up, limiter: Ratelimit.slidingWindow(60,'1 m'), analytics: true });
const sessionLimit = new Ratelimit({ redis: up, limiter: Ratelimit.slidingWindow(600,'1 d'), analytics: true });

function fwdIp(req:NextRequest){ const h=req.headers.get('x-forwarded-for')??''; return (req.ip ?? h.split(',')[0]?.trim() ?? '0.0.0.0'); }
function persona(a?:string){
  const p:Record<string,string> = {
    boris:'You are Boris, a security and automation expert. Prefix responses with [BORIS] and focus on practical, technical steps.',
    laya:'You are Laya, a communication specialist. Prefix responses with [LAYA] and be concise and clear.',
    irina:'You are Irina, an analytics expert. Prefix responses with [IRINA] and focus on data insights.'
  };
  return p[(a||'boris').toLowerCase()] ?? p.boris;
}
function getReqId(req:NextRequest){ return req.headers.get('x-request-id') ?? crypto.randomUUID().slice(0,8); }
function getApiKey(req:NextRequest){
  const hAuth = req.headers.get('authorization') ?? '';
  if (hAuth.startsWith('Bearer ')) return hAuth.slice(7).trim();
  const h = req.headers.get('x-api-key'); if (h) return h.trim();
  return '';
}
function sha(s:string){ return createHash('sha256').update(s).digest('hex').slice(0,16); }

export async function POST(req:NextRequest){
  const rid = getReqId(req);
  const t0 = Date.now();
  const ip = fwdIp(req);

  try{
    // body (1x)
    const body = await req.json().catch(()=>({} as any));
    const { agent, input, sessionId, strict=false, mode } = body ?? {};

    // gate opcional
    const gated=(process.env.AGI_GATE??'false')==='true';
    if(gated){
      const auth=req.headers.get('authorization')??''; const tok=auth.startsWith('Bearer ')?auth.slice(7).trim():'';
      const expected=process.env.AGI_TEST_KEY??''; if(!expected||tok!==expected){ return new Response('unauthorized',{status:401,headers:{'x-request-id':rid}}) }
    }

    // validações
    if(!input?.trim()){ return new Response(JSON.stringify({error:'empty_input'}),{status:400,headers:{'content-type':'application/json','x-request-id':rid}}) }
    if(input.length>2000){ return new Response(JSON.stringify({error:'too_long',max:2000}),{status:413,headers:{'content-type':'application/json','x-request-id':rid}}) }

    // rate limits
    const [ipChk,sessChk]=await Promise.all([ ipLimit.limit(ip), sessionId?sessionLimit.limit(sessionId):Promise.resolve({success:true} as any) ]);
    if(!ipChk.success||!sessChk.success){
      logger.warn('rate_limit_exceeded',{requestId:rid,ip,type:!ipChk.success?'ip':'session'});
      // métricas
      await redis.hincrby('metrics:agi:counters','req',1);
      await redis.hincrby('metrics:agi:counters','err',1);
      return new Response(JSON.stringify({error:'rate_limit_exceeded'}),{status:429,headers:{'content-type':'application/json','x-request-id':rid}});
    }

    // QUOTA por API key (diária)
    const apiKey = getApiKey(req);
    const dailyLimit = parseInt(process.env.AGI_DAILY_QUOTA || '0',10) || 0; // 0 = desligado
    if (dailyLimit>0 && apiKey){
      const day = new Date().toISOString().slice(0,10).replace(/-/g,''); // YYYYMMDD
      const k = `quota:api:${sha(apiKey)}:${day}`;
      const used = (await redis.get<number>(k)) ?? 0;
      if (used >= dailyLimit){
        await redis.hincrby('metrics:agi:counters','req',1);
        await redis.hincrby('metrics:agi:counters','err',1);
        return new Response(JSON.stringify({ error:'quota_exceeded', limit: dailyLimit }), {
          status: 429, headers:{ 'content-type':'application/json','x-request-id':rid }
        });
      }
      await redis.incr(k);
      await redis.expire(k, 86400);
    }

    // strict/raw
    const isRaw = strict===true || mode==='raw';
    const systemPrompt = isRaw ? 'Respond directly and concisely. No persona prefixes.' : persona(agent);

    // upstream (Groq)
    const base=process.env.AGI_OPENAI_BASE_URL || 'https://api.groq.com/openai/v1';
    const apiSecret=process.env.OPENAI_API_KEY || process.env.GROQ_API_KEY || '';
    const model=process.env.AGI_OPENAI_MODEL || 'llama3-8b-8192';

    const up = await fetch(`${base}/chat/completions`,{
      method:'POST',
      headers:{
        'Authorization':`Bearer ${apiSecret}`,
        'Content-Type':'application/json',
        'x-request-id': rid
      },
      body:JSON.stringify({ model, messages:[{role:'system',content:systemPrompt},{role:'user',content:input}], temperature:0.7, max_tokens:500 })
    });
    if(!up.ok){ const txt=await up.text(); throw new Error(`upstream_${up.status}: ${txt.slice(0,200)}`) }

    const data = await up.json();
    let content:string = data.choices?.[0]?.message?.content ?? 'No response';
    if(isRaw) content = content.replace(/^\s*(\[?BORIS\]?:?|Boris:)\s*/i,'').trim();

    const dur = Date.now()-t0;
    logger.info('chat_ok',{requestId:rid,duration:dur,model,agent:agent??null,strict:isRaw,inLen:input.length,outLen:content.length});

    // métricas (latências + contadores)
    await Promise.all([
      redis.hincrby('metrics:agi:counters','req',1),
      redis.hincrby('metrics:agi:counters','ok',1),
      redis.lpush('metrics:agi:lat', dur),
      redis.ltrim('metrics:agi:lat', 0, 999) // mantém 1000
    ]);

    return new Response(content,{
      headers:{
        'content-type':'text/plain; charset=utf-8',
        'x-request-id':rid,
        'x-agi-backend':'openai',
        'x-agi-model':model,
        'cache-control':'no-store, no-cache, must-revalidate',
      }
    });
  }catch(e:any){
    const dur = Date.now()-t0;
    logger.error('chat_fail',{requestId:rid,duration:dur,ip,err:String(e?.message??e)});
    await Promise.all([
      redis.hincrby('metrics:agi:counters','req',1),
      redis.hincrby('metrics:agi:counters','err',1),
      redis.lpush('metrics:agi:lat', dur),
      redis.ltrim('metrics:agi:lat', 0, 999)
    ]);
    return new Response(JSON.stringify({error:'internal_error'}),{status:500,headers:{'content-type':'application/json','x-request-id':rid}});
  }
}
