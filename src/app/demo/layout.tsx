import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = { openGraph: { url: "https://crset-solutions-frontend.vercel.app/demo" } };

export default function Layout({ children }: { children: ReactNode }) {
  return <> {children} </>;
}
