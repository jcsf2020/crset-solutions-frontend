export const runtime = 'nodejs';
import { NextRequest, NextResponse } from 'next/server';

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://crset-api-production.up.railway.app';

// rate limit: 5 req / 5 min por IP (in-memory por função)
const WINDOW_MS = 5 * 60 * 1000;
const MAX_REQ = 5;
const bucket = new Map<string, number[]>();

function allowed(ip: string) {
  const now = Date.now();
  const arr = (bucket.get(ip) || []).filter(ts => now - ts < WINDOW_MS);
  if (arr.length >= MAX_REQ) return false;
  arr.push(now);
  bucket.set(ip, arr);
  return true;
}

export async function POST(req: NextRequest) {
  const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0]?.trim() || 'unknown';

  if (!allowed(ip)) {
    return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 });
  }

  const payload = await req.json().catch(() => ({} as any));

  // honeypot: se um bot preencher estes campos, ignoramos
  if (payload?.website || payload?.url || payload?.hp) {
    return NextResponse.json({ ok: true, ignored: true }, { status: 204 });
  }

  try {
    const r = await fetch(`${BACKEND}/api/contact`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-forwarded-for': ip },
      body: JSON.stringify(payload),
    });

    const data = await r.json().catch(() => ({}));
    const status = (r.status === 200 && (data?.sent === true || data?.ok === true)) ? 201 : r.status;
    return NextResponse.json(data, { status });
  } catch {
    return NextResponse.json({ ok: false, error: 'proxy_failed' }, { status: 502 });
  }
}

export async function GET() {
  return NextResponse.json({ status: 'ok' });
}
