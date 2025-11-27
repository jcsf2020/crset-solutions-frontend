'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export function FAQ() {
  const t = useTranslations();

  const faqs = [
    {
      question: t('faq.q1.question'),
      answer: t('faq.q1.answer')
    },
    {
      question: t('faq.q2.question'),
      answer: t('faq.q2.answer')
    },
    {
      question: t('faq.q3.question'),
      answer: t('faq.q3.answer')
    },
    {
      question: t('faq.q4.question'),
      answer: t('faq.q4.answer')
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-4">
            {t('faq.title')}
          </h2>
          <p className="text-slate-600">
            {t('faq.subtitle')}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-12">
          {faqs.map((faq, index) => (
            <div key={index} className="rounded-lg border p-6">
              <h3 className="font-semibold mb-3 text-sm">
                {faq.question}
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Final */}
        <div className="text-center space-y-6">
          <div>
            <h3 className="text-2xl font-semibold mb-3">
              {t('homepage.cta.readyToStart')}
            </h3>
            <p className="text-slate-700 mb-6">
              {t('homepage.cta.description')}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="rounded-xl px-8 py-3">
              <Link href="/servicos">{t('nav.services')}</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-xl px-8 py-3">
              <Link href="/precos">{t('nav.pricing')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
