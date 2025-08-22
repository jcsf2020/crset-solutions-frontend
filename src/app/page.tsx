'use client';

import { useState } from 'react';
import Image from 'next/image';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'https://3dhkilceovoq.manus.space';

export default function Home() {
  const [formData, setFormData] = useState({
    email: '',
    company: '',
    name: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [showDiscount, setShowDiscount] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const submitData = {
        name: formData.company || 'Empresa não informada',
        email: formData.email,
        message: `Análise gratuita solicitada para: ${formData.company || 'empresa'}`,
        utm_source: 'go_crset',
        utm_medium: 'frontend',
        utm_campaign: 'production'
      };

      const response = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData)
      });

      if (response.ok) {
        const result = await response.json();
        
        // Track lead generation
        if (typeof window !== 'undefined') {
          // Google Analytics
          if ((window as any).gtag) {
            (window as any).gtag('event', 'generate_lead', {
              lead_id: result.id,
              value: 397,
              currency: 'EUR',
              event_category: 'Lead Generation',
              event_label: 'Hero Form'
            });
          }
          
          // Meta Pixel
          if ((window as any).fbq) {
            (window as any).fbq('track', 'Lead', {
              content_name: 'Análise Gratuita',
              content_category: 'Lead Generation',
              value: 397,
              currency: 'EUR'
            });
          }
          
          // LinkedIn
          if ((window as any).lintrk) {
            (window as any).lintrk('track', { conversion_id: 'XXXXXXX' });
          }
        }
        
        setSubmitStatus('success');
        setFormData({ email: '', company: '', name: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Discount Popup */}
      {showDiscount && (
        <div className="hidden fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-8 max-w-md w-full relative">
            <button 
              onClick={() => setShowDiscount(false)}
              className="absolute top-4 right-4 text-white/70 hover:text-white text-2xl"
            >
              ×
            </button>
            <div className="text-center">
              <div className="text-4xl mb-4">🔥</div>
              <h3 className="text-2xl font-bold text-white mb-4">Espere!</h3>
              <p className="text-white/90 mb-6">
                Antes de sair, receba <span className="text-yellow-300 font-bold">20% de desconto</span> na sua primeira implementação!
              </p>
              <input
                type="email"
                placeholder="O seu email para receber o desconto"
                className="w-full p-3 rounded-lg mb-4 bg-white/20 text-white placeholder-white/70 border border-white/30"
              />
              <button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold py-3 rounded-lg mb-4">
                🎁 Garantir 20% Desconto
              </button>
              <p className="text-white/60 text-sm">Oferta válida apenas hoje • Sem compromisso</p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="relative z-10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <div>
              <h1 className="text-white font-bold text-xl">CRSET Solutions</h1>
              <p className="text-blue-200 text-sm">Soluções Digitais Inteligentes</p>
            </div>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#inicio" className="text-white/80 hover:text-white transition-colors">📱 Início</a>
            <a href="#mascotes" className="text-white/80 hover:text-white transition-colors">Mascotes</a>
            <a href="#agi-commander" className="text-white/80 hover:text-white transition-colors">AGI Commander</a>
            <a href="#precos" className="text-white/80 hover:text-white transition-colors">Preços</a>
            <a href="#contato" className="text-white/80 hover:text-white transition-colors">Contato</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="inicio" className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Transforme o Seu Negócio com{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Tecnologia Inteligente
            </span>
          </h1>
          
          <p className="text-xl text-blue-100 mb-12 max-w-4xl mx-auto">
            Soluções digitais personalizadas com as nossas mascotes especializadas: Boris, 
            Laya e Irina. Automatização, comunicação e segurança para o seu sucesso.
          </p>

          {/* Hero Form */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-2xl mx-auto mb-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center justify-center">
              🚀 Receba uma Análise Gratuita do Seu Negócio
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="email"
                  name="email"
                  placeholder="O seu email profissional"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full p-4 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="text"
                  name="company"
                  placeholder="Nome da sua empresa"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full p-4 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 disabled:opacity-50 text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 text-lg"
              >
                {isSubmitting ? 'Enviando...' : '🎯 Análise Gratuita →'}
              </button>
            </form>
            
            <div className="flex items-center justify-center space-x-6 mt-4 text-sm text-green-300">
              <span>✅ Sem spam</span>
              <span>✅ Análise em 24h</span>
              <span>✅ 100% gratuito</span>
            </div>

            {submitStatus === 'success' && (
              <div className="mt-4 p-4 rounded-lg bg-green-500/20 border border-green-400">
                <p className="text-green-300 text-sm">✅ Análise solicitada com sucesso! Entraremos em contacto em breve.</p>
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="mt-4 p-4 rounded-lg bg-red-500/20 border border-red-400">
                <p className="text-red-300 text-sm">❌ Erro ao enviar. Tente novamente ou contacte-nos diretamente.</p>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => scrollToSection('contato')}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 text-lg rounded-lg transition-all duration-200 font-semibold"
            >
              Começar Agora ⚡
            </button>
            <button 
              onClick={() => scrollToSection('precos')}
              className="border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-8 py-3 text-lg rounded-lg transition-all duration-200 font-semibold"
            >
              Ver Preços 💰
            </button>
          </div>
        </div>
      </section>

      {/* Mascotes Section */}
      <section id="mascotes" className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-4">
            Conheça as Nossas Mascotes
          </h2>
          <p className="text-xl text-blue-100 text-center mb-16 max-w-4xl mx-auto">
            Cada mascote representa uma área de especialização, trabalhando em conjunto para oferecer soluções completas e personalizadas.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Boris */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-blue-400">
                <Image
                  src="/boris_real.webp"
                  alt="Boris - Especialista em Automação"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Boris</h3>
              <p className="text-blue-300 font-semibold mb-4">Especialista em Automação</p>
              <p className="text-blue-100">
                Automatiza processos complexos e garante a segurança dos seus sistemas
              </p>
            </div>

            {/* Laya */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-orange-400">
                <Image
                  src="/laya_real.webp"
                  alt="Laya - Especialista em Comunicação"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Laya</h3>
              <p className="text-orange-300 font-semibold mb-4">Especialista em Comunicação</p>
              <p className="text-blue-100">
                Organiza e otimiza a comunicação digital da sua empresa
              </p>
            </div>

            {/* Irina */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-purple-400">
                <Image
                  src="/irina_real.webp"
                  alt="Irina - Especialista em Segurança"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Irina</h3>
              <p className="text-purple-300 font-semibold mb-4">Especialista em Segurança</p>
              <p className="text-blue-100">
                Protege os seus dados e fornece insights inteligentes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AGI Commander Section */}
      <section id="agi-commander" className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-6xl mb-6">🤖</div>
          <h2 className="text-4xl font-bold text-white mb-4">AGI Commander</h2>
          <h3 className="text-2xl text-blue-300 mb-8">Automação com Inteligência Artificial</h3>
          <p className="text-xl text-blue-100 mb-12 max-w-4xl mx-auto">
            Conversas inteligentes, mascotes personalizadas e decisões automatizadas. A próxima geração da tua empresa começa aqui.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Boris AGI */}
            <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 backdrop-blur-lg rounded-2xl p-6 border border-blue-400/30">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-2 border-blue-400">
                <Image
                  src="/boris_real.webp"
                  alt="Boris AGI"
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Boris</h4>
              <p className="text-blue-300 font-semibold mb-3">Segurança & Automação</p>
              <p className="text-blue-100 text-sm">
                Automatiza processos complexos, garante a segurança dos sistemas e otimiza fluxos de trabalho com inteligência artificial avançada.
              </p>
            </div>

            {/* Laya AGI */}
            <div className="bg-gradient-to-br from-orange-600/20 to-red-800/20 backdrop-blur-lg rounded-2xl p-6 border border-orange-400/30">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-2 border-orange-400">
                <Image
                  src="/laya_real.webp"
                  alt="Laya AGI"
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Laya</h4>
              <p className="text-orange-300 font-semibold mb-3">Comunicação & Organização</p>
              <p className="text-blue-100 text-sm">
                Organiza e otimiza a comunicação digital, gere equipas remotas e coordena projetos com eficiência máxima.
              </p>
            </div>

            {/* Irina AGI */}
            <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 backdrop-blur-lg rounded-2xl p-6 border border-purple-400/30">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-2 border-purple-400">
                <Image
                  src="/irina_real.webp"
                  alt="Irina AGI"
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Irina</h4>
              <p className="text-purple-300 font-semibold mb-3">Analytics & Insights</p>
              <p className="text-blue-100 text-sm">
                Analisa dados em tempo real, fornece insights estratégicos e toma decisões inteligentes baseadas em IA.
              </p>
            </div>
          </div>

            <a href="/convite" target="_blank" rel="noopener" className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-200 text-lg mb-4">
              🚀 Ver Demonstração AGI→
            </a>
          <p className="text-blue-300 text-sm">Abre numa nova janela • Sistema AGI em produção</p>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="precos" className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-4">Planos e Preços</h2>
          <p className="text-xl text-blue-100 text-center mb-16 max-w-4xl mx-auto">
            Escolha o plano ideal para o seu negócio. Soluções flexíveis para todas as necessidades.
          </p>

          {/* Setup Solutions */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-white text-center mb-12">Setup Solutions</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Website Essencial */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-white font-bold text-xl">L</span>
                </div>
                <h4 className="text-2xl font-bold text-white mb-2">Website Essencial</h4>
                <p className="text-blue-100 mb-6">Perfeito para começar com credibilidade</p>
                <div className="text-4xl font-bold text-white mb-6">€397</div>
                <ul className="text-blue-100 space-y-3 mb-8">
                  <li>✓ Website institucional completo</li>
                  <li>✓ Domínio incluído</li>
                  <li>✓ SSL configurado</li>
                  <li>✓ Suporte técnico 3 meses</li>
                </ul>
                <a href="/#contato" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-colors">
                  Começar Website €397 →
                </a>
              </div>

              {/* Website Profissional */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-blue-400/50 hover:bg-white/15 transition-all duration-300 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center">
                    ⭐ Popular
                  </span>
                </div>
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-white font-bold text-xl">B</span>
                </div>
                <h4 className="text-2xl font-bold text-white mb-2">Website Profissional</h4>
                <p className="text-blue-100 mb-6">Ideal para negócios que querem escalar</p>
                <div className="text-4xl font-bold text-white mb-6">€697</div>
                <ul className="text-blue-100 space-y-3 mb-8">
                  <li>✓ Website com e-commerce</li>
                  <li>✓ Otimização SEO</li>
                  <li>✓ Branding parcial</li>
                  <li>✓ Suporte técnico 6 meses</li>
                </ul>
                <a href="/#contato" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-colors">
                  Escalar Negócio €697 →
                </a>
              </div>

              {/* Solução White Label */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-white font-bold text-xl">I</span>
                </div>
                <h4 className="text-2xl font-bold text-white mb-2">Solução White Label</h4>
                <p className="text-blue-100 mb-6">Plataforma CRSET personalizada para revenda ou empresas com equipa</p>
                <div className="text-4xl font-bold text-white mb-6">€1.497</div>
                <ul className="text-blue-100 space-y-3 mb-8">
                  <li>✓ Personalização total (layout, mascotes, domínio próprio)</li>
                  <li>✓ Branding completo</li>
                  <li>✓ Integrações técnicas avançadas</li>
                  <li>✓ Suporte prioritário 12 meses</li>
                  <li>✓ Deploy pronto a usar</li>
                </ul>
                <a href="/#contato" className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-4 rounded-lg transition-colors">
                  Dominar Mercado €1.497 →
                </a>
              </div>
            </div>
          </div>

          {/* SaaS Solutions */}
          <div>
            <h3 className="text-3xl font-bold text-white text-center mb-12">SaaS Solutions</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Starter */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-white font-bold text-xl">L</span>
                </div>
                <h4 className="text-2xl font-bold text-white mb-2">Starter</h4>
                <p className="text-blue-100 mb-6">Dashboard básico para equipas pequenas</p>
                <div className="text-4xl font-bold text-white mb-2">€29<span className="text-lg text-blue-300">/mês</span></div>
                <ul className="text-blue-100 space-y-3 mb-8">
                  <li>✓ Até 1.000 utilizadores</li>
                  <li>✓ Acesso a estatísticas essenciais</li>
                  <li>✓ Suporte por email</li>
                </ul>
                <a href="/#contato" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-colors">
                  Testar Starter €29/mês →
                </a>
              </div>

              {/* Profissional */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-blue-400/50 hover:bg-white/15 transition-all duration-300 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center">
                    ⭐ Popular
                  </span>
                </div>
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-white font-bold text-xl">B</span>
                </div>
                <h4 className="text-2xl font-bold text-white mb-2">Profissional</h4>
                <p className="text-blue-100 mb-6">Ideal para negócios em crescimento</p>
                <div className="text-4xl font-bold text-white mb-2">€59<span className="text-lg text-blue-300">/mês</span></div>
                <ul className="text-blue-100 space-y-3 mb-8">
                  <li>✓ Até 5.000 utilizadores</li>
                  <li>✓ Dashboard com automações e mascotes</li>
                  <li>✓ Suporte prioritário</li>
                </ul>
                <a href="/#contato" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-colors">
                  Crescer Profissional €59/mês →
                </a>
              </div>

              {/* Premium */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-white font-bold text-xl">I</span>
                </div>
                <h4 className="text-2xl font-bold text-white mb-2">Premium</h4>
                <p className="text-blue-100 mb-6">Máxima performance, IA e personalização</p>
                <div className="text-4xl font-bold text-white mb-2">€99<span className="text-lg text-blue-300">/mês</span></div>
                <ul className="text-blue-100 space-y-3 mb-8">
                  <li>✓ Utilizadores ilimitados</li>
                  <li>✓ IA integrada (Análise + Leads + Mascotes)</li>
                  <li>✓ Suporte 24/7</li>
                  <li>✓ Acesso a atualizações e melhorias</li>
                </ul>
                <a href="/#contato" className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-4 rounded-lg transition-colors">
                  Maximizar Premium €99/mês →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-4">
            Pronto para Começar?
          </h2>
          <p className="text-xl text-blue-100 text-center mb-16 max-w-3xl mx-auto">
            Entre em contacto connosco e descubra como as nossas soluções podem transformar o seu negócio digital.
          </p>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-8">Informações de Contato</h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl">📧</span>
                  </div>
                  <span className="text-blue-100 text-lg">crsetsolutions@gmail.com</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl">📱</span>
                  </div>
                  <span className="text-blue-100 text-lg">+351 914 423 688 (WhatsApp Only)</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl">🌍</span>
                  </div>
                  <span className="text-blue-100 text-lg">Portugal</span>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-white font-semibold mb-2">Nome</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                
                <div>
                  <label className="block text-white font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                
                <div>
                  <label className="block text-white font-semibold mb-2">Mensagem</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Descreva o seu projeto ou necessidades..."
                    className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Mensagem 🚀'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">C</span>
            </div>
            <span className="text-white font-bold text-lg">CRSET Solutions</span>
          </div>
          <p className="text-blue-200 mb-2">© 2025 CRSET Solutions • Soluções Digitais Inteligentes</p>
          <p className="text-blue-300 text-sm">Soluções Digitais Inteligentes com Boris, Laya e Irina</p>
          
          <div className="mt-6">
            <a href="/convite" className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold py-2 px-6 rounded-lg transition-all duration-200">🔥 Convite Beta Exclusivo</a>
          </div>
        </div>
      </footer>

      {/* WhatsApp Float Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="https://wa.me/351914423688"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center text-white text-2xl shadow-lg transition-all duration-200 hover:scale-110"
        >
          📱
        </a>
      </div>
    </div>
  );
}
