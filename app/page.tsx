import Link from "next/link";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <>
      <section className="p-6">
        <h2 className="text-2xl font-bold mb-2">CRSET Solutions</h2>
      </section>

      <div className="mb-4">
        <Link 
          href="/agi-live?src=hero-cta" 
          aria-label="Fale com o AGI Commander"
          className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring focus-visible:ring-offset-2"
        >
          Dúvidas? Fale com o AGI Commander
        </Link>
      </div>

      <section id="hero" className="py-28">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-2 items-center">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl text-foreground tracking-tight mb-3">
                CRSET Solutions
              </h2>
              <p className="mt-3 text-lg text-muted max-w-2xl">
                Automação prática. Sem circo.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link 
                  href="/start"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:opacity-90 h-11 px-5"
                >
                  Começar
                </Link>
                <Link 
                  href="/faq"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-transparent hover:bg-accent/10 h-11 px-5"
                >
                  FAQ
                </Link>
                <Link 
                  href="/mascotes-all"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-transparent hover:bg-accent/10 h-11 px-5"
                >
                  Mascotes
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-2">
            Resultados consistentes, sem ruído
          </h2>
          <p className="text-gray-600 mb-6">
            Secção de testemunhos em revisão. Sem claims até validação.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 rounded border bg-white">
              <p className="italic text-gray-700">— Em revisão —</p>
            </div>
            <div className="p-4 rounded border bg-white">
              <p className="italic text-gray-700">— Em revisão —</p>
            </div>
            <div className="p-4 rounded border bg-white">
              <p className="italic text-gray-700">— Em revisão —</p>
            </div>
          </div>
        </div>
      </section>

      <div className="px-6">
        <div className="mt-8 flex flex-wrap gap-3">
          <Link 
            href="/servicos"
            className="px-5 py-3 rounded-md bg-blue-600 text-white"
          >
            Ver Serviços
          </Link>
          <Link 
            href="/precos"
            className="px-5 py-3 rounded-md border"
          >
            Planos & Preços
          </Link>
          <Link 
            href="/agi-live"
            className="px-5 py-3 rounded-md border"
          >
            Demo AGI (JWT)
          </Link>
        </div>
      </div>
    </>
  );
}

