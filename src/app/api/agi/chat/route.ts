export const dynamic = 'force-dynamic';
import { NextRequest } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();
const ipLimit = new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(60, '1 m'), analytics: true });
const sessionLimit = new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(600, '1 d'), analytics: true });

function persona(a?: string) {
  const p: Record<string,string> = {
    boris:'You are Boris, a security and automation expert. Prefix responses with [BORIS] and focus on practical steps.',
    laya:'You are Laya, a communication specialist. Prefix responses with [LAYA] and be concise.',
    irina:'You are Irina, an analytics expert. Prefix responses with [IRINA] and focus on data insights.'
  };
  return p[(a||'boris').toLowerCase()] ?? p.boris;
}

export async function POST(req: NextRequest) {
  const rid = crypto.randomUUID().slice(0,8);
  const t0 = Date.now();
  try {
    const body = await req.json().catch(()=> ({} as any));
    const { agent, input, sessionId, strict=false, mode } = body ?? {};
    if (!input?.trim()) return new Response(JSON.stringify({error:'empty_input'}), { status:400, headers:{'content-type':'application/json','x-request-id':rid} });
    if (input.length>2000) return new Response(JSON.stringify({error:'too_long',max:2000}), { status:413, headers:{'content-type':'application/json','x-request-id':rid} });

    const ip = (req.ip ?? (req.headers.get('x-forwarded-for')||'').split(',')[0]?.trim() || '0.0.0.0');
    const [ipChk, sessChk] = await Promise.all([ ipLimit.limit(ip), sessionId?sessionLimit.limit(sessionId):Promise.resolve({success:true} as any) ]);
    if (!ipChk.success || !sessChk.success) return new Response(JSON.stringify({error:'rate_limit_exceeded'}), { status:429, headers:{'content-type':'application/json','x-request-id':rid} });

    const isRaw = strict===true || mode==='raw';
    const systemPrompt = isRaw ? 'Respond directly and concisely. No persona prefixes.' : persona(agent);

    const base = process.env.AGI_OPENAI_BASE_URL || 'https://api.groq.com/openai/v1';
    const apiKey = process.env.OPENAI_API_KEY || process.env.GROQ_API_KEY || '';
    const model = process.env.AGI_OPENAI_MODEL || 'llama3-8b-8192';

    const up = await fetch(`${base}/chat/completions`,{
      method:'POST',
      headers:{ 'Authorization':`Bearer ${apiKey}`, 'Content-Type':'application/json' },
      body: JSON.stringify({
        model,
        messages:[ {role:'system',content:systemPrompt}, {role:'user',content:input} ],
        temperature:0.7, max_tokens:500
      })
    });

    if (!up.ok) {
      const txt = await up.text().catch(()=> '');
      return new Response(JSON.stringify({error:'upstream_error', status: up.status, detail: txt.slice(0,120)}), {
        status: 502, headers:{'content-type':'application/json','x-request-id':rid}
      });
    }

    const data = await up.json();
    let content: string = data.choices?.[0]?.message?.content ?? 'No response';
    if (isRaw) content = content.replace(/^\s*(\[?BORIS\]?:?|Boris:)\s*/i,'').trim();

    return new Response(content, {
      headers:{
        'content-type':'text/plain; charset=utf-8',
        'x-request-id': rid,
        'x-agi-backend':'openai',
        'x-agi-model': model,
        'cache-control':'no-store, no-cache, must-revalidate'
      }
    });
  } catch(e:any) {
    return new Response(JSON.stringify({error:'internal_error'}), {
      status:500, headers:{'content-type':'application/json','x-request-id':crypto.randomUUID().slice(0,8)}
    });
  }
}
