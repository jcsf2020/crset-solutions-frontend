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
            <Button as-child variant="primary" size="lg">
              <a href="/start">Começar agora</a>
            </Button>
            <Button as-child variant="ghost" size="lg">
              <a href="/precos">Ver preços</a>
            </Button>
          </div>
          <p className="mt-3 text-sm text-muted">Sem fidelização. Podes cancelar quando quiseres.</p>
        </div>
        <div className="hidden md:block">
          <div className="rounded-xl bg-card border border-border shadow p-6">
            <div className="h-48 rounded-lg bg-foreground/5 border border-border" />
            <p className="mt-3 text-sm text-muted">Preview do teu hero (imagem final entra aqui).</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
