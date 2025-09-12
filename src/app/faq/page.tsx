import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Dúvidas (FAQ) | CRSET Solutions',
  description: 'Perguntas frequentes sobre serviços, preços, prazos e suporte.'
};
const faqs = [
  { q: 'Quais são os preços?', a: 'Temos três pacotes: Website Essencial (€397), Website Profissional (€697) e White Label (€1.497).' },
  { q: 'Quanto tempo demora a entregar?', a: 'Website Essencial: 7-10 dias; Profissional: 2-3 semanas; White Label: sob proposta.' },
  { q: 'Que suporte está incluído?', a: 'Essencial inclui 3 meses; Profissional, 6 meses; White Label, 12 meses com prioridade.' },
  { q: 'Posso falar por WhatsApp?', a: 'Sim. O botão "Abrir WhatsApp" no site encaminha directamente para a nossa equipa.' },
  { q: 'Têm demos/AGI Commander?', a: 'Sim. O AGI Commander responde a dúvidas 24/7 e pode escalar para humano quando necessário.' },
];
export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(f=>({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a }}))
  };
  return (
    <main className="container mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Dúvidas (FAQ)</h1>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}} />
      <ul className="space-y-4">
        {faqs.map((f,i)=>(
          <li key={i} className="rounded-xl border p-4">
            <details>
              <summary className="cursor-pointer font-semibold">{f.q}</summary>
              <div className="mt-2 text-neutral-700">{f.a}</div>
            </details>
          </li>
        ))}
      </ul>
    </main>
  );
}
