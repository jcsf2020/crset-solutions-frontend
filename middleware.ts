import { NextResponse, type NextRequest } from "next/server";

// protege apenas os endpoints do AGI
export const config = { matcher: ["/api/agi/:path*", "/((?!_next/static|_next/image|favicon.ico).*)"] };

function b64urlToB64(u: string) {
  const pad = (4 - (u.length % 4)) % 4;
  return u.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat(pad);
}
function bytesToB64url(bytes: Uint8Array) {
  const bin = String.fromCharCode(...bytes);
  const b64 = btoa(bin);
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

async function verifyHmac(payloadB64: string, sigB64: string, secret: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const mac = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payloadB64));
  const expected = bytesToB64url(new Uint8Array(mac));
  return expected === sigB64;
}

function addSecurityHeaders(response: NextResponse, pathname: string) {
  // Headers de segurança base para todas as rotas
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  
  // Headers específicos para APIs
  if (pathname.startsWith('/api/')) {
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
  }
  
  // Headers específicos para AGI
  if (pathname.startsWith('/api/agi/')) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet');
  }
  
  return response;
}

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  
  // Para rotas não-AGI, apenas adicionar headers de segurança
  if (!pathname.startsWith('/api/agi/')) {
    const response = NextResponse.next();
    return addSecurityHeaders(response, pathname);
  }
  
  // Lógica original para AGI endpoints
  const secret = process.env.CHAT_FLAG_SECRET;
  if (!secret) {
    const response = new NextResponse(JSON.stringify({ ok: false, error: "forbidden" }), {
      status: 403,
      headers: { "content-type": "application/json" },
    });
    return addSecurityHeaders(response, pathname);
  }

  // allowlist por IP (opcional)
  const allow = (process.env.CHAT_ALLOWLIST_IPS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const ip =
    (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() ||
    (req as any).ip ||
    req.headers.get("x-real-ip") ||
    "";

  if (ip && allow.includes(ip)) {
    const response = NextResponse.next();
    return addSecurityHeaders(response, pathname);
  }

  // cookie assinado
  const tok = req.cookies.get("crset-chat")?.value || "";
  const [payloadB64, sigB64] = tok.split(".");
  if (!payloadB64 || !sigB64) {
    const response = new NextResponse(JSON.stringify({ ok: false, error: "unauthorized" }), {
      status: 401,
      headers: { "content-type": "application/json" },
    });
    return addSecurityHeaders(response, pathname);
  }

  // verifica assinatura
  const ok = await verifyHmac(payloadB64, sigB64, secret);
  if (!ok) {
    const response = new NextResponse(JSON.stringify({ ok: false, error: "bad_sig" }), {
      status: 401,
      headers: { "content-type": "application/json" },
    });
    return addSecurityHeaders(response, pathname);
  }

  // valida exp e versão
  try {
    const json = atob(b64urlToB64(payloadB64));
    const p = JSON.parse(json);
    const now = Math.floor(Date.now() / 1000);
    if (p?.v !== 1) throw new Error("version");
    if (p?.exp && now > p.exp) throw new Error("expired");
  } catch {
    const response = new NextResponse(JSON.stringify({ ok: false, error: "invalid_token" }), {
      status: 401,
      headers: { "content-type": "application/json" },
    });
    return addSecurityHeaders(response, pathname);
  }

  const response = NextResponse.next();
  return addSecurityHeaders(response, pathname);
}
