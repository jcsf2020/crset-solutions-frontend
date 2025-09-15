import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { Oxanium, JetBrains_Mono } from "next/font/google"

const oxanium = Oxanium({ subsets: ["latin"], variable: "--font-oxanium" })
const jbmono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jbmono" })

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_CANONICAL_BASE ?? "https://crset-solutions-frontend.vercel.app"), title: "CRSET", description: "Sci-Fi tech theme" }

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
        </ThemeProvider>
      </body>
    </html>
  )
}
