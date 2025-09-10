import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FEATURE_SERVICOS } from "@/lib/flags";
import { pricePair, PRICE_FALLBACKS } from "@/lib/prices";
import { SERVICES_CONFIG, getServiceBySlug, getAllSlugs } from "@/lib/services-config";

interface ServicePageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({
    slug,
  }));
}

export default function ServicePage({ params }: ServicePageProps) {
  // Feature flag check
  if (!FEATURE_SERVICOS) {
    notFound();
  }

  const service = getServiceBySlug(params.slug);
  
  if (!service) {
    notFound();
  }

  // Get prices with fallbacks
  const fallback = PRICE_FALLBACKS[service.key];
  const prices = pricePair(service.key, fallback.setup, fallback.month);

  // UTM parameters for CTAs
  const utmParams = `utm_source=site&utm_medium=cta&utm_campaign=servicos&utm_content=${service.slug}`;

  return (
    <main className="max-w-6xl mx-auto p-8">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Link href="/servicos" className="hover:text-blue-600">Serviços</Link>
          <span>/</span>
          <span className="text-gray-900">{service.title}</span>
        </div>
      </nav>

      {/* Header with mascot */}
      <div className="mb-12">
        <div className="flex items-start gap-6 mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
                {service.category}
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-4">{service.title}</h1>
            <p className="text-xl text-gray-600 mb-4">{service.subtitle}</p>
            <p className="text-gray-700 leading-relaxed">{service.description}</p>
          </div>
          
          {/* Mascot in header */}
          {service.mascot && (
            <div className="w-32 h-32 relative flex-shrink-0">
              <Image
                src={service.mascot}
                alt={`Mascote ${service.title}`}
                fill
                className="object-contain"
              />
            </div>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2">
          <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.03] mb-8">
            <h2 className="text-2xl font-semibold mb-6">Funcionalidades Incluídas</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {service.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={`/#contact?${utmParams}`}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-center"
            >
              Pedir Proposta
            </Link>
            <Link
              href={`/precos?${utmParams}`}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-center"
            >
              Ver Tabela de Preços
            </Link>
          </div>
        </div>

        {/* Sidebar with pricing */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.03] mb-6">
              <h3 className="text-xl font-semibold mb-4">Preços</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Setup Inicial</div>
                  <div className="text-2xl font-bold text-gray-900">{prices.setup}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-600 mb-1">Mensalidade</div>
                  <div className="text-2xl font-bold text-gray-900">{prices.month}</div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-2">
                  Preços podem ser personalizados via variáveis de ambiente:
                </p>
                <pre className="text-xs bg-gray-100 p-2 rounded text-gray-700 overflow-x-auto">
{`NEXT_PUBLIC_PRICE_${service.key}_SETUP
NEXT_PUBLIC_PRICE_${service.key}_MONTH`}
                </pre>
              </div>
            </div>

            {/* Additional info */}
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-2">Inclui sempre:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Configuração inicial</li>
                <li>• Formação da equipa</li>
                <li>• Suporte técnico</li>
                <li>• Atualizações regulares</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Back to services */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <Link
          href="/servicos"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Voltar aos Serviços
        </Link>
      </div>
    </main>
  );
}

