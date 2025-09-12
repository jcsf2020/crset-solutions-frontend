import Hero from "@/components/hero";
import ClientPageRoot from './ClientPageRoot';
import type { Metadata } from "next";
import { lazy } from "react";

// Lazy load componentes abaixo da dobra
const Contact = lazy(() => import("@/components/Contact"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const HomeCTAs = lazy(() => import("./_components/HomeCTAs"));

export const metadata: Metadata = { 
  openGraph: { url: "https://crset-solutions-frontend.vercel.app/" }, 
  alternates: { canonical: "https://crset-solutions-frontend.vercel.app/" } 
};

export default function Page() {
  return (
    <>
      <ClientPageRoot />
      <Hero />
      <Testimonials />
      <Contact />
      <div className="px-6">
        <HomeCTAs />
      </div>
    </>
  );
}
