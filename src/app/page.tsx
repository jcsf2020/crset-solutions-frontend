'use client'
import React, { useState } from 'react'
import Image from 'next/image'

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
      
      const result = await response.json()
      
      if (result.success) {
        alert(result.message)
        setFormData({ name: '', email: '', message: '' })
      } else {
        alert('Erro ao enviar mensagem. Tente novamente.')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Mensagem recebida! Entraremos em contacto em breve.')
      setFormData({ name: '', email: '', message: '' })
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
      // Preencher mensagem automaticamente
      setFormData(prev => ({
        ...prev,
        message: `Olá! Tenho interesse no plano ${planName} (${planPrice}). Gostaria de saber mais detalhes.`
      }))
    }
  }

  const pricingPlans = [
    {
      category: "Setup Solutions",
      plans: [
        {
          id: 1,
          name: 'Website Essencial',
          description: 'Perfeito para começar com credibilidade',
          price: '€397',
          mascot: 'Laya',
          features: ['Website institucional completo', 'Domínio incluído', 'SSL configurado', 'Suporte técnico 3 meses']
        },
        {
          id: 2,
          name: 'Website Profissional',
          description: 'Ideal para negócios que querem escalar',
          price: '€697',
          mascot: 'Boris',
          popular: true,
          features: ['Website com e-commerce', 'Otimização SEO', 'Branding parcial', 'Suporte técnico 6 meses']
        },
        {
          id: 3,
          name: 'Solução White Label',
          description: 'Plataforma CRSET personalizada para revenda ou empresas com equipa',
          price: '€1.497',
          mascot: 'Irina',
          features: ['Personalização total (layout, mascotes, domínio próprio)', 'Branding completo', 'Integrações técnicas avançadas', 'Suporte prioritário 12 meses', 'Deploy pronto a usar']
        }
      ]
    },
    {
      category: "SaaS Solutions",
      plans: [
        {
          id: 4,
          name: 'Starter',
          description: 'Dashboard básico para equipas pequenas',
          price: '€29/mês',
          mascot: 'Laya',
          features: ['Até 1.000 utilizadores', 'Acesso a estatísticas essenciais', 'Suporte por email']
        },
        {
          id: 5,
          name: 'Profissional',
          description: 'Ideal para negócios em crescimento',
          price: '€59/mês',
          mascot: 'Boris',
          popular: true,
          features: ['Até 5.000 utilizadores', 'Dashboard com automações e mascotes', 'Suporte prioritário']
        },
        {
          id: 6,
          name: 'Premium',
          description: 'Máxima performance, IA e personalização',
          price: '€99/mês',
          mascot: 'Irina',
          features: ['Utilizadores ilimitados', 'IA integrada (Análise + Leads + Mascotes)', 'Suporte 24/7', 'Acesso a atualizações e melhorias']
        }
      ]
    }
  ]

  const mascots = [
    {
      name: 'Boris',
      role: 'Especialista em Automação',
      description: 'Automatiza processos complexos e garante a segurança dos seus sistemas',
      image: '/images/boris.png',
      color: 'from-blue-500 to-blue-700'
    },
    {
      name: 'Laya',
      role: 'Especialista em Comunicação',
      description: 'Organiza e otimiza a comunicação digital da sua empresa',
      image: '/images/laya.png',
      color: 'from-orange-500 to-orange-700'
    },
    {
      name: 'Irina',
      role: 'Especialista em Segurança',
      description: 'Protege os seus dados e fornece insights inteligentes',
      image: '/images/irina.png',
      color: 'from-purple-500 to-purple-700'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 crset-glass-nav">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-white">
                C
              </div>
              <span className="text-xl font-bold text-white">CRSET Solutions</span>
              <span className="text-sm text-blue-300 hidden md:block">Soluções Digitais Inteligentes</span>
            </div>
            
            <div className="hidden md:flex space-x-8">
              <a href="#inicio" className="text-white hover:text-blue-300 transition-colors">📱</a>
              <a href="#inicio" className="text-white hover:text-blue-300 transition-colors">Início</a>
              <a href="#mascotes" className="text-white hover:text-blue-300 transition-colors">Mascotes</a>
              <a href="#agi" className="text-white hover:text-blue-300 transition-colors">AGI Commander</a>
              <a href="#precos" className="text-white hover:text-blue-300 transition-colors">Preços</a>
              <a href="#contato" className="text-white hover:text-blue-300 transition-colors">Contato</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Transforme o Seu Negócio com<br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Tecnologia Inteligente
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Soluções digitais personalizadas com as nossas mascotes especializadas: Boris, Laya e Irina. 
            Automatização, comunicação e segurança para o seu sucesso.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={() => handlePlanClick('Consulta Gratuita', 'Grátis')}
              className="crset-button-primary text-lg px-8 py-4"
            >
              Começar Agora ⚡
            </button>
            <button 
              onClick={() => document.getElementById('precos')?.scrollIntoView({ behavior: 'smooth' })}
              className="crset-button-secondary text-lg px-8 py-4"
            >
              Ver Preços 💰
            </button>
          </div>
        </div>
      </section>

      {/* Mascots Section */}
      <section id="mascotes" className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
            Conheça as Nossas Mascotes
          </h2>
          <p className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto">
            Cada mascote representa uma área de especialização, trabalhando em conjunto 
            para oferecer soluções completas e personalizadas.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {mascots.map((mascot, index) => (
              <div key={mascot.name} className={`mascot-card float-animation`} style={{animationDelay: `${index * 0.2}s`}}>
                <div className="relative mb-6">
                  <Image
                    src={mascot.image}
                    alt={mascot.name}
                    width={120}
                    height={120}
                    className="mascot-image mx-auto"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${mascot.color} opacity-20 rounded-full blur-xl`}></div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{mascot.name}</h3>
                <p className="text-blue-300 font-semibold mb-4">{mascot.role}</p>
                <p className="text-gray-300 leading-relaxed">
                  {mascot.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AGI Commander Section */}
      <section id="agi" className="py-20 px-6 bg-gradient-to-br from-indigo-900/30 to-purple-900/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              🤖 AGI Commander
            </h2>
            <h3 className="text-2xl md:text-3xl font-semibold text-blue-300 mb-6">
              Automação com Inteligência Artificial
            </h3>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Conversas inteligentes, mascotes personalizadas e decisões automatizadas. 
              A próxima geração da tua empresa começa aqui.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
            <div className="crset-glass-card p-8 text-center hover:scale-105 transition-transform duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🛡️</span>
              </div>
              <h4 className="text-2xl font-bold text-white mb-3">Boris</h4>
              <p className="text-blue-300 font-semibold mb-4">Segurança & Automação</p>
              <p className="text-gray-300 leading-relaxed">
                Automatiza processos complexos, garante a segurança dos sistemas e otimiza fluxos de trabalho com inteligência artificial avançada.
              </p>
            </div>
            
            <div className="crset-glass-card p-8 text-center hover:scale-105 transition-transform duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">💬</span>
              </div>
              <h4 className="text-2xl font-bold text-white mb-3">Laya</h4>
              <p className="text-blue-300 font-semibold mb-4">Comunicação & Organização</p>
              <p className="text-gray-300 leading-relaxed">
                Organiza e otimiza a comunicação digital, gere equipas remotas e coordena projetos com eficiência máxima.
              </p>
            </div>
            
            <div className="crset-glass-card p-8 text-center hover:scale-105 transition-transform duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">📊</span>
              </div>
              <h4 className="text-2xl font-bold text-white mb-3">Irina</h4>
              <p className="text-blue-300 font-semibold mb-4">Analytics & Insights</p>
              <p className="text-gray-300 leading-relaxed">
                Analisa dados em tempo real, fornece insights estratégicos e toma decisões inteligentes baseadas em IA.
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <a 
              href="https://mzhyi8cd6vxg.manus.space" 
              target="_blank" 
              rel="noopener noreferrer"
              className="crset-button-primary text-xl px-12 py-6 inline-flex items-center space-x-3 hover:scale-105 transition-transform duration-300"
            >
              <span>🚀</span>
              <span>Ver Demonstração AGI</span>
              <span>→</span>
            </a>
            <p className="text-gray-400 mt-4 text-sm">
              Abre numa nova janela • Sistema AGI em produção
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="precos" className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
            Planos e Preços
          </h2>
          <p className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto">
            Escolha o plano ideal para o seu negócio. Soluções flexíveis para todas as necessidades.
          </p>
          
          {pricingPlans.map((category, categoryIndex) => (
            <div key={category.category} className="mb-16">
              <h3 className="text-3xl font-bold text-white text-center mb-12">
                {category.category}
              </h3>
              
              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {category.plans.map((plan, planIndex) => (
                  <div key={plan.id} className={`service-card ${plan.popular ? 'popular' : ''}`}>
                    {plan.popular && (
                      <div className="popular-badge">⭐ Popular</div>
                    )}
                    
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center font-bold text-white text-xl">
                        {plan.mascot[0]}
                      </div>
                      <h4 className="text-2xl font-bold text-white mb-2">{plan.name}</h4>
                      <p className="text-gray-300 mb-4">{plan.description}</p>
                      <div className="text-4xl font-bold text-white mb-6">{plan.price}</div>
                    </div>
                    
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-gray-300">
                          <span className="text-green-400 mr-3">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <button 
                      onClick={() => handlePlanClick(plan.name, plan.price)}
                      className="crset-button-primary w-full"
                    >
                      Quero este plano
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
            Pronto para Começar?
          </h2>
          <p className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto">
            Entre em contacto connosco e descubra como as nossas soluções podem transformar o seu negócio digital.
          </p>
          
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="crset-glass-card p-8 space-y-6">
              <div>
                <label className="block text-white font-semibold mb-3 text-lg">
                  Nome
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="crset-input"
                  placeholder="O seu nome"
                />
              </div>
              
              <div>
                <label className="block text-white font-semibold mb-3 text-lg">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="crset-input"
                  placeholder="o.seu.email@exemplo.com"
                />
              </div>
              
              <div>
                <label className="block text-white font-semibold mb-3 text-lg">
                  Mensagem
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="crset-textarea"
                  placeholder="Descreva o seu projeto ou necessidades..."
                />
              </div>
              
              <button type="submit" className="crset-button-primary w-full text-lg py-4">
                Enviar Mensagem 🚀
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="mt-16 text-center">
            <div className="crset-glass-card p-6 max-w-md mx-auto">
              <h3 className="text-xl font-bold text-white mb-4">Informações de Contato</h3>
              <div className="space-y-3 text-gray-300">
                <p>📧 crsetsolutions@gmail.com</p>
                <p>📱 +351 914 423 688 (WhatsApp Only)</p>
                <p>🌍 Portugal</p>
              </div>
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
            Soluções Digitais Inteligentes com Boris, Laya e Irina
          </p>
        </div>
      </footer>
    </div>
  )
}

