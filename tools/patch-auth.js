const fs = require('fs');
const file = 'src/lib/auth-enterprise.ts';
let s = fs.readFileSync(file, 'utf8');

// tornar Redis opcional
s = s.replace(
  /import { Redis } from '@upstash\/redis';/,
  "import { Redis } from '@upstash/redis';\nconst hasUpstash = !!(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);"
);

s = s.replace(
  /private redis = Redis\.fromEnv\(\);/,
  "private redis = hasUpstash ? Redis.fromEnv() : (null as any);"
);

s = s.replace(
  /const isRevoked = await this\.redis\.get\(`revoked:\$\{token\.slice\(-8\)\}`\);\s*if \(isRevoked\) return null;/,
  "const isRevoked = this.redis ? await this.redis.get(`revoked:${token.slice(-8)}`) : null;\n      if (isRevoked) return null;"
);

s = s.replace(
  /await this\.redis\.setex\(`revoked:\$\{token\.slice\(-8\)\}`, 86400, '1'\);/,
  "if (this.redis) { await this.redis.setex(`revoked:${token.slice(-8)}`, 86400, '1'); }"
);

fs.writeFileSync(file, s);
console.log('> auth-enterprise.ts patch aplicado (Redis opcional + JWT standalone)');
