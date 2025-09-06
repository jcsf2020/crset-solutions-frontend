import * as React from "react";
import { Section, SectionHeading, SectionSubtitle } from "@/components/section";
import { Button } from "@/components/ui/button";

export default function HomeHero() {
  return (
    <Section id="hero" pad="lg">
      <div className="grid gap-6 md:grid-cols-[1.2fr,0.8fr] items-center">
        <div>
          <SectionHeading className="mb-3">
            Cresce com <span className="text-primary">CRSET</span> - site rápido, claro e que converte.
          </SectionHeading>
          <SectionSubtitle>
            Design limpo, componentes consistentes e performance acima dos 90 no Lighthouse.
            Sem drama, só entrega.
          </SectionSubtitle>
          <div className="mt-6 flex gap-3">
            <Button asChild variant="primary" size="lg">
              <a href="/start">Começar agora</a>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <a href="/precos">Ver preços</a>
            </Button>
                      <Button asChild variant="ghost" size="lg"><a href="/mascotes-all">Mascotes</a></Button>
          </div>
          <p className="mt-3 text-sm text-muted">Sem fidelização. Podes cancelar quando quiseres.</p>
        </div>
        
        </div>
      </div>
    </Section>
  );
}
