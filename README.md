# CRSET Solutions Frontend

Production-ready SaaS boilerplate with Next.js 14, FastAPI, and enterprise integrations.

## 🚀 Features

- **Modern Stack:** Next.js 14 + React 18 + TypeScript + TailwindCSS
- **Multi-language:** Portuguese & English with i18n
- **Performance:** Lighthouse 100/100 (Desktop & Mobile)
- **Security:** Row Level Security (RLS), GDPR compliant
- **Integrations:** Stripe, Sentry, Vercel, Cloudflare, Notion
- **CI/CD:** Automated deployments with Vercel
- **Monitoring:** Error tracking with Sentry
- **Database:** Supabase with PostgreSQL

## 📋 Project Structure

```
crset-solutions-frontend/
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── pt/          # Portuguese pages
│   │   ├── en/          # English pages
│   │   └── layout.tsx   # Root layout
│   ├── components/       # Reusable components
│   │   ├── home/        # Homepage components
│   │   ├── header.tsx   # Header with language switcher
│   │   └── ...
│   └── styles/          # Global styles
├── messages/            # i18n translations
│   ├── pt.json         # Portuguese
│   └── en.json         # English
├── public/              # Static assets
└── package.json
```

## 🛠️ Installation

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm

### Setup

```bash
# Clone repository
git clone https://github.com/jcsf2020/crset-solutions-frontend.git
cd crset-solutions-frontend

# Install dependencies
pnpm install

# Create .env.local
cp .env.example .env.local

# Run development server
pnpm dev
```

Visit http://localhost:3000

## 📦 Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=

# Sentry
NEXT_PUBLIC_SENTRY_DSN=

# Vercel
VERCEL_PROJECT_ID=
VERCEL_ORG_ID=
```

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Push to GitHub
git push origin main

# Vercel auto-deploys on push
# Monitor at: https://vercel.com/dashboard
```

### Manual Build

```bash
pnpm build
pnpm start
```

## 🧪 Testing

```bash
# Run tests
pnpm test

# Run Lighthouse audit
pnpm lighthouse
```

## 📊 Performance Metrics

- **Lighthouse Desktop:** 100/100/96/100
- **Lighthouse Mobile:** 100/100/96/100
- **Core Web Vitals:** All green
- **Page Load:** <2s

## 🔒 Security

### Row Level Security (RLS)
- Enabled on all public tables
- Policies for authenticated users
- Service role for admin operations

### GDPR Compliance
- Data encryption at rest
- Secure authentication
- Privacy policy included

## 📝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

### Development Workflow

1. Create feature branch: `git checkout -b feat/feature-name`
2. Make changes and commit: `git commit -m "feat: description"`
3. Push to GitHub: `git push origin feat/feature-name`
4. Create Pull Request
5. Wait for review and CI/CD checks
6. Merge when approved

## 🐛 Bug Reports

Report bugs via [GitHub Issues](https://github.com/jcsf2020/crset-solutions-frontend/issues)

## 📄 License

MIT License - see LICENSE file

## 👥 Authors

- João Fonseca ([@jcsf2020](https://github.com/jcsf2020))
- CRSET Solutions Team

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and deployment
- Supabase for backend infrastructure
- All contributors and supporters

---

**Last Updated:** December 1, 2025  
**Version:** v3.1.0  
**Status:** ✅ Production Ready
