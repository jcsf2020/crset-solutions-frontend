# Warp Rules — Outreach Ops

## Objetivo
- Registar outreach remoto (Next.js + FastAPI) sem tocar no produto.

## Âmbito permitido
- Caminhos: reports/**, tracker/apps.csv, scripts/apply.ps1, outreach/**.
- Branch: ops/outreach-*. Proibido mexer em main.

## Comandos permitidos
- powershell -NoLogo -NoProfile -ExecutionPolicy Bypass -File scripts\apply.ps1 --platform <RemoteOK|WeWorkRemotely|Agency-PT|Agency-ES|Spare> --role "<ROLE>" --company "<COMPANY>" --url "<URL>" --status <applied|submitted|sent|email_drafted|todo>
- git add/commit/push na branch de ops; gh pr create/view/list (sempre draft). Nunca merge.

## Comandos proibidos
- git merge/rebase/checkout main/force-push; rm -rf; sudo; installs; build/deploy do produto; editar src/**.

## Convenções
- Mensagens: prefixo ops(outreach): ...
- 1 bloco/ação. Mostrar sempre o comando antes de executar.
- Idioma PT. Anexar contexto (dif/erros) ao pedir ajuda.

## Contexto
- Stack: Next.js 14, FastAPI, Docker, Vercel/Railway, Supabase, Sentry.
- NDA: código só sob NDA.
