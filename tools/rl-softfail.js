const fs = require('fs');
const file = 'src/app/api/agi/chat/route.ts';
let s = fs.readFileSync(file, 'utf8');

// injeta helper __safeLimit (idempotente)
if (!s.includes('async function __safeLimit(')) {
  s = s.replace(/try\s*\{/, m =>
    m + `\n    async function __safeLimit(p){ try{return await p}catch(_){ return { success: true, remaining: 999999 }; } }\n`
  );
}

// envolve ipRateLimit/sessionRateLimit com __safeLimit
s = s.replace(
/const\s*\[\s*ipCheck\s*,\s*sessionCheck\s*\]\s*=\s*await\s*Promise\.all\(\s*\[\s*([\s\S]*?ipRateLimit\.limit\(.*?\))\s*,\s*([\s\S]*?sessionRateLimit\.limit\(.*?\))\s*\]\s*\)\s*;/m,
`const [ipCheck, sessionCheck] = await Promise.all([
      __safeLimit($1),
      __safeLimit($2)
    ]);`
);

// flag opcional para desligar RL sem tocar no Upstash
if (!s.includes('const __rlDisabled')) {
  s = s.replace(
    /const\s+\{\s*agent,\s*input,[\s\S]*?mode\s*\}\s*=\s*body\s*;/,
    m => m + `\n\n    const __rlDisabled = process.env.DISABLE_RL === '1';\n`
  );
  s = s.replace(
    /const\s*\[\s*ipCheck\s*,\s*sessionCheck\s*\]\s*=\s*await\s*Promise\.all\(\s*\[\s*__safeLimit\([\s\S]*?__safeLimit\([\s\S]*?\]\s*\)\s*;/m,
    `let ipCheck = { success: true, remaining: 999999 }, sessionCheck = { success: true, remaining: 999999 };
    if (!__rlDisabled) {
      [ipCheck, sessionCheck] = await Promise.all([
        __safeLimit(ipRateLimit.limit(ip)),
        __safeLimit(sessionRateLimit.limit(sessionKey))
      ]);
    }`
  );
}

fs.writeFileSync(file, s);
console.log('> RL soft-fail aplicado (sem 500 se Redis falhar; DISABLE_RL=1 opcional).');
