import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") ?? "";
  const url = req.nextUrl;

  // Bloqueia /demo apenas no domínio apex (inclui www)
  const isApex = host === "crsetsolutions.com" || host === "www.crsetsolutions.com";

  if (isApex && (url.pathname === "/demo" || url.pathname.startsWith("/demo/"))) {
    url.pathname = "/";
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/demo", "/demo/", "/demo/:path*"],
};
