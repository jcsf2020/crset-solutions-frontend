import "@/styles/sci-fi.css";
import "@/styles/sci-fi-tokens.css";
import "@/styles/theme.css";
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
  return (
    <html lang="pt">
      <body className={`${fontSans.variable} ${fontHeading.variable} antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
