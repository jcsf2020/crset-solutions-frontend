export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import type { NextRequest } from 'next/server';
import crypto from 'crypto';

let INFLIGHT = 0;
const MAX_INFLIGHT = Number(process.env.AGI_MAX_INFLIGHT || 8);

const ALLOWED_ORIGINS = new Set(['https://crsetsolutions.com']);
function baseHeaders(rid: string) {
  const H = new Headers();
  H.set('x-request-id', rid);
  H.set('content-type','application/json; charset=UTF-8');
  H.set('cache-control','no-store, no-cache, must-revalidate, private');
  H.set('x-content-type-options','nosniff');
  H.set('referrer-policy','strict-origin-when-cross-origin');
  H.set('permissions-policy','camera=(), microphone=(), geolocation=()');
  return H;
}
function rid(){ return crypto.randomBytes(8).toString('hex'); }

export async function OPTIONS(_req: NextRequest) {
  const H = baseHeaders(rid());
  H.set('access-control-allow-origin','*');
  H.set('access-control-allow-headers','content-type, authorization');
  H.set('access-control-allow-methods','POST, OPTIONS');
  return new Response(null,{ status:204, headers:H });
}

export async function POST(req: NextRequest) {
  const started = Date.now(); const R = rid(); const H = baseHeaders(R);
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
    const { input, sessionId } = body || {};
    if (!input?.trim()) return new Response(JSON.stringify({ error:'empty_input' }), { status:400, headers:H });

    const BASE = process.env.AGI_UPSTREAM_BASE || 'https://api.openai.com/v1';
    const KEY  = process.env.AGI_OPENAI_KEY  || process.env.OPENAI_API_KEY || '';
    if (!KEY)  return new Response(JSON.stringify({ error:'upstream_key_missing' }), { status:503, headers:H });

    INFLIGHT++;
    let upstream;
    try {
      upstream = await fetch(`${BASE}/chat/completions`, {
        method:'POST',
        headers:{ 'content-type':'application/json', 'authorization':`Bearer ${KEY}` },
        body: JSON.stringify({
          model: process.env.AGI_MODEL || 'gpt-4o-mini',
          messages: [{ role:'system', content:'You are Boris. Prefix replies with [BORIS].' }, { role:'user', content:String(input) }],
          temperature: 0.3
        }),
        signal: AbortSignal.timeout(Number(process.env.AGI_UPSTREAM_TIMEOUT_MS||20000))
      });
    } finally {
      INFLIGHT = Math.max(0, INFLIGHT-1);
    }

    if (!upstream.ok) {
      const ra = upstream.headers.get('retry-after') || '30';
      if (upstream.status === 429) { H.set('Retry-After', ra); return new Response(JSON.stringify({ error:'upstream_rate_limited' }), { status:429, headers:H }); }
      return new Response(JSON.stringify({ error:'upstream_unavailable', status: upstream.status }), { status:503, headers:H });
    }

    const data = await upstream.json();
    const text = data?.choices?.[0]?.message?.content ?? '';
    return new Response(JSON.stringify({ ok:true, id:R, sessionId, text }), { status:200, headers:H });

  } catch (err:any) {
    const msg = String(err?.message||err)||'unknown_error';
    if (/AbortError|timeout/i.test(msg)) return new Response(JSON.stringify({ error:'upstream_timeout' }), { status:503, headers:H });
    return new Response(JSON.stringify({ error:'upstream_error' }), { status:503, headers:H });
  }
}
