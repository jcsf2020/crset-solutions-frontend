import { fontSans, fontHeading } from "./fonts";
import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: "CRSET Solutions",
  description: "Automação e AGI para negócios",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body className={[fontSans.variable, fontHeading.variable, 'antialiased', 'min-h-screen', 'bg-[rgb(var(--bg))]', 'text-[rgb(var(--fg))]'].join(' ')}>
        <Header />
        {children}
      
        <Footer />
      </body>
    </html>
  );
}
