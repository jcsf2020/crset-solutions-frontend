const fs = require("fs");

// Páginas client com metadata que ficou antes do 'use client'
const files = [
  "src/app/agi/page.tsx",
  "src/app/agi-live/page.tsx",
  "src/app/convite/page.tsx",
  "src/app/demo/page.tsx",
  "src/app/start/page.tsx",
];

function fixFile(f) {
  if (!fs.existsSync(f)) return console.log("skip(missing):", f);
  let s = fs.readFileSync(f, "utf8");
  const original = s;

  // 1) Remover (e capturar) 'use client' onde estiver
  const useClientRe = /^\s*['"]use client['"];?\s*\r?\n/m;
  let hadUseClient = false;
  s = s.replace(useClientRe, () => {
    hadUseClient = true;
    return "";
  });
  if (!hadUseClient) return console.log("skip(no use client):", f);

  // 2) Capturar e remover bloco de metadata
  const metaRe = /^\s*export\s+const\s+metadata\s*(:\s*Metadata)?\s*=\s*{[\s\S]*?}\s*;\s*\r?\n?/m;
  const metaMatch = s.match(metaRe);
  if (!metaMatch) return console.log("skip(no metadata):", f);
  s = s.replace(metaRe, "");
  const metaBlock = metaMatch[0];

  // 3) Capturar e remover blocos de import do topo
  const importsRe = /^(?:\s*import[^\n]*\n)+/m;
  let imports = "";
  const im = s.match(importsRe);
  if (im) {
    imports = im[0];
    s = s.replace(importsRe, "");
  }

  // 4) Garantir import do tipo Metadata (se não existir em todo o ficheiro original)
  const hasMetaImport =
    /import\s+type\s+{[^}]*\bMetadata\b[^}]*}\s+from\s+["']next["']/.test(original);
  if (!hasMetaImport) {
    imports += `import type { Metadata } from "next";\n`;
  }

  // 5) Re-escrever: 'use client' → imports → metadata → resto
  const out = `'use client';\n` + (imports || "") + metaBlock + s;
  fs.writeFileSync(f, out, "utf8");
  console.log("fixed:", f);
}

files.forEach(fixFile);
