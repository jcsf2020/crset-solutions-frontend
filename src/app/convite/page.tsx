'use client'
import React, { useEffect } from 'react'
import Link from 'next/link'

export default function ConvitePage() {
  useEffect(() => {
    // Animação suave para os elementos
    const cards = document.querySelectorAll('.glass-card')
    cards.forEach((card, index) => {
      const element = card as HTMLElement
      element.style.opacity = '0'
      element.style.transform = 'translateY(20px)'
      setTimeout(() => {
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
        element.style.opacity = '1'
        element.style.transform = 'translateY(0)'
      }, index * 200)
    })

    // Tracking de cliques nos botões CTA
    const ctaButtons = document.querySelectorAll('.cta-button')
    ctaButtons.forEach(button => {
      button.addEventListener('click', function() {
        console.log('Beta CTA clicked:', (this as HTMLElement).textContent)
        // Aqui pode ser adicionado tracking analytics futuro
      })
    })
  }, [])

  const whatsappLink = `https://wa.me/351914423688?text=${encodeURIComponent('Olá! Recebi o convite beta da CRSET Solutions e quero saber mais sobre o sistema AGI.')}`

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 crset-glass-nav">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-white">
                C
              </div>
              <span className="text-xl font-bold text-white">CRSET Solutions</span>
            </Link>
            
            <div className="flex space-x-4">
              <Link href="/" className="text-white hover:text-blue-300 transition-colors">
                ← Voltar ao Site
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="glass-card mt-20 mb-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center font-bold text-white text-4xl mx-auto mb-6">
              C
            </div>
            <div className="inline-block bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6 animate-pulse">
              🔥 CONVITE EXCLUSIVO BETA
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Testa a Primeira IA<br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                Portuguesa para Negócios
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Foste selecionado para testar em exclusivo o nosso sistema AGI Commander. 
              Acesso limitado a apenas 50 empresas portuguesas.
            </p>
          </div>
        </div>

        {/* Mascotes AGI */}
        <div className="glass-card mb-8">
          <h2 className="text-3xl font-bold text-blue-400 mb-8 text-center">🤖 Conhece as Nossas Mascotes AGI</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="crset-glass-card p-6 text-center hover:transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Boris</h3>
              <p className="text-blue-300 font-semibold mb-2">Segurança & Automação</p>
              <p className="text-gray-300 text-sm">
                Automatiza processos complexos e protege os teus sistemas com IA avançada.
              </p>
            </div>
            
            <div className="crset-glass-card p-6 text-center hover:transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Laya</h3>
              <p className="text-orange-300 font-semibold mb-2">Comunicação & Organização</p>
              <p className="text-gray-300 text-sm">
                Organiza equipas, gere projetos e otimiza a comunicação digital.
              </p>
            </div>
            
            <div className="crset-glass-card p-6 text-center hover:transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Irina</h3>
              <p className="text-purple-300 font-semibold mb-2">Analytics & Insights</p>
              <p className="text-gray-300 text-sm">
                Analisa dados em tempo real e fornece insights estratégicos.
              </p>
            </div>
          </div>
        </div>

        {/* O que podes testar */}
        <div className="glass-card mb-8">
          <h2 className="text-3xl font-bold text-blue-400 mb-8 text-center">⚡ O que Podes Testar Agora</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="crset-glass-card p-6">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-lg font-bold text-white mb-2">Demo Interativa</h3>
              <p className="text-gray-300 text-sm">
                Conversa diretamente com as mascotes AGI e vê como podem ajudar o teu negócio.
              </p>
            </div>
            <div className="crset-glass-card p-6">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-lg font-bold text-white mb-2">Automação Personalizada</h3>
              <p className="text-gray-300 text-sm">
                Testa automações específicas para o teu sector de atividade.
              </p>
            </div>
            <div className="crset-glass-card p-6">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-lg font-bold text-white mb-2">Análise de ROI</h3>
              <p className="text-gray-300 text-sm">
                Descobre quanto podes poupar e ganhar com a implementação da IA.
              </p>
            </div>
            <div className="crset-glass-card p-6">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-lg font-bold text-white mb-2">Segurança Garantida</h3>
              <p className="text-gray-300 text-sm">
                Todos os dados são processados com máxima segurança e privacidade.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Principal */}
        <div className="glass-card mb-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">🎁 Acesso Beta Gratuito</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Sem custos, sem compromissos, sem cartão de crédito. 
              Apenas para empresas portuguesas selecionadas.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <a 
                href="https://crset-solutions-frontend.vercel.app/demo" 
                className="cta-button crset-button-primary text-lg px-8 py-4 inline-block"
                target="_blank"
                rel="noopener noreferrer"
              >
                🚀 Ativar Acesso Beta Agora
              </a>
              
              <a 
                href="https://mzhyi8cd6vxg.manus.space/" 
                className="cta-button bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105 inline-block"
                target="_blank"
                rel="noopener noreferrer"
              >
                🤖 Ver Demo AGI Diretamente
              </a>
            </div>
          </div>
        </div>

        {/* Contacto Direto */}
        <div className="glass-card mb-8">
          <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-2xl p-8 border border-green-500/30">
            <h3 className="text-2xl font-bold text-white mb-4 text-center">💬 Contacto Direto com a Equipa</h3>
            <p className="text-gray-300 text-center mb-6">Tens questões? Fala diretamente connosco!</p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
              <a 
                href={whatsappLink}
                target="_blank" 
                rel="noopener noreferrer"
                className="cta-button inline-flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-bold transition-colors"
              >
                <span>📱</span>
                <span>WhatsApp: +351 914 423 688</span>
              </a>
              <a 
                href="mailto:crsetsolutions@gmail.com?subject=Convite Beta - Questões sobre AGI Commander"
                className="cta-button inline-flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-bold transition-colors"
              >
                <span>📧</span>
                <span>crsetsolutions@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="glass-card mb-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="crset-glass-card p-6">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-lg font-bold text-white mb-2">100% Seguro</h3>
              <p className="text-gray-300 text-sm">
                Os teus dados estão protegidos com encriptação SSL e nunca são partilhados.
              </p>
            </div>
            
            <div className="crset-glass-card p-6">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-lg font-bold text-white mb-2">Acesso Imediato</h3>
              <p className="text-gray-300 text-sm">
                Demo disponível instantaneamente após preenchimento do formulário.
              </p>
            </div>
            
            <div className="crset-glass-card p-6">
              <div className="text-4xl mb-4">🇵🇹</div>
              <h3 className="text-lg font-bold text-white mb-2">Empresa Portuguesa</h3>
              <p className="text-gray-300 text-sm">
                Suporte em português e conhecimento do mercado nacional.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-white">
              C
            </div>
            <span className="text-xl font-bold text-white">CRSET Solutions</span>
          </div>
          <p className="text-gray-400 mb-2">
            © 2025 CRSET Solutions. Todos os direitos reservados.
          </p>
          <p className="text-gray-500 text-sm mb-4">
            Inteligência Artificial para Negócios • Portugal
          </p>
          <p className="text-gray-500 text-xs">
            Este convite é exclusivo e intransmissível. Válido até 31 de Agosto de 2025.
          </p>
        </div>
      </div>
    </div>
  )
}

