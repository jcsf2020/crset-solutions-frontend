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
    const { id, source, text } = body;

    // Validação
    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: "text is required and must be a string" },
        { status: 400, headers: JSON_UTF8 }
      );
    }

    if (!id) {
      return NextResponse.json(
        { error: "id is required" },
        { status: 400, headers: JSON_UTF8 }
      );
    }

    // Gerar embedding
    const vector = await embed(text);

    // Salvar no Supabase
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
      auth: { persistSession: false }
    });

    const { data, error } = await supabase
      .from('docs')
      .upsert({
        id: String(id),
        content: text,
        source: source || 'unknown',
        embedding: vector,
      });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: "Failed to store document" },
        { status: 500, headers: JSON_UTF8 }
      );
    }

    return NextResponse.json(
      { 
        ok: true, 
        id: String(id),
        content_length: text.length,
        embedding_dimensions: vector.length
      },
      { headers: JSON_UTF8 }
    );

  } catch (error: any) {
    console.error('Ingest error:', error);
    
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