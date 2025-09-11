# Variaveis de Ambiente

- `AGI_UPSTREAM_BASE`: URL base para as chamadas a API Groq/LLM.
- `AGI_MODEL`: Nome do modelo LLM em uso (ex.: llama-3.3-70b-versatile).
- `CORS_ORIGINS`: Lista de origens permitidas para CORS (separadas por virgulas).
- `CRON_SECRET`: Token secreto usado por crons e chamadas autorizadas a rota `/api/cron/health`.
- `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN`: Credenciais do Upstash para gestao de quotas/rate-limiting.
- `AGI_DAILY_QUOTA`: Quota diaria opcional para limitar chamadas ao AGI.
- `AGI_MAX_INFLIGHT`: Maximo de requisicoes simultaneas permitidas.
- `WEBHOOK_SECRET`: Chave secreta para validar webhooks (ex.: Stripe, Resend).
- `STRIPE_SECRET_KEY`, `STRIPE_PRICE_ESSENCIAL`, etc.: Variaveis relacionadas com pagamentos Stripe.
- Outras variaveis que adicionares devem ser documentadas aqui. Nunca commits valores reais.
