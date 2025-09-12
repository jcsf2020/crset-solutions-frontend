import { Section, SectionHeading, SectionSubtitle } from "@/components/section";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function HomeHero() {
  return (
    <Section id="hero" pad="lg" className="bg-gradient-to-b from-slate-50 to-white">
      <div className="grid gap-8 md:grid-cols-2 items-center">
        <div className="space-y-6">
          <SectionHeading className="mb-3">CRSET Solutions</SectionHeading>
          <SectionSubtitle>Automação prática. Sem circo.</SectionSubtitle>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="shadow-md hover:shadow-lg transition-shadow">
              <Link href="/start">Começar</Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="hover:bg-slate-100">
              <Link href="/precos">Ver preços</Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="hover:bg-slate-100">
              <Link href="/mascotes-all">Mascotes</Link>
            </Button>
          </div>
        </div>
        <div className="flex justify-center md:justify-end">
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            <Image
              src="/mascotes/crset_mascotes_conjunta_refinada.png"
              alt="Mascotes CRSET Solutions - Boris, Irina e Laya"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 256px, 320px"
              priority
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
