const fs = require('fs');
const f = 'src/app/api/agi/chat/route.ts';
let s = fs.readFileSync(f, 'utf8');
let changed = 0;

// 1) Catch final: nunca 500 → 503
s = s.replace(
  /\} catch \(err:any\) \{[\s\S]*?return new Response\([\s\S]*?\);\s*\}/m,
  `} catch (err:any) {
  const msg = String(err?.message||err)||'unknown_error';
  logger.error('Chat failed', { rid, ms: Date.now()-started, error: msg, stack: err?.stack });
  if (/AbortError|timeout/i.test(msg)) {
    return new Response(JSON.stringify({ error: 'upstream_timeout' }), { status: 503, headers: H });
  }
  return new Response(JSON.stringify({ error: 'upstream_error' }), { status: 503, headers: H });
}`
) && (changed++);

// 1b) Qualquer "status: 500" que ainda reste → 503
s = s.replace(/status:\s*500/g, 'status: 503') && (changed++);

// 2) Gate de concorrência (INFLIGHT)
if (!/let INFLIGHT\s*=/.test(s)) {
  // depois da função quotaByTier(...)
  s = s.replace(
    /function quotaByTier\([\s\S]*?\}\n\}/m,
    (m) => m + `\n\n// Gate de concorrência\nlet INFLIGHT = 0;\nconst MAX_INFLIGHT = Number(process.env.AGI_MAX_INFLIGHT || 20);\n`
  );
  changed++;
}

// 2b) Envolver o fetch upstream com gate + finally
s = s.replace(
  /const upstream = await fetch\(`?\$\{?BASE\}?\/chat\/completions`?,?\s*\{[\s\S]*?\}\);/m,
  (match) => {
    const opts = match.match(/\{[\s\S]*\}/)[0];
    return `if (INFLIGHT >= MAX_INFLIGHT) {
  H.set('Retry-After','1');
  return new Response(JSON.stringify({ error: 'concurrency_limit', max: MAX_INFLIGHT }), { status: 429, headers: H });
}
INFLIGHT++;
let upstream;
try {
  upstream = await fetch(\`\${BASE}/chat/completions\`, ${opts});
} finally {
  INFLIGHT = Math.max(0, INFLIGHT-1);
}`;
  }
) && (changed++);

// 3) Mapeamento de upstream: 429 → 429, resto → 503
s = s.replace(
  /if \(!upstream\.ok\)[\s\S]*?const data = await upstream\.json\(\);/m,
  `if (!upstream.ok) {
  const ra = upstream.headers.get('retry-after') || '30';
  if (upstream.status === 429) {
    H.set('Retry-After', ra);
    return new Response(JSON.stringify({ error: 'upstream_rate_limited' }), { status: 429, headers: H });
  }
  return new Response(JSON.stringify({ error: 'upstream_unavailable', status: upstream.status }), { status: 503, headers: H });
}
const data = await upstream.json();`
) && (changed++);

fs.writeFileSync(f, s);
console.log('patches_applied:', changed);
