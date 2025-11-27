'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function HomeHero() {
  const t = useTranslations();

  return (<>
      {/* AGI CTA */}
      <div className="mb-4">
        <a href="/agi-live?src=hero-cta" aria-label="Talk to AGI Commander" className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring focus-visible:ring-offset-2">
          {t('hero.agiCta')}
        </a>
      </div>

<Section id="hero" pad="lg">
      <div className="grid gap-6 md:grid-cols-2 items-center">
        <div>
          <SectionHeading className="mb-3">CRSET Solutions</SectionHeading>
          <SectionSubtitle>{t('hero.subtitle')}</SectionSubtitle>
          <div className="mt-6 flex flex-wrap gap-3">
            <a 
              href="/agi-live?src=hero-cta"
              className="inline-flex items-center rounded-lg border border-cyan-200 bg-cyan-50/80 px-4 py-2 text-sm font-medium text-cyan-700 hover:bg-cyan-100/80 focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 transition-colors"
              aria-label="Talk to AGI Commander"
            >
              {t('hero.agiCta')}
            </a>
            <Button asChild size="lg"><Link href="/start">{t('common.getStarted')}</Link></Button>
            <Button asChild variant="ghost" size="lg">
            <Link href="/faq">{t('faq.title')}</Link></Button>
            <Button asChild variant="ghost" size="lg"><Link href="/mascotes-all">{t('hero.mascots')}</Link></Button>
          </div>
        </div>
      </div>
    </Section>
  </>);
}
