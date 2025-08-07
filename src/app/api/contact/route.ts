import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    // Validação básica
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios' },
        { status: 400 }
      );
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    // Enviar email via Resend
    const { data, error } = await resend.emails.send({
      from: 'CRSET Solutions <noreply@crsetsolutions.com>',
      to: ['crsetsolutions@gmail.com'],
      subject: `🚀 Novo Contacto - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 15px;">
          <div style="background: rgba(255, 255, 255, 0.95); padding: 30px; border-radius: 15px; backdrop-filter: blur(10px);">
            <h1 style="color: #333; text-align: center; margin-bottom: 30px;">
              🚀 Novo Contacto CRSET Solutions
            </h1>
            
            <div style="background: rgba(102, 126, 234, 0.1); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
              <h3 style="color: #667eea; margin: 0 0 10px 0;">👤 Informações do Cliente:</h3>
              <p style="margin: 5px 0;"><strong>Nome:</strong> ${name}</p>
              <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
            </div>
            
            <div style="background: rgba(118, 75, 162, 0.1); padding: 20px; border-radius: 10px;">
              <h3 style="color: #764ba2; margin: 0 0 15px 0;">💬 Mensagem:</h3>
              <p style="line-height: 1.6; color: #333; white-space: pre-wrap;">${message}</p>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid #eee;">
              <p style="color: #666; font-size: 14px;">
                📱 Responder via WhatsApp: +351 914 423 688<br>
                📧 Email: crsetsolutions@gmail.com<br>
                🌍 Portugal
              </p>
            </div>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Erro ao enviar email:', error);
      return NextResponse.json(
        { error: 'Erro interno do servidor' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Mensagem enviada com sucesso! Entraremos em contacto em breve.',
        id: data?.id 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Erro na API de contacto:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'API de contacto CRSET Solutions ativa' },
    { status: 200 }
  );
}

