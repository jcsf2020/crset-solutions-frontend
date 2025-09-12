const fs = require('fs');
const path = require('path');

const BASE = 'https://crset-solutions-frontend.vercel.app';
const targets = [
  { dir: 'src/app/precos', path: '/precos', layoutName: 'PrecosLayout' },
  { dir: 'src/app/centro-de-ajuda', path: '/centro-de-ajuda', layoutName: 'AjudaLayout' },
];

function stripPageMetadata(pageFile) {
  if (!fs.existsSync(pageFile)) return console.log('skip (missing):', pageFile);
  let s = fs.readFileSync(pageFile, 'utf8');

  // remove import type Metadata from "next";
  s = s.replace(/^\s*import\s+type\s+{?\s*Metadata\s*}?\s+from\s+["']next["'];?\s*\r?\n/m, '');

  // remove "export const metadata ..." (tipado ou não), bloco simples
  s = s.replace(/^\s*export\s+const\s+metadata[\s\S]*?\};?\s*\r?\n/m, '');

  fs.writeFileSync(pageFile, s, 'utf8');
  console.log('stripped metadata from:', pageFile);
}

function ensureLayoutWithCanonical(dir, canonicalHref, layoutName) {
  const f = path.join(dir, 'layout.tsx');
  const code = `import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  alternates: { canonical: "${canonicalHref}" },
};

export default function ${layoutName}({ children }: { children: ReactNode }) {
  return <> {children} </>;
}
`;
  fs.writeFileSync(f, code, 'utf8');
  console.log('wrote layout:', f, '->', canonicalHref);
}

for (const t of targets) {
  const page = path.join(t.dir, 'page.tsx');
  stripPageMetadata(page);
  ensureLayoutWithCanonical(t.dir, BASE + t.path, t.layoutName);
}
