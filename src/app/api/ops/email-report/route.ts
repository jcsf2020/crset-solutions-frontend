import { NextRequest, NextResponse } from "next/server";

const JSON_UTF8 = { "content-type": "application/json; charset=utf-8" } as const;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { subject, to, summary, links } = body;

    // Validação básica
    if (!subject || !to || !summary) {
      return NextResponse.json(
        { error: "subject, to, and summary are required" },
        { status: 400, headers: JSON_UTF8 }
      );
    }

    // Log do relatório (em produção, aqui enviaria um email real)
    console.log('Email Report:', {
      subject,
      to,
      summary,
      links: links || [],
      timestamp: new Date().toISOString(),
    });

    // Simular sucesso do envio de email
    // Em produção, aqui integraria com serviços como SendGrid, AWS SES, etc.
    
    return NextResponse.json(
      { ok: true },
      { headers: JSON_UTF8 }
    );

  } catch (error: any) {
    console.error('Email report error:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers: JSON_UTF8 }
    );
  }
}

export function GET() {
  return NextResponse.json({ error: "method_not_allowed" }, { status: 405, headers: JSON_UTF8 });
}