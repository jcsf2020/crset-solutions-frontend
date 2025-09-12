import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  alternates: { canonical: "https://crset-solutions-frontend.vercel.app/precos" },
  openGraph: { url: "https://crset-solutions-frontend.vercel.app/precos" },
};

export default function PrecosLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <section id="faq" className="mx-auto max-w-3xl px-4 py-12 space-y-4">
        <h2 className="text-2xl font-semibold">Perguntas Frequentes</h2>
        <details><summary className="font-medium">Como funciona a subscrição?</summary><div className="mt-2 text-sm opacity-90">Planos mensais. Podes cancelar quando quiseres.</div></details>
        <details><summary className="font-medium">Existe período de teste?</summary><div className="mt-2 text-sm opacity-90">Demo gratuita. Trial disponível mediante pedido após a demo.</div></details>
        <details><summary className="font-medium">Que integrações suportam?</summary><div className="mt-2 text-sm opacity-90">WhatsApp, Stripe e Email. Roadmap com CRM e outras integrações.</div></details>
        <details><summary className="font-medium">Como é o onboarding?</summary><div className="mt-2 text-sm opacity-90">Setup guiado em 24–48h consoante o plano.</div></details>
        <details><summary className="font-medium">Posso migrar do meu site atual?</summary><div className="mt-2 text-sm opacity-90">Sim. Migramos conteúdo essencial e configuramos redirecionamentos.</div></details>
      </section>
    </>
  );
}
