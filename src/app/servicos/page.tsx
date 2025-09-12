import Link from "next/link";
import Image from "next/image";
import { FEATURE_SERVICOS } from "@/lib/flags";
import { SERVICES_CONFIG } from "@/lib/services-config";
import type { Metadata } from "next";

export const metadata: Metadata = { 
  openGraph: { url: "https://crset-solutions-frontend.vercel.app/servicos" }, 
  alternates: { canonical: "https://crset-solutions-frontend.vercel.app/servicos" } 
};

export default function ServicosPage() {
  // Feature flag check
  if (!FEATURE_SERVICOS) {
    return (
      <main className="max-w-4xl mx-auto p-8">
        <div className="text-center py-16">
          <h1 className="text-3xl font-bold mb-4">Servicos CRSET Solutions</h1>
          <p className="text-gray-600 text-lg">Brevemente disponivel</p>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Servicos CRSET Solutions
        </h1>
        <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
          Solucoes inteligentes com IA para automatizar e otimizar os seus processos empresariais
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {SERVICES_CONFIG.map((service) => (
          <Link
            key={service.slug}
            href={`/servicos/${service.slug}`}
            className="group block h-full"
            aria-label={`Ver detalhes do servico ${service.title}`}
          >
            <article className="h-full rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-lg transition-all duration-300 p-6 md:p-8 space-y-6">
              {/* Header with mascot */}
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0 space-y-3">
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                    {service.category}
                  </span>
                  <h2 className="text-xl lg:text-2xl font-semibold group-hover:text-blue-600 transition-colors duration-200">
                    {service.title}
                  </h2>
                  <p className="text-base lg:text-lg text-gray-600 font-medium">
                    {service.subtitle}
                  </p>
                </div>
                {service.mascot && (
                  <div className="w-14 h-14 lg:w-18 lg:h-18 relative flex-shrink-0 ml-4">
                    <Image
                      src={service.mascot}
                      alt={`Mascote ${service.title}`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 1024px) 56px, 72px"
                      loading="lazy"
                    />
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-700 text-base lg:text-lg leading-relaxed line-clamp-3">
                {service.description}
              </p>

              {/* Features Preview */}
              <div className="flex flex-wrap gap-2">
                {service.features.slice(0, 3).map((feature, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center px-3 py-1 text-sm bg-slate-100 text-slate-700 rounded-lg"
                  >
                    <svg className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </span>
                ))}
                {service.features.length > 3 && (
                  <span className="inline-flex items-center px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-lg font-medium">
                    +{service.features.length - 3} mais
                  </span>
                )}
              </div>

              {/* CTA */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-blue-600 text-sm font-medium group-hover:text-blue-700 transition-colors">
                  Ver detalhes
                </span>
                <svg 
                  className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform duration-200" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {/* Call-to-action section */}
      <section className="text-center p-8 lg:p-12 rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white shadow-sm">
        <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-slate-900">Precisa de algo personalizado?</h2>
        <p className="text-slate-600 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
          Contacte-nos para uma solucao a medida das suas necessidades especificas
        </p>
        <Link
          href="/#contact?utm_source=site&utm_medium=cta&utm_campaign=servicos&utm_content=custom"
          className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all duration-200 font-medium text-lg shadow-md hover:shadow-lg"
          aria-label="Solicitar proposta personalizada"
        >
          Pedir Proposta Personalizada
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </section>
    </main>
  );
}
