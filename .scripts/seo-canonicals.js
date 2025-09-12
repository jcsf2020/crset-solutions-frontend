// ASCII-only. Patch de canonicals para home, /servicos e /servicos/[slug].
const fs = require("fs");
const files = {
  home: { file: "src/app/page.tsx", canonical: "/" },
  servicos: { file: "src/app/servicos/page.tsx", canonical: "/servicos" },
  servicoSlug: { file: "src/app/servicos/[slug]/page.tsx", prefix: "/servicos" },
};

function read(file) {
  if (!fs.existsSync(file)) return null;
  return fs.readFileSync(file, "utf8");
}
function write(file, s) { fs.writeFileSync(file, s, "utf8"); }

function ensureImportMetadata(s) {
  const hasImportNext = /from\s+["']next["']/.test(s);
  const hasType = /Metadata/.test(s);
  if (hasImportNext && hasType) return s;
  // insere depois do ultimo import, senao no topo
  if (/^import .*\n/m.test(s)) {
    return s.replace(/(^(\s*import[^\n]*\n)+)/, (m) => `${m}import type { Metadata } from "next";\n`);
  }
  return `import type { Metadata } from "next";\n${s}`;
}

function upsertStaticPage(file, canonicalPath) {
  let s = read(file);
  if (s == null) return console.log(`skip (missing): ${file}`);
  if (/alternates\s*:\s*{[^}]*canonical\s*:/.test(s)) {
    console.log(`ok (exists): ${file}`);
    return;
  }
  // tenta injetar em metadata existente (tipado ou nao)
  if (/export\s+const\s+metadata\s*:\s*Metadata\s*=\s*{\s*/.test(s)) {
    s = s.replace(/export\s+const\s+metadata\s*:\s*Metadata\s*=\s*{\s*/, (m) => `${m}alternates: { canonical: "${canonicalPath}" }, `);
  } else if (/export\s+const\s+metadata\s*=\s*{\s*/.test(s)) {
    s = s.replace(/export\s+const\s+metadata\s*=\s*{\s*/, (m) => `export const metadata: Metadata = { alternates: { canonical: "${canonicalPath}" }, `);
    s = ensureImportMetadata(s);
  } else {
    // criar metadata no topo
    s = ensureImportMetadata(s);
    s = s.replace(/(^)/, (_m) => `export const metadata: Metadata = { alternates: { canonical: "${canonicalPath}" } };\n`);
  }
  if (!/alternates\s*:\s*{[^}]*canonical\s*:/.test(s)) {
    console.log(`fail (no canonical injected): ${file}`);
    process.exitCode = 1;
    return;
  }
  write(file, s);
  console.log(`applied: ${file}`);
}

function upsertDynamicSlugPage(file, prefix) {
  let s = read(file);
  if (s == null) return console.log(`skip (missing): ${file}`);
  if (/alternates\s*:\s*{[^}]*canonical\s*:/.test(s)) {
    console.log(`ok (exists): ${file}`);
    return;
  }
  if (/export\s+(async\s+)?function\s+generateMetadata\s*\(/.test(s)) {
    // injeta alternates no primeiro return { ... }
    let changed = false;
    s = s.replace(/return\s*\{\s*/, (m) => {
      changed = true;
      return `${m}alternates: { canonical: \`${prefix}/\${params.slug}\` }, `;
    });
    if (!changed) {
      console.log(`fail (no return object to inject): ${file}`);
      process.exitCode = 1;
      return;
    }
  } else {
    // adiciona generateMetadata tipado no topo (apos imports)
    s = ensureImportMetadata(s);
    const fn =
`export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  return { alternates: { canonical: \`${prefix}/\${params.slug}\` } };
}
`;
    if (/^import .*\n/m.test(s)) {
      s = s.replace(/(^(\s*import[^\n]*\n)+)/, (imports) => `${imports}${fn}`);
    } else {
      s = `${fn}${s}`;
    }
  }
  if (!/alternates\s*:\s*{[^}]*canonical\s*:/.test(s)) {
    console.log(`fail (no canonical injected): ${file}`);
    process.exitCode = 1;
    return;
  }
  write(file, s);
  console.log(`applied: ${file}`);
}

// run
upsertStaticPage(files.home.file, files.home.canonical);
upsertStaticPage(files.servicos.file, files.servicos.canonical);
upsertDynamicSlugPage(files.servicoSlug.file, files.servicoSlug.prefix);
