const fs = require('fs');
const file = 'src/app/api/agi/chat/route.ts';
let s = fs.readFileSync(file, 'utf8');

// Inserimos um guard que retorna 200 ANTES do rate-limit.
// Ponto de ancoragem: após desestruturação do body.
const anchor = /const\s+\{\s*agent\s*,\s*input[\s\S]*?mode\s*\}\s*=\s*body\s*;/m;

if (!anchor.test(s)) {
  console.error('> Não encontrei o ponto de ancoragem (desestruturação do body). Aborto.');
  process.exit(1);
}

if (!s.includes('/* RL_KILL_SWITCH_START */')) {
  s = s.replace(anchor, m => m + `
    /* RL_KILL_SWITCH_START */
    const __kill = process.env.DISABLE_RL === '1';
    if (__kill) {
      // bypass total antes de qualquer rate-limit ou upstream
      return new Response(JSON.stringify({ ok: true, bypass: 'rl-kill', mode, sessionId }), { status: 200, headers: H });
    }
    /* RL_KILL_SWITCH_END */
  `);
}

fs.writeFileSync(file, s);
console.log('> Kill-switch hard inserido (DISABLE_RL=1 força 200 antes do RL).');
