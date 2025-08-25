export default function AgiDocs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6 text-white">
      <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
        <h1 className="text-3xl font-bold mb-2">AGI Commander — API</h1>
        <p className="text-blue-200 mb-6">
          Endpoint publico com streaming. Por omissao usa <b>mock</b>.
          Se definires <code className="bg-black/30 px-1 rounded">AGI_BACKEND=openai</code> e
          <code className="bg-black/30 px-1 rounded"> OPENAI_API_KEY</code>, passa a usar OpenAI.
          Se definires <code className="bg-black/30 px-1 rounded">AGI_API_KEY</code>, exige <i>Authorization: Bearer</i>.
        </p>

        <h2 className="text-2xl font-semibold mt-4 mb-2">Health-check</h2>
        <pre className="whitespace-pre-wrap bg-black/30 p-3 rounded border border-white/10">
curl -s https://crsetsolutions.com/api/agi/status
        </pre>

        <h2 className="text-2xl font-semibold mt-4 mb-2">POST /api/agi/chat</h2>
        <p className="text-blue-200 mb-2">Headers devolvidos:</p>
        <ul className="list-disc ml-6 text-blue-100">
          <li><code>X-Agi-Backend</code>: mock | openai</li>
          <li><code>X-Agi-Mock</code>: 1 quando mock</li>
          <li><code>X-Agi-Error</code>: erro do upstream (quando existir)</li>
        </ul>

        <h3 className="text-xl font-semibold mt-4 mb-2">Exemplo cURL</h3>
        <pre className="whitespace-pre-wrap bg-black/30 p-3 rounded border border-white/10">
curl -i -X POST https://crsetsolutions.com/api/agi/chat \
  -H 'content-type: application/json' \
  -d '{"agent":"boris","input":"diagnostico rapido","sessionId":"t1"}'
        </pre>

        <h3 className="text-xl font-semibold mt-4 mb-2">Exemplo Fetch (browser)</h3>
        <pre className="whitespace-pre-wrap bg-black/30 p-3 rounded border border-white/10">
{`const res = await fetch('/api/agi/chat', {
  method: 'POST',
  headers: {'content-type':'application/json'},
  body: JSON.stringify({ agent:'boris', input:'ola', sessionId:'demo' })
});
const reader = res.body.getReader();
const dec = new TextDecoder();
let text = '';
while (true) {
  const {value, done} = await reader.read();
  if (done) break;
  text += dec.decode(value);
}`}
        </pre>

        <h2 className="text-2xl font-semibold mt-6 mb-2">Alternar backends</h2>
        <pre className="whitespace-pre-wrap bg-black/30 p-3 rounded border border-white/10">
{`# MOCK (default)
vercel env add AGI_BACKEND production <<< "mock"

# OPENAI (quando tiveres chave)
vercel env add AGI_BACKEND production <<< "openai"
vercel env add OPENAI_API_KEY production
vercel env add AGI_API_KEY production   # opcional: proteger com Bearer`}
        </pre>

        <p className="text-blue-300 mt-6">Demonstração interativa: <a className="underline" href="/demo">/demo</a></p>
      </div>
    </div>
  );
}
