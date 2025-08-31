'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function StartPage() {
  const router = useRouter();
  const params = useSearchParams();
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [plan, setPlan] = useState(params.get('plan') || 'profissional');

  useEffect(()=> {
    const p = params.get('plan');
    if (p) setPlan(p);
  }, [params]);

  function next() { setStep(s => Math.min(3, s+1)); }
  function prev() { setStep(s => Math.max(1, s-1)); }

  async function finish() {
    // TODO: ligar ao backend/Stripe; placeholder por agora
    router.push(`/precos`);
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-2xl md:text-3xl font-semibold">Comecar</h1>
      <p className="opacity-80 mt-2">3 passos rapidos e estas dentro.</p>

      <div className="mt-8 border rounded-2xl p-6">
        {step === 1 && (
          <div>
            <label className="block text-sm opacity-80 mb-2">Nome</label>
            <input value={name} onChange={e=>setName(e.target.value)} className="w-full border rounded-lg p-3" placeholder="O teu nome" />
            <button onClick={next} className="mt-6 px-4 py-3 rounded-xl bg-black text-white w-full">Continuar</button>
          </div>
        )}
        {step === 2 && (
          <div>
            <label className="block text-sm opacity-80 mb-2">Email</label>
            <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full border rounded-lg p-3" placeholder="email@dominio.com" />
            <div className="flex gap-2 mt-6">
              <button onClick={prev} className="flex-1 px-4 py-3 rounded-xl border">Voltar</button>
              <button onClick={next} className="flex-1 px-4 py-3 rounded-xl bg-black text-white">Continuar</button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div>
            <label className="block text-sm opacity-80 mb-2">Plano</label>
            <select value={plan} onChange={e=>setPlan(e.target.value)} className="w-full border rounded-lg p-3">
              <option value="essencial">Essencial</option>
              <option value="profissional">Profissional</option>
              <option value="enterprise">Enterprise</option>
            </select>
            <div className="flex gap-2 mt-6">
              <button onClick={prev} className="flex-1 px-4 py-3 rounded-xl border">Voltar</button>
              <button onClick={finish} className="flex-1 px-4 py-3 rounded-xl bg-black text-white">Ir para Checkout</button>
            </div>
          </div>
        )}
      </div>

      <p className="text-xs opacity-60 mt-4">Nota: checkout Stripe liga-se na fase final.</p>
    </div>
  );
}
