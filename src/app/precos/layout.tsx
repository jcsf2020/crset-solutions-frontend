import type { Metadata } from "next";

export const metadata: Metadata = { 
  title: "Planos CRSET Solutions",
  openGraph: { url: "/precos" }, 
  alternates: { canonical: "/precos" } 
};

export default function PrecosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
