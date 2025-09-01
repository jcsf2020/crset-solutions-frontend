import React from 'react';

export default function AgiDocs() {
  return React.createElement(
    'main',
    { className: 'min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6 text-white' },
    React.createElement(
      'div',
      { className: 'max-w-3xl mx-auto bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20' },
      React.createElement('h1', { className: 'text-3xl font-bold mb-2' }, 'AGI Commander - API'),
      React.createElement('p', { className: 'text-blue-200 mb-6' },
        'Endpoint publico com streaming. Por omissao usa mock. ',
        'Para usar OpenAI: definir AGI_BACKEND=openai e OPENAI_API_KEY. ',
        'Para proteger: definir AGI_API_KEY e enviar Authorization: Bearer.'
      ),
      React.createElement('h2', { className: 'text-2xl font-semibold mt-4 mb-2' }, 'Health-check'),
      React.createElement('pre', { className: 'whitespace-pre-wrap bg-black/30 p-3 rounded border border-white/10' }, text-white
        'curl -s https://crsetsolutions.com/api/agi/status'
      ),
      React.createElement('h2', { className: 'text-2xl font-semibold mt-4 mb-2' }, 'POST /api/agi/chat'),
      React.createElement('p', { className: 'text-blue-200 mb-2' }, 'Headers de resposta:'),
      React.createElement('ul', { className: 'list-disc ml-6 text-blue-100' },
        React.createElement('li', null, 'X-Agi-Backend: mock | openai'),
        React.createElement('li', null, 'X-Agi-Mock: 1 quando mock'),
        React.createElement('li', null, 'X-Agi-Error: erro do upstream (quando existir)')
      ),
      React.createElement('h3', { className: 'text-xl font-semibold mt-4 mb-2' }, 'Exemplo cURL'),
      React.createElement('pre', { className: 'whitespace-pre-wrap bg-black/30 p-3 rounded border border-white/10' }, text-white
        "curl -i -X POST https://crsetsolutions.com/api/agi/chat \\\n  -H 'content-type: application/json' \\\n  -d '{\"agent\":\"boris\",\"input\":\"diagnostico rapido\",\"sessionId\":\"t1\"}'"
      ),
      React.createElement('p', { className: 'text-blue-300 mt-6' },
        'Demonstracao: ',
        React.createElement('a', { className: 'underline', href: '/demo' }, '/demo')
      )
    )
  );
}
