import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Rocket, 
  Bot, 
  Database, 
  Building2, 
  ArrowRight, 
  Clock, 
  CheckCircle,
  ExternalLink,
  Sparkles
} from "lucide-react";
import { ServiceSchema } from "@/components/seo/structured-data";
import { Breadcrumbs, commonBreadcrumbs } from "@/components/ui/breadcrumbs";

export const metadata = {
  title: "Serviços — CRSET Solutions",
  description: "Automação prática e AGI aplicada ao negócio. Ciclos curtos, KPIs visíveis e entrega real em produção.",
  alternates: { canonical: "/servicos" },
};

const services = [
  {
    icon: Rocket,
    title: "Lançamento Rápido",
    subtitle: "1–2 semanas",
    price: "A partir de 2.500 EUR",
    description: "Solução completa para começar rapidamente com infraestrutura robusta e processos otimizados.",
    features: [
      "Landing otimizada + captação de leads",
      "Integração CRM/Supabase + workflows de e-mail",
      "Relatórios básicos e alertas automáticos",
      "Deploy automatizado e monitorização",
      "Suporte técnico durante 30 dias"
    ],
    highlight: "Mais popular",
    gradient: "from-blue-500 to-cyan-500",
    glowColor: "shadow-glow-purple"
  },
  {
    icon: Bot,
    title: "AGI & Automação",
    subtitle: "Inteligência aplicada",
    price: "A partir de 4.000 EUR",
    description: "Assistentes inteligentes e automação de processos com tecnologia de vanguarda.",
    features: [
      "Assistentes e chatbots orientados a processos",
      "Integrações com Notion, Gmail, Slack e webhooks",
      "Guardrails, métricas e modo 'humano-no-loop'",
      "Treino personalizado e otimização contínua",
      "Dashboard de performance e analytics"
    ],
    highlight: "Inovação",
    gradient: "from-purple-500 to-pink-500",
    glowColor: "shadow-glow-purple"
  },
  {
    icon: Database,
    title: "Integrações & Dados",
    subtitle: "Ecosistema conectado",
    price: "A partir de 3.200 EUR",
    description: "Conecte todos os seus sistemas e tenha visibilidade total dos seus dados e processos.",
    features: [
      "Stripe, Resend, Supabase e serviços de terceiros",
      "Dashboards de saúde (status/metrics) e telemetry",
      "CI/CD, monitorização e testes E2E",
      "APIs robustas e documentação completa",
      "Backup automático e recuperação de desastres"
    ],
    highlight: "Essencial",
    gradient: "from-teal-500 to-emerald-500",
    glowColor: "shadow-glow-pink"
  },
  {
    icon: Building2,
    title: "Soluções Empresariais",
    subtitle: "Escala e segurança",
    price: "Sob consulta",
    description: "Soluções personalizadas para grandes organizações com requisitos específicos.",
    features: [
      "Arquitetura personalizada e escalável",
      "Conformidade GDPR e auditoria de segurança",
      "Integração com sistemas legados",
      "SLA dedicado e suporte prioritário",
      "Consultoria estratégica e roadmap técnico"
    ],
    highlight: "Premium",
    gradient: "from-slate-700 to-slate-900",
    glowColor: "shadow-xl"
  }
];

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/20 to-pink-50/10">
      {/* Header */}
      <div className="container mx-auto max-w-7xl px-4 py-16">
        {/* Breadcrumbs */}
        <div className="mb-8">
          <Breadcrumbs items={commonBreadcrumbs.servicos} />
        </div>
        
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200/50 shadow-sm mb-6">
            <Sparkles className="h-4 w-4 text-purple-600" />
            <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Escolha o seu caminho
            </span>
          </div>
          
          <h1 className="font-display text-5xl md:text-7xl font-black mb-6 leading-tight">
            <span className="block text-slate-900">Serviços que</span>
            <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
              entregam resultados
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Ciclos curtos, KPIs visíveis e entrega real em produção. 
            <br className="hidden md:block" />
            Escolha a solução que melhor se adapta às suas necessidades.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-8 md:grid-cols-2 mb-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            
            return (
              <div 
                key={index}
                className="group relative"
              >
                {/* Gradient border wrapper */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${service.gradient} rounded-3xl opacity-75 group-hover:opacity-100 blur group-hover:blur-md transition duration-300 ${service.glowColor}`}></div>
                
                {/* Card content */}
                <div className="relative bg-white rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1">
                  {/* Highlight Badge */}
                  <div className={`absolute top-6 right-6 px-4 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r ${service.gradient} shadow-lg`}>
                    {service.highlight}
                  </div>

                  {/* Icon */}
                  <div className={`inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${service.gradient} mb-6 shadow-xl`}>
                    <Icon className="h-10 w-10 text-white" />
                  </div>

                  {/* Header */}
                  <div className="mb-6">
                    <h2 className="font-display text-3xl font-bold text-slate-900 mb-3">{service.title}</h2>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-semibold text-slate-600 bg-slate-100 px-4 py-1.5 rounded-full">
                        {service.subtitle}
                      </span>
                      <span className="text-xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        {service.price}
                      </span>
                    </div>
                    <p className="text-slate-600 leading-relaxed text-lg">{service.description}</p>
                  </div>

                  {/* Features */}
                  <div className="mb-8">
                    <ul className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className={`flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br ${service.gradient} flex items-center justify-center mt-0.5`}>
                            <CheckCircle className="h-4 w-4 text-white" />
                          </div>
                          <span className="text-sm text-slate-700 font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <div className="space-y-3">
                    <Button 
                      asChild 
                      className={`w-full rounded-2xl py-6 font-bold text-base bg-gradient-to-r ${service.gradient} hover:opacity-90 text-white shadow-xl transition-all duration-300 hover:scale-105`}
                    >
                      <Link href={`/api/contact?utm_source=servicos&utm_content=${service.title.toLowerCase().replace(/\s+/g, '-')}`}>
                        Começar agora
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                    <Button 
                      asChild 
                      variant="outline"
                      className="w-full rounded-2xl py-6 font-bold text-base border-2 border-slate-300 hover:bg-slate-50 transition-all duration-300"
                    >
                      <Link href="/precos">
                        Ver detalhes
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <div className="relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 rounded-3xl opacity-75 blur"></div>
          <div className="relative bg-white rounded-3xl p-12 text-center shadow-2xl">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-4xl font-black mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Não encontrou o que procura?
              </h2>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Cada projeto é único. Vamos conversar sobre as suas necessidades específicas 
                e criar uma solução à medida.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  asChild 
                  size="lg"
                  className="rounded-2xl px-8 py-6 text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-xl-vibrant transition-all duration-300 hover:scale-105"
                >
                  <Link href="mailto:crsetsolutions@gmail.com">
                    Falar com a equipa
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                
                <Button 
                  asChild 
                  variant="outline"
                  size="lg"
                  className="rounded-2xl px-8 py-6 text-lg font-bold border-2 border-slate-300 hover:bg-slate-50 transition-all duration-300"
                >
                  <Link href="https://agi.crsetsolutions.com" target="_blank" rel="noopener noreferrer">
                    Ver demo AGI
                    <ExternalLink className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-6 text-sm text-slate-600 font-medium">
            <Link href="/precos" className="hover:text-purple-600 transition-colors flex items-center gap-1">
              <Clock className="h-4 w-4" />
              Ver planos & preços
            </Link>
            <span>•</span>
            <Link href="/faq" className="hover:text-purple-600 transition-colors">
              Perguntas frequentes
            </Link>
            <span>•</span>
            <Link href="/" className="hover:text-purple-600 transition-colors">
              Voltar ao início
            </Link>
          </div>
        </div>
      </div>
      
      {/* Structured Data for Services */}
      <ServiceSchema 
        name="Automação e AGI para Negócios"
        description="Automação prática e AGI aplicada ao negócio. Ciclos curtos, KPIs visíveis e entrega real em produção."
        url="https://crsetsolutions.com/servicos"
      />
    </main>
  );
}
