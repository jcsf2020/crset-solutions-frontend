"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";

function hasFlagCookie() {
  if (typeof document === "undefined") return false;
  return document.cookie.split(";").some(c => c.trim().startsWith("crset-chat=on"));
}

type Msg = { role: "user" | "assistant"; text: string };

export default function ChatWidget() {
  // só monta se o cookie de flag existir
  const [enabled, setEnabled] = useState(false);
  useEffect(() => setEnabled(hasFlagCookie()), []);

  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const boxRef = useRef<HTMLDivElement>(null);

  const apiUrl = useMemo(() => "/api/agi/chat", []);

  async function send() {
    const text = input.trim();
    if (!text || busy) return;
    setBusy(true);
    setMsgs(m => [...m, { role: "user", text }]);
    setInput("");

    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json().catch(() => ({} as any));
      const reply = data?.reply ?? (res.ok ? "OK." : `Erro ${res.status}`);
      setMsgs(m => [...m, { role: "assistant", text: reply }]);
    } catch {
      setMsgs(m => [...m, { role: "assistant", text: "Falha de rede/CORS." }]);
    } finally {
      setBusy(false);
      requestAnimationFrame(() => {
        boxRef.current?.scrollTo({ top: boxRef.current.scrollHeight, behavior: "smooth" });
      });
    }
  }

  function onKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  if (!enabled) return null;

  return (
    <>
      <style>{`
        .crset-chat-fab{position:fixed;right:18px;bottom:18px;z-index:9999;background:#111;color:#fff;border:none;border-radius:999px;padding:12px 16px;box-shadow:0 8px 24px rgba(0,0,0,.2);cursor:pointer;font:600 14px/1 system-ui,Segoe UI,Arial}
        .crset-chat-fab:hover{transform:translateY(-1px)}
        .crset-chat-panel{position:fixed;right:18px;bottom:78px;width:320px;max-width:90vw;height:420px;display:flex;flex-direction:column;border-radius:14px;box-shadow:0 12px 32px rgba(0,0,0,.22);overflow:hidden;background:#fff;color:#111;z-index:9999}
        .crset-chat-header{padding:10px 12px;background:#0f172a;color:#fff;display:flex;justify-content:space-between;align-items:center;font:600 14px/1 system-ui}
        .crset-chat-body{flex:1;overflow:auto;padding:12px;background:#f8fafc}
        .crset-chat-msg{max-width:80%;margin:6px 0;padding:8px 10px;border-radius:10px;font:14px/1.3 system-ui;white-space:pre-wrap;word-break:break-word}
        .crset-chat-user{margin-left:auto;background:#0ea5e9;color:#fff;border-bottom-right-radius:2px}
        .crset-chat-assistant{margin-right:auto;background:#e5e7eb;border-bottom-left-radius:2px}
        .crset-chat-input{display:flex;gap:8px;padding:10px;background:#fff;border-top:1px solid #e5e7eb}
        .crset-chat-input textarea{flex:1;resize:none;min-height:44px;max-height:120px;padding:8px 10px;border:1px solid #d1d5db;border-radius:10px;outline:none;font:14px system-ui}
        .crset-chat-input button{min-width:92px;border:0;border-radius:10px;padding:10px 12px;font:600 14px system-ui;background:#111;color:#fff;cursor:pointer}
        .crset-chat-input button[disabled]{opacity:.6;cursor:not-allowed}
      `}</style>

      <button className="crset-chat-fab" onClick={() => setOpen(v => !v)} aria-expanded={open}>
        {open ? "Fechar chat" : "Abrir chat"}
      </button>

      {open && (
        <div className="crset-chat-panel" role="dialog" aria-label="Chat">
          <div className="crset-chat-header">
            <span>Assistente CRSET (privado)</span>
            <button onClick={() => setOpen(false)} style={{ background:"transparent", color:"#fff", border:0, cursor:"pointer" }}>✕</button>
          </div>
          <div className="crset-chat-body" ref={boxRef}>
            {msgs.map((m, i) => (
              <div key={i} className={`crset-chat-msg ${m.role === "user" ? "crset-chat-user" : "crset-chat-assistant"}`}>
                {m.text}
              </div>
            ))}
          </div>
          <div className="crset-chat-input">
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={onKey}
              placeholder="Escreve e carrega Enter…"
            />
            <button onClick={send} disabled={busy || !input.trim()}>{busy ? "…" : "Enviar"}</button>
          </div>
        </div>
      )}
    </>
  );
}
