'use client'

import { useState } from 'react';
import Image from 'next/image';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || '';

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
        name: formData.company || 'Empresa nao informada',
        email: formData.email,
        message: `Analise gratuita solicitada para: ${formData.company || 'empresa'}`,
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
              content_name: 'Analise Gratuita',
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
      console.error('Erro ao enviar formulario:', error);
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
            <a href="/#contacto" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 text-lg rounded-lg transition-all duration-200 font-semibold">Comecar Agora </a>
            <a href="/#precos" className="border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-8 py-3 text-lg rounded-lg transition-all duration-200 font-semibold">Ver Precos °</a>
          </div>
        </div>
      )}

      {/* Mascotes Section */}
      <section id="mascotes" className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-4">
            Conheca as Nossas Mascotes
          </h2>
          <p className="text-xl text-blue-100 text-center mb-16 max-w-4xl mx-auto">
            Cada mascote representa uma area de especializacao, trabalhando em conjunto para oferecer solucoes completas e personalizadas.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Boris */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-blue-400">
                <Image
                  src="/boris_real.webp"
                  alt="Boris - Especialista em Automacao"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Boris</h3>
              <p className="text-blue-300 font-semibold mb-4">Especialista em Automacao</p>
              <p className="text-blue-100">
                Automatiza processos complexos e garante a seguranca dos seus sistemas
              </p>
            </div>

            {/* Laya */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-orange-400">
                <Image
                  src="/laya_real.webp"
                  alt="Laya - Especialista em Comunicacao"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Laya</h3>
              <p className="text-orange-300 font-semibold mb-4">Especialista em Comunicacao</p>
              <p className="text-blue-100">
                Organiza e otimiza a comunicacao digital da sua empresa
              </p>
            </div>

            {/* Irina */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-purple-400">
                <Image
                  src="/irina_real.webp"
                  alt="Irina - Especialista em Seguranca"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Irina</h3>
              <p className="text-purple-300 font-semibold mb-4">Especialista em Seguranca</p>
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
          <div className="text-6xl mb-6">–</div>
          <h2 className="text-4xl font-bold text-white mb-4">AGI Commander</h2>
          <h3 className="text-2xl text-blue-300 mb-8">Automacao com Inteligencia Artificial</h3>
          <p className="text-xl text-blue-100 mb-12 max-w-4xl mx-auto">
            Conversas inteligentes, mascotes personalizadas e decisoes automatizadas. A proxima geracao da tua empresa comeca aqui.
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
              <p className="text-blue-300 font-semibold mb-3">Seguranca & Automacao</p>
              <p className="text-blue-100 text-sm">
                Automatiza processos complexos, garante a seguranca dos sistemas e otimiza fluxos de trabalho com inteligencia artificial avancada.
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
              <p className="text-orange-300 font-semibold mb-3">Comunicacao & Organizacao</p>
              <p className="text-blue-100 text-sm">
                Organiza e otimiza a comunicacao digital, gere equipas remotas e coordena projetos com eficiencia maxima.
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
                Analisa dados em tempo real, fornece insights estrategicos e toma decisoes inteligentes baseadas em IA.
              </p>
            </div>
          </div>

            <a href="/demo" target="_blank" rel="noopener" className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-200 text-lg mb-4">
              € Ver Demonstracao AGI
            </a>
          <p className="text-blue-300 text-sm">Abre numa nova janela - Sistema AGI em producao</p>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="precos" className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-4">Planos e Precos</h2>
          <p className="text-xl text-blue-100 text-center mb-16 max-w-4xl mx-auto">
            Escolha o plano ideal para o seu negocio. Solucoes flexiveis para todas as necessidades.
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
                <p className="text-blue-100 mb-6">Perfeito para comecar com credibilidade</p>
                <div className="text-4xl font-bold text-white mb-6">EUR397</div>
                <ul className="text-blue-100 space-y-3 mb-8">
                  <li> Website institucional completo</li>
                  <li> Dominio incluido</li>
                  <li> SSL configurado</li>
                  <li> Suporte tecnico 3 meses</li>
                </ul>
                <a href="/#contacto" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-colors">
                  Comecar Website EUR397 
                </a>
              </div>

              {/* Website Profissional */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-blue-400/50 hover:bg-white/15 transition-all duration-300 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center">
                     Popular
                  </span>
                </div>
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-white font-bold text-xl">B</span>
                </div>
                <h4 className="text-2xl font-bold text-white mb-2">Website Profissional</h4>
                <p className="text-blue-100 mb-6">Ideal para negocios que querem escalar</p>
                <div className="text-4xl font-bold text-white mb-6">EUR697</div>
                <ul className="text-blue-100 space-y-3 mb-8">
                  <li> Website com e-commerce</li>
                  <li> Otimizacao SEO</li>
                  <li> Branding parcial</li>
                  <li> Suporte tecnico 6 meses</li>
                </ul>
                <a href="/#contacto" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-colors">
                  Escalar Negocio EUR697 
                </a>
              </div>

              {/* Solucao White Label */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-white font-bold text-xl">I</span>
                </div>
                <h4 className="text-2xl font-bold text-white mb-2">Solucao White Label</h4>
                <p className="text-blue-100 mb-6">Plataforma CRSET personalizada para revenda ou empresas com equipa</p>
                <div className="text-4xl font-bold text-white mb-6">EUR1.497</div>
                <ul className="text-blue-100 space-y-3 mb-8">
                  <li> Personalizacao total (layout, mascotes, dominio proprio)</li>
                  <li> Branding completo</li>
                  <li> Integracoes tecnicas avancadas</li>
                  <li> Suporte prioritario 12 meses</li>
                  <li> Deploy pronto a usar</li>
                </ul>
                <a href="/#contacto" className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-4 rounded-lg transition-colors">
                  Dominar Mercado EUR1.497 
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
                <p className="text-blue-100 mb-6">Dashboard basico para equipas pequenas</p>
                <div className="text-4xl font-bold text-white mb-2">EUR29<span className="text-lg text-blue-300">/mes</span></div>
                <ul className="text-blue-100 space-y-3 mb-8">
                  <li> Ate 1.000 utilizadores</li>
                  <li> Acesso a estatisticas essenciais</li>
                  <li> Suporte por email</li>
                </ul>
                <a href="/#contacto" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-colors">
                  Testar Starter EUR29/mes 
                </a>
              </div>

              {/* Profissional */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-blue-400/50 hover:bg-white/15 transition-all duration-300 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center">
                     Popular
                  </span>
                </div>
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-white font-bold text-xl">B</span>
                </div>
                <h4 className="text-2xl font-bold text-white mb-2">Profissional</h4>
                <p className="text-blue-100 mb-6">Ideal para negocios em crescimento</p>
                <div className="text-4xl font-bold text-white mb-2">EUR59<span className="text-lg text-blue-300">/mes</span></div>
                <ul className="text-blue-100 space-y-3 mb-8">
                  <li> Ate 5.000 utilizadores</li>
                  <li> Dashboard com automacoes e mascotes</li>
                  <li> Suporte prioritario</li>
                </ul>
                <a href="/#contacto" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-colors">
                  Crescer Profissional EUR59/mes 
                </a>
              </div>

              {/* Premium */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-white font-bold text-xl">I</span>
                </div>
                <h4 className="text-2xl font-bold text-white mb-2">Premium</h4>
                <p className="text-blue-100 mb-6">Maxima performance, IA e personalizacao</p>
                <div className="text-4xl font-bold text-white mb-2">EUR99<span className="text-lg text-blue-300">/mes</span></div>
                <ul className="text-blue-100 space-y-3 mb-8">
                  <li> Utilizadores ilimitados</li>
                  <li> IA integrada (Analise + Leads + Mascotes)</li>
                  <li> Suporte 24/7</li>
                  <li> Acesso a atualizacoes e melhorias</li>
                </ul>
                <a href="/#contacto" className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-4 rounded-lg transition-colors">
                  Maximizar Premium EUR99/mes 
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      

      {/* Footer */}
      <footer className="relative z-10 px-6 py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">C</span>
            </div>
            <span className="text-white font-bold text-lg">CRSET Solutions</span>
          </div>
          <p className="text-blue-200 mb-2"> 2025 CRSET Solutions - Solucoes Digitais Inteligentes</p>
          <p className="text-blue-300 text-sm">Solucoes Digitais Inteligentes com Boris, Laya e Irina</p>
          
          <div className="mt-6">
            <a href="/demo" className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold py-2 px-6 rounded-lg transition-all duration-200">¥ Convite Beta Exclusivo</a>
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
          ±
        </a>
      </div>
    </div>
  );
}
