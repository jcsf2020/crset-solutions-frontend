import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  alternates: { canonical: "https://crset-solutions-frontend.vercel.app/precos" },
};

export default function PrecosLayout({ children }: { children: ReactNode }) {
  return <> {children} </>;
}
