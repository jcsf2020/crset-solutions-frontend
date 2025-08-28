const fs = require('fs');
const file = 'src/app/api/agi/chat/route.ts';
let s = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';

if (!s) { console.error('> ficheiro não encontrado:', file); process.exit(1); }

if (/const\s+authHeader\s*=/.test(s)) {
  console.log('> ok: authHeader já existe');
  process.exit(0);
}

const patched = s.replace(/try\s*\{/, m => m + `\n    const authHeader = (req.headers.get('authorization') || '').trim();`);
if (patched === s) {
  console.error('> não encontrei "try {" para ancorar a injeção');
  process.exit(1);
}

fs.writeFileSync(file, patched);
console.log('> inject: const authHeader = ...');
