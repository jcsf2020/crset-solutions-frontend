const fs = require('fs');
const file = 'src/app/api/agi/chat/route.ts';
let s = fs.readFileSync(file, 'utf8');

// Fallback: se não houver UPSTASH vars, não chama limit()
const hasUpstash = "process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN";

// 1) injeta helper antes do primeiro uso do rate-limit (logo após ler o body é seguro)
s = s.replace(
  /const\s+\{\s*agent,\s*input,[\s\S]*?strict\s*=\s*false,[\s\S]*?mode\s*\}\s*=\s*body\s*;/,
  m => m + `\n\n    const __hasUpstash = !!(${hasUpstash});\n`
);

// 2) substitui o bloco Promise.all por versão com fallback
s = s.replace(
  /const\s*\[\s*ipCheck,\s*sessionCheck\s*\]\s*=\s*await\s*Promise\.all\(\s*\[\s*[\s\S]*?ipRateLimit\.limit\(ip\)[\s\S]*?sessionRateLimit\.limit\(sessionKey\)[\s\S]*?\]\s*\)\s*;\s*/m,
  `let ipCheck, sessionCheck;
    if (__hasUpstash) {
      [ipCheck, sessionCheck] = await Promise.all([
        ipRateLimit.limit(ip),
        sessionRateLimit.limit(sessionKey)
      ]);
    } else {
      ipCheck = { success: true, remaining: 999999 };
      sessionCheck = { success: true, remaining: 999999 };
    }\n`
);

// 3) garante que não quebra se alguém ler ipCheck.remaining em logs
s = s.replace(/ipCheck\.remaining/g, '__hasUpstash ? ipCheck.remaining : 999999');
s = s.replace(/sessionCheck\.remaining/g, '__hasUpstash ? sessionCheck.remaining : 999999');

fs.writeFileSync(file, s);
console.log('> fallback de rate-limit aplicado (sem UPSTASH => allow-all)');
