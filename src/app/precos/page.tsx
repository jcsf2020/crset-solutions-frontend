import type { Metadata } from 'next';
import NavigationSciFi from '@/components/NavigationSciFi';
import FooterSciFi from '@/components/FooterSciFi';
import PricingSciFi from '@/components/PricingSciFi';

export const metadata: Metadata = {
  title: 'Preços - CRSET Solutions',
  description: 'Planos transparentes e flexíveis para empresas de todos os tamanhos. Essential, Professional e Enterprise com suporte 24/7.',
  keywords: ['preços', 'planos', 'automação', 'IA', 'CRSET Solutions'],
  openGraph: {
    title: 'Preços - CRSET Solutions',
    description: 'Planos transparentes e flexíveis para empresas de todos os tamanhos.',
    url: 'https://crsetsolutions.com/precos',
    siteName: 'CRSET Solutions',
    images: [
      {
        url: '/og-pricing.jpg',
        width: 1200,
        height: 630,
        alt: 'Preços CRSET Solutions',
      },
    ],
    locale: 'pt_PT',
    type: 'website',
  },
  alternates: {
    canonical: 'https://crsetsolutions.com/precos',
  },
};

export default function PricingPage() {
  return (
    <>
      <NavigationSciFi />
      
      <main className="min-h-screen pt-24">
        <div className="container-pro">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
              Planos Transparentes
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Escolha o plano ideal para a sua empresa. Sem custos ocultos, 
              com suporte dedicado e garantia de satisfação.
            </p>
          </div>
          
          <PricingSciFi />
          
          {/* FAQ Section */}
          <section className="mt-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Perguntas Frequentes
              </h2>
              <p className="text-gray-300">
                Esclarecemos as suas dúvidas sobre os nossos planos
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                {
                  question: "Posso mudar de plano a qualquer momento?",
                  answer: "Sim, pode fazer upgrade ou downgrade do seu plano a qualquer momento. As alterações são aplicadas no próximo ciclo de faturação."
                },
                {
                  question: "Existe período de fidelização?",
                  answer: "Não. Todos os nossos planos são mensais sem período de fidelização. Pode cancelar a qualquer momento."
                },
                {
                  question: "O que acontece se exceder os limites?",
                  answer: "Contactamos consigo para discutir um upgrade do plano. Nunca interrompemos o serviço sem aviso prévio."
                },
                {
                  question: "Oferecem suporte técnico?",
                  answer: "Sim. Essential tem suporte 8x5, Professional e Enterprise têm suporte 24x7 com SLA garantido."
                }
              ].map((faq, index) => (
                <div key={index} className="sci-fi-card p-6">
                  <h3 className="text-white font-semibold mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      
      <FooterSciFi />
    </>
  );
}
