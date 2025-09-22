#!/usr/bin/env bash
# Chat smoke test (no secrets in logs)
set -euo pipefail

BASE_URL="${BASE_URL:-${1:-https://crsetsolutions.com}}"
PASSWORD="${CHAT_PASSWORD:-${2:-}}"
MESSAGE="${MESSAGE:-E2E ping from GH Actions}"
TMP_COOKIES="$(mktemp)"

red() { printf "\033[31m%s\033[0m\n" "$*" >&2; }
green() { printf "\033[32m%s\033[0m\n" "$*"; }

if [ -z "${PASSWORD}" ]; then
  red "CHAT_PASSWORD ausente. Define via env/secret. Abort."
  exit 2
fi

cleanup() { rm -f "$TMP_COOKIES" >/dev/null 2>&1 || true; }
trap cleanup EXIT

# 1) Login -> grava cookie HttpOnly (NÃO imprime o password)
payload_login=$(printf '{"password":"%s"}' "$PASSWORD")
resp_login="$(curl -sS -i -c "$TMP_COOKIES" \
  -H 'content-type: application/json' \
  -d "$payload_login" \
  "$BASE_URL/api/flags/chat/login" | tr -d '\r')"

status_login="$(printf "%s" "$resp_login" | awk 'NR==1{print $2}')"
if [ "${status_login}" != "200" ] || ! printf "%s" "$resp_login" | grep -q '"ok":true'; then
  red "Login falhou. HTTP=${status_login}"; exit 3
fi

# 2) Enviar mensagem para /api/agi/chat com o cookie
payload=$(printf '{"messages":[{"role":"user","content":"%s"}]}' "$MESSAGE")
resp_chat="$(curl -sS -i -b "$TMP_COOKIES" \
  -H 'content-type: application/json' \
  -d "$payload" \
  "$BASE_URL/api/agi/chat" | tr -d '\r')"

status_chat="$(printf "%s" "$resp_chat" | awk 'NR==1{print $2}')"
body_chat="$(printf "%s" "$resp_chat" | awk 'BEGIN{p=0} /^$/{p=1;next} p{print}')"

if [ "${status_chat}" != "200" ] || ! printf "%s" "$body_chat" | grep -q '"ok":true'; then
  red "Chat falhou. HTTP=${status_chat}"
  printf "%s\n" "$body_chat" >&2
  exit 4
fi

green "OK: chat respondeu 200 e ok=true"
# opcional: mostra só a primeira linha do reply
printf "%s\n" "$body_chat" | sed -n '1,1p'
