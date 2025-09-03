import dynamic from "next/dynamic";
const CookieConsentBanner = dynamic(() => import("@/components/CookieConsentBanner"), { ssr: false, loading: () => null });
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CRSET Solutions",
  description: "Consultoria e automação data-driven.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}  <CookieConsentBanner />
  </body>
    </html>
  );
}
