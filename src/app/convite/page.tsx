import React from 'react';

export default function ConvitePage() {
  const whatsappLink = "https://wa.me/351914423688?text=Ola!%20Recebi%20o%20convite%20beta%20da%20CRSET%20Solutions";
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-4">Convite Beta</h1>
      <p className="mb-4">Para aderir ao beta, fala connosco.</p>
      <a href={whatsappLink} className="underline">Falar no WhatsApp</a>
    </main>
  );
}
