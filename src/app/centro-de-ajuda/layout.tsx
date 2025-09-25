import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  openGraph: { url: "/centro-de-ajuda" }, alternates: { canonical: "/centro-de-ajuda" },
};

export default function AjudaLayout({ children }: { children: ReactNode }) {
  return <> {children} </>;
}
