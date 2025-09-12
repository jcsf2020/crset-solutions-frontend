// Força canonicals ABSOLUTOS em home, /servicos e /servicos/[slug]
const fs = require('fs');

function normBase(raw) {
  const cleaned = String(raw||'').trim().replace(/\s+/g,'');
  const withProto = /^https?:\/\//i.test(cleaned) ? cleaned : 'https://crset.pt';
  return withProto.replace(/\/+$/,'');
}
const BASE = normBase(process.env.NEXT_PUBLIC_SITE_URL);

function patchStatic(file, path) {
  if (!fs.existsSync(file)) return console.log('skip (missing):', file);
  let s = fs.readFileSync(file,'utf8');
  const re = /alternates\s*:\s*{\s*canonical\s*:\s*["'`][^"'`]+["'`]/m;
  if (!re.test(s)) return console.log('skip (no alternates):', file);
  s = s.replace(re, `alternates: { canonical: "${BASE}${path}"`);
  fs.writeFileSync(file,s,'utf8');
  console.log('abs canonical:', file, '->', `${BASE}${path}`);
}

function patchSlug(file, prefix) {
  if (!fs.existsSync(file)) return console.log('skip (missing):', file);
  let s = fs.readFileSync(file,'utf8');
  const re = /return\s*{\s*alternates\s*:\s*{\s*canonical\s*:\s*`[^`]+`\s*}\s*,?/m;
  if (!re.test(s)) return console.log('skip (no return/alternates):', file);
  s = s.replace(re, `return { alternates: { canonical: \`${BASE}${prefix}/\${params.slug}\` },`);
  fs.writeFileSync(file,s,'utf8');
  console.log('abs canonical:', file, '->', `${BASE}${prefix}/\${params.slug}`);
}

patchStatic('src/app/page.tsx', '/');
patchStatic('src/app/servicos/page.tsx', '/servicos');
patchSlug('src/app/servicos/[slug]/page.tsx', '/servicos');
