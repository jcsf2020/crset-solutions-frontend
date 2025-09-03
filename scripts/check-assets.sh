#!/usr/bin/env bash
set -euo pipefail

echo "[check-assets] CWD: $(pwd)"
echo "[check-assets] Node/CI root contents:"
ls -la | sed 's/^/  /'

# 0) Garante que estás no root do projeto (usa package.json que SEMPRE existe no CI)
[ -f package.json ] || { echo "❌ ERRO: corre no root do projeto (sem package.json)"; exit 1; }

# 1) Proíbe extensões em maiúsculas (quebra em Linux/Vercel)
bad_ext=$(git ls-files | grep -E '\.(PNG|JPG|JPEG|SVG|WEBP|GIF)$' || true)
if [ -n "$bad_ext" ]; then
  echo "❌ Extensões em maiúsculas não permitidas:"
  echo "$bad_ext"
  exit 1
fi

# 2) Paths de mascotes referenciados no código têm de existir em /public
missing=""
while IFS= read -r -d '' file; do
  while read -r p; do
    [ -f "public${p}" ] || missing="${missing}\npublic${p}"
  done < <(grep -hoE '"/mascotes/[^"]+"' "$file" 2>/dev/null | tr -d '"' || true)
done < <(find src -type f \( -name '*.ts' -o -name '*.tsx' -o -name '*.jsx' -o -name '*.mdx' \) -print0)

if [ -n "${missing:-}" ]; then
  echo -e "❌ Imagens referenciadas em falta:${missing}"
  exit 1
fi

# 3) Verifica “Boris oficial” existe (evita novo 404)
[ -f public/mascotes/oficiais/boris_variacao_1/boris_variacao_1-w200.webp ] || { echo "❌ Falta o Boris oficial -200.webp"; exit 1; }

echo "✅ Assets OK"
