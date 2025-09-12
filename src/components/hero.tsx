import { Section, SectionHeading, SectionSubtitle } from "@/components/section";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomeHero() {
  return (<>
      {/* AGI CTA */}
      <div className="mb-4">
        <a href="/agi-live?src=hero-cta" aria-label="Fale com o AGI Commander" className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring focus-visible:ring-offset-2">
          Dúvidas? Fale com o AGI Commander
        </a>
      </div>

<Section id="hero" pad="lg">
      <div className="grid gap-6 md:grid-cols-2 items-center">
        <div>
          <SectionHeading className="mb-3">CRSET Solutions</SectionHeading>
          <SectionSubtitle>Automação prática. Sem circo.</SectionSubtitle>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild size="lg"><Link href="/start">Começar</Link></Button>
            <Button asChild variant="ghost" size="lg">
            <Link href="/faq">FAQ</Link></Button>
            <Button asChild variant="ghost" size="lg"><Link href="/mascotes-all">Mascotes</Link></Button>
          </div>
        </div>
      </div>
    </Section>
  </>);
}
