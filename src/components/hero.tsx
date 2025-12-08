'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useLocale } from "next-intl";

export default function HomeHero() {
  const locale = useLocale();

  const agiText = locale === 'pt' ? 'Dúvidas? Fale com AGI Commander' : 'Questions? Talk to AGI Commander';
  const mainHeading = 'CRSET Solutions';
  const mainSubtitle = locale === 'pt' ? 'Automação prática. Sem circo.' : 'Practical automation. No nonsense.';
  const getStartedText = locale === 'pt' ? 'Começar' : 'Get Started';
  const faqText = locale === 'pt' ? 'FAQ' : 'FAQ';
  const mascotsText = locale === 'pt' ? 'Mascotes' : 'Mascots';

  const getStartedLink = locale === 'pt' ? '/comeco' : '/en/start';
  const faqLink = locale === 'pt' ? '/ajuda' : '/en/help';
  const mascotsLink = locale === 'pt' ? '/mascotes-all' : '/en/mascots-all';

  return (<>
      {/* AGI CTA */}
      <div className="mb-4">
        <a href="/agi-live?src=hero-cta" aria-label={agiText} className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring focus-visible:ring-offset-2">
          {agiText}
        </a>
      </div>

      <section id="hero" className="py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid gap-6 md:grid-cols-2 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3">{mainHeading}</h1>
              <p className="text-xl text-slate-600 mb-6">{mainSubtitle}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a 
                  href="/agi-live?src=hero-cta"
                  className="inline-flex items-center rounded-lg border border-cyan-200 bg-cyan-50/80 px-4 py-2 text-sm font-medium text-cyan-700 hover:bg-cyan-100/80 focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 transition-colors"
                  aria-label={agiText}
                >
                  {agiText}
                </a>
                <Button asChild size="lg"><Link href={getStartedLink}>{getStartedText}</Link></Button>
                <Button asChild variant="ghost" size="lg">
                  <Link href={faqLink}>{faqText}</Link>
                </Button>
                <Button asChild variant="ghost" size="lg">
                  <Link href={mascotsLink}>{mascotsText}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>);
}
