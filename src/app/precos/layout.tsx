import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  openGraph: { url: "https://crset-solutions-frontend.vercel.app/precos" }, alternates: { canonical: "https://crset-solutions-frontend.vercel.app/precos" },
};

export default function PrecosLayout({ children }: { children: ReactNode }) {
  return <> {children} </>;
}
