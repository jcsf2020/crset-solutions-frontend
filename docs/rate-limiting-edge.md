# Rate Limiting no Edge (plano tecnico - docs-only)
- Objetivo: proteger rotas sensiveis
- Algoritmo: token bucket por chave (IP+UA)
- Quotas por rota; resposta 429 com retry-after
- Storage: KV/Redis opcional; ou estrategia stateless via headers
- Rollout: iniciar nas rotas de maior risco; monitorizar e ajustar
