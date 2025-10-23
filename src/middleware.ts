import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import createIntlMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/config';

// Create i18n middleware
const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed', // Don't add /pt prefix for default locale
});

/** Combined middleware: WWW redirect + i18n routing */
export function middleware(req: NextRequest) {
  // 1. Redirect WWW → apex (308)
  const host = (req.headers.get("host") || "").toLowerCase();
  if (host === "www.crsetsolutions.com") {
    const url = new URL(req.url);
    url.hostname = "crsetsolutions.com";
    return NextResponse.redirect(url.toString(), 308);
  }

  // 2. Handle i18n routing
  return intlMiddleware(req);
}

// Match all routes except static files and API routes
export const config = {
  matcher: [
    '/',
    '/(pt|en)/:path*',
    '/((?!api|_next|_vercel|.*\\.(?:png|jpg|jpeg|webp|svg|gif|ico|css|js)).*)',
  ],
};

