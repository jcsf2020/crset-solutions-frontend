"use client";

export default function Testimonials() {
  const items = [
    { quote: "Em 30 dias duplicamos a taxa de conversao do funil. Execucao limpa e previsivel.", author: "Andre M.", role: "COO, SaaS B2B", metric: "+37% leads" },
    { quote: "Onboarding em 1 semana e pipe organizado. Dashboards que a equipa usa todos os dias.", author: "Beatriz R.", role: "Head of Growth, eCom", metric: "TTV -60%" },
    { quote: "Integracoes sem drama e SLAs cumpridos. Finalmente previsibilidade na captacao.", author: "Tiago L.", role: "CTO, Marketplace", metric: "CPL -28%" }
  ];

  return (
    <section className="pt-10 md:pt-14" aria-label="Prova social">
      <div className="container-pro">
        <div className="mb-8 md:mb-10">
          <p className="text-xs inline-flex items-center gap-2 rounded-full border border-black/10 px-3 py-1">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
            Verificado por clientes reais
          </p>
          <h2 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight">Resultados consistentes, sem ruido</h2>
          <p className="muted mt-2 max-w-prose">Casos reais com impacto em conversao, CPL e time-to-value.</p>
        </div>

        <div className="grid gap-4 md:gap-6 md:grid-cols-3">
          {items.map((t) => (
            <article key={t.author} className="card p-6 md:p-7 relative">
              <header className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-xs">
                  <Stars />
                  <span className="px-2 py-0.5 rounded-full border border-black/10 bg-white">Verificado</span>
                </div>
                <span className="text-xs font-semibold">{t.metric}</span>
              </header>

              <blockquote className="text-sm md:text-base leading-relaxed">"{t.quote}"</blockquote>

              <footer className="mt-5 flex items-center justify-between">
                <div className="text-sm">
                  <div className="font-semibold">{t.author}</div>
                  <div className="muted">{t.role}</div>
                </div>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stars() {
  return (
    <div className="flex items-center gap-0.5" aria-label="Rating 5 de 5">
      {[0,1,2,3,4].map((i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 20 20" fill="currentColor" className="text-emerald-500">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.803 2.036a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.803-2.036a1 1 0 0 0-1.175 0l-2.803 2.036c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.88 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292z"/>
        </svg>
      ))}
    </div>
  );
}
