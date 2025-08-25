export default function AgiDocs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6 text-white">
      <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
        <h1 className="text-3xl font-bold mb-2">AGI Commander — API</h1>
        <p className="text-blue-200 mb-6">
          Endpoint público com streaming. Por omissão usa mock.
          Para usar OpenAI: definir AGI_BACKEND=openai e OPENAI_API_KEY.
          Para proteger: definir AGI_API_KEY e enviar Authorization: Bearer.
        </p>

        <h2 className="text-2xl font-semibold mt-4 mb-2">Health-check</h2>
        <pre className="whitespace-pre-wrap bg-black/30 p-3 rounded border border-white/10">
curl -s https://crsetsolutions.com/api/agi/status
        </pre>

        <h2 className="text-2xl font-semibold mt-4 mb-2">POST /api/agi/chat</h2>
        <p className="text-blue-200 mb-2">Headers de resposta:</p>
        <ul className="list-disc ml-6 text-blue-100">
          <li>X-Agi-Backend: mock | openai</li>
          <li>X-Agi-Mock: 1 quando mock</li>
          <li>X-Agi-Error: erro do upstream (quando existir)</li>
        </ul>

        <h3 className="text-xl font-semibold mt-4 mb-2">Exemplo cURL</h3>
        <pre className="whitespace-pre-wrap bg-black/30 p-3 rounded border border-white/10">
curl -i -X POST https://crsetsolutions.com/api/agi/chat \
  -H 'content-type: application/json' \
  -d '{"agent":"boris","input":"diagnostico rapido","sessionId":"t1"}'
        </pre>

        <p className="text-blue-300 mt-6">Demonstração: <a className="underline" href="/demo">/demo</a></p>
      </div>
    </div>
  );
}
