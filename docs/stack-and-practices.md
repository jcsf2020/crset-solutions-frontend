# Stack & Practices (Enterprise-Ready)
- Frontend: Next.js 14 (App Router) + TypeScript
- Hosting: Vercel (prod e previews)
- Observabilidade: Sentry (sem PII), /api/debug/sentry GET/POST
- Email: Resend (transacional)
- DB: Supabase (leads), politicas no backend
- Guardrails: sem tocar em rotas/slugs/UTMs/copy/robots/sitemap; ASCII-only; sem deps novas
- Performance: Next/Image; LCP controlado; evitar bundles pesados
- A11y AA: h1 unico, foco visivel, alt descritivo, prefers-reduced-motion
- Branding: mascotes; micro-interacoes discretas; glassmorphism leve
