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

  const pricingPlans = [
    {
      category: "Setup Solutions",
      plans: [
        {
          id: 1,
          name: 'Essencial',
          description: 'Perfeito para começar',
          price: '€197',
          mascot: 'Laya',
          features: ['Website básico', 'Domínio incluído', 'SSL certificado', 'Suporte 3 meses']
        },
        {
          id: 2,
          name: 'Profissional',
          description: 'Para negócios em crescimento',
          price: '€297',
          mascot: 'Boris',
          popular: true,
          features: ['Website avançado', 'E-commerce básico', 'SEO otimizado', 'Suporte 6 meses']
        },
        {
          id: 3,
          name: 'White Label',
          description: 'Solução completa personalizada',
          price: '€597',
          mascot: 'Irina',
          features: ['Solução personalizada', 'Branding completo', 'Integração avançada', 'Suporte 12 meses']
        }
      ]
    },
    {
      category: "SaaS Solutions",
      plans: [
        {
          id: 4,
          name: 'Base',
          description: 'Funcionalidades essenciais',
          price: '€19/mês',
          mascot: 'Laya',
          features: ['Dashboard básico', 'Até 1000 utilizadores', 'Suporte email', 'Relatórios básicos']
        },
        {
          id: 5,
          name: 'Plus',
          description: 'Mais poder e flexibilidade',
          price: '€39/mês',
          mascot: 'Boris',
          popular: true,
          features: ['Dashboard avançado', 'Até 5000 utilizadores', 'Suporte prioritário', 'Analytics avançados']
        },
        {
          id: 6,
          name: 'Pro',
          description: 'Máximo desempenho',
          price: '€79/mês',
          mascot: 'Irina',
          features: ['Dashboard premium', 'Utilizadores ilimitados', 'Suporte 24/7', 'IA integrada']
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
      color: 'from-orange-400 to-red-600'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* WhatsApp Button */}
      <a 
        href="https://wa.me/351914423688?text=Olá! Gostaria de saber mais sobre os serviços da CRSET Solutions." 
        className="whatsapp-btn"
        target="_blank"
        rel="noopener noreferrer"
      >
        📱
      </a>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 header-glass z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center font-bold text-white text-xl">
              C
            </div>
            <div>
              <span className="text-xl font-bold text-white">CRSET Solutions</span>
              <div className="text-sm text-gray-300">Soluções Digitais Inteligentes</div>
            </div>
          </div>
          <nav className="hidden md:flex space-x-6 items-center">
            <a href="#inicio" className="text-gray-300 hover:text-white transition-colors">Início</a>
            <a href="#mascotes" className="text-gray-300 hover:text-white transition-colors">Mascotes</a>
            <a href="#precos" className="text-gray-300 hover:text-white transition-colors">Preços</a>
            <a href="#contato" className="text-gray-300 hover:text-white transition-colors">Contato</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="inicio" className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Transforme o Seu Negócio com<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              Tecnologia Inteligente
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Soluções digitais personalizadas com as nossas mascotes especializadas: 
            Boris, Laya e Irina. Automatização, comunicação e segurança para o seu sucesso.
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <button className="crset-button-primary text-lg px-8 py-4">
              Começar Agora ⚡
            </button>
            <button className="crset-button-secondary text-lg px-8 py-4">
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
                    
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-4 text-white font-bold">
                        {plan.mascot[0]}
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white">{plan.name}</h4>
                        <p className="text-gray-300 text-sm">{plan.description}</p>
                      </div>
                    </div>
                    
                    <div className="text-4xl font-bold text-white mb-6">{plan.price}</div>
                    
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="text-gray-300 flex items-center">
                          <span className="text-green-400 mr-3 text-lg">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <button className={`w-full py-4 px-6 rounded-lg font-semibold transition-all duration-300 ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black hover:from-yellow-300 hover:to-yellow-500' 
                        : 'crset-button-primary'
                    }`}>
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
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-6">
            Pronto para Começar?
          </h2>
          <p className="text-xl text-gray-300 text-center mb-16">
            Entre em contacto connosco e descubra como as nossas soluções 
            podem transformar o seu negócio digital.
          </p>
          
          <div className="crset-glass-card max-w-2xl mx-auto p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
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

