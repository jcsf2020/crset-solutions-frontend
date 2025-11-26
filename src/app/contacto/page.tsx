import type { Metadata } from "next";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export const metadata: Metadata = {
  title: "Contacto - CRSET Solutions",
  description: "Entre em contacto connosco. Estamos aqui para ajudar a transformar o seu negócio.",
  alternates: {
    canonical: "https://crsetsolutions.com/contacto",
    languages: {
      'pt': 'https://crsetsolutions.com/contacto',
      'en': 'https://crsetsolutions.com/en/contact',
    },
  },
};

export default function ContactPagePT() {
  return (
    <div className="min-h-screen">
      {/* Header Navigation */}
      <header className="container mx-auto max-w-7xl px-4 py-6">
        <div className="flex items-center justify-between">
          <a href="/" className="text-2xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            CRSET
          </a>
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <a href="/" className="hover:text-purple-600 transition-colors">Início</a>
            <a href="/servicos" className="hover:text-purple-600 transition-colors">Serviços</a>
            <a href="/precos" className="hover:text-purple-600 transition-colors">Planos & Preços</a>
            <a href="/ajuda" className="hover:text-purple-600 transition-colors">Ajuda</a>
            <a href="https://agi.crsetsolutions.com" className="hover:text-purple-600 transition-colors">Demo AGI</a>
            <LanguageSwitcher />
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Entre em Contacto</h1>
            <p className="text-xl">
              Estamos aqui para ajudar a transformar o seu negócio.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Envie-nos uma mensagem</h2>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block font-medium mb-2">
                    Nome *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="O seu nome"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="seu@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block font-medium mb-2">
                    Empresa
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="A sua empresa"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block font-medium mb-2">
                    Mensagem *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Fale-nos sobre o seu projeto..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition"
                >
                  Enviar mensagem
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Informações de Contacto</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="text-2xl mr-4">📧</div>
                  <div>
                    <h3 className="font-bold mb-1">Email</h3>
                    <a href="mailto:crsetsolutions@gmail.com" className="text-purple-600 hover:underline">
                      crsetsolutions@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="text-2xl mr-4">📞</div>
                  <div>
                    <h3 className="font-bold mb-1">WhatsApp (24/7)</h3>
                    <a href="https://wa.me/351914423688" className="text-purple-600 hover:underline" target="_blank" rel="noopener noreferrer">
                      +351 914 423 688
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="text-2xl mr-4">📍</div>
                  <div>
                    <h3 className="font-bold mb-1">Endereço</h3>
                    <p className="text-gray-600">
                      Vila Nova de Gaia, Porto, Portugal
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="text-2xl mr-4">🕐</div>
                  <div>
                    <h3 className="font-bold mb-1">Disponibilidade</h3>
                    <p className="text-gray-600">
                      WhatsApp: 24/7<br />
                      Email: Resposta em 24h
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-12">
                <h3 className="font-bold mb-4">Siga-nos</h3>
                <div className="flex gap-4">
                  <a href="#" className="text-gray-600 hover:text-purple-600 transition">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-600 hover:text-purple-600 transition">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gray-300 h-96 rounded-lg flex items-center justify-center">
            <p className="text-gray-600 text-lg">Mapa - Vila Nova de Gaia, Porto, Portugal</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto max-w-7xl px-4 py-12 text-center text-sm text-slate-600">
        <p>
          © 2025 CRSET Solutions. Links rápidos:{" "}
          <a className="underline hover:text-purple-600 transition-colors" href="/servicos">Serviços</a> ·{" "}
          <a className="underline hover:text-purple-600 transition-colors" href="/precos">Preços</a> ·{" "}
          <a className="underline hover:text-purple-600 transition-colors" href="/ajuda">Ajuda</a>
        </p>
      </footer>
    </div>
  );
}
