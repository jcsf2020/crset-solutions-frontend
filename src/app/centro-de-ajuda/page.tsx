import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = { 
  openGraph: { url: "https://crset-solutions-frontend.vercel.app/centro-de-ajuda" }, 
  alternates: { canonical: "https://crset-solutions-frontend.vercel.app/centro-de-ajuda" } 
};

export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12 bg-gradient-to-b from-slate-50 to-white min-h-screen">
      {/* Header with mascot */}
      <div className="text-center space-y-8 mb-16">
        <div className="flex justify-center">
          <div className="relative w-28 h-28 md:w-36 md:h-36">
            <Image
              src="/mascotes/irina_variacao_1.png"
              alt="Mascote Irina - Centro de Ajuda"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 112px, 144px"
              loading="lazy"
            />
          </div>
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900">Centro de ajuda</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            FAQ e contactos. Adiciona artigos aqui.
          </p>
        </div>
      </div>

      {/* Content placeholder with better structure */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">Perguntas Frequentes</h2>
          <p className="text-slate-600 leading-relaxed">
            Encontre respostas para as duvidas mais comuns sobre os nossos servicos.
          </p>
        </div>
        
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">Contacto</h2>
          <p className="text-slate-600 leading-relaxed">
            Precisa de ajuda personalizada? Entre em contacto connosco.
          </p>
        </div>
        
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">Tutoriais</h2>
          <p className="text-slate-600 leading-relaxed">
            Guias passo-a-passo para tirar o maximo partido das nossas solucoes.
          </p>
        </div>
      </div>
    </main>
  );
}
