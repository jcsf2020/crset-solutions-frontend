"use client";

import { useState } from "react";

export default function WizardPage() {
  const [step, setStep] = useState(1);
  const steps = 3;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white p-6">
      <div className="max-w-xl w-full bg-white/10 backdrop-blur-lg rounded-2xl p-10 shadow-2xl border border-white/20">
        {/* Progress bar */}
        <div className="mb-6">
          <p className="text-sm mb-2">Passo {step} de {steps}</p>
          <div className="w-full bg-white/20 h-2 rounded-full">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / steps) * 100}%` }}
            />
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-6">Setup Rapido</h1>

        {step === 1 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">1. Qual o teu negocio?</h2>
            <input
              type="text"
              placeholder="Ex: Imobiliaria, Consultoria..."
              className="w-full p-3 rounded-lg text-black mb-6"
            />
            <button onClick={() => setStep(2)} className="btn-primary w-full py-3 text-lg">
              Continuar ->
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">2. Quais canais vais usar?</h2>
            <div className="flex gap-3 mb-6">
              <button className="btn-secondary w-full">Email</button>
              <button className="btn-secondary w-full">WhatsApp</button>
              <button className="btn-secondary w-full">Ambos</button>
            </div>
            <button onClick={() => setStep(3)} className="btn-primary w-full py-3 text-lg">
              Continuar ->
            </button>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">3. Escolhe um template</h2>
            <ul className="space-y-3 mb-6">
              <li><button className="btn-secondary w-full">Funil Basico</button></li>
              <li><button className="btn-secondary w-full">Follow-up Automatico</button></li>
              <li><button className="btn-secondary w-full">Nurture Leads</button></li>
            </ul>
            <button
              onClick={() => alert("OK Onboarding concluido!")}
              className="btn-primary w-full py-3 text-lg"
            >
              Finalizar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
