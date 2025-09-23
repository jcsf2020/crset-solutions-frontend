const PROD = 'https://crsetsolutions.com';
const LOCAL = 'http://localhost:3000';
const PASSWORD = process.env.CHAT_PASSWORD || '';

async function req(method, url, { headers = {}, body, cookie } = {}) {
  const h = { ...(headers || {}) };
  if (cookie) h['cookie'] = cookie;
  const res = await fetch(url, { method, headers: h, body });
  const text = await res.text();
  return { status: res.status, headers: res.headers, text };
}

async function login(base, password) {
  if (!password) return null;
  const { status, headers, text } = await req('POST', `${base}/api/flags/chat/login`, {
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ password }),
  });
  if (status !== 200) {
    console.log('[PROD] login FAIL =>', status, text);
    return null;
  }
  const sc = headers.get('set-cookie') || '';
  const m = sc.match(/crset-chat=[^;]+/);
  return m ? m[0] : null;
}

(async () => {
  let fails = 0;

  // PROD chat POST (sem cookie; se 401, tenta login)
  try {
    let cookie = null;
    let r = await req('POST', `${PROD}/api/agi/chat`, {
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ message: 'smoke ping' }),
    });
    console.log('[PROD] agi/chat POST =>', r.status);
    if (r.status === 401 && PASSWORD) {
      cookie = await login(PROD, PASSWORD);
      if (cookie) {
        r = await req('POST', `${PROD}/api/agi/chat`, {
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ message: 'smoke ping (auth)' }),
          cookie,
        });
        console.log('[PROD] agi/chat POST (auth) =>', r.status);
      }
    }
    if (![200].includes(r.status)) { fails++; console.log(r.text); }
  } catch (e) { fails++; console.log('[PROD] agi/chat ERROR:', String(e)); }

  // CORS preflight
  try {
    const r = await req('OPTIONS', `${PROD}/api/agi/chat`);
    console.log('[PROD] CORS preflight OPTIONS =>', r.status);
    if (r.status !== 204) fails++;
  } catch (e) { fails++; console.log('[PROD] OPTIONS ERROR:', String(e)); }

  // CORS evil origin (deve dar 401/403)
  try {
    const r = await req('POST', `${PROD}/api/agi/chat`, {
      headers: { 'content-type': 'application/json', 'origin': 'https://evil.example' },
      body: JSON.stringify({ message: 'evil origin' }),
    });
    console.log('[PROD] CORS evil origin POST =>', r.status);
    if (![401, 403].includes(r.status)) { fails++; console.log(r.text); }
  } catch (e) { fails++; console.log('[PROD] evil origin ERROR:', String(e)); }

  // PROD contact
  try {
    const r = await req('POST', `${PROD}/api/contact`, {
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name: 'Smoke', email: 'smoke@example.com', message: 'smoke contact' }),
    });
    console.log('[PROD] contact POST =>', r.status);
    if (r.status !== 200) { fails++; console.log(r.text); }
  } catch (e) { fails++; console.log('[PROD] contact ERROR:', String(e)); }

  // LOCAL (best effort)
  try {
    const r = await req('POST', `${LOCAL}/api/agi/chat`, {
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ message: 'local ping' }),
    });
    console.log('[LOCAL] agi/chat POST =>', r.status);
  } catch (e) {
    console.log('[LOCAL] (sem servidor local?):', String(e));
  }

  if (fails) { console.log(`SMOKE FAILED (${fails})`); process.exit(1); }
  console.log('SMOKE OK');
})();
