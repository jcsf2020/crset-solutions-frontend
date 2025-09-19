import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  HelpCircle, 
  Mail, 
  MessageCircle, 
  Clock, 
  Shield, 
  CreditCard,
  ArrowRight,
  ExternalLink
} from "lucide-react";

export const metadata = {
  title: "FAQ — CRSET Solutions",
  description: "Perguntas frequentes sobre os nossos serviços, preços, prazos e processo de trabalho. Encontre respostas rápidas ou contacte-nos diretamente.",
  alternates: { canonical: "/faq" },
};

const faqSections = [
  {
    title: "Serviços e Processo",
    icon: HelpCircle,
    questions: [
      {
        question: "Quanto tempo demora um projeto?",
        answer: "Depende do plano escolhido. O Essential fica pronto em 1-2 semanas, o Pro em 2-3 semanas, e o Enterprise em 3-4 semanas. Projetos personalizados têm prazos definidos na proposta inicial."
      },
      {
        question: "Como funciona o processo de desenvolvimento?",
        answer: "Seguimos 3 etapas: (1) Diagnóstico em ≤48h para mapear necessidades, (2) Plano & OKRs com roadmap detalhado, (3) Entrega & Operação com iterações curtas e monitorização contínua. Mantemos transparência total durante todo o processo."
      },
      {
        question: "Que tecnologias utilizam?",
        answer: "Usamos Next.js, TypeScript, Tailwind CSS, Supabase, Resend, e outras tecnologias modernas. Toda a infraestrutura é robusta, escalável e segura, com deploy automatizado na Vercel."
      },
      {
        question: "Oferecem suporte após o lançamento?",
        answer: "Sim! Todos os planos incluem suporte contínuo. O Essential tem suporte por email, o Pro tem suporte prioritário, e o Enterprise tem suporte dedicado 24/7 com SLA garantido."
      }
    ]
  },
  {
    title: "Preços e Pagamento",
    icon: CreditCard,
    questions: [
      {
        question: "Como funcionam os preços?",
        answer: "Temos uma taxa de setup única + mensalidade. Por exemplo: Essential é 990 EUR setup + 79 EUR/mês. Todos os valores são sem IVA. A mensalidade cobre hosting, manutenção, atualizações e suporte."
      },
      {
        question: "Posso cancelar a qualquer momento?",
        answer: "Sim, sem penalizações. Pedimos apenas 30 dias de aviso prévio. Durante esse período, garantimos a transição suave e entrega de todos os acessos e documentação."
      },
      {
        question: "Oferecem descontos para projetos maiores?",
        answer: "Para projetos Enterprise ou múltiplos sites, criamos propostas personalizadas com condições especiais. <a href='mailto:crsetsolutions@gmail.com' class='underline hover:text-primary transition-colors'>Contacte-nos</a> para discutir o seu caso específico."
      },
      {
        question: "Que métodos de pagamento aceitam?",
        answer: "Transferência bancária, MB Way, e cartão de crédito via Stripe. O setup é pago antes do início, e a mensalidade é cobrada automaticamente no início de cada mês."
      }
    ]
  },
  {
    title: "Técnico e Segurança",
    icon: Shield,
    questions: [
      {
        question: "Os sites são seguros?",
        answer: "Absolutamente. Usamos SSL, backup automático, monitorização 24/7, e seguimos as melhores práticas de segurança. Todos os projetos passam por auditoria de segurança antes do lançamento."
      },
      {
        question: "São compatíveis com GDPR?",
        answer: "Sim, todos os nossos projetos são desenvolvidos com conformidade GDPR. Implementamos políticas de privacidade, gestão de cookies, e controlos de dados pessoais conforme a legislação europeia."
      },
      {
        question: "Que performance posso esperar?",
        answer: "Garantimos Lighthouse 100/100/100/100 no desktop e ≥90 performance no mobile. Todos os sites são otimizados para velocidade, SEO, e acessibilidade desde o primeiro dia."
      },
      {
        question: "Fazem integrações com sistemas existentes?",
        answer: "Sim! Integramos com CRMs (HubSpot, Pipedrive), ferramentas de email (Mailchimp, ConvertKit), e-commerce (Shopify, WooCommerce), e muitas outras plataformas via API."
      }
    ]
  }
];

