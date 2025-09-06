export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
import type { NextRequest } from 'next/server';

// Allowlist: prod + dev + *.vercel.app
const ALLOWED_ORIGINS = new Set<string>([
  'https://crsetsolutions.com',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
]);
const isAllowed = (o?: string | null) =>
  !o || ALLOWED_ORIGINS.has(o) || o.endsWith('.vercel.app');

let INFLIGHT = 0;
const MAX = Number(process.env.AGI_MAX_INFLIGHT || 8);

function json(status: number, data: unknown, extra?: Record<string, string>) {
  const h = new Headers({ 'content-type': 'application/json; charset=UTF-8' });
  h.set('cache-control', 'no-store, must-revalidate');
  h.set('x-content-type-options', 'nosniff');
  h.set('referrer-policy', 'strict-origin-when-cross-origin');
  if (extra) for (const [k, v] of Object.entries(extra)) h.set(k, v);
  return new Response(JSON.stringify(data), { status, headers: h });
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: new Headers({
      'access-control-allow-origin': '*',
      'access-control-allow-headers': 'content-type, authorization',
      'access-control-allow-methods': 'POST, OPTIONS',
    }),
  });
}

export async function POST(req: NextRequest) {
  const origin = req.headers.get('origin');
  if (!isAllowed(origin)) return json(403, { error: 'forbidden_origin' });

  if (INFLIGHT >= MAX) return json(429, { error: 'concurrency_limit', max: MAX }, { 'Retry-After': '1' });

  let body: any = {};
  try { body = await req.json() } catch {}
  const input = (body?.input ?? '').toString().trim();
  if (!input) return json(400, { error: 'empty_input' });

  // Upstream selection: OpenAI if KEY present; outrowise local OpenAI-compat (e.g., Ollama/HCI)
  const KEY   = process.env.AGI_OPENAI_KEY || process.env.OPENAI_API_KEY || '';
  const BASE = process.env.AGI_UPSTREAM_BASE || (KEY ? 'https://api.openai.com/v1' : 'http://127.0.0.1:11434/v1');
  const MODEL = process.env.AGI_MODEL || (KEY ? 'gpt-4o-mini' : (process.env.OLLAMA_MODEL || 'llama3.1'));

  const headers: Record<string, string> = { 'content-type': 'application/json' };
  if (KEY) headers['authorization'] = `Bearer ${KEY}`;

  INFLIGHT++;
  try {
    try {
      const r = await fetch(`${BASE}/chat/completions`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          model: MODEL,
          messages: [
            { role: 'system', content: 'You are Boris. Prefix replies with [BORIS] and be concise.' },
            { role: 'user', content: input },
          ],
          temperature: 0.2,
        }),
        // @ts-ignore AbortSignal.timeout exists in Node 18+
        // @ts-ignore
        signal: AbortSignal.timeout(Number(process.env.AGI_UPSTREAM_TIMEOUT_MS || 20000))
      });

      if (!r.ok) {
        const txt = await r.text().catch(() => '');
        const ra = r.headers.get('retry-after') || undefined;
        return json(r.status === 429 ? 429 : 503,
          { error: 'upstream_error', status: r.status, detail: txt.slice(0, 400) },
          ra ? { 'Retry-After': ra } : undefined);
      }

      const data = await r.json().catch(() => null);
      const msg: string | null =
        data?.choices?.[0]?.message?.content ?? null;
      return json(200, { ok: true, model: MODEL, message: msg, raw: !msg ? data : undefined });
    } catch (e: any) {
      // Offline DEV fallback when no KEY and local upstream isn't reachable
      if (!KEY) {
        const msg = `[BORIS] (offline dev) ${input}`;
        return json(200, { ok: true, model: MODEL, message: msg });
      }
      throw e;
    }
  } catch (e: any) {
    return json(500, { error: 'handler_exception', detail: String(e?.message || e) });
  } finally {
    INFLIGHT = Math.max(0, INFLIGHT - 1);
  }
}
