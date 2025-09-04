#!/usr/bin/env bash
set -Eeuo pipefail

# ===== UNICODE PERIGOSO =====
DANGEROUS_UNICODE='[\x{2013}\x{2014}\x{00A0}\x{2018}\x{2019}\x{201C}\x{201D}]'
echo "[checks] unicode perigoso (fora do i18n.ts)…"
if git ls-files | grep -E '\.(ts|tsx|js|jsx|mdx)$' | grep -v '^src/lib/i18n.ts$' \
 | xargs -r grep -InP "$DANGEROUS_UNICODE" | head -n5 | grep -q .; then
  echo "FAIL: encontrado Unicode perigoso (– — NBSP ‘ ’ “ ”) fora do i18n.ts"
  git ls-files | grep -E '\.(ts|tsx|js|jsx|mdx)$' | grep -v '^src/lib/i18n.ts$' \
   | xargs -r grep -InP "$DANGEROUS_UNICODE" | head -n20 || true
  exit 1
fi

# ===== ASSETS BASE =====
echo "[checks] assets base…"
[ -d public/mascotes ] || { echo "FAIL: public/mascotes em falta"; exit 1; }

# ===== SEGREDOS REAIS (tokens) =====
# Procuramos padrões de tokens reais, não nomes de variáveis.
# Exemplos: ghp_..., sk-..., re_..., whsec_...
SECRET_PAT='(ghp_[A-Za-z0-9]{20,}|sk-[A-Za-z0-9_-]{20,}|re_[A-Za-z0-9]{20,}|whsec_[A-Za-z0-9]{16,})'

echo "[checks] segredos hardcoded…"
FILES=$(git ls-files | grep -v -Ei '\.(md|markdown)$' | grep -v '^node_modules/' | grep -v '^\.next/')
MATCHES=$(echo "$FILES" | xargs -r grep -InE "$SECRET_PAT" || true)
if [ -n "${MATCHES:-}" ]; then
  echo "$MATCHES"
  echo "FAIL: tokens de segredo reais encontrados no repo (remover/rotacionar e usar secrets)."
  exit 1
fi

echo "[checks] OK"
