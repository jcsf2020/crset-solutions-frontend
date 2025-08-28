const fs = require('fs');
const file = 'src/app/api/agi/chat/route.ts';
let s = fs.readFileSync(file, 'utf8');

// 1) Injeta uma factory segura no topo do ficheiro (idempotente)
if (!s.includes('/* RL_SAFE_FACTORY_START */')) {
  s = s.replace(
    /(^\s*(?:'use client'|"use client")?.*?\n)/s, // depois da 1ª linha útil
    `$1
/* RL_SAFE_FACTORY_START */
let __RL_SAFE;
try {
  const hasUpstash = !!(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
  if (process.env.DISABLE_RL === '1' || !hasUpstash) {
    __RL_SAFE = { make: (_opts) => ({ limit: async () => ({ success: true, remaining: 999999 }) }) };
  } else {
    // require dinâmico para não quebrar em edge se a lib não existir em build
    const { Ratelimit } = require('@upstash/ratelimit');
    const { Redis } = require('@upstash/redis');
    const redis = Redis.fromEnv();
    __RL_SAFE = { make: (opts) => new Ratelimit({ redis, ...opts }) };
  }
} catch (_e) {
  // fallback absoluto
  __RL_SAFE = { make: (_opts) => ({ limit: async () => ({ success: true, remaining: 999999 }) }) };
}
/* RL_SAFE_FACTORY_END */
`
  );
}

// 2) Substitui todas as instâncias de "new Ratelimit({ ... })" por "__RL_SAFE.make({ ... })"
s = s.replace(/new\s+Ratelimit\s*\(\s*\{([\s\S]*?)\}\s*\)/g, '__RL_SAFE.make({$1})');

fs.writeFileSync(file, s);
console.log('> Safe factory do rate-limit aplicada (top-level nunca falha).');
