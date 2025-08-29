const fs = require('fs');
const jwt = require('jsonwebtoken');

function parseEnvFile(path) {
  const out = {};
  const txt = fs.readFileSync(path, 'utf8');
  for (const line of txt.split(/\r?\n/)) {
    if (!line || line.trim().startsWith('#')) continue;
    const idx = line.indexOf('=');
    if (idx === -1) continue;
    const k = line.slice(0, idx).trim();
    let v = line.slice(idx + 1);
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    out[k] = v;
  }
  return out;
}

const env = parseEnvFile('.env.production.remote');

const payload = {
  sub: 'audit',
  scope: ['agi:chat'],
  iat: Math.floor(Date.now()/1000),
};

let made = 0;

if (env.ENTERPRISE_JWT_SECRET) {
  const tok = jwt.sign(payload, env.ENTERPRISE_JWT_SECRET, { algorithm: 'HS256', expiresIn: '60s' });
  fs.writeFileSync('hs.token', tok);
  console.log('HS256 token -> hs.token');
  made++;
}

if (env.ENTERPRISE_JWT_PRIVATE_KEY && env.ENTERPRISE_JWT_PRIVATE_KEY.includes('BEGIN')) {
  const pk = env.ENTERPRISE_JWT_PRIVATE_KEY.replace(/\\n/g, '\n');
  const tok = jwt.sign(payload, pk, { algorithm: 'RS256', expiresIn: '60s' });
  fs.writeFileSync('rs.token', tok);
  console.log('RS256 token -> rs.token');
  made++;
}

if (!made) {
  console.error('Nenhum segredo/chave encontrado no .env.production.remote (procure ENTERPRISE_JWT_SECRET ou ENTERPRISE_JWT_PRIVATE_KEY).');
  process.exit(2);
}
