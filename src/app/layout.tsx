import { fontSans, fontHeading } from "./fonts";
import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header";

function normalizeBaseUrl(raw?: string) {
  const cleaned = (raw ?? "").trim().replace(/\s+/g, "");
  const withProto = /^https?:\/\//i.test(cleaned) ? cleaned : "https://crset.pt";
  return withProto.replace(/\/+$/, "");
}

const BASE_URL = normalizeBaseUrl(process.env.NEXT_PUBLIC_SITE_URL);

export const metadata: Metadata = {
  title: "CRSET Solutions",
  description: "Automação e AGI para negócios",
  metadataBase: new URL(BASE_URL),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "CRSET Solutions",
    "url": "https://crset-solutions-frontend.vercel.app",
    "logo": "https://crset-solutions-frontend.vercel.app/opengraph-image",
    "sameAs": []
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "CRSET Solutions",
    "url": "https://crset-solutions-frontend.vercel.app",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://crset-solutions-frontend.vercel.app/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="pt">
      <head>
        {/* Otimização LCP: Preconnect para Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* JSON-LD Structured Data */}
        <script 
          type="application/ld+json" 
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script 
          type="application/ld+json" 
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className={`${fontSans.variable} ${fontHeading.variable} antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
