import type { Metadata } from "next";
import Link from "next/link";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export const metadata: Metadata = {
  title: "Ajuda & FAQ - CRSET Solutions",
  description: "Encontre respostas às suas perguntas sobre os nossos serviços, preços e suporte.",
  alternates: {
    canonical: "https://crsetsolutions.com/ajuda",
    languages: {
      'pt': 'https://crsetsolutions.com/ajuda',
      'en': 'https://crsetsolutions.com/en/help',
    },
  },
};

export default function HelpPagePT() {
  const faqs = [
    {
      category: "Geral",
      questions: [
        {
          q: "Que serviços oferece a CRSET Solutions?",
          a: "Oferecemos serviços de automação de processos, cibersegurança, desenvolvimento de software e consultoria tecnológica."
        },
        {
          q: "Quanto tempo demora a implementação?",
          a: "O tempo de implementação varia consoante a complexidade do projeto, mas tipicamente entre 2 a 8 semanas."
        },
        {
          q: "Trabalham com pequenos negócios?",
          a: "Sim! Temos soluções para negócios de todos os tamanhos, desde startups até grandes empresas."
        }
      ]
    },
    {
      category: "Preços & Planos",
      questions: [
        {
          q: "Que métodos de pagamento aceitam?",
          a: "Aceitamos cartões de crédito, transferências bancárias e PayPal. Para planos Enterprise, podemos arranjar termos de pagamento personalizados."
        },
        {
          q: "Posso mudar de plano a qualquer momento?",
          a: "Sim, pode fazer upgrade ou downgrade do seu plano a qualquer momento. As alterações entram em vigor imediatamente."
        },
        {
          q: "Oferecem reembolsos?",
          a: "Oferecemos garantia de reembolso de 30 dias para todos os planos. Se não ficar satisfeito, reembolsamos o seu pagamento."
        },
        {
          q: "Há taxas de configuração?",
          a: "Não, não há taxas de configuração. O preço que vê é o preço que paga."
        }
      ]
    },
    {
      category: "Suporte Técnico",
      questions: [
        {
          q: "Que canais de suporte estão disponíveis?",
          a: "Oferecemos suporte por email, telefone e chat ao vivo. Clientes Enterprise recebem suporte dedicado com tempos de resposta garantidos."
        },
        {
          q: "Oferecem suporte após a implementação?",
          a: "Sim, todos os nossos planos incluem suporte contínuo. O nível de suporte varia consoante o plano escolhido."
        },
        {
          q: "Qual é o horário de suporte?",
          a: "Planos Essential e Pro têm suporte durante o horário comercial (9h-18h). Planos Enterprise incluem suporte 24/7."
        }
      ]
    },
    {
      category: "Tecnologia",
      questions: [
        {
          q: "Com que tecnologias trabalham?",
          a: "Trabalhamos com as tecnologias mais recentes, incluindo Python, Node.js, React, Next.js e ferramentas de IA como OpenAI e Anthropic."
        },
        {
          q: "Conseguem integrar com os nossos sistemas existentes?",
          a: "Sim! Especializamo-nos em integração de sistemas e conseguimos conectar com a maioria das plataformas e ferramentas existentes."
        },
        {
          q: "Oferecem formação?",
          a: "Sim, todas as implementações incluem formação para a sua equipa. Sessões de formação adicionais podem ser arrangiadas conforme necessário."
        }
      ]
    },
    {
      category: "Segurança & Conformidade",
      questions: [
        {
          q: "Como garantem a segurança dos dados?",
          a: "Seguimos as melhores práticas da indústria, incluindo encriptação, autenticação segura, auditorias regulares e conformidade com GDPR e outras regulações."
        },
        {
          q: "Onde são armazenados os dados?",
          a: "Os dados são armazenados em centros de dados seguros baseados na UE com redundância e sistemas de backup."
        },
        {
          q: "Estão em conformidade com o GDPR?",
          a: "Sim, todos os nossos serviços estão em total conformidade com o GDPR. Podemos fornecer documentação mediante solicitação."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Header Navigation */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            CRSET<br />Solutions
          </Link>
          <nav className="hidden md:flex gap-8">
            <Link href="/" className="text-gray-600 hover:text-blue-600 transition">Home</Link>
            <Link href="/servicos" className="text-gray-600 hover:text-blue-600 transition">Serviços</Link>
            <Link href="/precos" className="text-gray-600 hover:text-blue-600 transition">Preços</Link>
            <Link href="/ajuda" className="text-blue-600 font-semibold">Ajuda</Link>
          </nav>
          <LanguageSwitcher />
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Ajuda & FAQ</h1>
            <p className="text-xl">
              Encontre respostas às suas perguntas
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {faqs.map((category, catIndex) => (
              <div key={catIndex}>
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {category.category}
                </h2>
                <div className="space-y-6">
                  {category.questions.map((faq, qIndex) => (
                    <div key={qIndex} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                      <h3 className="font-bold text-xl mb-3 text-gray-900">{faq.q}</h3>
                      <p className="text-gray-600">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Não encontrou o que procurava?
          </h2>
          <p className="text-xl mb-8">
            A nossa equipa está aqui para ajudar a responder às suas perguntas
          </p>
          <Link
            href="/contacto"
            className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block"
          >
            Contacte-nos
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold mb-4">CRSET Solutions</h3>
              <p className="text-sm">Soluções inteligentes para o seu negócio</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="hover:text-white transition">Home</Link></li>
                <li><Link href="/servicos" className="hover:text-white transition">Serviços</Link></li>
                <li><Link href="/precos" className="hover:text-white transition">Preços</Link></li>
                <li><Link href="/contacto" className="hover:text-white transition">Contacto</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacidade" className="hover:text-white transition">Privacidade</Link></li>
                <li><Link href="/termos" className="hover:text-white transition">Termos</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contacto</h4>
              <p className="text-sm">Email: crsetsolutions@gmail.com</p>
              <p className="text-sm">WhatsApp: +351 914 423 688</p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-sm">
            <p>&copy; 2025 CRSET Solutions. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
