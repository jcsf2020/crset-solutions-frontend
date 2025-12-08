'use client';

import "@/styles/sci-fi-tokens.css";
import "@/styles/sci-fi.css";
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { Oxanium, JetBrains_Mono, Poppins } from "next/font/google"
import AIChatWidgetEnhanced from "@/app/_components/AIChatWidgetEnhanced"
import { OrganizationSchema, WebsiteSchema } from "@/components/seo/structured-data"
import { SkipNav } from "@/components/a11y/skip-nav"
import { NextIntlClientProvider } from 'next-intl';
import { useLocale } from 'next-intl';
import { ReactNode } from 'react';

// Optimized font loading with preload
const oxanium = Oxanium({ 
  subsets: ["latin"], 
  variable: "--font-oxanium", 
  display: "swap",
  preload: true,
  fallback: ['system-ui', 'arial']
})

const jbmono = JetBrains_Mono({ 
  subsets: ["latin"], 
  variable: "--font-jbmono", 
  display: "swap",
  preload: true,
  fallback: ['monospace', 'courier']
})

const poppins = Poppins({ 
  subsets: ["latin"], 
  variable: "--font-poppins", 
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  preload: true,
  fallback: ['system-ui', 'arial']
})

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_CANONICAL_BASE ?? "https://crset-solutions-frontend.vercel.app"),
  title: "CRSET",
  description: "Sci-Fi tech theme",
  openGraph: {
    type: "website",
    url: "https://crsetsolutions.com",
    title: "CRSET Solutions — Automação prática. Sem circo.",
    description: "Automação e AGI aplicada ao negócio. Resultados práticos, sem circo.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Mascote CRSET" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CRSET Solutions — Automação prática. Sem circo.",
    description: "Automação e AGI aplicada ao negócio. Resultados práticos, sem circo.",
    images: ["/og.png"],
  },
}

function RootLayoutContent({ children }: { children: ReactNode }) {
  const locale = useLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* Performance optimizations */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://vercel.live" />
        <link rel="dns-prefetch" href="https://cdn.vercel-insights.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className={cn("min-h-dvh bg-background text-foreground", oxanium.variable, jbmono.variable, poppins.variable)}>
        <SkipNav />
        <ThemeProvider>
          <div className="relative" style={{ willChange: 'transform' }}>
            {/* Grid background */}
            <div
              data-bg-grid
              className="pointer-events-none fixed inset-0 bg-grid bg-[length:32px_32px] dark:bg-gridDark opacity-40"
            />
            {/* Noise film (dev) */}
            {process.env.NEXT_PUBLIC_DEBUG_VISUAL === "1" && (
              <div data-noise className="pointer-events-none fixed inset-0 noise" />
            )}
            {children}
          </div>

        {/* AI Chat Widget */}
        <AIChatWidgetEnhanced language={locale} />
      </ThemeProvider>
        
        {/* Structured Data for SEO */}
        <OrganizationSchema />
        <WebsiteSchema />
      </body>
    </html>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <NextIntlClientProvider>
      <RootLayoutContent>{children}</RootLayoutContent>
    </NextIntlClientProvider>
  );
}
