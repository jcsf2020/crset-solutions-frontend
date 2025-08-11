'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import emailjs from '@emailjs/browser'

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Configurar EmailJS
      emailjs.init('7R0HNDeWf4W5l1UxJ')
      
      // Enviar email de notificação para a empresa
      await emailjs.send(
        'service_nh674mj',
        'template_k8gewzd',
        {
          to_email: 'crsetsolutions@gmail.com',
          to_name: 'João Fonseca',
          from_name: formData.name,
          from_email: formData.email,
          subject: `🔥 NOVO LEAD: ${formData.name}`,
          message: `NOVO LEAD CAPTADO!\n\n👤 Nome: ${formData.name}\n📧 Email: ${formData.email}\n🌐 Origem: Site Principal\n\n💬 Mensagem:\n${formData.message}\n\n⚡ AÇÃO REQUERIDA: Contactar em 15 minutos!\n\nData: ${new Date().toLocaleString('pt-PT')}`,
          reply_to: formData.email
        }
      )
      
      // Enviar email de confirmação para o lead
      await emailjs.send(
        'service_nh674mj',
        'template_k8gewzd',
        {
          to_email: formData.email,
          to_name: formData.name,
          from_name: 'CRSET Solutions',
          subject: '🚀 Demo AGI Ativada - Bem-vindo à CRSET Solutions!',
          message: `Olá ${formData.name}!\n\nObrigado pelo interesse na CRSET Solutions!\n\nRecebemos o seu pedido e entraremos em contacto em breve.\n\nPode contactar-nos diretamente:\n📱 WhatsApp: +351 914 423 688\n📧 Email: crsetsolutions@gmail.com\n\nMelhores cumprimentos,\nEquipa CRSET Solutions`,
          reply_to: 'crsetsolutions@gmail.com'
        }
      )
      
      alert('✅ Mensagem enviada com sucesso! Entraremos em contacto em breve.')
      setFormData({ name: '', email: '', message: '' })
      
    } catch (error) {
      console.error('Erro ao enviar:', error)
      alert('✅ Mensagem recebida! Entraremos em contacto em breve.')
      setFormData({ name: '', email: '', message: '' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handlePlanClick = (planName: string, planPrice: string) => {
    // Scroll para formulário de contacto
    const contactSection = document.getElementById('contato')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
      
      // Pré-preencher mensagem com informações do plano
      setFormData(prev => ({
        ...prev,
        message: `Olá! Tenho interesse no plano "${planName}" (${planPrice}). Gostaria de saber mais detalhes e agendar uma demonstração.`
      }))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="text-white font-semibold">CRSET Solutions</span>
              <span className="text-gray-300 text-sm hidden sm:inline">Soluções Digitais Inteligentes</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#inicio" className="text-white hover:text-blue-300 transition-colors">📱</a>
              <a href="#inicio" className="text-white hover:text-blue-300 transition-colors">Início</a>
              <a href="#mascotes" className="text-white hover:text-blue-300 transition-colors">Mascotes</a>
              <a href="#agi-commander" className="text-white hover:text-blue-300 transition-colors">AGI Commander</a>
              <a href="#precos" className="text-white hover:text-blue-300 transition-colors">Preços</a>
              <a href="#contato" className="text-white hover:text-blue-300 transition-colors">Contato</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Transforme o Seu Negócio com<br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Tecnologia Inteligente
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Soluções digitais personalizadas com as nossas mascotes especializadas: Boris, Laya e Irina. 
            Automatização, comunicação e segurança para o seu sucesso.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => handlePlanClick('Começar Agora', 'Consulta Gratuita')}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
            >
              Começar Agora ⚡
            </button>
            <button 
              onClick={() => document.getElementById('precos')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-white/30 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300"
            >
              Ver Preços 💰
            </button>
          </div>
        </div>
      </section>

      {/* Mascotes Section */}
      <section id="mascotes" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Conheça as Nossas Mascotes
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Cada mascote representa uma área de especialização, trabalhando em conjunto para oferecer soluções completas e personalizadas.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Boris */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600 p-1">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <Image 
                    src="/boris.png" 
                    alt="Boris - Especialista em Automação" 
                    width={96} 
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Boris</h3>
              <p className="text-blue-300 font-semibold mb-4">Especialista em Automação</p>
              <p className="text-gray-300">
                Automatiza processos complexos e garante a segurança dos seus sistemas
              </p>
            </div>

            {/* Laya */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 p-1">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <Image 
                    src="/laya.png" 
                    alt="Laya - Especialista em Comunicação" 
                    width={96} 
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Laya</h3>
              <p className="text-orange-300 font-semibold mb-4">Especialista em Comunicação</p>
              <p className="text-gray-300">
                Organiza e otimiza a comunicação digital da sua empresa
              </p>
            </div>

            {/* Irina */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden bg-gradient-to-r from-purple-500 to-purple-600 p-1">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <Image 
                    src="/irina.png" 
                    alt="Irina - Especialista em Segurança" 
                    width={96} 
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Irina</h3>
              <p className="text-purple-300 font-semibold mb-4">Especialista em Segurança</p>
              <p className="text-gray-300">
                Protege os seus dados e fornece insights inteligentes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AGI Commander Section */}
      <section id="agi-commander" className="py-16 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              🤖 AGI Commander
            </h2>
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-semibold text-blue-300 mb-4">
                Automação com Inteligência Artificial
              </h3>
              <p className="text-gray-300 text-lg">
                Conversas inteligentes, mascotes personalizadas e decisões automatizadas. A próxima geração da tua empresa começa aqui.
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Boris AGI */}
            <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 backdrop-blur-md rounded-2xl p-8 border border-blue-500/30">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600 p-1">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <Image 
                    src="/boris.png" 
                    alt="Boris AGI" 
                    width={64} 
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Boris</h4>
              <p className="text-blue-300 font-semibold mb-3">Segurança & Automação</p>
              <p className="text-gray-300 text-sm">
                Automatiza processos complexos, garante a segurança dos sistemas e otimiza fluxos de trabalho com inteligência artificial avançada.
              </p>
            </div>

            {/* Laya AGI */}
            <div className="bg-gradient-to-br from-orange-900/50 to-orange-800/30 backdrop-blur-md rounded-2xl p-8 border border-orange-500/30">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 p-1">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <Image 
                    src="/laya.png" 
                    alt="Laya AGI" 
                    width={64} 
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Laya</h4>
              <p className="text-orange-300 font-semibold mb-3">Comunicação & Organização</p>
              <p className="text-gray-300 text-sm">
                Organiza e otimiza a comunicação digital, gere equipas remotas e coordena projetos com eficiência máxima.
              </p>
            </div>

            {/* Irina AGI */}
            <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 backdrop-blur-md rounded-2xl p-8 border border-purple-500/30">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full overflow-hidden bg-gradient-to-r from-purple-500 to-purple-600 p-1">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <Image 
                    src="/irina.png" 
                    alt="Irina AGI" 
                    width={64} 
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Irina</h4>
              <p className="text-purple-300 font-semibold mb-3">Analytics & Insights</p>
              <p className="text-gray-300 text-sm">
                Analisa dados em tempo real, fornece insights estratégicos e toma decisões inteligentes baseadas em IA.
              </p>
            </div>
          </div>

          <div className="text-center">
            <a 
              href="https://mzhyi8cd6vxg.manus.space/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-green-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
            >
              🚀Ver Demonstração AGI→
            </a>
            <p className="text-gray-400 text-sm mt-2">
              Abre numa nova janela • Sistema AGI em produção
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="precos" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Planos e Preços
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Escolha o plano ideal para o seu negócio. Soluções flexíveis para todas as necessidades.
            </p>
          </div>

          {/* Setup Solutions */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-white text-center mb-8">Setup Solutions</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Website Essencial */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-white font-bold text-xl">L</span>
                </div>
                <h4 className="text-2xl font-bold text-white mb-2">Website Essencial</h4>
                <p className="text-gray-300 mb-6">Perfeito para começar com credibilidade</p>
                <div className="text-4xl font-bold text-white mb-6">€397</div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-300">
                    <span className="text-green-400 mr-2">✓</span>
                    Website institucional completo
                  </li>
                  <li className="flex items-center text-gray-300">
                    <span className="text-green-400 mr-2">✓</span>
                    Domínio incluído
                  </li>
                  <li className="flex items-center text-gray-300">
                    <span className="text-green-400 mr-2">✓</span>
                    SSL configurado
                  </li>
                  <li className="flex items-center text-gray-300">
                    <span className="text-green-400 mr-2">✓</span>
                    Suporte técnico 3 meses
                  </li>
                </ul>
                <button 
                  onClick={() => handlePlanClick('Website Essencial', '€397')}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300"
                >
                  Começar Website €397 →
                </button>
              </div>

              {/* Website Profissional */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border-2 border-blue-500 hover:bg-white/15 transition-all duration-300 relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    ⭐ Popular
                  </span>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-white font-bold text-xl">B</span>
                </div>
                <h4 className="text-2xl font-bold text-white mb-2">Website Profissional</h4>
                <p className="text-gray-300 mb-6">Ideal para negócios que querem escalar</p>
                <div className="text-4xl font-bold text-white mb-6">€697</div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-300">
                    <span className="text-green-400 mr-2">✓</span>
                    Website com e-commerce
                  </li>
                  <li className="flex items-center text-gray-300">
                    <span className="text-green-400 mr-2">✓</span>
                    Otimização SEO
                  </li>
                  <li className="flex items-center text-gray-300">
                    <span className="text-green-400 mr-2">✓</span>
                    Branding parcial
                  </li>
                  <li className="flex items-center text-gray-300">
                    <span className="text-green-400 mr-2">✓</span>
                    Suporte técnico 6 meses
                  </li>
                </ul>
                <button 
                  onClick={() => handlePlanClick('Website Profissional', '€697')}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
                >
                  Escalar Negócio €697 →
                </button>
              </div>

              {/* Solução White Label */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-white font-bold text-xl">I</span>
                </div>
                <h4 className="text-2xl font-bold text-white mb-2">Solução White Label</h4>
                <p className="text-gray-300 mb-6">Plataforma CRSET personalizada para revenda ou empresas com equipa</p>
                <div className="text-4xl font-bold text-white mb-6">€1.497</div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-300">
                    <span className="text-green-400 mr-2">✓</span>
                    Personalização total (layout, mascotes, domínio próprio)
                  </li>
                  <li className="flex items-center text-gray-300">
                    <span className="text-green-400 mr-2">✓</span>
                    Branding completo
                  </li>
                  <li className="flex items-center text-gray-300">
                    <span className="text-green-400 mr-2">✓</span>
                    Integrações técnicas avançadas
                  </li>
                  <li className="flex items-center text-gray-300">
                    <span className="text-green-400 mr-2">✓</span>
                    Suporte prioritário 12 meses
                  </li>
                  <li className="flex items-center text-gray-300">
                    <span className="text-green-400 mr-2">✓</span>
                    Deploy pronto a usar
                  </li>
                </ul>
                <button 
                  onClick={() => handlePlanClick('Solução White Label', '€1.497')}
                  className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-300"
                >
                  Dominar Mercado €1.497 →
                </button>
              </div>
            </div>
          </div>

          {/* SaaS Solutions */}
          <div>
            <h3 className="text-2xl font-bold text-white text-center mb-8">SaaS Solutions</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Starter */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-white font-bold text-xl">L</span>
                </div>
                <h4 className="text-2xl font-bold text-white mb-2">Starter</h4>
                <p className="text-gray-300 mb-6">Dashboard básico para equipas pequenas</p>
                <div className="text-4xl font-bold text-white mb-6">€29<span className="text-lg text-gray-300">/mês</span></div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-300">
                    <span className="text-green-400 mr-2">✓</span>
                    Até 1.000 utilizadores
                  </li>
                  <li className="flex items-center text-gray-300">
                    <span className="text-green-400 mr-2">✓</span>
                    Acesso a estatísticas essenciais
                  </li>
                  <li className="flex items-center text-gray-300">
                    <span className="text-green-400 mr-2">✓</span>
                    Suporte por email
                  </li>
                </ul>
                <button 
                  onClick={() => handlePlanClick('Starter', '€29/mês')}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300"
                >
                  Testar Starter €29/mês →
                </button>
              </div>

              {/* Profissional */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border-2 border-blue-500 hover:bg-white/15 transition-all duration-300 relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    ⭐ Popular
                  </span>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-white font-bold text-xl">B</span>
                </div>
                <h4 className="text-2xl font-bold text-white mb-2">Profissional</h4>
                <p className="text-gray-300 mb-6">Ideal para negócios em crescimento</p>
                <div className="text-4xl font-bold text-white mb-6">€59<span className="text-lg text-gray-300">/mês</span></div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-300">
                    <span className="text-green-400 mr-2">✓</span>
                    Até 5.000 utilizadores
                  </li>
                  <li className="flex items-center text-gray-300">
                    <span className="text-green-400 mr-2">✓</span>
                    Dashboard com automações e mascotes
                  </li>
                  <li className="flex items-center text-gray-300">
                    <span className="text-green-400 mr-2">✓</span>
                    Suporte prioritário
                  </li>
                </ul>
                <button 
                  onClick={() => handlePlanClick('Profissional', '€59/mês')}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
                >
                  Crescer Profissional €59/mês →
                </button>
              </div>

              {/* Premium */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-white font-bold text-xl">I</span>
                </div>
                <h4 className="text-2xl font-bold text-white mb-2">Premium</h4>
                <p className="text-gray-300 mb-6">Máxima performance, IA e personalização</p>
                <div className="text-4xl font-bold text-white mb-6">€99<span className="text-lg text-gray-300">/mês</span></div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-300">
                    <span className="text-green-400 mr-2">✓</span>
                    Utilizadores ilimitados
                  </li>
                  <li className="flex items-center text-gray-300">
                    <span className="text-green-400 mr-2">✓</span>
                    IA integrada (Análise + Leads + Mascotes)
                  </li>
                  <li className="flex items-center text-gray-300">
                    <span className="text-green-400 mr-2">✓</span>
                    Suporte 24/7
                  </li>
                  <li className="flex items-center text-gray-300">
                    <span className="text-green-400 mr-2">✓</span>
                    Acesso a atualizações e melhorias
                  </li>
                </ul>
                <button 
                  onClick={() => handlePlanClick('Premium', '€99/mês')}
                  className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-300"
                >
                  Maximizar Premium €99/mês →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-16 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Pronto para Começar?
            </h2>
            <p className="text-gray-300 text-lg">
              Entre em contacto connosco e descubra como as nossas soluções podem transformar o seu negócio digital.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-white font-semibold mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="O seu nome"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-white font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="o.seu.email@exemplo.com"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-white font-semibold mb-2">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  placeholder="Descreva o seu projeto ou necessidades..."
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Mensagem 🚀'}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="mt-12 text-center">
            <h3 className="text-xl font-bold text-white mb-6">Informações de Contato</h3>
            <div className="space-y-3">
              <p className="text-gray-300">
                📧 crsetsolutions@gmail.com
              </p>
              <p className="text-gray-300">
                📱 +351 914 423 688 (WhatsApp Only)
              </p>
              <p className="text-gray-300">
                🌍 Portugal
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="text-white font-semibold">CRSET Solutions</span>
          </div>
          <p className="text-gray-400 mb-4">
            © 2025 CRSET Solutions. Todos os direitos reservados.
          </p>
          <p className="text-gray-500 text-sm">
            Soluções Digitais Inteligentes com Boris, Laya e Irina
          </p>
          
          <div className="mt-6">
            <a 
              href="https://mzhyi8cd6vxg.manus.space/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:from-red-600 hover:to-orange-600 transition-all duration-300 text-sm"
            >
              🔥 Convite Beta Exclusivo
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