const contactOptions = [
  {
    title: "Email direto",
    description: "Resposta em < 2h durante horário comercial",
    icon: Mail,
    href: "mailto:crsetsolutions@gmail.com",
    cta: "Enviar email"
  },
  {
    title: "WhatsApp",
    description: "Chat rápido para dúvidas urgentes",
    icon: MessageCircle,
    href: "https://wa.me/351912345678?text=Olá! Tenho uma dúvida sobre os serviços CRSET.",
    cta: "Abrir chat"
  },
  {
    title: "Agendar chamada",
    description: "Conversa de 30min para discutir o projeto",
    icon: Clock,
    href: "/servicos",
    cta: "Agendar"
  }
];

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto max-w-6xl px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
            Perguntas{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Frequentes
            </span>
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Encontre respostas rápidas sobre os nossos serviços, preços e processo. 
            Não encontrou o que procura? Contacte-nos diretamente.
          </p>
        </div>

        {/* FAQ Sections */}
        <div className="space-y-12 mb-16">
          {faqSections.map((section, sectionIndex) => {
            const SectionIcon = section.icon;
            
            return (
              <div key={sectionIndex} className="card-glass shadow-elev-2 p-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary">
                    <SectionIcon className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-900">{section.title}</h2>
                </div>

                <div className="space-y-4">
                  {section.questions.map((faq, index) => (
                    <details 
                      key={index}
                      className="group border border-neutral-200 rounded-xl overflow-hidden hover:border-neutral-300 transition-colors"
                    >
                      <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-neutral-50 transition-colors list-none">
                        <h3 className="text-lg font-semibold text-neutral-900 pr-4">
                          {faq.question}
                        </h3>
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center group-open:bg-primary group-open:text-white transition-all duration-200">
                          <svg 
                            className="w-4 h-4 transform group-open:rotate-45 transition-transform duration-200" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </div>
                      </summary>
                      <div className="px-6 pb-6 pt-0">
                        <div className="prose prose-neutral max-w-none">
                          <p 
                            className="text-neutral-600 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: faq.answer }}
                          />
                        </div>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact Options */}
        <div className="card-glass shadow-elev-3 p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-neutral-900">
              Ainda tem dúvidas?
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              A nossa equipa está sempre disponível para ajudar. 
              Escolha a forma de contacto que prefere.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 mb-12">
            {contactOptions.map((option, index) => {
              const Icon = option.icon;
              const isExternal = option.href.startsWith('http') || option.href.startsWith('mailto:');
              
              return (
                <div key={index} className="text-center p-6 rounded-xl border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 transition-all duration-200">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-primary mb-4">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">{option.title}</h3>
                  <p className="text-neutral-600 mb-6">{option.description}</p>
                  <Button 
                    asChild 
                    variant="outline"
                    className="rounded-xl font-semibold border-2 hover:bg-neutral-50 transition-all duration-200"
                  >
                    <Link 
                      href={option.href}
                      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {option.cta}
                      {isExternal ? (
                        <ExternalLink className="ml-2 h-4 w-4" />
                      ) : (
                        <ArrowRight className="ml-2 h-4 w-4" />
                      )}
                    </Link>
                  </Button>
                </div>
              );
            })}
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <div className="inline-flex items-center gap-6 text-sm text-neutral-600">
              <Link href="/servicos" className="hover:text-neutral-900 transition-colors">
                Ver serviços
              </Link>
              <span>•</span>
              <Link href="/precos" className="hover:text-neutral-900 transition-colors">
                Consultar preços
              </Link>
              <span>•</span>
              <Link href="/" className="hover:text-neutral-900 transition-colors">
                Voltar ao início
              </Link>
            </div>
          </div>
        </div>
      </div>


    </main>
  );
}
