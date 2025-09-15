# CRSET — Sprint: Sci-Fi Theme Baseline

## ✅ Entregas
- Tema **sci-fi** base (grid/scanlines, holo surfaces, neon/glow).
- UI base (shadcn): **Button**, **Card**.
- **/demo** com:
  - TerminalCard (/system/diagnostics)
  - HoloButton
  - MascotHint
  - **HUD bars** (CPU/RAM/NET) com **telemetria em tempo-real**
  - **DataStream** (matriz) SSR-safe
  - Header com: **ThemePresetToggle (Hologram/Neptune/Noir)**, ThemeToggle, VisualToggle.
- **Aliases** `@/*` via `tsconfig.json`.
- Silenciamento de ruído dev (middleware `.map`, well-known endpoint).

## 🔧 Alterações Técnicas
- Tailwind tokens (neon/cyber), helpers globais (holo/scanlines/noise).
- `HoloButton` e `HudBar` usam `rgba(var(--accent))` (compatível com presets).
- Hook `use-telemetry` (mock jitter) — substituível por API real depois.
- `DataStream` renderiza só no cliente (evita hydration mismatch).
- `app/layout` com data-attrs para toggles runtime.

## 🗺 Rotas
- `/` → redirect para `/demo`
- `/demo` → showcase

## 🧪 DX / Dev
- `.env.local`: `NEXT_PUBLIC_DEBUG_VISUAL=1` (overlays dev).
- Middleware responde a:
  - `/_next/**/*.map` → `{}` (200)
  - `/.well-known/appspecific/com.chrome.devtools.json` → `{ status:"ok" }`

## ⚠️ Trade-offs / Backlog
- **Framer Motion** removido (incompat no App Router/Next 14 nessa lib build). Reavaliar quando atualizarmos Node/Next ou trocar por `framer-motion@compat`/CSS.
- Paleta/typography ainda “raw” (boa base, falta fine-tuning).

## 🎯 Próximo Sprint (propor ordem)
1) **Polish visual**: bordas 1px consistentes, spacing, estados hover/active + foco (a11y).
2) **KPIs Cards** (mini-métricas com ícones lucide) + layout responsivo.
3) **Mascote reativa**: alerta quando CPU > 80% (sem FM).
4) **Tema packs**: presets adicionais (Aurora, Proton) + persistência server-side.
5) **Telemetria real**: mock API com route handler (`/api/telemetry`) + SWR.

## ▶️ Como correr
```bash
pnpm dev
# abrir http://localhost:3000/demo

```
