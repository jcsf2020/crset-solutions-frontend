import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") ?? "";
  const url = req.nextUrl;

  // Bloqueia /demo no domínio principal de produção
  if (host.endsWith("crsetsolutions.com") && url.pathname.startsWith("/demo")) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/demo/:path*"],
};
