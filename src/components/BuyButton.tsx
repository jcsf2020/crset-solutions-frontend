'use client';

type Props = { priceId: string; label?: string };

export default function BuyButton({ priceId, label = 'Assinar agora' }: Props) {
  async function go() {
    try {
      const r = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ priceId }),
      });
      const j = await r.json();
      if (j?.url) {
        window.location.assign(j.url);
      } else {
        alert('Falha no checkout: ' + (j?.error || r.status));
      }
    } catch (e: any) {
      alert('Erro de rede: ' + (e?.message || e));
    }
  }
  return (
    <button
      onClick={go}
      className="px-4 py-2 rounded-xl bg-black text-white hover:opacity-90 active:opacity-80 text-white"
    >
      {label}
    </button>
  );
}
