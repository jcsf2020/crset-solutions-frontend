"use client";
import { useEffect, useRef, useState } from "react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const boxRef = useRef<HTMLDivElement | null>(null);

  // Checa no servidor se o utilizador está autorizado (via cookie HttpOnly)
  useEffect(() => {
    fetch("/api/flags/chat", { credentials: "include", cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => setEnabled(!!d?.allowed))
      .catch(() => setEnabled(false));
  }, []);

  if (!enabled) return null;

  return (
    <>
      <style jsx global>{`
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
        Assistente CRSET
      </button>

      {open && (
        <div className="crset-chat-panel" role="dialog" aria-label="Chat">
          <div className="crset-chat-header">
            <span>Assistente CRSET (privado)</span>
            <button onClick={() => setOpen(false)} aria-label="Fechar">✕</button>
          </div>
          <div className="crset-chat-body" ref={boxRef}>
            <div className="crset-chat-msg crset-chat-assistant">
              Olá! Escreve a tua pergunta.
            </div>
          </div>
          <div className="crset-chat-input">
            <textarea placeholder="Escreve…" />
            <button disabled>Enviar</button>
          </div>
        </div>
      )}
    </>
  );
}
