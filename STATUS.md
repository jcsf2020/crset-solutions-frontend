# CRSET Solutions — STATUS (Prod)

## Sumário executivo
- **Prod OK** em: https://crsetsolutions.com (alias Vercel atual).
- **Leads**: `/api/leads` com _Bearer_ obrigatório; e-mail via Resend funcional (e2e validado).
- **Métricas**: `/api/metrics` (JSON) e `/api/metrics.csv` (CSV) **operacionais** e protegidos.
- **Saúde**: `/api/health` reporta FE/BE; bypass Vercel configurável por cookie.
- **Stripe**: rota `/api/stripe/session` **inócua** quando não configurada (evita falha de build).

## O que foi concluído nesta fase
1. **Proteção e bypass Vercel**: cookie `_vercel_jwt` setado e reutilizado nos testes.
2. **Leads**
   - Implementado `Authorization: Bearer <token>` (validação mínima).
   - Envio de e-mail via Resend com payload limpo (sem placeholders).
   - Testes: smoke em _preview_ e **prod**, e-mail recebido (screenshots).
3. **Métricas**
   - Coleta Notion com paginação e limites defensivos.
   - Agregação: total, 24h, 7d, `top_utm`, `by_day` (14 dias).
   - **Export CSV** funcional; rota CSV agora **propaga headers** e evita 401.
4. **Builds estáveis**
   - Tratado o caso Stripe sem chave (retorna 501); elimina erro no build.
   - **ASCII-only** em código sensível para evitar regressões de encoding.
5. **Hardening**
   - Cabeçalhos de segurança em todas as rotas (herdados de Next/Vercel).
   - `X-Robots-Tag` e `no-store` nas rotas internas.

## Estado atual (agora)
- **Backoffice mínimo**: `/admin/hub` expõe links de inspeção (inclui rotas de API).
- **E2E validados**:
  - `POST /api/leads` → 200 + e-mail recebido.
  - `GET /api/metrics` → 200 JSON consistente.
  - `GET /api/metrics.csv` → 200 CSV (14 linhas, amostra confirmada).
- **Observações**:
  - `top_utm` ainda aparece “(none)” (dados de origem insuficientes nas leads históricas).

## Roadmap para **Pro Tier** (“top dos tops”)
### Bloco A — Confiabilidade/Operação (SLO)
- [ ] **Auth real** no FE APIs (JWT assinado com `JWT_SECRET` e _role_ admin).
- [ ] **Rate limit** e proteção básica (IP + token scope).
- [ ] **Observabilidade**: Sentry com `authToken`; traços básicos de API.

### Bloco B — Growth/Analytics
- [ ] **Identidade de origem**: normalizar `utm_*` à entrada; `source` não vazio.
- [ ] **Dashboard** em `/admin/metrics` (gráfico por dia, top UTM, filtros 7/30/90).
- [ ] **Export programado** (cron) para GSheet/BigQuery (via Vercel Cron/Edge).

### Bloco C — Produto/Revenue
- [ ] **Stripe live**: plano “Maximizar Premium €99/mês” com webhooks (`checkout.session.completed`) → Notion/CRM.
- [ ] **Fatura/Recibos** automáticos (Stripe Customer Portal).
- [ ] **Onboarding**: wizard guiado (copy PT perfeita; sem caracteres não-ASCII no código).

### Bloco D — Segurança/Legal
- [ ] **Política de privacidade** + consentimento cookies.
- [ ] **DKIM/SPF** do domínio para e-mails transacionais (melhor entrega).
- [ ] **Backups** de métricas (snapshot diário).

## Definição de “Pro Tier” (critério de fecho)
- 99.9% uptime nas rotas /api/leads e /api/metrics (mensal).
- Dashboard interno com CSV/JSON e filtros.
- Cobrança ativa no Stripe (plano €99) e métricas de conversão por UTM.
- Alertas em falha de e-mail ou Notion.
- Zero regressões de encoding (lint que bloqueia não-ASCII).

## Checklist de QA contínuo
- [ ] `curl /api/health` → FE leads/metrics 200.
- [ ] `POST /api/leads` (smoke) → 200 + e-mail recebido <60s.
- [ ] `GET /api/metrics.csv` → CSV válido; linhas ≥ 14.
- [ ] Build Vercel sem warnings bloqueantes; _Preview_ e _Prod_ verdes.

## Endpoints (produção)
- `POST /api/leads` (Bearer)
- `GET  /api/metrics` (Bearer)
- `GET  /api/metrics.csv` (Bearer)
- `GET  /api/health`
- `POST /api/stripe/session` → 501 se não configurado

## Anexos/Provas rápidas
- Smoke lead recebido: `smoke+prod@crsetsolutions.com` (timestamp ISO).
- CSV: 14 linhas, datas de 2025-08-19 a 2025-09-01.

— Atualizado: $(date -u +'%Y-%m-%dT%H:%M:%SZ')

- `GET  /api/metrics` (Bearer)
- `GET  /api/metrics.csv` (Bearer)
- `GET  /api/health`
- `POST /api/stripe/session` (501 se não configurado)

## Anexos/Provas rápidas
- Smoke lead recebido: `smoke+prod@crsetsolutions.com` (timestamp ISO).
- CSV: 14 linhas, datas de 2025-08-19 a 2025-09-01.

---
Atualizado: 2025-09-01T$(date -u +'%H:%M:%SZ')
