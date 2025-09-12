import { Section, SectionHeading, SectionSubtitle } from "@/components/section";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomeHero() {
  return (
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
  );
}
