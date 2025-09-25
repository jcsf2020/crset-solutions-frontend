import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = { openGraph: { url: "https://crsetsolutions.com/start" } };

export default function Layout({ children }: { children: ReactNode }) {
  return <> {children} </>;
}
