const fs = require('fs');
const path = 'src/app/api/agi/chat/route.ts';
let s = fs.readFileSync(path, 'utf8');

const marker = 'const BASE = ';
if (!s.includes(marker)) {
  console.error('> marcador não encontrado: "const BASE = " — abort');
  process.exit(1);
}

const insert = `
    // === NOOP: testa rate-limit sem chamar o upstream ===
    if (mode === 'noop') {
      return new Response('OK', { status: 200, headers: H });
    }

`;

s = s.replace(marker, insert + marker);
fs.writeFileSync(path, s);
console.log('> noop mode inserido (mode:"noop") antes do upstream');
