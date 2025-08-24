import { NextRequest, NextResponse } from 'next/server';

export const config = { matcher: ['/admin/:path*'] };

export function middleware(req: NextRequest) {
  const wantUser = (process.env.ADMIN_USER ?? '').trim();
  const wantPass = (process.env.ADMIN_PASS ?? '').trim();

  const unauthorized = () =>
    new NextResponse('Auth required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="CRSET Admin", charset="UTF-8"',
        'X-Robots-Tag': 'noindex, nofollow, noarchive',
        'Cache-Control': 'no-store, max-age=0, must-revalidate',
      },
    });

  // Sem env → não bloqueia (evita lockout), mas marca noindex e no-store
  if (!wantUser || !wantPass) {
    const res = NextResponse.next();
    res.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
    res.headers.set('Cache-Control', 'no-store, max-age=0, must-revalidate');
    return res;
  }

  const auth = req.headers.get('authorization');
  if (!auth?.startsWith('Basic ')) return unauthorized();

  const token = auth.split(' ')[1] ?? '';
  const [gotUser, gotPassRaw = ''] = atob(token).split(':');
  const gotPass = gotPassRaw.trim();

  if (gotUser !== wantUser || gotPass !== wantPass) return unauthorized();

  const res = NextResponse.next();
  res.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
  res.headers.set('Cache-Control', 'no-store, max-age=0, must-revalidate');
  return res;
}
