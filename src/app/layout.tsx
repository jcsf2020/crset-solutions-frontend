import { fontSans, fontHeading } from "./fonts";
import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "CRSET Solutions",
  description: "Automação e AGI para negócios",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body className="${fontSans.variable} ${fontHeading.variable} antialiased">
        <Header />
        {children}
      </body>
    </html>
  );
}
