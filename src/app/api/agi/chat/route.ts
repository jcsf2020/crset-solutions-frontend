export const runtime = 'nodejs';

/* RL_SAFE_FACTORY_START */
let __RL_SAFE;
try {
  const hasUpstash = !!(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
  if (process.env.DISABLE_RL === '1' || !hasUpstash) {
    __RL_SAFE = { make: (_opts) => ({ limit: async () => ({ success: true, remaining: 999999 }) }) };
  } else {
    // require dinâmico para não quebrar em edge se a lib não existir em build
    const { Ratelimit } = require('@upstash/ratelimit');
    const { Redis } = require('@upstash/redis');
    const redis = Redis.fromEnv();
    __RL_SAFE = { make: (opts) => new Ratelimit({ redis, ...opts }) };
  }
} catch (_e) {
  // fallback absoluto
  __RL_SAFE = { make: (_opts) => ({ limit: async () => ({ success: true, remaining: 999999 }) }) };
}
/* RL_SAFE_FACTORY_END */
export const dynamic = 'force-dynamic';

import type { NextRequest } from 'next/server';
import crypto from 'crypto';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { logger } from "@/lib/logger";
import { EnterpriseAuth } from "@/lib/auth-enterprise";

const ALLOWED_ORIGINS = new Set(['https://crsetsolutions.com']);

function persona(a?: string) {
  const p: Record<string, string> = {
    boris: 'You are Boris, a security and automation expert. You MUST always prefix every reply with [BORIS].',
    laya:  'You are Laya, a communication specialist. You MUST always prefix every reply with [LAYA].',
    irina: 'You are Irina, an analytics expert. You MUST always prefix every reply with [IRINA].'
  };
  return p[(a || 'boris').toLowerCase()] ?? p.boris;
}

function tSafeEq(a: string, b: string) {
  try {

    const authHeader = (req.headers.get('authorization') || '').trim();
    const A = Buffer.from(a);
    const B = Buffer.from(b);
    if (A.length !== B.length) return false;
    return crypto.timingSafeEqual(A, B);
  } catch {
    return a === b;
  }
}

function baseHeaders(rid: string) {
  const h = new Headers();
  h.set('x-request-id', rid);
  h.set('cache-control', 'no-store, no-cache, must-revalidate, private');
  h.set('x-content-type-options', 'nosniff');
  h.set('referrer-policy', 'strict-origin-when-cross-origin');
  h.set('permissions-policy', 'camera=(), microphone=(), geolocation=()');
  return h;
}
// Upstash Redis opcional (não falha se faltar env)
let redis: any = null;
try { redis = Redis.fromEnv(); } catch { redis = null; }

const rlIP = redis ? __RL_SAFE.make({
  redis, limiter: Ratelimit.slidingWindow(60, '1 m'),
  analytics: true, prefix: 'rl:ip'
}) : null;

const rlSession = redis ? __RL_SAFE.make({
  redis, limiter: Ratelimit.slidingWindow(600, '1 d'),
  analytics: true, prefix: 'rl:sess'
}) : null;

export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get('origin') ?? '';
  const o = ALLOWED_ORIGINS.has(origin) ? origin : 'https://crsetsolutions.com';
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': o,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'authorization, content-type',
      'Access-Control-Max-Age': '86400',
      'Vary': 'Origin'
    }
  });
}
export async function POST(req: NextRequest) {
  const rid = crypto.randomUUID().slice(0, 8);
  const H = baseHeaders(rid);
  const started = Date.now();

  // CORS
  const origin = req.headers.get('origin') ?? '';
  if (ALLOWED_ORIGINS.has(origin)) { H.set('Access-Control-Allow-Origin', origin); H.set('Vary','Origin'); }

  try {
    // Auth gate (JWT enterprise)
    const auth = (req.headers.get('authorization') || '').trim();
    const tok = (auth.startsWith('Bearer ') ? auth.slice(7) : auth).trim();

    const ent = new EnterpriseAuth();
    const jwtPayload = await ent.validateApiKey(tok);
    if (!jwtPayload) {
      return new Response('unauthorized', { status: 401, headers: H });
    }
    const tier = (jwtPayload && (jwtPayload.tier || jwtPayload['tier'])) || 'basic';

    const ip = req.ip ?? '127.0.0.1';
    const body = await req.json().catch(()=> ({} as any));
    const { agent, input, sessionId, strict = false, mode } = body || {};
    if (!input?.trim()) return new Response(JSON.stringify({ error:'empty_input' }), { status:400, headers:H });
    if (String(input).length > 2000) return new Response(JSON.stringify({ error:'too_long', max:2000 }), { status:413, headers:H });

    // Rate limit (opcional)
    const sessionKey = sessionId || `anon:${ip}`;
    const ipCheck   = rlIP      ? await rlIP.limit(ip)            : {success:true, remaining:999};
    const sessCheck = rlSession ? await rlSession.limit(sessionKey): {success:true, remaining:999};
    if (!ipCheck.success || !sessCheck.success) {
      return new Response(JSON.stringify({ error:'rate_limit_exceeded' }), { status:429, headers:H });
    }

    // Modo raw/estrito
    const isRaw = strict === true || mode === 'raw';
    const systemPrompt = isRaw
      ? 'You are a helpful AI. Respond concisely with no prefixes.'
      : persona(agent);
    
    // === NOOP: testa rate-limit sem chamar o upstream ===
    if (mode === 'noop') {
      return new Response('OK', { status: 200, headers: H });
    }

const BASE = process.env.AGI_OPENAI_BASE_URL || 'https://api.groq.com/openai/v1';
    const API_KEY = (process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY || '').trim();
    if (!API_KEY) throw new Error('NO_UPSTREAM_API_KEY');

    const upstream = await fetch(`${BASE}/chat/completions`, {
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

    if (!upstream.ok) throw new Error(`Upstream error: ${upstream.status}`);
    const data = await upstream.json();
let content = data?.choices?.[0]?.message?.content || 'No response';      if (isRaw) {        content = content.replace(/^\[?(BORIS|LAYA|IRINA)\]?:?\s*/i,'').trim();      } else {        const who = String(agent||'boris').toLowerCase();        const tag = who==='laya' ? '[LAYA]' : (who==='irina' ? '[IRINA]' : '[BORIS]');        if (content.trim().indexOf(tag) !== 0) content = tag + ' ' + content.trim();      }      logger.info('Chat completed', { rid, ms: Date.now()-started, ip, strict:isRaw, in:String(input).length, out:content.length });

    return new Response(content, { status:200, headers:H });
  } catch (err:any) {
    logger.error('Chat failed', { rid, ms: Date.now()-started, error:err?.message, stack:err?.stack });
    return new Response(JSON.stringify({ error:'internal_error' }), { status:500, headers:H });
  }
}
