import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { embed } from "../_shared/embeddings";

const JSON_UTF8 = { "content-type": "application/json; charset=utf-8" } as const;

// Configuração do Supabase
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, match_count = 3, similarity_threshold = 0.1 } = body;

    // Validação
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: "message is required" },
        { status: 400, headers: JSON_UTF8 }
      );
    }

    // Gerar embedding para a query
    const queryVector = await embed(message);

    // Buscar documentos similares no Supabase
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
      auth: { persistSession: false }
    });

    // Usar RPC function para busca por similaridade
    const { data: matches, error } = await supabase
      .rpc('match_docs', {
        query_embedding: queryVector,
        match_threshold: similarity_threshold,
        match_count: match_count,
      });

    if (error) {
      console.error('Supabase search error:', error);
      return NextResponse.json(
        { error: "Failed to search documents" },
        { status: 500, headers: JSON_UTF8 }
      );
    }

    // Formatar resposta
    const contexts = (matches || []).map((match: any) => ({
      id: match.id,
      content: match.content,
      source: match.source,
      similarity: match.similarity,
      created_at: match.created_at,
    }));

    return NextResponse.json(
      { 
        ok: true, 
        message,
        contexts,
        query_embedding_dimensions: queryVector.length,
        match_count: contexts.length,
        threshold_used: similarity_threshold
      },
      { headers: JSON_UTF8 }
    );

  } catch (error: any) {
    console.error('Query error:', error);
    
    if (error.message?.includes('Failed to generate embedding')) {
      return NextResponse.json(
        { error: "Failed to generate embedding" },
        { status: 500, headers: JSON_UTF8 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers: JSON_UTF8 }
    );
  }
}

export function GET() {
  return NextResponse.json({ error: "method_not_allowed" }, { status: 405, headers: JSON_UTF8 });
}
