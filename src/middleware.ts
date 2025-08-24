import { NextRequest, NextResponse } from 'next/server';

export const config = { matcher: ['/admin/:path*'] };

export function middleware(req: NextRequest) {
  const wantUser = (process.env.ADMIN_USER ?? '').trim();
  const wantPass = (process.env.ADMIN_PASS ?? '').trim();
  const reqId = (globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2)).slice(0,8);

  const tag = (res: NextResponse) => {
    res.headers.set('X-Admin-Request-Id', reqId);
    res.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
    res.headers.set('Cache-Control', 'no-store, max-age=0, must-revalidate');
    return res;
  };

  const unauthorized = () => tag(new NextResponse('Auth required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="CRSET Admin", charset="UTF-8"' },
  }));

  if (!wantUser || !wantPass) return tag(NextResponse.next());

  const auth = req.headers.get('authorization');
  if (!auth?.startsWith('Basic ')) return unauthorized();

  const token = auth.split(' ')[1] ?? '';
  const [gotUser, gotPassRaw = ''] = atob(token).split(':');
  const gotPass = gotPassRaw.trim();
  if (gotUser !== wantUser || gotPass !== wantPass) return unauthorized();

  return tag(NextResponse.next());
}
