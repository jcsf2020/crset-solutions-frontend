// Move 'export const metadata: Metadata = {...}' para logo apos os imports.
// Ficheiros alvo: home e /servicos.
const fs = require('fs');

const targets = [
  'src/app/page.tsx',
  'src/app/servicos/page.tsx',
];

function ensureImportMetadata(s) {
  const hasImportNext = /from\s+["']next["']/.test(s);
  const hasType = /\bMetadata\b/.test(s);
  if (hasImportNext && hasType) return s;
  if (/^import[^\n]*\n/m.test(s)) {
    return s.replace(/(^(\s*import[^\n]*\n)+)/, m => m + 'import type { Metadata } from "next";\n');
  }
  return 'import type { Metadata } from "next";\n' + s;
}

for (const f of targets) {
  if (!fs.existsSync(f)) { console.log('skip (missing):', f); continue; }
  let s = fs.readFileSync(f, 'utf8');

  // normaliza import Metadata
  s = ensureImportMetadata(s);

  const metaRe = /export\s+const\s+metadata\s*:\s*Metadata\s*=\s*{[\s\S]*?}\s*;\s*\n?/m;
  const m = s.match(metaRe);
  if (!m) { console.log('no metadata block:', f); continue; }

  // remove bloco atual
  s = s.replace(metaRe, '');

  // localizar bloco de imports
  const importsRe = /^(?:\s*import[^\n]*\n)+/m;
  if (importsRe.test(s)) {
    s = s.replace(importsRe, im => im + m[0]);
    console.log('moved after imports:', f);
  } else {
    s = m[0] + s;
    console.log('prepended (no imports):', f);
  }

  fs.writeFileSync(f, s, 'utf8');
}
