import { NextRequest, NextResponse } from 'next/server';

const PRIMARY_HOST = (process.env.PRIMARY_HOST || 'crsetsolutions.com').toLowerCase();
export const config = { matcher: ['/(.*)'] };

export function middleware(req: NextRequest) {
  const url = new URL(req.url);
  const host = url.host.toLowerCase();
  const path = url.pathname;

  // 1) Enforce domínio canónico
  if (host !== PRIMARY_HOST) {
    const dest = `https://${PRIMARY_HOST}${url.pathname}${url.search}`;
    return NextResponse.redirect(dest, 308);
  }

  // 2) Admin: Basic Auth + headers anti-cache/robots
  const isAdmin = path === '/admin' || path.startsWith('/admin/');
  if (!isAdmin) return NextResponse.next(); // resto do site segue

  const wantUser = (process.env.ADMIN_USER ?? 'admin').trim();
  const wantPass = (process.env.ADMIN_PASS ?? '').trim();
  const reqId = (globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2)).slice(0,8);

  const mode = req.headers.get('sec-fetch-mode') || '';
  const destHdr = req.headers.get('sec-fetch-dest') || '';
  const accept = req.headers.get('accept') || '';
  const purpose = (req.headers.get('purpose') || req.headers.get('x-purpose') || '').toLowerCase();
  const isNavigation = mode === 'navigate' && destHdr === 'document' && accept.includes('text/html') && !/prefetch|preview|prerender/.test(purpose);

  const tag = (res: NextResponse) => {
    res.headers.set('X-Admin-Request-Id', reqId);
    res.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
    res.headers.set('Cache-Control', 'no-store, max-age=0, must-revalidate');
    return res;
  };

  const unauthorized = () => {
    const headers: Record<string,string> = {};
    if (isNavigation) headers['WWW-Authenticate'] = 'Basic realm="CRSET Admin", charset="UTF-8"';
    return tag(new NextResponse('Auth required', { status: 401, headers }));
  };

  if (!wantUser || !wantPass) return tag(NextResponse.next());
  const auth = req.headers.get('authorization');
  if (!auth?.startsWith('Basic ')) return unauthorized();

  const token = auth.split(' ')[1] ?? '';
  const [gotUser, gotPassRaw = ''] = atob(token).split(':');
  const gotPass = gotPassRaw.trim();
  if (gotUser !== wantUser || gotPass !== wantPass) return unauthorized();

  return tag(NextResponse.next());
}
