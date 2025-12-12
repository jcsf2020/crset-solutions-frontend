'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export function FAQ({ locale }: { locale?: string } = {}) {
  const pathname = usePathname();
  // Use prop if provided, otherwise detect from pathname
  const isEnglish = locale === 'en' || (!locale && pathname.startsWith('/en'));

  const faqsData = {
    pt: [
      {
        question: "Quanto tempo demora a implementação?",
        answer: "O tempo de implementação varia consoante a complexidade do projeto, mas geralmente entre 2 a 8 semanas."
      },
      {
        question: "Oferecem suporte após a implementação?",
        answer: "Sim, todos os nossos planos incluem suporte contínuo. O nível de suporte varia consoante o plano escolhido."
      },
      {
        question: "Posso cancelar a qualquer momento?",
        answer: "Sim, pode cancelar o seu plano a qualquer momento sem penalizações."
      },
      {
        question: "Trabalham com que tecnologias?",
        answer: "Trabalhamos com as mais recentes tecnologias, incluindo Python, Node.js, React, Next.js, e ferramentas de IA como OpenAI e Anthropic."
      }
    ],
    en: [
      {
        question: "How long does implementation take?",
        answer: "Implementation time varies depending on project complexity, but typically between 2 to 8 weeks."
      },
      {
        question: "Do you offer support after implementation?",
        answer: "Yes, all our plans include ongoing support. The level of support varies depending on the chosen plan."
      },
      {
        question: "Can I cancel at any time?",
        answer: "Yes, you can cancel your plan at any time without penalties."
      },
      {
        question: "What technologies do you work with?",
        answer: "We work with the latest technologies, including Python, Node.js, React, Next.js, and AI tools like OpenAI and Anthropic."
      }
    ]
  };

  const faqs = isEnglish ? faqsData.en : faqsData.pt;
  const titleText = isEnglish ? 'Frequently Asked Questions' : 'Perguntas Frequentes';
  const subtitleText = isEnglish ? 'Find answers to your questions' : 'Encontre respostas para as suas dúvidas';
  const ctaTitleText = isEnglish ? 'Ready to get started?' : 'Pronto para começar?';
  const ctaSubtitleText = isEnglish ? 'Choose your starting point. No long-term commitments.' : 'Escolha o seu ponto de partida. Sem compromissos a longo prazo.';
  const servicesButtonText = isEnglish ? 'View Services' : 'Ver Serviços';
  const pricingButtonText = isEnglish ? 'View Pricing' : 'Ver Preços';

  return (
    <section className="py-16">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-4">
            {titleText}
          </h2>
          <p className="text-slate-600">
            {subtitleText}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-12">
          {faqs.map((faq, index) => (
            <div key={index} className="rounded-lg border p-6">
              <h3 className="font-semibold mb-3 text-sm">
                {faq.question}
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Final */}
        <div className="text-center space-y-6">
          <div>
            <h3 className="text-2xl font-semibold mb-3">
              {ctaTitleText}
            </h3>
            <p className="text-slate-700 mb-6">
              {ctaSubtitleText}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="rounded-xl px-8 py-3">
              <Link href={isEnglish ? '/en/services' : '/servicos'}>
                {servicesButtonText}
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-xl px-8 py-3">
              <Link href={isEnglish ? '/en/pricing' : '/precos'}>
                {pricingButtonText}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
