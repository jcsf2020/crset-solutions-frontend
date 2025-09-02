import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center px-4">
      <div className="text-center">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl font-bold">C</span>
          </div>
          <h1 className="text-white text-xl font-semibold">CRSET Solutions</h1>
        </div>

        {/* 404 Content */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 max-w-md mx-auto border border-white/20">
          <div className="text-6xl font-bold text-white mb-4">404</div>
          <h2 className="text-2xl font-bold text-white mb-4">Pagina Nao Encontrada</h2>
          <p className="text-white/80 mb-8 leading-relaxed">
            Oops! A pagina que procuras nao existe ou foi movida. 
            Que tal explorares as nossas solucoes digitais inteligentes?
          </p>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Link 
              href="/"
              className="block w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
            >
              Â  Voltar ao Inicio
            </Link>
            
            <Link 
              href="/convite"
              className="block w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-orange-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105"
            >
               Convite Beta Exclusivo
            </Link>
            
            <Link 
              href="https://crsetsolutions.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-gradient-to-r from-green-500 to-teal-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-green-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105"
            >
              --- Ver Demo AGI
            </Link>
          </div>

          {/* Contact Info */}
          <div className="mt-8 pt-6 border-t border-white/20">
            <p className="text-white/60 text-sm mb-4">Precisas de ajuda?</p>
            <div className="flex justify-center space-x-4">
              <a 
                href="https://wa.me/351914423688" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-400 hover:text-green-300 transition-colors"
              >
                + WhatsApp
              </a>
              <a 
                href="mailto:crsetsolutions@gmail.com"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                S Email
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-white/40 text-sm">
           2025 CRSET Solutions - Solucoes Digitais Inteligentes
        </div>
      </div>
    </div>
  )
}

