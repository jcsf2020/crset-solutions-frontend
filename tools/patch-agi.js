const fs = require('fs');
const file = 'src/app/api/agi/chat/route.ts';
let s = fs.readFileSync(file, 'utf8');

const new_block = [
"      let content = data?.choices?.[0]?.message?.content || 'No response';",
"      if (isRaw) {",
"        content = content.replace(/^\\[?(BORIS|LAYA|IRINA)\\]?:?\\s*/i,'').trim();",
"      } else {",
"        const who = String(agent||'boris').toLowerCase();",
"        const tag = who==='laya' ? '[LAYA]' : (who==='irina' ? '[IRINA]' : '[BORIS]');",
"        if (!content.trim().startsWith(tag)) content = tag + ' ' + content.trim();",
"      }",
"",
"      logger.info('Chat completed', { rid, ms: Date.now()-started, ip, strict:isRaw, in:String(input).length, out:content.length });"
].join("\n");

const re = /let content = data[\\s\\S]*?logger\\.info\\('Chat completed'[\\s\\S]*?\\);/;

if (!re.test(s)) { 
  console.error('> padrão não encontrado — abort');
  process.exit(1);
}

fs.writeFileSync(file, s.replace(re, new_block));
console.log('> patch aplicado com sucesso');
