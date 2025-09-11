import Contact from "@/components/Contact";
import Testimonials from "@/components/Testimonials";
import Hero from "@/components/hero";
import ClientPageRoot from './ClientPageRoot';
import HomeCTAs from "./_components/HomeCTAs";
import type { Metadata } from "next";
export const metadata: Metadata = { alternates: { canonical: "https://crset.pt/" } };

export default function Page() {
  return (
    <>
      <ClientPageRoot />
      <Hero />
      <Testimonials />
      
      
      <Contact />{/* CTAs principais */}
      <div className="px-6">
        <HomeCTAs />
      </div>
    </>
  );
}
