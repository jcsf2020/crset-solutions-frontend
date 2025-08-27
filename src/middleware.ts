import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Gate: protege chat/stream quando há server key ou AGI_GATE=true
  const hasServerKey = !!process.env.AGI_TEST_KEY;
  const forceGate = (process.env.AGI_GATE ?? 'false') === 'true';
  if ((pathname.startsWith('/api/agi/chat') || pathname.startsWith('/api/agi/stream')) && (hasServerKey || forceGate)) {
    const auth = request.headers.get('authorization') || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7).trim() : '';
    const expected = process.env.AGI_TEST_KEY ?? '';
    if (!expected || token !== expected) {
      return new Response('unauthorized', {
        status: 401,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, private',
          'Pragma': 'no-cache',
          'Expires': '0',
          'X-Robots-Tag': 'noindex, nofollow, noarchive, nosnippet',
        }
      });
    }
  }

  // Headers de segurança + no-store nas APIs
  const res = NextResponse.next();
  res.headers.set('X-Content-Type-Options','nosniff');
  res.headers.set('X-Frame-Options','DENY');
  res.headers.set('Referrer-Policy','strict-origin-when-cross-origin');
  res.headers.set('Permissions-Policy','camera=(), microphone=(), geolocation=()');
  if (pathname.startsWith('/api/')) {
    res.headers.set('Cache-Control','no-store, no-cache, must-revalidate, private');
    res.headers.set('Pragma','no-cache');
    res.headers.set('Expires','0');
  }
  if (pathname.startsWith('/api/agi/')) {
    res.headers.set('X-Robots-Tag','noindex, nofollow, noarchive, nosnippet');
  }
  return res;
}

export const config = { matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'] };
