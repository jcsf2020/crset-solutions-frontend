import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/** Redirect WWW → apex (308) */
export function middleware(req: NextRequest) {
  const host = (req.headers.get("host") || "").toLowerCase();
  if (host === "www.crsetsolutions.com") {
    const url = new URL(req.url);
    url.hostname = "crsetsolutions.com";
    return NextResponse.redirect(url.toString(), 308);
  }
  return NextResponse.next();
}

// Evita interceptar assets estáticos
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|webp|svg|gif|ico|css|js)).*)",
  ],
};
