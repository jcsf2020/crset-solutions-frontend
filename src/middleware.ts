import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // ==== GATE AGI (chat/stream) ====
  // Liga se AGI_GATE === 'true' OU se existir AGI_TEST_KEY
  const gateOn = (process.env.AGI_GATE === 'true') || !!process.env.AGI_TEST_KEY;
  if (gateOn && path.startsWith('/api/agi/') && (path === '/api/agi/chat' || path === '/api/agi/stream')) {
    const auth = req.headers.get('authorization') ?? '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7).trim() : '';
    const expected = process.env.AGI_TEST_KEY ?? '';
    if (!expected || token !== expected) {
      return new Response('unauthorized', {
        status: 401,
        headers: {
          'cache-control': 'no-store, no-cache, must-revalidate, private',
          'content-type': 'text/plain; charset=utf-8',
          'referrer-policy': 'strict-origin-when-cross-origin',
          'permissions-policy': 'camera=(), microphone=(), geolocation=()',
        }
      });
    }
  }

  const res = NextResponse.next();

  // ==== Security headers globais ====
  res.headers.set('X-Content-Type-Options', 'nosniff');
  res.headers.set('X-Frame-Options', 'DENY');
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  // APIs: no-store
  if (path.startsWith('/api/')) {
    res.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.headers.set('Pragma', 'no-cache');
    res.headers.set('Expires', '0');
  }
  // AGI: não indexar
  if (path.startsWith('/api/agi/')) {
    res.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet');
  }

  return res;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
