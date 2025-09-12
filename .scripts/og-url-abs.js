// Adiciona/atualiza openGraph.url absoluto (vercel.app) nas páginas indicadas.
const fs = require('fs');
const path = require('path');
const BASE = 'https://crset-solutions-frontend.vercel.app';

function read(f){ return fs.existsSync(f) ? fs.readFileSync(f, 'utf8') : null; }
function write(f,s){ fs.writeFileSync(f, s, 'utf8'); console.log('og:url ->', f); }

function upsertOpenGraphUrlInMetadata(file, absUrl){
  let s = read(file); if (s==null) return console.log('skip (missing):', file);
  // garante import Metadata se houver export metadata novo
  const ensureImport = (t)=>{
    const hasImport = /from\s+['"]next['"]/.test(t) && /\bMetadata\b/.test(t);
    if (hasImport) return t;
    if (/^(\s*import[^\n]*\n)+/m.test(t)) return t.replace(/^((\s*import[^\n]*\n)+)/m, m=>m+'import type { Metadata } from "next";\n');
    return 'import type { Metadata } from "next";\n'+t;
  };

  // existe export const metadata?
  if (/export\s+const\s+metadata\s*:\s*Metadata\s*=\s*{/.test(s) || /export\s+const\s+metadata\s*=\s*{/.test(s)) {
    // já tem openGraph.url?
    if (/openGraph\s*:\s*{[^}]*url\s*:\s*["'`][^"'`]+["'`]/m.test(s)) {
      s = s.replace(/openGraph\s*:\s*{[^}]*url\s*:\s*["'`][^"'`]+["'`]/m, `openGraph: { url: "${absUrl}"`);
    } else {
      // injeta openGraph no início do objeto
      s = s.replace(/export\s+const\s+metadata\s*(:\s*Metadata)?\s*=\s*{\s*/m,
        m => `${m}openGraph: { url: "${absUrl}" }, `);
      s = ensureImport(s);
    }
    write(file, s); return;
  }

  // existe generateMetadata com return { ... } ?
  if (/export\s+(async\s+)?function\s+generateMetadata\s*\(/.test(s)) {
    if (/openGraph\s*:\s*{[^}]*url\s*:\s*`?["'`]/.test(s)) {
      // replace url dentro de openGraph se existir
      s = s.replace(/openGraph\s*:\s*{[^}]*url\s*:\s*(?:`[^`]+`|["'][^"']+["'])/m,
        `openGraph: { url: \`${absUrl}\``);
    } else {
      // injeta no primeiro return { ... }
      let changed=false;
      s = s.replace(/return\s*{\s*/m, m => { changed=true; return `${m}openGraph: { url: \`${absUrl}\` }, `; });
      if (!changed) return console.log('skip (no return obj):', file);
    }
    write(file, s); return;
  }

  // fallback: cria export metadata com openGraph.url
  s = ensureImport(s);
  s = s.replace(/^/, `export const metadata: Metadata = { openGraph: { url: "${absUrl}" } };\n`);
  write(file, s);
}

// Alvos
upsertOpenGraphUrlInMetadata(path.join('src','app','page.tsx'), `${BASE}/`);
upsertOpenGraphUrlInMetadata(path.join('src','app','servicos','page.tsx'), `${BASE}/servicos`);
upsertOpenGraphUrlInMetadata(path.join('src','app','servicos','[slug]','page.tsx'), `${BASE}/servicos/\${params.slug}`);
upsertOpenGraphUrlInMetadata(path.join('src','app','precos','layout.tsx'), `${BASE}/precos`);
upsertOpenGraphUrlInMetadata(path.join('src','app','centro-de-ajuda','layout.tsx'), `${BASE}/centro-de-ajuda`);
