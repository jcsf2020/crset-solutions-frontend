import Link from "next/link";
import Image from "next/image";
import { FEATURE_SERVICOS } from "@/lib/flags";
import { SERVICES_CONFIG } from "@/lib/services-config";
import type { Metadata } from "next";
import ServicosGrid from "./_components/ServicosGrid";

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

      {/* Services Grid (client) */}
      <ServicosGrid />

      {/* Call-to-action section */}
      <section className="text-center p-8 lg:p-12 rounded-2xl border border-white/10 bg-white/[0.03]">
        <h2 className="text-2xl lg:text-3xl font-bold mb-4">Precisa de algo personalizado?</h2>
        <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
          Contacte-nos para uma solucao a medida das suas necessidades especificas
        </p>
        <Link
          href="/#contact?utm_source=site&utm_medium=cta&utm_campaign=servicos&utm_content=custom"
          className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-lg shadow-lg hover:shadow-xl"
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
