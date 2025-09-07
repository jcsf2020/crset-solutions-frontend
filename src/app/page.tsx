import Contact from "@/components/Contact";
import Testimonials from "@/components/Testimonials";
import HeroPro from "@/components/HeroPro";
import ClientPageRoot from './ClientPageRoot';
import HomeCTAs from "./_components/HomeCTAs";

export default function Page() {
  return (
    <>
      <ClientPageRoot />
      <HeroPro />
      <Testimonials />
      
      
      <Contact />{/* CTAs principais */}
      <div className="px-6">
        <HomeCTAs />
      </div>
    </>
  );
}
