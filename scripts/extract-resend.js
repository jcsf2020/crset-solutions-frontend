const fs=require('fs');
try{
  const j=JSON.parse(fs.readFileSync('.railway.vars.json','utf8'));
  function find(o){
    if(!o||typeof o!=='object') return '';
    if(Array.isArray(o)) return o.map(find).find(Boolean)||'';
    for(const [k,v] of Object.entries(o)){
      if(k==='RESEND_API_KEY' && typeof v==='string') return v.trim();
      const r=find(v); if(r) return r;
    }
    return '';
  }
  const key=(find(j)||'').trim();
  if(!key) { console.error('missing'); process.exit(1); }
  fs.writeFileSync('.resend.key', key);
  console.log('ok');
}catch(e){ console.error('missing'); process.exit(1); }
