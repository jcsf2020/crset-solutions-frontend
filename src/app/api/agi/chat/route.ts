export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import type { NextRequest } from 'next/server';
import crypto from 'crypto';

let INFLIGHT = 0;
const MAX_INFLIGHT = Number(process.env.AGI_MAX_INFLIGHT || 8);
const ALLOWED_ORIGINS = new Set(['https://crsetsolutions.com']);

function rid(){ return crypto.randomBytes(8).toString('hex'); }
function h(rid: string) {
  const H = new Headers();
  H.set('x-request-id', rid);
  H.set('content-type','application/json; charset=UTF-8');
  H.set('cache-control','no-store, no-cache, must-revalidate, private');
  H.set('x-content-type-options','nosniff');
  H.set('referrer-policy','strict-origin-when-cross-origin');
  H.set('permissions-policy','camera=(), microphone=(), geolocation=()');
  return H;
}

export async function OPTIONS(_req: NextRequest) {
  const H = h(rid());
  H.set('access-control-allow-origin','*');
  H.set('access-control-allow-headers','content-type, authorization');
  H.set('access-control-allow-methods','POST, OPTIONS');
  return new Response(null,{ status:204, headers:H });
}

export async function POST(req: NextRequest) {
  const R = rid(); const H = h(R);
  try {
    const origin = req.headers.get('origin')||'';
    if (origin && !ALLOWED_ORIGINS.has(origin)) {
      return new Response(JSON.stringify({ error:'forbidden_origin' }), { status:403, headers:H });
    }

    if (INFLIGHT >= MAX_INFLIGHT) {
      H.set('Retry-After','1');
      return new Response(JSON.stringify({ error:'concurrency_limit', max: MAX_INFLIGHT }), { status:429, headers:H });
    }

    const body = await req.json().catch(()=> ({} as any));
    const { input } = body || {};
    if (!input?.trim()) return new Response(JSON.stringify({ error:'empty_input' }), { status:400, headers:H });

    const BASE = process.env.AGI_UPSTREAM_BASE || 'https://api.openai.com/v1';
    const KEY  = process.env.AGI_OPENAI_KEY || process.env.OPENAI_API_KEY || '';
    const MODEL = process.env.AGI_MODEL || 'gpt-4o-mini';
    if (!KEY)  return new Response(JSON.stringify({ error:'upstream_key_missing' }), { status:503, headers:H });

    INFLIGHT++;
    let upstream: Response | null = null;
    try {
      upstream = await fetch(`${BASE}/chat/completions`, {
        method:'POST',
        headers:{ 'content-type':'application/json', 'authorization':`Bearer ${KEY}` },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            { role:'system', content:'You are Boris. Prefix replies with [BORIS]. Be concise.' },
            { role:'user',   content:String(input) }
          ],
          temperature: 0.3
        }))
      });
    } catch (e: any) {
      const cause: any = e?.cause || {};
      return new Response(JSON.stringify({
        error: 'upstream_fetch_failed',
        detail: String(e?.message || e),
        cause: {
          name: e?.name,
          type: e?.type,
          code: cause?.code || e?.code,
          errno: cause?.errno || e?.errno,
          syscall: cause?.syscall,
          address: cause?.address,
          port: cause?.port
        },
        base: BASE
      }), { status: 503, headers: H });
    } finally {
      INFLIGHT = Math.max(0, INFLIGHT-1);
    }

    if (!upstream || !upstream.ok) {
      const code = upstream?.status ?? 0;
      const txt  = upstream ? (await upstream.text().catch(()=> '')) : '';
      const ra   = upstream?.headers?.get('retry-after') || undefined;

      if (code === 401 || code === 403) {
        return new Response(JSON.stringify({ error:'upstream_auth', status:code, detail:txt.slice(0,400) }), { status:503, headers:H });
      }
      if (code === 429) {
        if (ra) H.set('Retry-After', ra);
        return new Response(JSON.stringify({ error:'upstream_rate_limited', status:code, detail:txt.slice(0,200) }), { status:429, headers:H });
      }
      return new Response(JSON.stringify({
        error:'upstream_error',
        status:code || 'no_response',
        detail: txt.slice(0,500)
      }), { status:503, headers:H });
    }

    const data = await upstream.json().catch(()=> null);
    const msg = data?.choices?.[0]?.message?.content ?? null;
    return new Response(JSON.stringify({ ok:true, rid:R, model:MODEL, message:msg, raw:!msg ? data : undefined }), { status:200, headers:H });

  } catch (e: any) {
    return new Response(JSON.stringify({ error:'handler_exception', detail: String(e?.message||e) }), { status:500, headers:H });
  }
}
