import Hero from "@/components/Hero";
import ClientPageRoot from './ClientPageRoot';
import HomeCTAs from "./_components/HomeCTAs";

export default function Page() {
  return (
    <>
      <ClientPageRoot />
      {/* CTAs principais */}
      <div className="px-6">
        <HomeCTAs />
      </div>
    </>
  );
}
