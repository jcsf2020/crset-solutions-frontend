import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const rawHost = req.headers.get("host") ?? "";
  const host = rawHost.toLowerCase().replace(/:\d+$/, ""); // normaliza host (sem porta)
  const url = req.nextUrl;

  const isApex = host === "crsetsolutions.com" || host === "www.crsetsolutions.com";
  const isDemoPath = url.pathname === "/demo" || url.pathname.startsWith("/demo/");

  if (isApex && isDemoPath) {
    url.pathname = "/";
    const res = NextResponse.redirect(url, 308);
    res.headers.set('x-crset-mw', 'apex-redirect');
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/demo", "/demo/", "/demo/:path*"],
};

