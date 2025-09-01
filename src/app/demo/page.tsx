'use client';
import { useState, useRef } from 'react';

export default function Demo() {
  const [agent, setAgent] = useState<'boris'|'laya'|'irina'>('boris');
  const [input, setInput] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [backend, setBackend] = useState<'mock'|'openai'|''>('');
  const [error, setError] = useState<string>('');
  const taRef = useRef<HTMLTextAreaElement>(null);

  const run = async () => {
    setError('');
    if (!input.trim()) return;
    setLoading(true); setAnswer('');
    try {
      const res = await fetch('/api/agi/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ agent, input, sessionId: 'demo-'+Date.now() })
      });

      setBackend((res.headers.get('x-agi-backend') as any) || '');

      if (!res.ok || !res.body) {
        const txt = await res.text().catch(()=>'');
        setError(`HTTP ${res.status} ${res.statusText} ${txt ? '- ' + txt : ''}`);
        setLoading(false);
        return;
        }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        setAnswer(a => a + decoder.decode(value));
      }
    } catch (e: any) {
      setError(String(e?.message || e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6 text-white">
      <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold">AGI Commander - Demo</h1>
          <span className="text-sm px-2 py-1 rounded bg-black/30 border border-white/10 text-white">
            backend: {backend || '-'}
          </span>
        </div>
        <p className="text-blue-200 mb-6">Sem chave  usa mock com streaming. Quando adicionares OPENAI_API_KEY + AGI_BACKEND=openai, muda sozinho.</p>

        <div className="flex items-center gap-3 mb-4">
          <label className="text-blue-200">Agente</label>
          <select value={agent} onChange={e => setAgent(e.target.value as any)}
                  className="bg-white/10 border border-white/20 rounded-lg p-2">
            <option value="boris">Boris (Automacao)</option>
            <option value="laya">Laya (Comunica00e700e3o)</option>
            <option value="irina">Irina (Analytics)</option>
          </select>
        </div>

        <textarea ref={taRef} value={input} onChange={e => setInput(e.target.value)}
          placeholder="Escreve o que queres que o agente faca"
          className="w-full h-28 p-3 rounded-lg bg-white/10 border border-white/20 mb-3"></textarea>

        <div className="flex gap-3">
          <button onClick={run} disabled={loading}
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50">
            {loading ? 'A executar' : 'Executar'}
          </button>
          <button onClick={() => { setInput(''); setAnswer(''); setError(''); }}
            className="border border-white/30 px-4 rounded-lg">Limpar</button>
        </div>

        {error ? (
          <div className="mt-4 p-3 rounded bg-red-500/20 border border-red-400/40">
            <div className="font-semibold mb-1">Erro</div>
            <pre className="whitespace-pre-wrap text-red-100 text-sm">{error}</pre>
          </div>
        ) : null}

        <div className="mt-6">
          <div className="text-blue-300 mb-2">Resposta</div>
          <pre className="whitespace-pre-wrap bg-black/30 p-4 rounded-lg border border-white/10 min-h-[96px] text-white">
            {answer || '-'}
          </pre>
        </div>
      </div>
    </div>
  );
}
