import {empresa} from '@/data/empresa';
export default function ContactInfo(){
  return (
    <div className="space-y-4">
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Fala connosco</h2>
      <p className="muted max-w-prose">Resposta rápida em horário comercial. Se preferires, usa WhatsApp.</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <a className="card p-4" href={empresa.whatsapp} target="_blank" rel="noopener noreferrer">
          <div className="text-sm opacity-70">WhatsApp</div>
          <div className="font-medium">{empresa.telefone}</div>
        </a>
        <a className="card p-4" href={"mailto:"+empresa.email}>
          <div className="text-sm opacity-70">Email</div>
          <div className="font-medium">{empresa.email}</div>
        </a>
        <a className="card p-4 sm:col-span-2" href={empresa.maps} target="_blank" rel="noopener noreferrer">
          <div className="text-sm opacity-70">Localização</div>
          <div className="font-medium">{empresa.morada}</div>
        </a>
      </div>
    </div>
  )
}