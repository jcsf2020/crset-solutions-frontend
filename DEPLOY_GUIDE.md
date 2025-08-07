# CRSET Solutions - Guia de Deploy Completo

## 🎯 Visão Geral do Deploy

Este guia detalha como fazer o deploy completo da stack CRSET Solutions em produção, integrando frontend Next.js (Vercel) com backend Railway.

## 🏗️ Arquitetura de Produção

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend       │    │   Database      │
│   Next.js       │◄──►│    FastAPI       │◄──►│   PostgreSQL    │
│   (Vercel)      │    │   (Railway)      │    │   (Railway)     │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
  crsetsolutions.com    crset-api-production    Railway Postgres
```

## 🚀 Deploy Frontend (Vercel)

### Pré-requisitos
- Conta Vercel conectada ao GitHub
- Repositório GitHub com código do frontend
- Domínio crsetsolutions.com configurado

### Passo 1: Preparar Repositório
```bash
# Criar repositório GitHub
git init
git add .
git commit -m "feat: CRSET Solutions frontend dockerizado"
git branch -M main
git remote add origin https://github.com/seu-usuario/crset-frontend.git
git push -u origin main
```

### Passo 2: Deploy Vercel
```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy inicial
vercel

# Deploy produção
vercel --prod
```

### Passo 3: Configurar Variáveis de Ambiente
No dashboard Vercel, adicionar:
```env
NEXT_PUBLIC_BACKEND_URL=https://crset-api-production.up.railway.app
NEXT_PUBLIC_API_BASE_URL=https://crset-api-production.up.railway.app/api
NEXT_PUBLIC_CONTACT_ENDPOINT=/api/contact
NEXT_PUBLIC_SERVICES_ENDPOINT=/api/services
NEXT_PUBLIC_WHATSAPP_NUMBER=351999999999
NEXT_PUBLIC_SITE_URL=https://crsetsolutions.com
NEXT_PUBLIC_SITE_NAME=CRSET Solutions
NODE_ENV=production
```

### Passo 4: Configurar Domínio Personalizado
```bash
# Adicionar domínio
vercel domains add crsetsolutions.com
vercel domains add www.crsetsolutions.com

# Verificar configuração DNS
vercel domains inspect crsetsolutions.com
```

### Configuração DNS (Namecheap/Cloudflare)
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: A
Name: @
Value: 76.76.19.19 (Vercel)
```

## 🔧 Deploy Backend (Railway)

### Pré-requisitos
- Conta Railway
- Railway CLI instalado
- Backend FastAPI pronto

### Passo 1: Preparar Backend
```bash
# Navegar para diretório backend
cd /home/ubuntu/crset_solutions_final/backend

# Verificar estrutura
ls -la
# Deve conter: main.py, requirements.txt, Dockerfile
```

### Passo 2: Deploy Railway
```bash
# Instalar Railway CLI
npm install -g @railway/cli

# Login
railway login

# Inicializar projeto
railway init --name crset-backend

# Deploy
railway up

# Obter URL
railway domain
```

### Passo 3: Configurar Variáveis de Ambiente
```bash
# Via CLI
railway variables set DATABASE_URL="postgresql://..."
railway variables set CORS_ORIGINS="https://crsetsolutions.com,https://www.crsetsolutions.com"
railway variables set RESEND_API_KEY="re_..."

# Ou via dashboard Railway
```

### Variáveis Backend Necessárias
```env
DATABASE_URL=postgresql://user:pass@host:port/db
CORS_ORIGINS=https://crsetsolutions.com,https://www.crsetsolutions.com
RESEND_API_KEY=re_your_resend_api_key
JWT_SECRET_KEY=your_jwt_secret
ENVIRONMENT=production
```

## 🗄️ Configurar Base de Dados

### PostgreSQL Railway
```bash
# Criar serviço PostgreSQL
railway add postgresql

# Obter URL de conexão
railway variables get DATABASE_URL

# Executar migrações (se necessário)
railway run python -m alembic upgrade head
```

### Inicializar Dados
```sql
-- Conectar à base de dados e executar
INSERT INTO services (name, description, price, currency, mascot, popular) VALUES
('Desenvolvimento Web', 'Websites profissionais e responsivos', 599.00, 'EUR', 'laya', false),
('Aplicações Mobile', 'Apps iOS e Android nativas', 799.00, 'EUR', 'irina', false),
('Automação de Processos', 'Automatize tarefas e aumente produtividade', 999.00, 'EUR', 'boris', true),
('E-commerce', 'Lojas online completas e otimizadas', 1299.00, 'EUR', 'laya', false),
('Soluções Cloud', 'Infraestrutura escalável na nuvem', 899.00, 'EUR', 'boris', false),
('Consultoria Tech', 'Estratégia digital personalizada', 1499.00, 'EUR', 'irina', false);
```

