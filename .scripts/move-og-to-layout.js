const fs=require('fs'),path=require('path');
const BASE='https://crset-solutions-frontend.vercel.app';
const targets=[
  ['src/app/agi',       BASE+'/agi'],
  ['src/app/agi-live',  BASE+'/agi-live'],
  ['src/app/convite',   BASE+'/convite'],
  ['src/app/demo',      BASE+'/demo'],
  ['src/app/start',     BASE+'/start'],
];

function read(f){return fs.existsSync(f)?fs.readFileSync(f,'utf8'):null}
function write(f,s){fs.writeFileSync(f,s,'utf8')}

function stripPageMetadata(pageFile){
  let s=read(pageFile); if(s==null){console.log('skip(missing):',pageFile);return}
  // remove import Metadata
  s=s.replace(/^\s*import\s+type\s+{?\s*Metadata\s*}?\s+from\s+["']next["'];?\s*\r?\n/m,'');
  // remove export const metadata {...};
  s=s.replace(/^\s*export\s+const\s+metadata\s*(:\s*Metadata)?\s*=\s*{[\s\S]*?}\s*;\s*\r?\n?/m,'');
  // garantir 'use client' no topo (se existir noutro sítio)
  if(!/^\s*['"]use client['"];?\s*\r?\n/.test(s)){
    let moved=false;
    s=s.replace(/['"]use client['"];?\s*\r?\n/,m=>{moved=true;return''});
    if(moved) s=`'use client';\n`+s;
  }
  write(pageFile,s); console.log('stripped page metadata:',pageFile);
}

function upsertLayout(dir,url){
  const f=path.join(dir,'layout.tsx');
  let t=read(f);
  if(t==null){
    t=`import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = { openGraph: { url: "${url}" } };

export default function Layout({ children }: { children: ReactNode }) {
  return <> {children} </>;
}
`;
  }else{
    // garantir imports
    const hasMeta=/from\s+["']next["']/.test(t)&&/\bMetadata\b/.test(t);
    const hasRN=/from\s+["']react["']/.test(t)&&/\bReactNode\b/.test(t);
    if(!hasMeta||!hasRN){
      if(/^(\s*import[^\n]*\n)+/m.test(t)){
        t=t.replace(/^((\s*import[^\n]*\n)+)/m,m=>m+(!hasMeta?`import type { Metadata } from "next";\n`:``)+(!hasRN?`import type { ReactNode } from "react";\n`:``));
      }else{
        t=(!hasMeta?`import type { Metadata } from "next";\n`:``)+(!hasRN?`import type { ReactNode } from "react";\n`:``)+t;
      }
    }
    // injetar/atualizar openGraph.url
    if(/export\s+const\s+metadata\s*(:\s*Metadata)?\s*=\s*{/.test(t)){
      if(/openGraph\s*:\s*{[^}]*url\s*:/m.test(t)){
        t=t.replace(/openGraph\s*:\s*{[^}]*url\s*:\s*(?:`[^`]+`|["'][^"']+["'])/m,`openGraph: { url: "${url}"`);
      }else{
        t=t.replace(/export\s+const\s+metadata\s*(:\s*Metadata)?\s*=\s*{\s*/m,m=>`${m}openGraph: { url: "${url}" }, `);
      }
    }else{
      t=`export const metadata: Metadata = { openGraph: { url: "${url}" } };\n`+t;
    }
  }
  write(f,t); console.log('layout upserted:',f,'->',url);
}

for(const [dir,url] of targets){
  stripPageMetadata(path.join(dir,'page.tsx'));
  upsertLayout(dir,url);
}
