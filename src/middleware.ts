import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(20, '1 m'),
  analytics: true,
  prefix: 'agi',
});

export async function middleware(req: NextRequest) {
  if (req.method === 'OPTIONS') return NextResponse.next(); // deixa CORS passar

  const ip =
    req.ip ??
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    'unknown';

  const { success, limit, remaining, reset } = await ratelimit.limit(`ip:${ip}`);

  if (!success) {
    const res = new NextResponse('rate_limited', { status: 429 });
    res.headers.set('retry-after', String(Math.max(0, Math.ceil((reset - Date.now())/1000))));
    res.headers.set('x-rate-limit-limit', String(limit));
    res.headers.set('x-rate-limit-remaining', String(remaining));
    res.headers.set('x-rate-limit-reset', String(reset));
    return res;
  }

  return NextResponse.next({
    headers: {
      'x-rate-limit-limit': String(limit),
      'x-rate-limit-remaining': String(remaining),
      'x-rate-limit-reset': String(reset),
    },
  });
}

export const config = { matcher: ['/api/agi/:path*'] };
