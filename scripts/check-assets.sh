#!/usr/bin/env bash
set -euo pipefail

# 1) Proíbe extensões em maiúsculas (quebra em Linux/Vercel)
bad_ext=$(git ls-files | grep -E '\.(PNG|JPG|JPEG|SVG)$' || true)
if [ -n "$bad_ext" ]; then
  echo "❌ Extensões em maiúsculas não permitidas:"
  echo "$bad_ext"
  exit 1
fi

# 2) Paths de mascotes referenciados no código têm de existir em /public
missing=$(grep -Rho --include='*.{ts,tsx,jsx,mdx}' -E '"/mascotes/[^"]+"' src 2>/dev/null \
  | tr -d '"' \
  | while read -r p; do [ -f "public${p}" ] || echo "public${p}"; done)
if [ -n "$missing" ]; then
  echo "❌ Imagens referenciadas em falta:"
  echo "$missing"
  exit 1
fi

# 3) Verifica “Boris oficial” existe (evita novo 404)
[ -f public/mascotes/oficiais/boris_variacao_1/boris_variacao_1-w200.webp ] || { echo "❌ Falta o Boris oficial -200.webp"; exit 1; }

echo "✅ Assets OK"
