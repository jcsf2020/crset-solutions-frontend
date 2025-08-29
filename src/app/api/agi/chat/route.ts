export const runtime = 'nodejs';
/* RL_SAFE_FACTORY_START */
let __RL_SAFE: any;
try {
  const hasUpstash = !!(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
  if (process.env.DISABLE_RL === '1' || !hasUpstash) {
    __RL_SAFE = { make: (_opts: any) => ({ limit: async () => ({ success: true, remaining: 999999 }) }) };
  } else {
    // require dinâmico para não partir o build se a lib faltar
    const { Ratelimit } = require('@upstash/ratelimit');
    const { Redis } = require('@upstash/redis');
    const redis = Redis.fromEnv();
    __RL_SAFE = { make: (opts: any) => new Ratelimit({ redis, ...opts }) };
  }
} catch {
  __RL_SAFE = { make: (_opts: any) => ({ limit: async () => ({ success: true, remaining: 999999 }) }) };
}
/* RL_SAFE_FACTORY_END */

export const dynamic = 'force-dynamic';

import type { NextRequest } from 'next/server';
import crypto from 'crypto';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { logger } from '@/lib/logger';
import { auditLog, makeAuditPayload } from '@/lib/audit';

const ALLOWED_ORIGINS = new Set(['https://crsetsolutions.com']);

// === Utils
function persona(a?: string) {
  const p: Record<string, string> = {
    boris: 'You are Boris, a security and automation expert. You MUST always prefix every reply with [BORIS].',
    laya:  'You are Laya, a communication specialist. You MUST always prefix every reply with [LAYA].',
    irina: 'You are Irina, an analytics expert. You MUST always prefix every reply with [IRINA].'
  };
  return p[(a || 'boris').toLowerCase()] ?? p.boris;
}
function baseHeaders(rid: string) {
  const h = new Headers();
  h.set('x-request-id', rid);
  h.set('content-type','text/plain; charset=UTF-8');
  h.set('cache-control', 'no-store, no-cache, must-revalidate, private');
  h.set('x-content-type-options', 'nosniff');
  h.set('referrer-policy', 'strict-origin-when-cross-origin');
  h.set('permissions-policy', 'camera=(), microphone=(), geolocation=()');
  return h;
}
function tSafeEq(a: string, b: string) {
  try {
    const A = Buffer.from(a);
    const B = Buffer.from(b);
    if (A.length !== B.length) return false;
    return crypto.timingSafeEqual(A, B);
  } catch { return false; }
}
function quotaByTier(t: string) {
  switch (String(t || 'basic').toLowerCase()) {
    case 'enterprise': return 600;
    case 'pro':        return 200;
    case 'basic': default: return 60;
  }
}

// Upstash Redis opcional
let redis: any = null;
try { redis = Redis.fromEnv(); } catch { redis = null; }

// Rate limit por IP (60/min)
const rlIP = redis ? __RL_SAFE.make({
  redis, limiter: Ratelimit.slidingWindow(60, '1 m'), analytics: true, prefix: 'rl:ip'
}) : null;

// Gate de concorrência
let INFLIGHT = 0;
const MAX_INFLIGHT = Number(process.env.AGI_MAX_INFLIGHT || 20);

// === Handlers
export async function OPTIONS(req: NextRequest) {
  const rid = crypto.randomUUID();
  const H = baseHeaders(rid);
  const origin = req.headers.get('origin') || '';
  if (ALLOWED_ORIGINS.has(origin)) {
    H.set('access-control-allow-origin', origin);
    H.set('access-control-allow-headers', 'authorization, content-type');
    H.set('access-control-allow-methods', 'POST, OPTIONS');
  }
  return new Response('OK', { status: 204, headers: H });
}

export async function POST(req: NextRequest) {
  const started = Date.now();
  const rid = crypto.randomUUID();
  const H = baseHeaders(rid);
  try {
    // CORS
    const origin = req.headers.get('origin') || '';
    if (ALLOWED_ORIGINS.has(origin)) {
      H.set('access-control-allow-origin', origin);
      H.set('vary','origin');
    }

    // Auth (Bearer opcional, mas se vier, valida timing-safe)
    const authHeader = (req.headers.get('authorization') || '').trim();
    const bearer = authHeader.toLowerCase().startsWith('bearer ') ? authHeader.slice(7).trim() : '';
    const serverKey = (process.env.AGI_KEY || '').trim();
    if (serverKey) {
      if (!bearer || !tSafeEq(bearer, serverKey)) {
        return new Response(JSON.stringify({ error:'unauthorized' }), { status: 401, headers: H });
      }
    }

    // IP
    const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || '0.0.0.0';

    // Body
    const body = await req.json().catch(()=> ({} as any));
    const { agent, input, sessionId, strict = false, mode } = body || {};
    if (!input?.trim()) return new Response(JSON.stringify({ error:'empty_input' }), { status:400, headers:H });
    if (String(input).length > 2000) return new Response(JSON.stringify({ error:'too_long', max:2000 }), { status:413, headers:H });

    // RL: IP + Sessão dependente de tier (header x-plan opcional)
    const tier = (req.headers.get('x-plan') || 'basic').toLowerCase();
    const sessQuota = quotaByTier(tier);
    const rlSess = redis ? __RL_SAFE.make({
      redis, limiter: Ratelimit.slidingWindow(sessQuota, '1 d'),
      analytics: true, prefix: 'rl:sess:'+tier
    }) : null;

    try {
      const sessionKey = sessionId || (`anon:${ip}`);
      const ipCheck   = rlIP   ? await rlIP.limit(ip)         : {success:true, remaining:999};
      const sessCheck = rlSess ? await rlSess.limit(sessionKey): {success:true, remaining:999};
      if (!ipCheck.success || !sessCheck.success) {
        H.set('Retry-After','60');
        return new Response(JSON.stringify({ error:'rate_limit_exceeded' }), { status:429, headers:H });
      }
    } catch {
      H.set('Retry-After','60');
      return new Response(JSON.stringify({ error:'rate_limit_unavailable' }), { status:429, headers:H });
    }

    // NOOP: testa RL sem upstream
    if (mode === 'noop') return new Response('OK', { status: 200, headers: H });

    // Persona
    const isRaw = strict === true || mode === 'raw';
    const systemPrompt = isRaw ? 'You are a helpful AI. Respond concisely with no prefixes.' : persona(agent);

    // Concurrency gate
    if (INFLIGHT >= MAX_INFLIGHT) {
      H.set('Retry-After','1');
      return new Response(JSON.stringify({ error: 'concurrency_limit', max: MAX_INFLIGHT }), { status: 429, headers: H });
    }
    INFLIGHT++;

    // Upstream request (Groq/OpenAI compat)
    const BASE = process.env.AGI_OPENAI_BASE_URL || 'https://api.groq.com/openai/v1';
    const API_KEY = (process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY || '').trim();
    if (!API_KEY) {
      return new Response(JSON.stringify({ error:'upstream_unavailable', reason:'missing_api_key' }), { status: 503, headers: H });
    }

    let upstream: Response;
    try {
      upstream = await fetch(`${BASE}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: process.env.AGI_OPENAI_MODEL || 'llama3-8b-8192',
          messages: [
            { role:'system', content: systemPrompt },
            { role:'user', content: String(input) }
          ],
          max_tokens: 500,
          temperature: 0.7
        }),
        signal: AbortSignal.timeout(30000)
      });
    } finally {
      INFLIGHT = Math.max(0, INFLIGHT - 1);
    }

    if (!upstream.ok) {
      const ra = upstream.headers.get('retry-after') || '30';
      if (upstream.status === 429) {
        H.set('Retry-After', ra);
        return new Response(JSON.stringify({ error: 'upstream_rate_limited' }), { status: 429, headers: H });
      }
      return new Response(JSON.stringify({ error: 'upstream_unavailable', status: upstream.status }), { status: 503, headers: H });
    }

    const data = await upstream.json().catch(()=> ({} as any));
    let content = data?.choices?.[0]?.message?.content || 'No response';
    if (isRaw) {
      content = content.replace(/^\[?(BORIS|LAYA|IRINA)\]?:?\s*/i,'').trim();
    } else {
      const who = String(agent||'boris').toLowerCase();
      const tag = who==='laya' ? '[LAYA]' : (who==='irina' ? '[IRINA]' : '[BORIS]');
      if (!content.trim().startsWith(tag)) content = `${tag} ${content.trim()}`;
    }

    // Audit (best-effort)
    try {
      const payload = makeAuditPayload?.({ rid, ip, tier, agent, input: String(input), outputLen: content.length, ms: Date.now()-started });
      await auditLog?.(payload);
    } catch {}

    logger.info?.('Chat completed', { rid, ms: Date.now()-started, ip, in:String(input).length, out:content.length });
    return new Response(content, { status: 200, headers: H });

  } catch (err:any) {
    const msg = String(err?.message||err)||'unknown_error';
    logger.error?.('Chat failed', { rid, ms: Date.now()-started, error: msg, stack: err?.stack });
    if (/AbortError|timeout/i.test(msg)) {
      return new Response(JSON.stringify({ error: 'upstream_timeout' }), { status: 503, headers: H });
    }
    return new Response(JSON.stringify({ error: 'upstream_error' }), { status: 503, headers: H });
  }
}
