import Link from "next/link";
import Image from "next/image";
import { FEATURE_SERVICOS } from "@/lib/flags";
import { SERVICES_CONFIG } from "@/lib/services-config";

export default function ServiçosPage() {
  // Feature flag check
  if (!FEATURE_SERVICOS) {
    return (
      <main className="max-w-4xl mx-auto p-8">
        <div className="text-center py-16">
          <h1 className="text-3xl font-bold mb-4">Serviços CRSET Solutions</h1>
          <p className="text-gray-600 text-lg">Brevemente disponível</p>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Serviços CRSET Solutions</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Soluções inteligentes com IA para automatizar e otimizar os seus processos empresariais
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES_CONFIG.map((service) => (
          <Link
            key={service.slug}
            href={`/servicos/${service.slug}`}
            className="group block"
          >
            <div className="h-full p-6 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-200 hover:scale-[1.02] hover:shadow-lg">
              {/* Mini mascote no canto superior */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full mb-2">
                    {service.category}
                  </span>
                  <h2 className="text-xl font-semibold group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h2>
                </div>
                {service.mascot && (
                  <div className="w-12 h-12 relative flex-shrink-0 ml-3">
                    <Image
                      src={service.mascot}
                      alt={`Mascote ${service.title}`}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
              </div>

              <p className="text-sm text-gray-600 mb-3">
                {service.subtitle}
              </p>

              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                {service.description}
              </p>

              <div className="flex items-center text-blue-600 text-sm font-medium">
                Ver detalhes
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Call-to-action section */}
      <div className="mt-16 text-center p-8 rounded-2xl border border-white/10 bg-white/[0.03]">
        <h2 className="text-2xl font-bold mb-4">Precisa de algo personalizado?</h2>
        <p className="text-gray-600 mb-6">
          Contacte-nos para uma solução à medida das suas necessidades específicas
        </p>
        <Link
          href="/#contact?utm_source=site&utm_medium=cta&utm_campaign=servicos&utm_content=custom"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Pedir Proposta Personalizada
        </Link>
      </div>
    </main>
  );
}

