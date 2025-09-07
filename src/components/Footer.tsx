import {empresa} from '@/data/empresa';
export default function Footer(){
  return (
    <footer className="mt-16 border-t border-black/10 bg-white/70 backdrop-blur text-[rgb(var(--fg))]">
      <div className="mx-auto max-w-6xl p-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        <div>
          <div className="font-semibold">CRSET</div>
          <div className="text-sm opacity-70">Automação e AGI para negócios</div>
        </div>
        <div>
          <div className="text-sm opacity-70">Contacto</div>
          <div className="text-sm"><a href={"tel:"+empresa.telefone.replace(/\s+/g,'')} className="hover:underline">{empresa.telefone}</a></div>
          <div className="text-sm"><a href={"mailto:"+empresa.email} className="hover:underline">{empresa.email}</a></div>
        </div>
        <div>
          <div className="text-sm opacity-70">Localização</div>
          <div className="text-sm"><a href={empresa.maps} target="_blank" rel="noopener noreferrer" className="hover:underline">{empresa.morada}</a></div>
          <div className="text-xs opacity-70 mt-2">Horário: {empresa.horario}</div>
        </div>
      </div>
    </footer>
  )
}