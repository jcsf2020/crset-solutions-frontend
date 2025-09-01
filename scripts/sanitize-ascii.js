const fs=require('fs'), cp=require('child_process');
function sh(cmd){ try{ return cp.execSync(cmd,{stdio:['ignore','pipe','pipe']}).toString(); }catch{ return ''; } }
const list = sh('git --no-pager grep -lIP "[^\\x00-\\x7F]" -- src').trim().split(/\r?\n/).filter(Boolean);
if(!list.length){ console.log('nothing to sanitize'); process.exit(0); }
const map={'–':'-','—':'-','“':'"','”':'"','‘':"'",'’':"'",'€':'EUR','¥':'','±':'+','¬':'-','®':'R','§':'S','Š':'S','¡':'!','‹':'<','›':'>','‚':','};
const clean=s=>s.replace(/\u00A0/g,' ').replace(/[\u0080-\u009F]/g,'').replace(/[–—“”‘’€¥±¬®§Š¡‹›‚]/g,c=>map[c]||'').replace(/\u0000/g,'');
const fixPt=s=>s.replace(/Pre00e7os/g,'Pre\\x{00E7}os'); // corrige string corrompida
let changed=0;
for(const f of list){
  const s=fs.readFileSync(f,'utf8'); const t=fixPt(clean(s));
  if(s!==t){ fs.writeFileSync(f,t,'utf8'); changed++; }
}
console.log(`sanitized ${changed}/${list.length} files`);
