import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '@/lib/rateLimit';

/**
 * POST /api/chat
 * Intelligent chat endpoint with RAG integration
 * Uses OpenAI/Groq directly for LLM responses
 * 
 * Rate limit: 20 requests per minute per IP
 */
export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const rateLimitResult = await rateLimit(ip, { limit: 20, window: 60 });
    
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { ok: false, error: 'rate_limit_exceeded' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': rateLimitResult.reset.toString(),
          },
        }
      );
    }

    const body = await req.json();
    const { message, language = 'pt', sessionId = 'web-chat' } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { ok: false, error: 'invalid_message' },
        { status: 400 }
      );
    }

    // Step 1: Query RAG for relevant context
    let context = '';
    let sources: any[] = [];

    try {
      const ragResponse = await fetch(`${req.nextUrl.origin}/api/rag/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, language }),
      });

      const ragData = await ragResponse.json();

      if (ragData.ok && ragData.documents && ragData.documents.length > 0) {
        // Extract context from top 3 documents
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
    } catch (error) {
      console.error('RAG query failed:', error);
      // Continue without RAG context
    }

    // Step 2: Generate response using OpenAI/Groq directly
    const apiKey = process.env.OPENAI_API_KEY;
    const baseUrl = (process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1').replace(/^["']|["']$/g, '').replace(/\/+$/, '');
    const model = process.env.AGI_OPENAI_MODEL || process.env.AGI_MODEL || 'gpt-4o-mini';

    if (!apiKey) {
      console.error('OPENAI_API_KEY not configured');
      return NextResponse.json(
        { ok: false, error: 'llm_not_configured' },
        { status: 500 }
      );
    }

    const systemPrompt = language === 'pt'
      ? `Voce e um assistente virtual da CRSET Solutions, uma empresa especializada em automacao inteligente, ciberseguranca e desenvolvimento de software. Seja prestativo, profissional e conciso.${context ? `\n\nContexto relevante:\n${context}` : ''}`
      : `You are a virtual assistant for CRSET Solutions, a company specialized in intelligent automation, cybersecurity, and software development. Be helpful, professional, and concise.${context ? `\n\nRelevant context:\n${context}` : ''}`;

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
        console.error('LLM request failed:', llmResponse.status, errorText);
        return NextResponse.json(
          { ok: false, error: 'llm_request_failed', details: errorText.slice(0, 200) },
          { status: 500 }
        );
      }

      const llmData = await llmResponse.json();
      const responseMessage = llmData.choices?.[0]?.message?.content || 'Desculpe, nao consegui processar a sua mensagem.';

      return NextResponse.json({
        ok: true,
        message: responseMessage.trim(),
        sources: sources.length > 0 ? sources : undefined,
        timestamp: Date.now(),
      });
    } catch (error: any) {
      console.error('LLM chat failed:', error);
      return NextResponse.json(
        { ok: false, error: 'llm_request_failed', message: error.message },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Chat endpoint error:', error);
    return NextResponse.json(
      { ok: false, error: 'internal_server_error', message: error.message },
      { status: 500 }
    );
  }
}

