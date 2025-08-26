gamos o backend real com calma.\n';

  if (prefer === 'openai' && key) {
    try { text = await ask(base, key, model, agent, input); used = 'openai'; }
    catch (e: any) { err = String(e/.message || e); used = 'mock'; }
  }

  return new Response(text, {
    headers: {
      ...corsHeaders(origin),
      'content-type': 'text/plain; charset=utf-8',
      'x-agi-backend': used,
      'x-agi-upstream-base': clean(base),
      'x-agi-upstream-model': model,
      ...(used === 'mock' ? { 'x-agi-mock': '1' } : {}),
      ...(err ? { 'x-agi-error': err } : {})
    }
  });
}
