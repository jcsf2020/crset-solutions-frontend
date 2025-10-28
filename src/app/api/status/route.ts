import { NextRequest, NextResponse } from "next/server";
import { rateLimit, getClientKey } from "@/lib/rateLimit";

export async function GET() {
  return NextResponse.json({ ok: true, ts: new Date().toISOString() });
}

/**
 * POST /api/status - AI Chat functionality
 * Using existing working endpoint to bypass Vercel routing issues
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, language = 'pt', action } = body;

    // If action is 'chat', handle chat request
    if (action === 'chat') {
      // Rate limiting for chat requests (20 per minute)
      const clientKey = getClientKey(req, 'chat-default');
      const rateLimitResult = await rateLimit(clientKey, { limit: 20, window: 60 });
      
      if (!rateLimitResult.success) {
        console.warn(`Rate limit exceeded for client: ${clientKey}`);
        return NextResponse.json(
          { ok: false, error: 'rate_limit_exceeded' },
          {
            status: 429,
            headers: {
              'X-RateLimit-Limit': rateLimitResult.limit.toString(),
              'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
              'X-RateLimit-Reset': new Date(rateLimitResult.reset).toISOString(),
              'Retry-After': Math.ceil((rateLimitResult.reset - Date.now()) / 1000).toString(),
            },
          }
        );
      }

      if (!message || typeof message !== 'string') {
        console.warn('Invalid message received');
        return NextResponse.json(
          { ok: false, error: 'invalid_message' },
          { status: 400 }
        );
      }
      
      console.log(`[Chat Request] Language: ${language}, Message length: ${message.length}`);

      // Query RAG for context
      let context = '';
      let sources: any[] = [];

      try {
        const ragResponse = await fetch(`${req.nextUrl.origin}/api/rag/query`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message, language }),
        });

        if (ragResponse.ok) {
          const ragData = await ragResponse.json();
          if (ragData.ok && ragData.documents && ragData.documents.length > 0) {
            context = ragData.documents
              .slice(0, 3)
              .map((doc: any) => doc.content)
              .join('\n\n');

            sources = ragData.documents.slice(0, 3).map((doc: any) => ({
              title: doc.metadata?.title || 'Document',
              url: doc.metadata?.url || '#',
              similarity: doc.similarity,
            }));
          }
        }
      } catch (error) {
        console.error('RAG query failed:', error);
      }

      // Call LLM with Groq API
      const apiKey = process.env.OPENAI_API_KEY;
      const baseUrlRaw = process.env.OPENAI_BASE_URL || 'https://api.groq.com/openai/v1';
      const model = process.env.AGI_OPENAI_MODEL || process.env.AGI_MODEL || 'llama-3.3-70b-versatile';

      if (!apiKey) {
        console.error('[LLM Error] API key not configured');
        return NextResponse.json(
          { ok: false, error: 'llm_not_configured', details: 'OPENAI_API_KEY is missing' },
          { status: 500 }
        );
      }

      // Clean up base URL (remove quotes and trailing slashes)
      const baseUrl = baseUrlRaw.replace(/^["']|["']$/g, '').replace(/\/+$/, '');
      
      console.log(`[LLM Request] Model: ${model}, Base URL: ${baseUrl}, Has context: ${!!context}`);

      const systemPrompt = language === 'pt'
        ? `Voce e um assistente virtual da CRSET Solutions, especializada em automacao inteligente, ciberseguranca e desenvolvimento de software. Seja prestativo, profissional e conciso.${context ? `\n\nContexto relevante:\n${context}` : ''}`
        : `You are a virtual assistant for CRSET Solutions, specialized in intelligent automation, cybersecurity, and software development. Be helpful, professional, and concise.${context ? `\n\nRelevant context:\n${context}` : ''}`;

      try {
        const llmResponse = await fetch(`${baseUrl}/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model,
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: message }
            ],
            temperature: 0.7,
            max_tokens: 500,
          }),
        });

        if (!llmResponse.ok) {
          const errorText = await llmResponse.text();
          console.error(`[LLM Error] Status: ${llmResponse.status}, Response: ${errorText}`);
          return NextResponse.json(
            { 
              ok: false, 
              error: 'llm_request_failed', 
              status: llmResponse.status, 
              details: errorText.substring(0, 300),
              baseUrl,
              model 
            },
            { status: 500 }
          );
        }

        const llmData = await llmResponse.json();
        const reply = llmData.choices?.[0]?.message?.content || 'Desculpe, nao consegui processar a sua mensagem.';
        
        console.log(`[LLM Success] Response length: ${reply.length}, Sources: ${sources.length}`);

        return NextResponse.json({
          ok: true,
          message: reply.trim(),
          sources: sources.length > 0 ? sources : undefined,
          timestamp: Date.now(),
        });
      } catch (llmError: any) {
        console.error('[LLM Error] Exception during request:', llmError);
        return NextResponse.json(
          { 
            ok: false, 
            error: 'llm_exception', 
            details: llmError.message,
            baseUrl,
            model
          },
          { status: 500 }
        );
      }
    }

    // Default response for non-chat POST requests
    return NextResponse.json({ ok: true, ts: new Date().toISOString() });

  } catch (error: any) {
    console.error('[Status Endpoint Error]:', error);
    return NextResponse.json(
      { 
        ok: false, 
        error: 'internal_server_error', 
        details: error.message, 
        stack: error.stack?.substring(0, 500) 
      },
      { status: 500 }
    );
  }
}

