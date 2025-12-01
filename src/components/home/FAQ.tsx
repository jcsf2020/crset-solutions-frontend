'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function FAQ() {
  const faqs = [
    {
      question: "How long does implementation take?",
      answer: "Implementation time varies depending on project complexity, but typically between 2 to 8 weeks."
    },
    {
      question: "Do you offer support after implementation?",
      answer: "Yes, all our plans include ongoing support. The level of support varies depending on the chosen plan."
    },
    {
      question: "Can I cancel at any time?",
      answer: "Yes, you can cancel your plan at any time without penalties."
    },
    {
      question: "What technologies do you work with?",
      answer: "We work with the latest technologies, including Python, Node.js, React, Next.js, and AI tools like OpenAI and Anthropic."
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600">
            Find answers to your questions
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
              Ready to get started?
            </h3>
            <p className="text-slate-700 mb-6">
              Choose your starting point. No long-term commitments.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="rounded-xl px-8 py-3">
              <Link href="/en/services">View Services</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-xl px-8 py-3">
              <Link href="/en/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
