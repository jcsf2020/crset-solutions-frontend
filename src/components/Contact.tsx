"use client";
import { useState } from "react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [errors, setErrors] = useState({ name: "", email: "", msg: "" });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const to = "crsetsolutions@gmail.com";
    const subject = encodeURIComponent("Contato CRSET - " + name);
    const body = encodeURIComponent(
      `Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${msg}`
    );
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contacto" className="py-14 md:py-20" aria-label="Contacto">
      <div className="container-pro grid gap-8 md:grid-cols-2 items-start">
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Fala connosco</h2>
          <p className="muted max-w-prose">Resposta rapida em horario comercial. Se preferires, usa WhatsApp.</p>
          <a
            href="https://wa.me/351914423688?text=Quero%20demo%20CRSET"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary px-5 py-3 inline-flex"
          >
            Abrir WhatsApp
          </a>
        </div>

        <form onSubmit={onSubmit} className="card p-6 md:p-7 space-y-4">
          <div>
            <label htmlFor="contact-name" className="text-sm font-medium">Nome</label>
            <input
              id="contact-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
              placeholder="O teu nome"
              aria-describedby={errors.name ? "contact-name-error" : undefined}
            />
            {errors.name && (
              <div id="contact-name-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.name}
              </div>
            )}
          </div>
          <div>
            <label htmlFor="contact-email" className="text-sm font-medium">Email</label>
            <input
              id="contact-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
              placeholder="teu@email.com"
              aria-describedby={errors.email ? "contact-email-error" : undefined}
            />
            {errors.email && (
              <div id="contact-email-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.email}
              </div>
            )}
          </div>
          <div>
            <label htmlFor="contact-message" className="text-sm font-medium">Mensagem</label>
            <textarea
              id="contact-message"
              required
              rows={5}
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
              placeholder="Como podemos ajudar?"
              aria-describedby={errors.msg ? "contact-message-error" : undefined}
            />
            {errors.msg && (
              <div id="contact-message-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.msg}
              </div>
            )}
          </div>
          <div className="flex gap-3">
            <button type="submit" className="btn-primary px-5 py-3">Enviar por email</button>
            <a href="https://wa.me/351914423688?text=Quero%20demo%20CRSET" target="_blank" rel="noopener noreferrer" className="btn-secondary px-5 py-3">WhatsApp</a>
          </div>
        </form>
      </div>
    </section>
  );
}
