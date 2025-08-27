const fs = require('fs');
const path = 'src/app/api/agi/chat/route.ts';
let s = fs.readFileSync(path, 'utf8');

// 1) runtime = nodejs
if (!/export\s+const\s+runtime\s*=/.test(s)) {
  s = "export const runtime = 'nodejs';\n" + s;
} else {
  s = s.replace(/export\s+const\s+runtime\s*=\s*['"][^'"]+['"]\s*;?/, "export const runtime = 'nodejs';");
}

// 2) HARD GATE no topo do POST (idempotente)
if (!/HARD_GATE_START/.test(s)) {
  s = s.replace(/(export\s+async\s+function\s+POST\s*\([\s\S]*?\)\s*\{)/m, `$1
  // HARD_GATE_START
  const gateOn = (process.env.AGI_GATE === 'true') || !!process.env.AGI_TEST_KEY;
  {
    const auth = req.headers.get('authorization') ?? '';
    const tok = auth.startsWith('Bearer ') ? auth.slice(7).trim() : '';
    const expected = process.env.AGI_TEST_KEY ?? '';
    if (gateOn && (!expected || tok !== expected)) {
      return new Response('unauthorized', { status: 401, headers: { 'content-type': 'text/plain; charset=utf-8' } });
    }
  }
  // HARD_GATE_END
`);
}

// 3) IP fix (sem misturar ?? com ||) — substitui QUALQUER linha const ip =
s = s.replace(/const\s+ip\s*=.*?;\s*/m,
`const xff = req.headers.get('x-forwarded-for') ?? '';
const firstHop = xff.split(',')[0]?.trim() ?? null;
const ip = (req.ip ?? firstHop ?? '0.0.0.0');
`);

fs.writeFileSync(path, s);
console.log('patched', path);
