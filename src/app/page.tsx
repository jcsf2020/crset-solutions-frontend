import Team from "@/components/Team";
import Testimonials from "@/components/Testimonials";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import ClientPageRoot from './ClientPageRoot';
import HomeCTAs from "./_components/HomeCTAs";

export default function Page() {
  return (
    <>
      <ClientPageRoot />
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
