import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") ?? "";
  const url = req.nextUrl;

  // Bloqueia /demo no domínio principal de produção
  const isApex = host === "crsetsolutions.com" || host === "www.crsetsolutions.com";
  if (isApex && url.pathname.startsWith("/demo")) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/demo/:path*"],
};

