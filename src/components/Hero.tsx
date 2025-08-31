"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="pt-14 md:pt-20">
      <div className="container-pro grid gap-10 md:gap-12 md:grid-cols-2 items-center">
        {/* Copy */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 px-3 py-1 text-xs">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500"></span>
            Pronto para crescer
          </div>
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight tracking-tight">
            Capta, organiza e escala com a CRSET Solutions
          </h1>
          <p className="text-base md:text-lg muted max-w-prose">
            Implementamos funis de captacao, automacoes e insights que trazem resultados. Sem ruido. So progresso.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/start" className="btn-primary px-5 py-3">Comecar agora</Link>
            <a
              href="https://wa.me/351914423688?text=Quero%20demo%20CRSET"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary px-5 py-3"
            >
              Falar no WhatsApp
            </a>
          </div>

          {/* Trust */}
          <div className="flex items-center gap-6 pt-2">
            <div className="text-xs muted">SLA claro</div>
            <div className="h-4 w-px bg-black/10" />
            <div className="text-xs muted">SSO e integracoes</div>
            <div className="h-4 w-px bg-black/10" />
            <div className="text-xs muted">Relatorios avancados</div>
          </div>
        </div>

        {/* Visual */}
        <div className="relative">
          <div className="card p-6 md:p-8">
            <div className="grid grid-cols-3 gap-3">
              <div className="aspect-[4/3] rounded-2xl bg-gray-100"></div>
              <div className="aspect-[4/3] rounded-2xl bg-gray-100"></div>
              <div className="aspect-[4/3] rounded-2xl bg-gray-100"></div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="h-16 rounded-xl bg-gray-100"></div>
              <div className="h-16 rounded-xl bg-gray-100"></div>
            </div>
          </div>
          <div className="absolute -bottom-3 -right-3 rounded-2xl border border-black/10 bg-white px-3 py-2 text-xs shadow">
            +37% conversao media
          </div>
        </div>
      </div>
    </section>
  );
}
