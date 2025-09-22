import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { Oxanium, JetBrains_Mono } from "next/font/google"
import ChatWidget from "@/app/components/ChatWidget"

const oxanium = Oxanium({ subsets: ["latin"], variable: "--font-oxanium", display: "swap" })
const jbmono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jbmono", display: "swap" })

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body className={cn("min-h-dvh bg-background text-foreground", oxanium.variable, jbmono.variable)}>
        <ThemeProvider>
          <div className="relative">
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

          {/* Chat privado (aparece só com cookie crset-chat=on) */}
          <ChatWidget />
        </ThemeProvider>
      </body>
    </html>
  )
}
