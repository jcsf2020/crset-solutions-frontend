export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import type { NextRequest } from 'next/server';
import crypto from 'crypto';

const ALLOWED_ORIGINS = new Set(['https://crsetsolutions.com']);

function persona(a?: string) {
  const p: Record<string, string> = {
    boris: 'You are Boris, a security and automation expert. Prefix responses with [BORIS] and focus on practical steps.',
    laya:  'You are Laya, a communication specialist. Prefix responses with [LAYA] and be concise.',
    irina: 'You are Irina, an analytics expert. Prefix responses with [IRINA] and focus on data insights.'
  };
  return p[(a || 'boris').toLowerCase()] ?? p.boris;
}

function tSafeEq(a: string, b: string) {
  try {
    const A = Buffer.from(a); const B = Buffer.from(b);
    if (A.length !== B.length) return false;
    return crypto.timingSafeEqual(A, B);
  } catch { return a === b; }
}

function baseHeaders(rid: string) {
  const h = new Headers();
  h.set('x-request-id', rid);
  h.set('cache-control', 'no-store, no-cache, must-revalidate');
  h.set('x-content-type-options', 'nosniff');
  h.set('referrer-policy', 'strict-origin-when-cross-origin');
  h.set('permissions-policy', 'camera=(), microphone=(), geolocation=()');
  return h;
}

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

  // CORS na resposta normal
  const origin = req.headers.get('origin') ?? '';
  if (ALLOWED_ORIGINS.has(origin)) {
    H.set('Access-Control-Allow-Origin', origin);
    H.set('Vary', 'Origin');
  }

  // Body
  let body: any = {};
  try { body = await req.json(); } catch {}
  const { agent, input, strict = false } = body || {};
  if (typeof input !== 'string' || !input.trim()) {
    H.set('content-type', 'application/json');
    return new Response(JSON.stringify({ error: 'empty_input' }), { status: 400, headers: H });
  }

  // HARD GATE (token compare robusto)
  const gateOn = (process.env.AGI_GATE === 'true') || !!process.env.AGI_TEST_KEY;
  if (gateOn) {
    const auth = (req.headers.get('authorization') || '').trim();
    const tok = (auth.startsWith('Bearer ') ? auth.slice(7) : auth).trim();
    const expected = (process.env.AGI_TEST_KEY || '').trim();
    if (!expected || !tSafeEq(tok, expected)) {
      return new Response('unauthorized', { status: 401, headers: H });
    }
  }

  // IP sem misturar ?? com ||
  const xff = req.headers.get('x-forwarded-for') ?? '';
  const firstHop = xff.split(',')[0]?.trim() ?? null;
  const ip = (req.ip ?? firstHop ?? '0.0.0.0'); // reservado para logs/ratelimit futuros

  // Upstream (OpenAI compat — Groq por defeito)
  const base = process.env.AGI_OPENAI_BASE_URL || 'https://api.groq.com/openai/v1';
  const apiKey = (process.env.OPENAI_API_KEY || process.env.GROQ_API_KEY || '').trim();
  const model = process.env.AGI_OPENAI_MODEL || 'llama3-8b-8192';
  const system = strict ? 'Reply concisely.' : persona(agent);

  const up = await fetch(`${base}/chat/completions`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: String(input) }
      ],
      temperature: 0.7,
      max_tokens: 500
    })
  });

  if (!up.ok) {
    const txt = await up.text().catch(() => '');
    H.set('content-type', 'application/json');
    return new Response(JSON.stringify({ error: 'upstream_error', status: up.status, detail: txt.slice(0, 200) }), { status: 502, headers: H });
  }

  const data = await up.json();
  let content: string = data?.choices?.[0]?.message?.content ?? '';
  if (strict) content = content.trim();

  H.set('x-agi-backend', process.env.AGI_BACKEND ?? 'openai');
  H.set('x-agi-model', model);
  H.set('content-type', 'text/plain; charset=utf-8');
  return new Response(content, { headers: H });
}
