import { NextRequest, NextResponse } from 'next/server';
import emailjs from '@emailjs/nodejs';

// Configuração EmailJS
const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID || 'service_crset';
const EMAILJS_TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID || 'template_crset';
const EMAILJS_PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY || 'your_public_key';
const EMAILJS_PRIVATE_KEY = process.env.EMAILJS_PRIVATE_KEY || 'your_private_key';

// Template de email de confirmação para o lead
const getConfirmationEmailTemplate = (name: string, company?: string) => `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 15px;">
  <div style="background: rgba(255, 255, 255, 0.95); padding: 30px; border-radius: 15px; backdrop-filter: blur(10px);">
    <h1 style="color: #333; text-align: center; margin-bottom: 30px;">
      🚀 Bem-vindo à CRSET Solutions, ${name}!
    </h1>
    
    <div style="background: rgba(102, 126, 234, 0.1); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
      <h3 style="color: #667eea; margin: 0 0 15px 0;">✅ Pedido de Demo Recebido</h3>
      <p style="line-height: 1.6; color: #333;">
        Obrigado pelo teu interesse na nossa tecnologia AGI! Recebemos o teu pedido de demonstração e vamos processar o acesso em breve.
      </p>
    </div>
    
    <div style="background: rgba(118, 75, 162, 0.1); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
      <h3 style="color: #764ba2; margin: 0 0 15px 0;">🤖 O que podes esperar:</h3>
      <ul style="color: #333; line-height: 1.8;">
        <li><strong>Acesso imediato</strong> ao sistema AGI Commander</li>
        <li><strong>Demonstração personalizada</strong> das mascotes Boris, Laya e Irina</li>
        <li><strong>Consultoria gratuita</strong> sobre automação para o teu negócio</li>
        <li><strong>Proposta comercial</strong> adaptada às tuas necessidades</li>
      </ul>
    </div>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="https://mzhyi8cd6vxg.manus.space/" 
         style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 10px; font-weight: bold; font-size: 16px;">
        🚀 Aceder à Demo AGI Agora
      </a>
    </div>
    
    <div style="background: rgba(34, 197, 94, 0.1); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
      <h3 style="color: #22c55e; margin: 0 0 15px 0;">📱 Contacto Direto</h3>
      <p style="color: #333; margin: 5px 0;">
        <strong>WhatsApp:</strong> +351 914 423 688<br>
        <strong>Email:</strong> crsetsolutions@gmail.com<br>
        <strong>Localização:</strong> Portugal
      </p>
    </div>
    
    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid #eee;">
      <p style="color: #666; font-size: 14px;">
        Este email foi enviado porque solicitaste uma demonstração da CRSET Solutions.<br>
        Se não fizeste este pedido, podes ignorar este email.
      </p>
    </div>
  </div>
</div>
`;

// Template de notificação para a empresa
const getNotificationEmailTemplate = (name: string, email: string, message: string, company?: string, phone?: string, source?: string) => `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); border-radius: 15px;">
  <div style="background: rgba(255, 255, 255, 0.95); padding: 30px; border-radius: 15px; backdrop-filter: blur(10px);">
    <h1 style="color: #333; text-align: center; margin-bottom: 30px;">
      🔥 NOVO LEAD CAPTADO - AÇÃO IMEDIATA
    </h1>
    
    <div style="background: rgba(239, 68, 68, 0.1); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
      <h3 style="color: #ef4444; margin: 0 0 15px 0;">🎯 Informações do Lead:</h3>
      <p style="margin: 5px 0; color: #333;"><strong>Nome:</strong> ${name}</p>
      <p style="margin: 5px 0; color: #333;"><strong>Email:</strong> ${email}</p>
      ${company ? `<p style="margin: 5px 0; color: #333;"><strong>Empresa:</strong> ${company}</p>` : ''}
      ${phone ? `<p style="margin: 5px 0; color: #333;"><strong>Telefone:</strong> ${phone}</p>` : ''}
      <p style="margin: 5px 0; color: #333;"><strong>Origem:</strong> ${source || 'Site Principal'}</p>
    </div>
    
    <div style="background: rgba(220, 38, 38, 0.1); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
      <h3 style="color: #dc2626; margin: 0 0 15px 0;">💬 Mensagem:</h3>
      <p style="line-height: 1.6; color: #333; white-space: pre-wrap; background: #f9f9f9; padding: 15px; border-radius: 8px;">${message}</p>
    </div>
    
    <div style="background: rgba(34, 197, 94, 0.1); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
      <h3 style="color: #22c55e; margin: 0 0 15px 0;">⚡ Ações Recomendadas:</h3>
      <ul style="color: #333; line-height: 1.8;">
        <li><strong>Responder em 15 minutos</strong> via WhatsApp ou email</li>
        <li><strong>Agendar demo personalizada</strong> do sistema AGI</li>
        <li><strong>Preparar proposta comercial</strong> baseada nas necessidades</li>
        <li><strong>Follow-up em 24h</strong> se não houver resposta</li>
      </ul>
    </div>
    
    <div style="text-align: center; margin: 30px 0;">
      <div style="display: inline-block; margin: 0 10px;">
        <a href="https://wa.me/351914423688?text=${encodeURIComponent(`Olá ${name}! Recebi o teu pedido de demo da CRSET Solutions. Quando podemos agendar uma demonstração personalizada?`)}" 
           style="display: inline-block; background: #22c55e; color: white; padding: 12px 25px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 5px;">
          📱 Responder WhatsApp
        </a>
      </div>
      <div style="display: inline-block; margin: 0 10px;">
        <a href="mailto:${email}?subject=Demo AGI CRSET Solutions - Próximos Passos&body=${encodeURIComponent(`Olá ${name},\n\nObrigado pelo interesse na CRSET Solutions!\n\nVamos agendar uma demonstração personalizada do nosso sistema AGI?\n\nMelhores cumprimentos,\nEquipa CRSET Solutions`)}" 
           style="display: inline-block; background: #3b82f6; color: white; padding: 12px 25px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 5px;">
          📧 Responder Email
        </a>
      </div>
    </div>
    
    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid #eee;">
      <p style="color: #666; font-size: 14px;">
        Lead captado em: ${new Date().toLocaleString('pt-PT')}<br>
        Sistema de captação automática CRSET Solutions
      </p>
    </div>
  </div>
</div>
`;

