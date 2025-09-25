import "./globals.css"
import "@/styles/sci-fi-tokens.css";
import "@/styles/sci-fi.css";
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { Oxanium, JetBrains_Mono } from "next/font/google"
import ChatWidget from "./_components/ChatWidget"

const oxanium = Oxanium({ subsets: ["latin"], variable: "--font-oxanium", display: "swap" })
const jbmono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jbmono", display: "swap" })

function normalizeBaseUrl(raw?: string) {
  const cleaned = (raw ?? "").trim().replace(/\s+/g, "");
  const withProto = /^https?:\/\//i.test(cleaned) ? cleaned : "https://crsetsolutions.com";
  return withProto.replace(/\/+$/, "");
}

const BASE_URL = normalizeBaseUrl(process.env.NEXT_PUBLIC_SITE_URL);

export const metadata = {
  metadataBase: new URL(BASE_URL),
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <head>
        {/* Preconnect para otimização de performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://crsetsolutions.com" />
        {/* Viewport otimizado */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className={cn("min-h-dvh bg-background text-foreground antialiased", oxanium.variable, jbmono.variable)}>
        <ThemeProvider>
          <div className="relative">
            {/* Grid background com lazy loading */}
            <div
              data-bg-grid
              className="pointer-events-none fixed inset-0 bg-grid bg-[length:32px_32px] dark:bg-gridDark opacity-40 will-change-transform"
            />
            {/* Noise film (dev) */}
            {process.env.NEXT_PUBLIC_DEBUG_VISUAL === "1" && (
              <div data-noise className="pointer-events-none fixed inset-0 noise will-change-transform" />
            )}
            <main className="relative z-10">
              {children}
            </main>
          </div>

          {/* Chat privado (aparece só com cookie crset-chat=on) */}
          <ChatWidget />
        </ThemeProvider>
      </body>
    </html>
  )
}
