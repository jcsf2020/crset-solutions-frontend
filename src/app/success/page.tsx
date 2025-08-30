'use client';

import Link from 'next/link';

export default function SuccessPage() {
  try {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('crset_checkout');
      localStorage.removeItem('crset_last_order');
    }
  } catch {}

  return (
    <main className="mx-auto max-w-2xl px-6 py-16 space-y-6">
      <h1 className="text-3xl font-bold">Pagamento concluido</h1>

      <section className="border rounded-2xl p-6 space-y-2">
        <p className="text-sm text-neutral-600">
          Obrigado! Recebemos o teu pagamento. Vais receber um e-mail com os detalhes.
        </p>
        <p className="text-sm text-neutral-600">
          Se precisares de fatura ou suporte, fala connosco.
        </p>
      </section>

      <div className="flex gap-3">
        <Link href="/" className="rounded-lg border px-4 py-2 text-sm">
          Voltar ao inicio
        </Link>
        <Link href="/dashboard" className="rounded-lg bg-black text-white px-4 py-2 text-sm">
          Ir para o dashboard
        </Link>
      </div>
    </main>
  );
}
