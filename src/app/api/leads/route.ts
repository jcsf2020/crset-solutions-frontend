/* CRSET leads endpoint (node runtime) */
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Lead = { name?: string; email?: string; phone?: string; company?: string; message?: string; source?: string; whatsapp_number?: string; utm_source?: string };

const CLEAN = (s:string)=> (s||'').trim();

function corsHeaders(origin?: string) {
  const allowlist = (process.env.CORS_ORIGINS || process.env.AGI_ALLOWED_ORIGINS || 'self,https://crsetsolutions.com,https://www.crsetsolutions.com').split(',').map(s=>s.trim()).filter(Boolean);
  let allow = '';
  if (origin) {
    if (allowlist.includes('*')) allow = origin;
    if (!allow && allowlist.includes('self')) {
      const self = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '';
      if (origin === self) allow = origin;
    }
    if (!allow && allowlist.some(o => origin.startsWith(o))) allow = origin;
  }
  return {
    ...(allow ? {'access-control-allow-origin': allow} : {}),
    'access-control-allow-methods': 'POST,OPTIONS',
    'access-control-allow-headers': 'content-type, authorization, x-contact-api-key',
  };
}

export function OPTIONS(req: Request) {
  return new Response(null,{status:204,headers:corsHeaders(req.headers.get('origin')||undefined)});
}

function isAllowed(req: Request) {
  const origin = req.headers.get('origin') || '';
  const keyNeed = CLEAN(process.env.CONTACT_API_KEY || '');
  const auth = req.headers.get('authorization') || '';
  const xKey = req.headers.get('x-contact-api-key') || '';
  const allowViaKey = keyNeed && (auth === `Bearer ${keyNeed}` || xKey === keyNeed);

  // permite sem header se vier do domínio permitido
  const allowedOrigins = (process.env.CORS_ORIGINS || process.env.AGI_ALLOWED_ORIGINS || 'self,https://crsetsolutions.com,https://www.crsetsolutions.com').split(',').map(s=>s.trim()).filter(Boolean);
  let allowViaOrigin = false;
  if (origin) {
    if (allowedOrigins.includes('*')) allowViaOrigin = true;
    const self = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '';
    if (!allowViaOrigin && allowedOrigins.includes('self') && origin === self) allowViaOrigin = true;
    if (!allowViaOrigin && allowedOrigins.some(o => origin.startsWith(o))) allowViaOrigin = true;
  }
  return allowViaKey || allowViaOrigin;
}

function validEmail(e:string){ return /^[^@s]+@[^@s]+.[^@s]+$/.test(e||''); }

async function insertSupabase(lead: Lead){
  const url = CLEAN(process.env.SUPABASE_URL || '');
  const key = CLEAN(process.env.SUPABASE_SERVICE_ROLE_KEY || '');
  if(!url || !key) return { ok:false, reason:'supabase_env_missing' };
  const {name,email,company,message,phone,source,whatsapp_number,utm_source} = lead;
  const payload = { name, email, company, message, phone, source, whatsapp_number, utm_source };
  const r = await fetch(`${url}/rest/v1/leads`, {
    method:'POST',
    headers:{ 'content-type':'application/json', 'apikey':key, 'authorization':'Bearer '+key, 'prefer':'return=representation' },
    body: JSON.stringify(payload)
  });
  if(!r.ok){ return { ok:false, reason:'supabase_insert_fail', status:r.status, text: await r.text() }; }
  const data = await r.json();
  return { ok:true, data };
}

async function sendResend(lead: Lead){
  const apiKey = CLEAN(process.env.RESEND_API_KEY || '');
  if(!apiKey) return { ok:false, reason:'resend_key_missing' };
  const to = CLEAN(process.env.CONTACT_TO_EMAIL || process.env.ALERT_TO || process.env.NEXT_PUBLIC_SUPPORT_EMAIL || '');
  if(!to) return { ok:false, reason:'no_to' };
  const from = CLEAN(process.env.RESEND_FROM || 'CRSET <onboarding@resend.dev>');
  const subject = 'Novo lead (site) • '+(lead.name||'(sem nome)');
  const text = `Nome: ${lead.name||''}\nEmail: ${lead.email||''}\nTelefone: ${lead.phone||''}\nEmpresa: ${lead.company||''}\nMensagem: ${lead.message||''}\nFonte: ${lead.source||''}\nUTM: ${lead.utm_source||''}\n`;
  const r = await fetch('https://api.resend.com/emails',{ method:'POST', headers:{'content-type':'application/json', authorization:'Bearer '+apiKey}, body:JSON.stringify({from,to,subject,text})});
  if(!r.ok) return { ok:false, reason:'resend_fail', status:r.status, text: await r.text() };
  const data = await r.json(); return { ok:true, data };
}

export async function POST(req: Request){
  const origin = req.headers.get('origin') || undefined;
  if(!isAllowed(req)) return new Response('unauthorized',{status:401,headers:corsHeaders(origin)});

  let body: Lead;
  try{ body = await req.json(); }catch{ return new Response('bad_json',{status:400,headers:corsHeaders(origin)}); }

  body.name = CLEAN(body.name||'');
  body.email = CLEAN(body.email||'');
  body.phone = CLEAN(body.phone||'');
  body.company = CLEAN(body.company||'');
  body.message = CLEAN(body.message||'');
  body.source = CLEAN(body.source||'site');

  if(!validEmail(body.email)) return new Response('invalid_email',{status:400,headers:corsHeaders(origin)});

  const ins = await insertSupabase(body);
  const mail = await sendResend(body);

  const res = { ok: !!ins.ok, supabase: ins.ok?true:ins, email: mail.ok?true:mail };
  return new Response(JSON.stringify(res),{status: ins.ok?200:502, headers:{...corsHeaders(origin),'content-type':'application/json'}});
}