## 🔄 CI/CD Pipeline

### GitHub Actions (Frontend)
Criar `.github/workflows/deploy.yml`:
```yaml
name: Deploy Frontend
on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

### Railway Auto-Deploy
```bash
# Conectar repositório GitHub
railway connect

# Configurar auto-deploy
railway service settings
```

## 🔍 Testes de Produção

### Verificar Frontend
```bash
# Health check
curl https://crsetsolutions.com/api/health

# Teste formulário
curl -X POST https://crsetsolutions.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","message":"Test"}'
```

### Verificar Backend
```bash
# Health check
curl https://crset-api-production.up.railway.app/health

# Teste API
curl https://crset-api-production.up.railway.app/api/services
```

### Verificar Integração
```bash
# Teste end-to-end
curl -X POST https://crsetsolutions.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Integration Test","email":"test@crset.com","message":"Testing integration"}'
```

## 📊 Monitorização

### Vercel Analytics
```bash
# Ativar analytics
vercel analytics enable

# Verificar métricas
vercel analytics
```

### Railway Logs
```bash
# Ver logs em tempo real
railway logs

# Logs específicos
railway logs --service backend
```

### Health Checks
```bash
# Script de monitorização
#!/bin/bash
echo "Checking CRSET Solutions health..."

# Frontend
if curl -f https://crsetsolutions.com/api/health > /dev/null 2>&1; then
    echo "✅ Frontend: OK"
else
    echo "❌ Frontend: DOWN"
fi

# Backend
if curl -f https://crset-api-production.up.railway.app/health > /dev/null 2>&1; then
    echo "✅ Backend: OK"
else
    echo "❌ Backend: DOWN"
fi
```

## 🔒 Segurança

### SSL/TLS
- ✅ Vercel: SSL automático
- ✅ Railway: HTTPS por padrão
- ✅ Domínio: Certificado válido

### CORS
```python
# Backend FastAPI
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://crsetsolutions.com",
        "https://www.crsetsolutions.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Variáveis Sensíveis
- ✅ Nunca commitar .env
- ✅ Usar secrets do GitHub/Vercel/Railway
- ✅ Rotar chaves regularmente

## 🚨 Troubleshooting

### Problemas Comuns

**Frontend não carrega**:
```bash
# Verificar build
vercel logs

# Verificar DNS
nslookup crsetsolutions.com

# Verificar SSL
curl -I https://crsetsolutions.com
```

**Backend não responde**:
```bash
# Verificar logs Railway
railway logs

# Verificar variáveis
railway variables

# Restart serviço
railway service restart
```

**Formulário não envia**:
```bash
# Verificar CORS
curl -H "Origin: https://crsetsolutions.com" \
     -H "Access-Control-Request-Method: POST" \
     -X OPTIONS \
     https://crset-api-production.up.railway.app/api/contact

# Verificar endpoint
curl -X POST https://crset-api-production.up.railway.app/api/contact \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","email":"test@test.com","message":"Test"}'
```

## 📈 Otimizações

### Performance
- ✅ CDN global (Vercel Edge Network)
- ✅ Static generation
- ✅ Image optimization
- ✅ Gzip compression

### SEO
- ✅ Meta tags completas
- ✅ OpenGraph configurado
- ✅ Sitemap.xml
- ✅ Robots.txt

### Monitoring
- ✅ Vercel Analytics
- ✅ Railway Metrics
- ✅ Custom health checks
- ✅ Error tracking

## 🎯 Checklist Final

### Pré-Deploy
- [ ] Código testado localmente
- [ ] Variáveis de ambiente configuradas
- [ ] DNS configurado
- [ ] SSL verificado

### Deploy
- [ ] Frontend deployado no Vercel
- [ ] Backend deployado no Railway
- [ ] Base de dados configurada
- [ ] Domínio funcionando

### Pós-Deploy
- [ ] Health checks passando
- [ ] Formulário funcionando
- [ ] Analytics configurado
- [ ] Monitorização ativa

---

**🚀 Deploy completo da CRSET Solutions realizado com sucesso!**

*Stack em produção: Frontend (Vercel) + Backend (Railway) + PostgreSQL*

