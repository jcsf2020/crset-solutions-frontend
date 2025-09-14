#!/usr/bin/env node
const https=require('https'), http=require('http');
const baseArg=(process.argv.find(a=>a.startsWith('--base='))||'').split('=')[1];
const BASE=(baseArg||process.env.PROD_BASE||'').replace(/\/$/,'');
if(!BASE){ console.error('Missing --base or PROD_BASE'); process.exit(1); }
const paths=['/','/servicos','/precos','/centro-de-ajuda','/faq'];

function get(u){ return new Promise((res,rej)=>{ const lib=u.startsWith('https')?https:http;
  const req=lib.get(u,r=>{ let b=''; r.on('data',d=>b+=d); r.on('end',()=>res({status:r.statusCode,body:b}))}); req.on('error',rej);
});}

(async()=>{
  let fails=0;
  for(const p of paths){
    const url=BASE+p;
    try{
      const {status,body}=await get(url);
      if(status!==200){ console.error(`FAIL ${p}: status ${status}`); fails++; continue; }
      const m=body.match(/<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["']/i);
      if(!m){ console.error(`FAIL ${p}: canonical not found`); fails++; continue; }
      const href=m[1];
      const ok = href.startsWith(BASE) || href.startsWith('/') || href===BASE || href===BASE+'/';
      if(!ok){ console.error(`FAIL ${p}: canonical href=${href}`); fails++; } else { console.log(`OK ${p}: ${href}`); }
    }catch(e){ console.error(`FAIL ${p}: ${e.message}`); fails++; }
  }
  if(fails>0){ process.exit(1); }
  console.log('All canonicals OK');
})();
