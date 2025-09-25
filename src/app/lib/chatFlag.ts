import crypto from "crypto";

export const ChatFlag = {
  COOKIE_NAME: "crset-chat",

  verifyToken(token: string | undefined | null): { ok: true; payload?: any } | { ok: false; reason: string } {
    try {
      const secret = process.env.CHAT_FLAG_SECRET || "";
      if (!secret) return { ok: false, reason: "secret_missing" };
      const t = String(token || "");
      const parts = t.split(".");
      if (parts.length !== 3) return { ok: false, reason: "malformed" };

      const [h, p, s] = parts;
      const data = `${h}.${p}`;

      const expected = base64url(
        crypto.createHmac("sha256", secret).update(data).digest()
      );
      if (!timingSafeEqualStr(s, expected)) return { ok: false, reason: "bad_signature" };

      const header = JSON.parse(b64uDecode(h).toString("utf8"));
      if (header?.alg && header.alg !== "HS256") return { ok: false, reason: "alg_unsupported" };

      const payload = JSON.parse(b64uDecode(p).toString("utf8"));
      const now = Math.floor(Date.now() / 1000);
      if (typeof payload?.exp === "number" && now > payload.exp) {
        return { ok: false, reason: "expired" };
      }

      return { ok: true, payload };
    } catch {
      return { ok: false, reason: "error" };
    }
  },
};

function base64url(buf: Buffer) {
  return buf.toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}
function b64uDecode(s: string) {
  s = s.replace(/-/g, "+").replace(/_/g, "/");
  const pad = 4 - (s.length % 4);
  if (pad !== 4) s += "=".repeat(pad);
  return Buffer.from(s, "base64");
}
function timingSafeEqualStr(a: string, b: string) {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}
