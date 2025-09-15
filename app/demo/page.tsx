"use client"
import { HoloButton } from "@/components/ui/holo-button"
import { TerminalCard } from "@/components/ui/terminal-card"
import { NeonDivider } from "@/components/ui/neon-divider"
import { ThemeToggle } from "@/components/theme-toggle"
import { VisualToggle } from "@/components/visual-toggle"
import { MascotHint } from "@/components/mascot/mascot-hint"
import { DataStream } from "@/components/ui/data-stream"
import { HudBar } from "@/components/ui/hud-bar"

export default function Page() {
  return (
    <main className="container relative mx-auto max-w-5xl space-y-10 px-4 py-10">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-widest [text-shadow:_0_0_12px_rgba(34,211,238,0.6)]">
          CRSET
        </h1>
        <div className="flex items-center gap-1"><ThemeToggle /><VisualToggle /></div>
      </header>

      <section className="grid gap-6 md:grid-cols-2 animate-in fade-in-50 slide-in-from-bottom-2 duration-500">
        <TerminalCard title="/system/diagnostics">
{`uptime  : 42.0h
status  : NOMINAL
modules : ui, motion, mascots
network : online`}
        </TerminalCard>

        <div className="space-y-3">
          <HoloButton>Inicializar Sequência</HoloButton>
          <NeonDivider />
          <MascotHint>
            Dica: podes ligar/desligar scanlines e grid no layout para reduzir ruído visual em páginas de dados.
          </MascotHint>
          <div className="grid gap-3 pt-2">
            <HudBar label="CPU" value={68} />
            <HudBar label="RAM" value={42} />
            <HudBar label="NET" value={12} />
          </div>
          <DataStream title="/stream/telemetry" rows={10} cols={38} interval={80} />
        </div>
      </section>

      <footer className="pt-8 text-center text-xs text-muted-foreground">build: sci-fi theme pass ✓</footer>
    </main>
  )
}
