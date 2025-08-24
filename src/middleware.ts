import { NextRequest, NextResponse } from 'next/server';

export const config = { matcher: ['/admin/:path*'] };

export function middleware(req: NextRequest) {
  const user = process.env.ADMIN_USER;
  const pass = process.env.ADMIN_PASS;

  const unauthorized = () =>
    new NextResponse('Auth required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="CRSET Admin", charset="UTF-8"',
        'X-Robots-Tag': 'noindex, nofollow, noarchive',
      },
    });

  // Se faltar env, não bloqueia (para evitar lockout), mas marca noindex
  if (!user || !pass) {
    const res = NextResponse.next();
    res.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
    return res;
  }

  const auth = req.headers.get('authorization');
  if (!auth || !auth.startsWith('Basic ')) return unauthorized();

  // Edge runtime: usar atob para decodificar
  const [u, p] = atob(auth.split(' ')[1]).split(':');
  if (u !== user || p !== pass) return unauthorized();

  const res = NextResponse.next();
  res.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
  return res;
}
