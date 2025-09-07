# Variáveis de Ambiente

- `AGI_UPSTREAM_BASE`: URL base para as chamadas à API Groq/LLM.
- `AGI_MODEL`: Nome do modelo LLM em uso (ex.: llama-3.3-70b-versatile).
- `CORS_ORIGINS`: Lista de origens permitidas para CORS (separadas por vírgulas).
- `CRON_SECRET`: Token secreto usado por crons e chamadas autorizadas à rota `/api/cron/health`.
- `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN`: Credenciais do Upstash para gestão de quotas/rate‑limiting.
- `AGI_DAILY_QUOTA`: Quota diária opcional para limitar chamadas ao AGI.
- `AGI_MAX_INFLIGHT`: Máximo de requisições simultâneas permitidas.
- `WEBHOOK_SECRET`: Chave secreta para validar webhooks (ex.: Stripe, Resend).
- `STRIPE_SECRET_KEY`, `STRIPE_PRICE_ESSENCIAL`, etc.: Variáveis relacionadas com pagamentos Stripe.
- Outras variáveis que adicionares devem ser documentadas aqui. Nunca commits valores reais.
