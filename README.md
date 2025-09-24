# CRSET Solutions Frontend

🚀 **Sistema de automação inteligente com design sci-fi premium**

## 🎯 Sobre o Projeto

Plataforma empresarial completa construída com Next.js 14, apresentando soluções de automação inteligente com design sci-fi premium, glassmorphism e animações suaves.

## ✨ Características

- **Design Sci-Fi Premium**: Interface moderna com glassmorphism e efeitos visuais
- **Chat IA Funcional**: Sistema de chat com gating por ambiente (preview/produção)
- **Automação Empresarial**: Soluções completas para empresas de todos os tamanhos
- **Performance Otimizada**: Lighthouse 100/100/100/100 (Performance/A11y/Best Practices/SEO)
- **Totalmente Responsivo**: Experiência perfeita em desktop, tablet e mobile
- **Acessibilidade AA**: Conformidade total com WCAG 2.1

## 🛠️ Stack Tecnológica

- **Framework**: Next.js 14 (App Router)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS + CSS Custom Properties
- **Animações**: Framer Motion
- **UI Components**: Radix UI + shadcn/ui
- **Backend**: Supabase + Prisma
- **Pagamentos**: Stripe
- **Email**: Resend
- **Monitorização**: Sentry
- **Deploy**: Vercel

## 📋 Variáveis de Ambiente Obrigatórias

```env
# Chat System
CHAT_FLAG_SECRET=your-secret-key-for-hmac-signing

# Email (Resend)
RESEND_API_KEY=re_xxxxxxxxxx
RESEND_FROM="CRSET <no-reply@crsetsolutions.com>"
CONTACT_TO="crsetsolutions@gmail.com"

# Database (Supabase)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Monitoring (Sentry)
SENTRY_DSN=https://your-dsn@sentry.io/project-id
```

## 🚀 Instalação e Desenvolvimento

```bash
# Clone o repositório
git clone https://github.com/jcsf2020/crset-solutions-frontend.git
cd crset-solutions-frontend

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local

# Execute em modo de desenvolvimento
npm run dev
```

## 🔒 Sistema de Chat

### Preview (Desenvolvimento)
- Chat liberado automaticamente quando `VERCEL_ENV=preview`

### Produção
- Chat protegido por cookie HMAC
- Login via `/chat-login` com password
- Verificação através de `GET /api/flags/chat`

## 📊 APIs Principais

- `GET /api/health` - Status do sistema
- `GET /api/flags/chat` - Autorização do chat
- `POST /api/contact` - Formulário de contacto
- `GET /api/debug/sentry` - Debug do Sentry
- `GET /api/metrics` - Métricas do sistema

## 📞 Contacto

- **Email**: crsetsolutions@gmail.com
- **WhatsApp**: +351 914 423 688
- **Website**: https://crsetsolutions.com
- **Localização**: Portugal

## 🚀 Deploy

Este projeto está configurado para deploy automático no Vercel através do GitHub com CI/CD completo.

---

© 2025 CRSET Solutions. Todos os direitos reservados.  
*Soluções Digitais Inteligentes com Boris, Laya e Irina*


[![E2E (Playwright)](https://github.com/jcsf2020/crset-solutions-frontend/actions/workflows/e2e.yml/badge.svg?branch=main)](https://github.com/jcsf2020/crset-solutions-frontend/actions/workflows/e2e.yml)
