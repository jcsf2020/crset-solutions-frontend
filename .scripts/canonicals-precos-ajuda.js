const fs=require('fs');
const base='https://crset-solutions-frontend.vercel.app';
const targets=[['src/app/precos/page.tsx','/precos'],['src/app/centro-de-ajuda/page.tsx','/centro-de-ajuda']];
function ensureImportMetadata(s){
  const has=/from\s+["']next["']/.test(s)&&/\bMetadata\b/.test(s);
  if(has) return s;
  if(/^(\s*import[^\n]*\n)+/m.test(s)){return s.replace(/^((\s*import[^\n]*\n)+)/m,m=>m+'import type { Metadata } from "next";\n')}
  return 'import type { Metadata } from "next";\n'+s;
}
function upsert(file,path){
  if(!fs.existsSync(file)){console.log('skip(missing):',file);return}
  let s=fs.readFileSync(file,'utf8'); s=ensureImportMetadata(s);
  const block=`export const metadata: Metadata = { alternates: { canonical: "${base}${path}" } };\n`;
  if(/export\s+const\s+metadata\s*(:\s*Metadata)?\s*=\s*{/.test(s)){
    if(/alternates\s*:\s*{[^}]*canonical\s*:/.test(s)){
      s=s.replace(/alternates\s*:\s*{[^}]*canonical\s*:\s*["'`][^"'`]+["'`]/m,`alternates: { canonical: "${base}${path}"`)
    } else {
      s=s.replace(/export\s+const\s+metadata\s*(:\s*Metadata)?\s*=\s*{\s*/,m=>m+`alternates: { canonical: "${base}${path}" }, `)
    }
  } else {
    if(/^(\s*import[^\n]*\n)+/m.test(s)){s=s.replace(/^((\s*import[^\n]*\n)+)/m,m=>m+block)} else {s=block+s}
  }
  fs.writeFileSync(file,s,'utf8'); console.log('canonical:',file,'->',`${base}${path}`)
}
for(const [f,p] of targets) upsert(f,p);
