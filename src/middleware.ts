import { NextRequest, NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

export const config = { matcher: ['/api/agi/:path*'] };

const redis = (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN)
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  : null;

export async function middleware(req: NextRequest) {
  if (req.method === 'OPTIONS') return NextResponse.next();
  if (!redis) return NextResponse.next();

  const ip =
    req.ip ??
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    'unknown';

  const apiKey = (req.headers.get('x-api-key') || '').trim();

  let plan = 'free';
  if (apiKey) {
    try {
      const p = await redis.get<string>(`agi:plan:${apiKey}`);
      if (p) plan = p;
    } catch {}
  }
  const perMinute = plan === 'enterprise' ? 600 : plan === 'pro' ? 120 : 20;

  const limiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(perMinute, '1 m'),
    analytics: true,
    prefix: apiKey ? `agi:apikey:${apiKey}` : 'agi:ip',
  });

  const key = apiKey ? `key:${apiKey}` : `ip:${ip}`;
  const { success, limit, remaining, reset } = await limiter.limit(key);

  const rateHeaders: Record<string,string> = {
    'x-rate-limit-plan': plan,
    'x-rate-limit-limit': String(limit),
    'x-rate-limit-remaining': String(remaining),
    'x-rate-limit-reset': String(reset),
  };

  if (!success) {
    const res = new NextResponse('rate_limited', { status: 429 });
    for (const [k,v] of Object.entries(rateHeaders)) res.headers.set(k, v);
    res.headers.set('retry-after', String(Math.max(0, Math.ceil((reset - Date.now())/1000))));
    return res;
  }

  return NextResponse.next({ headers: rateHeaders });
}