export async function POST(request: NextRequest) {
  try {
    const { name, email, message, company, phone, source } = await request.json();

    // Validação básica
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Nome, email e mensagem são obrigatórios' },
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

    // Configurar EmailJS
    emailjs.init({
      publicKey: EMAILJS_PUBLIC_KEY,
      privateKey: EMAILJS_PRIVATE_KEY,
    });

    try {
      // 1. Enviar email de confirmação para o lead
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        to_email: email,
        to_name: name,
        from_name: 'CRSET Solutions',
        subject: '🚀 Demo AGI Ativada - Bem-vindo à CRSET Solutions!',
        message: `Olá ${name}!\n\nObrigado pelo interesse na CRSET Solutions!\n\nRecebemos o seu pedido e entraremos em contacto em breve.\n\nPode contactar-nos diretamente:\n📱 WhatsApp: +351 914 423 688\n📧 Email: crsetsolutions@gmail.com\n\nMelhores cumprimentos,\nEquipa CRSET Solutions`,
        reply_to: 'crsetsolutions@gmail.com'
      });

      // 2. Enviar notificação para a empresa
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        to_email: 'crsetsolutions@gmail.com',
        to_name: 'João Fonseca',
        from_name: 'Sistema CRSET',
        subject: `🔥 NOVO LEAD: ${name} ${company ? `(${company})` : ''}`,
        message: `NOVO LEAD CAPTADO!\n\n👤 Nome: ${name}\n📧 Email: ${email}\n${company ? `🏢 Empresa: ${company}\n` : ''}${phone ? `📱 Telefone: ${phone}\n` : ''}🌐 Origem: ${source || 'Site Principal'}\n\n💬 Mensagem:\n${message}\n\n⚡ AÇÃO REQUERIDA: Contactar em 15 minutos!\n\n🔗 Responder WhatsApp: https://wa.me/351914423688?text=${encodeURIComponent(`Olá ${name}! Recebi o seu pedido. Quando podemos agendar uma demonstração?`)}\n\nData: ${new Date().toLocaleString('pt-PT')}`,
        reply_to: email
      });

      return NextResponse.json(
        { 
          success: true, 
          message: 'Pedido enviado com sucesso! Entraremos em contacto em breve.'
        },
        { status: 200 }
      );

    } catch (emailError) {
      console.error('Erro ao enviar emails:', emailError);
      
      // Fallback: ainda retornar sucesso para não bloquear utilizador
      return NextResponse.json(
        { 
          success: true, 
          message: 'Pedido recebido! Entraremos em contacto em breve.',
          warning: 'Email pode ter falhado'
        },
        { status: 200 }
      );
    }

  } catch (error) {
    console.error('Erro na API de contacto:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Erro interno do servidor'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { 
      message: 'API de contacto CRSET Solutions ativa',
      features: [
        'Captação automática de leads',
        'Follow-up automatizado',
        'Notificações em tempo real',
        'Templates de email personalizados'
      ],
      status: 'operational'
    },
    { status: 200 }
  );
}

