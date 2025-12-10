'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HomeHero() {
  const pathname = usePathname();
  const isEnglish = pathname.startsWith('/en');

  const agiText = isEnglish ? 'Questions? Talk to AGI Commander' : 'Dúvidas? Fale com AGI Commander';
  const mainHeading = 'CRSET Solutions';
  const mainSubtitle = isEnglish ? 'Practical automation. No nonsense.' : 'Automação prática. Sem circo.';
  const getStartedText = isEnglish ? 'Get Started' : 'Começar';
  const faqText = 'FAQ';
  const mascotsText = isEnglish ? 'Mascots' : 'Mascotes';

  const getStartedLink = isEnglish ? '/en/start' : '/comeco';
  const faqLink = isEnglish ? '/en/help' : '/ajuda';
  const mascotsLink = isEnglish ? '/en/mascots-all' : '/mascotes-all';

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
