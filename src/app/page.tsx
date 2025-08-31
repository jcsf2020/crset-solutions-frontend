import Contact from "@/components/Contact";
import Testimonials from "@/components/Testimonials";
import Hero from "@/components/Hero";
import Team from "@/components/Team";
import Features from "@/components/Features";
import ClientPageRoot from './ClientPageRoot';
import HomeCTAs from "./_components/HomeCTAs";

export default function Page() {
  return (
    <>
      <ClientPageRoot />
      <Hero />
      <Testimonials />
      <Features />
      <Team />
      <Contact />
      <Features />
      <Team />
      <Testimonials />
      <Hero />
      {/* CTAs principais */}
      <div className="px-6">
        <HomeCTAs />
      </div>
    </>
  );
}
