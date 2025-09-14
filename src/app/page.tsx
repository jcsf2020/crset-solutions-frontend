import dynamic from "next/dynamic";
import Hero from "@/components/hero";
import ClientPageRoot from './ClientPageRoot';
import type { Metadata } from "next";
import { lazy } from "react";
import Defer from "@/lib/defer";

// Lazy load componentes abaixo da dobra
const Contact = dynamic(()=>import("@/components/Contact"),{ssr:false,loading:()=>null});
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
      <Defer rootMargin="200px" idleTimeout={1200}><Testimonials /></Defer>
      <Contact />
      <div className="px-6">
        <HomeCTAs />
      </div>
    </>
  );
}
