const fs = require('fs');
const file = 'src/app/api/agi/chat/route.ts';
let s = fs.readFileSync(file, 'utf8');

// injeta import se não existir
if (!s.includes('EnterpriseAuth')) {
  s = s.replace(
    /import .*logger.*;/,
    'import { logger } from "@/lib/logger";\nimport { EnterpriseAuth } from "@/lib/auth-enterprise";'
  );
}

// substitui bloco de validação antiga
s = s.replace(
  /const expectedToken[\s\S]*?}\n/,
  `const auth = new EnterpriseAuth();
    const token = authHeader?.replace(/^Bearer /, "");
    const payload = token ? await auth.validateApiKey(token) : null;
    if (!payload) {
      logger.warn("Unauthorized access", { rid, ip });
      return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401, headers: H });
    }\n`
);

fs.writeFileSync(file, s);
console.log('> route.ts atualizado para JWT enterprise');
