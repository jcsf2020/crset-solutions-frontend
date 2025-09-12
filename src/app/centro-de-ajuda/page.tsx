import type { Metadata } from "next";

export const metadata: Metadata = { 
  openGraph: { url: "https://crset-solutions-frontend.vercel.app/centro-de-ajuda" }, 
  alternates: { canonical: "https://crset-solutions-frontend.vercel.app/centro-de-ajuda" } 
};

export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">Centro de ajuda</h1>
      <p>FAQ e contactos. Adiciona artigos aqui.</p>
    
  <section id="faq" className="mx-auto max-w-3xl px-4 py-12 space-y-4">
    <h2 className="text-2xl font-semibold">Perguntas Frequentes</h2>
    <details><summary className="font-medium">Como funciona a subscricao?</summary><div className="mt-2 text-sm opacity-90">Planos mensais. Podes cancelar quando quiseres.</div></details>
    <details><summary className="font-medium">Existe periodo de teste?</summary><div className="mt-2 text-sm opacity-90">Demo gratuita. Trial disponivel mediante pedido apos a demo.</div></details>
    <details><summary className="font-medium">Que integracoes suportam?</summary><div className="mt-2 text-sm opacity-90">WhatsApp, Stripe e Email. Roadmap com CRM e outras integracoes.</div></details>
    <details><summary className="font-medium">Como e o onboarding?</summary><div className="mt-2 text-sm opacity-90">Setup guiado em 24-48h consoante o plano.</div></details>
    <details><summary className="font-medium">Posso migrar do meu site atual?</summary><div className="mt-2 text-sm opacity-90">Sim. Migramos conteudo essencial e configuramos redirecionamentos.</div></details>
  </section>
</main>
  );
}
