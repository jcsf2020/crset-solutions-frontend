'use client';
import { useState } from 'react';

export default function AgiTest() {
  const [syncOut, setSyncOut] = useState<string>('');
  const [syncHdrs, setSyncHdrs] = useState<Record<string,string>>({});
  const [streamOut, setStreamOut] = useState<string>('');
  const [streamHdrs, setStreamHdrs] = useState<Record<string,string>>({});

  async function callSync() {
    setSyncOut('...');
    const res = await fetch('/api/agi/chat', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': 'Bearer ' + (process.env.NEXT_PUBLIC_AGI_TEST_KEY || '')
      },
      body: JSON.stringify({ agent:'boris', input:'Responde apenas com: OK', sessionId:'web' })
    });
    const txt = await res.text();
    const hdrs: Record<string,string> = {};
    res.headers.forEach((v,k)=> hdrs[k] = v);
    setSyncOut(txt);
    setSyncHdrs(hdrs);
  }

  async function callStream() {
    setStreamOut('');
    const res = await fetch('/api/agi/stream', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': 'Bearer ' + (process.env.NEXT_PUBLIC_AGI_TEST_KEY || '')
      },
      body: JSON.stringify({ agent:'boris', input:'Responde apenas com: OK', sessionId:'web' })
    });
    const hdrs: Record<string,string> = {};
    res.headers.forEach((v,k)=> hdrs[k] = v);
    setStreamHdrs(hdrs);

    const reader = res.body!.getReader();
    const decoder = new TextDecoder();
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      setStreamOut(prev => prev + decoder.decode(value));
    }
  }

  return (
    <main style={{maxWidth: 900, margin:'40px auto', padding: 16, fontFamily:'Inter, system-ui, sans-serif'}}>
      <h1>AGI Test</h1>
      <p>Botões de teste para /api/agi/chat e /api/agi/stream</p>

      <section style={{marginTop:24, padding:12, border:'1px solid #ddd', borderRadius:8}}>
        <h2>Sync /chat</h2>
        <button onClick={callSync}>Chamar</button>
        <pre style={{whiteSpace:'pre-wrap', background:'#fafafa', padding:12, borderRadius:6, marginTop:8}}>{syncOut}</pre>
        <details style={{marginTop:8}}>
          <summary>Headers</summary>
          <pre>{JSON.stringify(syncHdrs, null, 2)}</pre>
        </details>
      </section>

      <section style={{marginTop:24, padding:12, border:'1px solid #ddd', borderRadius:8}}>
        <h2>Stream /stream</h2>
        <button onClick={callStream}>Chamar</button>
        <pre style={{whiteSpace:'pre-wrap', background:'#fafafa', padding:12, borderRadius:6, marginTop:8}}>{streamOut}</pre>
        <details style={{marginTop:8}}>
          <summary>Headers</summary>
          <pre>{JSON.stringify(streamHdrs, null, 2)}</pre>
        </details>
      </section>
    </main>
  );
}
