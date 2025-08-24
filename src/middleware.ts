import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: ['/admin/:path*'],
};

export function middleware(req: NextRequest) {
  const user = process.env.ADMIN_USER;
  const pass = process.env.ADMIN_PASS;

  // Sem envs? deixa passar (evita lockout). Configure já na Vercel antes do deploy.
  if (!user || !pass) return NextResponse.next();

  const auth = req.headers.get('authorization') || '';
  if (auth.startsWith('Basic ')) {
    const base64 = auth.slice(6).trim();
    try {
      const [u, p] = atob(base64).split(':');
      if (u === user && p === pass) return NextResponse.next();
    } catch {}
  }

  return new NextResponse('Auth required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="CRSET Admin", charset="UTF-8"' },
  });
}
