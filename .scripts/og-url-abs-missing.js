const fs=require('fs'),path=require('path');
const BASE='https://crset-solutions-frontend.vercel.app';
const targets=[
  ['src/app/agi/page.tsx',                BASE+'/agi'],
  ['src/app/agi-test/page.tsx',           BASE+'/agi-test'],
  ['src/app/agi-live/page.tsx',           BASE+'/agi-live'],
  ['src/app/convite/page.tsx',            BASE+'/convite'],
  ['src/app/demo/page.tsx',               BASE+'/demo'],
  ['src/app/imobiliaria/page.tsx',        BASE+'/imobiliaria'],
  ['src/app/mascotes-all/page.tsx',       BASE+'/mascotes-all'],
  ['src/app/mascotes-test/page.tsx',      BASE+'/mascotes-test'],
  ['src/app/start/page.tsx',              BASE+'/start'],
  ['src/app/success/page.tsx',            BASE+'/success'],
  // not-found é opcional; descomenta a linha abaixo se quiseres mesmo definir:
  // ['src/app/not-found.tsx',              BASE+'/_not-found'],
];

function r(f){return fs.existsSync(f)?fs.readFileSync(f,'utf8'):null}
function w(f,s){fs.writeFileSync(f,s,'utf8');console.log('og:url ->',f)}
function ensureImport(s){
  const has=/from\s+['"]next['"]/.test(s)&&/\bMetadata\b/.test(s);
  if(has) return s;
  if(/^(\s*import[^\n]*\n)+/m.test(s)) return s.replace(/^((\s*import[^\n]*\n)+)/m,m=>m+'import type { Metadata } from "next";\n');
  return 'import type { Metadata } from "next";\n'+s;
}
function upsert(file,url){
  let s=r(file); if(s==null){console.log('skip (missing):',file);return}
  // já tem export metadata?
  const hasExport=/export\s+const\s+metadata\s*(:\s*Metadata)?\s*=\s*{[\s\S]*?}/m.test(s);
  if(hasExport){
    if(/openGraph\s*:\s*{[^}]*url\s*:\s*["'`][^"'`]+["'`]/m.test(s)){
      s=s.replace(/openGraph\s*:\s*{[^}]*url\s*:\s*(?:`[^`]+`|["'][^"']+["'])/m,`openGraph: { url: "${url}"`);
    }else{
      s=s.replace(/export\s+const\s+metadata\s*(:\s*Metadata)?\s*=\s*{\s*/m,m=>`${m}openGraph: { url: "${url}" }, `);
      s=ensureImport(s);
    }
  }else{
    s=ensureImport(s);
    s=`export const metadata: Metadata = { openGraph: { url: "${url}" } };\n`+s;
  }
  w(file,s);
}
for(const [f,u] of targets) upsert(f,u);
