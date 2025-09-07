const PROD = process.env.PROD_URL || 'https://crsetsolutions.com';
const LOCAL = process.env.LOCAL_URL || 'http://localhost:3000';
const TIMEOUT_MS = Number(process.env.SMOKE_TIMEOUT_MS || 8000);

function timeout(ms){ return new Promise((_,rej)=>setTimeout(()=>rej(new Error('timeout')),ms)); }
async function req(method, url, {headers={}, body}={}) {
  const controller = new AbortController();
  const p = fetch(url, { method, headers, body, signal: controller.signal });
  const t = timeout(TIMEOUT_MS).catch(e=>{ controller.abort(); throw e; });
  const r = await Promise.race([p,t]);
  const txt = await r.text().catch(()=> '');
  return { status: r.status, text: txt, headers: r.headers };
}

async function main(){
  let fails = 0;

  // PROD: POST /api/agi/chat -> 200
  try {
    const r = await req('POST', `${PROD}/api/agi/chat`, {
      headers: { 'content-type':'application/json' },
      body: JSON.stringify({ input:'ping' })
    });
    console.log('[PROD] agi/chat POST =>', r.status);
    if (r.status !== 200) { fails++; console.log(r.text.slice(0,300)); }
  } catch(e){ fails++; console.log('[PROD] agi/chat ERROR:', String(e)); }

  // PROD: OPTIONS preflight -> 204
  try {
    const r = await req('OPTIONS', `${PROD}/api/agi/chat`, {
      headers: {
        'origin': PROD,
        'access-control-request-method': 'POST',
        'access-control-request-headers': 'content-type, authorization',
      },
    });
    console.log('[PROD] CORS preflight OPTIONS =>', r.status);
    if (r.status !== 204) { fails++; console.log(r.text.slice(0,300)); }
  } catch(e){ fails++; console.log('[PROD] CORS preflight ERROR:', String(e)); }

  // PROD: POST origem maliciosa -> 403
  try {
    const r = await req('POST', `${PROD}/api/agi/chat`, {
      headers: { 'origin':'https://evil.example', 'content-type':'application/json' },
      body: JSON.stringify({ input:'ping' })
    });
    console.log('[PROD] CORS evil origin POST =>', r.status);
    if (r.status !== 403) { fails++; console.log(r.text.slice(0,300)); }
  } catch(e){ fails++; console.log('[PROD] CORS evil ERROR:', String(e)); }

  // LOCAL: POST /api/agi/chat -> 200 (se houver dev server)
  try {
    const r = await req('POST', `${LOCAL}/api/agi/chat`, {
      headers: { 'content-type':'application/json' },
      body: JSON.stringify({ input:'ping' })
    });
    console.log('[LOCAL] agi/chat POST =>', r.status);
    if (r.status !== 200) console.log('[LOCAL] esperado 200 se o dev server estiver ligado');
  } catch(e){ console.log('[LOCAL] (sem servidor local?):', String(e)); }

  if (fails) { console.error(`SMOKE FAILED (${fails})`); process.exit(1); }
  console.log('SMOKE OK');
}
main().catch(e=>{ console.error('FATAL', e); process.exit(1); });
