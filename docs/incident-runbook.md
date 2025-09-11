# Runbook de Incidentes (producao)
1) Deteccao: alerta Sentry/uptime
2) Triagem: recolher eventId; impacto (rotas/%/tempo)
3) Mitigacao: vercel alias rollback
4) Validacao: 7 slugs 200; invalido 404; UTMs; Sentry GET/POST; /api/contact => {"ok": true}
5) Post-mortem: causa raiz e acoes
