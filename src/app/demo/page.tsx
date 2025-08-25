'use client';
import { useState, useRef } from 'react';

export default function Demo() {
  const [agent, setAgent] = useState<'boris'|'laya'|'irina'>('boris');
  const [input, setInput] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const taRef = useRef<HTMLTextAreaElement>(null);

  const run = async () => {
    if (!input.trim()) return;
    setLoading(true); setAnswer('');
    const res = await fetch('/api/agi/chat', {
      method: 'POST',
      headers: { 'content-type': 'application/json', ...(process.env.NEXT_PUBLIC_AGI_PUBLIC === 'false' ? { authorization: 'Bearer ' + (process.env.NEXT_PUBLIC_AGI_PUBLIC || '') } : {}) },
      body: JSON.stringify({ agent, input, sessionId: 'demo-'+Date.now() })
    });
    if (!res.body) { setLoading(false); setAnswer('Erro: resposta sem corpo'); return; }
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      setAnswer((a) => a + decoder.decode(value));
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6 text-white">
      <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
        <h1 className="text-3xl font-bold mb-2">AGI Commander — Demo</h1>
        <p className="text-blue-200 mb-6">Mock ligado. Quando trocares o backend, isto já suporta streaming.</p>

        <div className="flex items-center gap-3 mb-4">
          <label className="text-blue-200">Agente</label>
          <select value={agent} onChange={e => setAgent(e.target.value as any)}
                  className="bg-white/10 border border-white/20 rounded-lg p-2">
            <option value="boris">Boris (Automação)</option>
            <option value="laya">Laya (Comunicação)</option>
            <option value="irina">Irina (Analytics)</option>
          </select>
        </div>

        <textarea ref={taRef} value={input} onChange={e => setInput(e.target.value)}
          placeholder="Escreve o que queres que o agente faça…"
          className="w-full h-28 p-3 rounded-lg bg-white/10 border border-white/20 mb-3"></textarea>

        <div className="flex gap-3">
          <button onClick={run} disabled={loading} className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50">
            {loading ? 'A executar…' : 'Executar'}
          </button>
          <button onClick={() => { setInput(''); setAnswer(''); }} className="border border-white/30 px-4 rounded-lg">Limpar</button>
        </div>

        <div className="mt-6">
          <div className="text-blue-300 mb-2">Resposta</div>
          <pre className="whitespace-pre-wrap bg-black/30 p-4 rounded-lg border border-white/10">{answer || '—'}</pre>
        </div>
      </div>
    </div>
  );
}
