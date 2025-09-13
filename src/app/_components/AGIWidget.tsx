export default function AGIWidget() {
  const waBase = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ? ("https://wa.me/" + process.env.NEXT_PUBLIC_WHATSAPP_NUMBER) : "https://wa.me/";
  const wa = waBase + "?text=Ola%20CRSET%2C%20preciso%20de%20ajuda%20(agi-widget)";
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="flex gap-2">
        <a href="/agi-live?src=widget" data-src="agi-widget" data-variant="floating" className="rounded-full border px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring focus-visible:ring-offset-2">Iniciar AGI</a>
        <a href={wa} target="_blank" rel="noopener noreferrer" data-src="agi-widget" data-variant="whatsapp" className="rounded-full border px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring focus-visible:ring-offset-2">WhatsApp</a>
      </div>
    </div>
  );
}
