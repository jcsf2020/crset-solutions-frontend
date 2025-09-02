#!/usr/bin/env bash
set -euo pipefail
branch=$(git rev-parse --abbrev-ref HEAD)
if [ "$branch" != "main" ]; then
  echo "❌ --prod só na main (branch atual: $branch)"; exit 1; fi
[ -f next.config.mjs ] || [ -f next.config.js ] || { echo "❌ não estás no root"; exit 1; }
grep -q '"projectName": "crset-solutions-frontend"' .vercel/project.json 2>/dev/null || { echo "❌ .vercel não aponta para crset-solutions-frontend"; exit 1; }
echo "✅ Guard OK: main + root + projeto certo"
