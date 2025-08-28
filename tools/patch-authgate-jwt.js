const fs = require('fs');
const file = 'src/app/api/agi/chat/route.ts';
let s = fs.readFileSync(file, 'utf8');

// Substitui o bloco de auth baseado em AGI_TEST_KEY por validação JWT enterprise
s = s.replace(
  /\/\/ Auth gate[\s\S]*?return new Response\('unauthorized'[\s\S]*?\}\)/m,
  `// Auth gate (JWT enterprise)
    const auth = (req.headers.get('authorization') || '').trim();
    const tok = (auth.startsWith('Bearer ') ? auth.slice(7) : auth).trim();

    const ent = new EnterpriseAuth();
    const jwtPayload = await ent.validateApiKey(tok);
    if (!jwtPayload) {
      return new Response('unauthorized', { status: 401, headers: H });
    }
    const tier = (jwtPayload && (jwtPayload.tier || jwtPayload['tier'])) || 'basic';`
);

fs.writeFileSync(file, s);
console.log('> Auth gate atualizado: agora valida JWT (EnterpriseAuth) em /api/agi/chat');
