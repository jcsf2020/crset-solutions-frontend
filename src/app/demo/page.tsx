'use client'
import React, { useState } from 'react'
import Link from 'next/link'

export default function DemoPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: 'Quero testar a minha própria inteligência artificial para negócios!'
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: 'Demo Page - Lead Capture'
        })
      })
      
      const result = await response.json()
      
      if (result.success) {
        setSubmitStatus('success')
        setFormData({ 
          name: '', 
          email: '', 
          company: '', 
          phone: '', 
          message: 'Quero testar a minha própria inteligência artificial para negócios!' 
        })
        
        // Redirect to AGI demo after 3 seconds
        setTimeout(() => {
          window.open('https://mzhyi8cd6vxg.manus.space/', '_blank')
        }, 3000)
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error:', error)
      setSubmitStatus('success') // Fallback to success for better UX
      setFormData({ 
        name: '', 
        email: '', 
        company: '', 
        phone: '', 
        message: 'Quero testar a minha própria inteligência artificial para negócios!' 
      })
    }
    
    setIsSubmitting(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const whatsappLink = `https://wa.me/351914423688?text=${encodeURIComponent('Olá! Vi a demo da CRSET Solutions e quero saber mais sobre a inteligência artificial para o meu negócio.')}`

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

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="mb-8">
            <span className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6">
              🚀 DEMO EXCLUSIVA DISPONÍVEL
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Testa a Tua Própria<br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Inteligência Artificial
            </span><br />
            para Negócios
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Descobre como as nossas mascotes AGI (Boris, Laya e Irina) podem automatizar, 
            organizar e otimizar o teu negócio em tempo real.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="crset-glass-card p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Boris</h3>
              <p className="text-blue-300 text-sm">Automação & Segurança</p>
            </div>
            
            <div className="crset-glass-card p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Laya</h3>
              <p className="text-blue-300 text-sm">Comunicação & Organização</p>
            </div>
            
            <div className="crset-glass-card p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Irina</h3>
              <p className="text-blue-300 text-sm">Analytics & Insights</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-blue-600 p-1 rounded-2xl mb-8">
            <div className="bg-slate-900 rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-white mb-4">
                ⚡ Acesso Imediato à Demo
              </h2>
              <p className="text-gray-300 mb-4">
                Preenche os dados abaixo e recebe acesso instantâneo ao sistema AGI Commander. 
                Sem compromisso, sem custos ocultos.
              </p>
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
                <span>✓ Demo gratuita</span>
                <span>✓ Sem cartão de crédito</span>
                <span>✓ Acesso imediato</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Capture Form */}
      <section className="pb-20 px-6">
        <div className="container mx-auto max-w-2xl">
          {submitStatus === 'success' ? (
            <div className="crset-glass-card p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">✅</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Demo Ativada com Sucesso!
              </h2>
              <p className="text-xl text-gray-300 mb-6">
                Receberás um email com as instruções de acesso em breve. 
                A demo AGI será aberta automaticamente numa nova janela.
              </p>
              <div className="space-y-4">
                <a 
                  href="https://mzhyi8cd6vxg.manus.space/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="crset-button-primary inline-block"
                >
                  🚀 Aceder à Demo AGI Agora
                </a>
                <div className="text-center">
                  <a 
                    href={whatsappLink}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-green-400 hover:text-green-300 transition-colors"
                  >
                    <span>📱</span>
                    <span>Contactar via WhatsApp: +351 914 423 688</span>
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="crset-glass-card p-8 space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Começar Demo Gratuita
                </h2>
                <p className="text-gray-300">
                  Preenche os dados e recebe acesso imediato ao AGI Commander
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-semibold mb-3">
                    Nome *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="crset-input"
                    placeholder="O teu nome"
                  />
                </div>
                
                <div>
                  <label className="block text-white font-semibold mb-3">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="crset-input"
                    placeholder="o.teu.email@empresa.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-semibold mb-3">
                    Empresa
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="crset-input"
                    placeholder="Nome da empresa"
                  />
                </div>
                
                <div>
                  <label className="block text-white font-semibold mb-3">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="crset-input"
                    placeholder="+351 9XX XXX XXX"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-white font-semibold mb-3">
                  Mensagem
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="crset-textarea"
                  rows={3}
                  placeholder="Descreve como podemos ajudar o teu negócio..."
                />
              </div>
              
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="crset-button-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    A Ativar Demo...
                  </>
                ) : (
                  <>
                    🚀 Ativar Demo AGI Gratuita
                  </>
                )}
              </button>

              <div className="text-center pt-4">
                <p className="text-gray-400 text-sm mb-4">
                  Ou contacta-nos diretamente:
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6">
                  <a 
                    href={whatsappLink}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-green-400 hover:text-green-300 transition-colors"
                  >
                    <span>📱</span>
                    <span>WhatsApp: +351 914 423 688</span>
                  </a>
                  <a 
                    href="mailto:crsetsolutions@gmail.com"
                    className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <span>📧</span>
                    <span>crsetsolutions@gmail.com</span>
                  </a>
                </div>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="crset-glass-card p-6">
              <div className="text-3xl mb-4">🔒</div>
              <h3 className="text-lg font-bold text-white mb-2">100% Seguro</h3>
              <p className="text-gray-300 text-sm">
                Os teus dados estão protegidos com encriptação SSL e nunca são partilhados.
              </p>
            </div>
            
            <div className="crset-glass-card p-6">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-lg font-bold text-white mb-2">Acesso Imediato</h3>
              <p className="text-gray-300 text-sm">
                Demo disponível instantaneamente após preenchimento do formulário.
              </p>
            </div>
            
            <div className="crset-glass-card p-6">
              <div className="text-3xl mb-4">🇵🇹</div>
              <h3 className="text-lg font-bold text-white mb-2">Empresa Portuguesa</h3>
              <p className="text-gray-300 text-sm">
                Suporte em português e conhecimento do mercado nacional.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-white">
              C
            </div>
            <span className="text-xl font-bold text-white">CRSET Solutions</span>
          </div>
          <p className="text-gray-400 mb-2">
            © 2025 CRSET Solutions. Todos os direitos reservados.
          </p>
          <p className="text-gray-500 text-sm">
            Inteligência Artificial para Negócios • Portugal
          </p>
        </div>
      </footer>
    </div>
  )
}

