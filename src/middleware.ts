import { NextRequest, NextResponse } from 'next/server';
export function middleware(req: NextRequest){
  const res=NextResponse.next();
  res.headers.set('X-Content-Type-Options','nosniff');
  res.headers.set('X-Frame-Options','DENY');
  res.headers.set('Referrer-Policy','strict-origin-when-cross-origin');
  res.headers.set('Permissions-Policy','camera=(), microphone=(), geolocation=()');
  if(req.nextUrl.pathname.startsWith('/api/')){
    res.headers.set('Cache-Control','no-store, no-cache, must-revalidate, private');
    res.headers.set('Pragma','no-cache'); res.headers.set('Expires','0');
  }
  if(req.nextUrl.pathname.startsWith('/api/agi/')){
    res.headers.set('X-Robots-Tag','noindex, nofollow, noarchive, nosnippet');
  }
  return res;
}
export const config={matcher:['/((?!_next/static|_next/image|favicon.ico).*)']};

