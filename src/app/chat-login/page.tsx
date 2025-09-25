// app/chat-login/page.tsx
"use client";
import { useState } from "react";

export default function ChatLoginPage() {
  const [pwd, setPwd] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [ok, setOk] = useState<boolean | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setOk(null);
    try {
      const r = await fetch("/api/flags/chat/login", {
        method: "POST",
        credentials: "include",     // 🔑 garante set-cookie HttpOnly
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pwd }),
      });
      const j = await r.json().catch(() => ({}));
      if (r.ok && (j?.ok ?? false)) {
        setOk(true);
        setTimeout(() => location.assign("/?v=" + Date.now()), 600);
      } else {
        setOk(false);
        setMsg(j?.error || j?.reason || "login_failed");
      }
    } catch {
      setOk(false);
      setMsg("network_error");
    }
  }

  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="text-xl font-semibold mb-4">Private chat login</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input
          type="password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          placeholder="Password"
          className="w-full rounded-md border px-3 py-2 bg-transparent"
          required
        />
        <button type="submit" className="w-full rounded-md border px-3 py-2">
          Enter
        </button>
      </form>
      {msg && (
        <p className={"mt-3 text-sm " + (ok ? "text-green-600" : "text-red-600")}>
          {msg}
        </p>
      )}
      <p className="mt-6 text-xs text-muted-foreground">
        This sets an HttpOnly cookie for the chat flag.
      </p>
    </main>
  );
}
