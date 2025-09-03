#!/usr/bin/env bash
set -euo pipefail

echo "[check-assets] CWD: $(pwd)"
echo "[check-assets] Node/CI root contents:"
ls -la | sed 's/^/  /'

# Mostrar árvore básica de public (até 4 níveis) para debug
echo "[check-assets] Conteúdo de public/ (até 4 níveis):"
if [ -d public ]; then
  find public -maxdepth 4 -type f | sed 's/^/  /' || true
else
  echo "  (sem diretório public/)"
fi

# 0) Root do projeto
if [ ! -f package.json ]; then
  echo "❌ ERRO: corre no root do projeto (sem package.json)"
  exit 1
fi
echo "✔ package.json encontrado"

# 1) Extensões em MAIÚSCULAS
bad_ext=$(git ls-files | grep -E '\.(PNG|JPG|JPEG|SVG|WEBP|GIF)$' || true)
if [ -n "$bad_ext" ]; then
  echo "❌ Extensões em maiúsculas não permitidas:"
  echo "$bad_ext"
  exit 1
fi
echo "✔ Sem extensões problemáticas"

# 2) Verificar assets referenciados no código
missing=""
while IFS= read -r -d '' file; do
  while read -r p; do
    if [ ! -f "public${p}" ]; then
      echo "  [miss] public${p}"
      missing="${missing}\npublic${p}"
    else
      echo "  [ok]   public${p}"
    fi
  done < <(grep -hoE '"/mascotes/[^"]+"' "$file" 2>/dev/null | tr -d '"' || true)
done < <(find src -type f \( -name '*.ts' -o -name '*.tsx' -o -name '*.jsx' -o -name '*.mdx' \) -print0)

if [ -n "${missing:-}" ]; then
  echo -e "❌ Imagens referenciadas em falta:${missing}"
  exit 1
fi
echo "✔ Todas as imagens referenciadas existem"

# 3) Checagem explícita do Boris oficial (w200)
BORIS="public/mascotes/oficiais/boris_variacao_1/boris_variacao_1-w200.webp"
if [ -f "$BORIS" ]; then
  echo "✔ Boris oficial presente: $BORIS"
else
  echo "❌ Falta o Boris oficial: $BORIS"
  exit 1
fi

echo "✅ Assets OK"
