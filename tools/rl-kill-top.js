const fs = require('fs');
const file = 'src/app/api/agi/chat/route.ts';
let s = fs.readFileSync(file, 'utf8');

if (s.includes('/* RL_KILL_TOP_START */')) {
  console.log('> Kill-switch top já existe.');
  process.exit(0);
}

const anchor = /try\s*\{/m;
if (!anchor.test(s)) {
  console.error('> Não encontrei "try {" para ancorar. Aborto.');
  process.exit(1);
}

s = s.replace(anchor, m => m + `
    /* RL_KILL_TOP_START */
    if (process.env.DISABLE_RL === '1') {
      const H = new Headers({
        'content-type': 'application/json',
        'cache-control': 'no-store, no-cache, must-revalidate, private'
      });
      return new Response(JSON.stringify({ ok: true, bypass: 'rl-kill-top' }), { status: 200, headers: H });
    }
    /* RL_KILL_TOP_END */
`);

fs.writeFileSync(file, s);
console.log('> Kill-switch top inserido (DISABLE_RL=1 força 200 antes de tudo).');
