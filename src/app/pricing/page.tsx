import BuyButton from '@/components/BuyButton';

export const dynamic = 'force-static';

export default function PricingPage() {
  const priceId = process.env.NEXT_PUBLIC_PRICE_ESSENCIAL || '';
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 space-y-8">
      <h1 className="text-3xl font-bold">Planos</h1>
      <section className="border rounded-2xl p-6 space-y-4">
        <h2 className="text-xl font-semibold">CRSET Essencial</h2>
        <p className="opacity-80">€197/mês</p>
        {priceId ? (
          <BuyButton priceId={priceId} label="Comprar Essencial" />
        ) : (
          <p className="text-red-600">PRICE não configurado.</p>
        )}
      </section>
    </main>
  );
}
