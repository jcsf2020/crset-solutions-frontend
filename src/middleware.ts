import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // ==== GATE AGI ====
  const gateOn = ((process.env.AGI_GATE === 'true') || !!process.env.AGI_TEST_KEY) && (process.env.AGI_MW_GATE === 'on');
  if (gateOn && path.startsWith('/api/agi/')) {
    const auth = req.headers.get('authorization') ?? '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7).trim() : '';
    const expected = process.env.AGI_TEST_KEY ?? '';
    if (!expected || token !== expected) {
      return new Response('unauthorized', { status: 401 });
    }
  }

  const res = NextResponse.next();

  // ==== Security headers ====
  res.headers.set('X-Content-Type-Options', 'nosniff');
  res.headers.set('X-Frame-Options', 'DENY');
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');
  res.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');

  if (path.startsWith('/api/')) {
    res.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.headers.set('Pragma', 'no-cache');
    res.headers.set('Expires', '0');
    res.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet');
  }

  return res;
}

export const config = {
  matcher: ['/:path*'],
};
