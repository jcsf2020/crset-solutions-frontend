import type { Metadata } from "next";
import Link from "next/link";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export const metadata: Metadata = {
  title: "Help & FAQ - CRSET Solutions",
  description: "Find answers to your questions about our services, pricing, and support.",
  alternates: {
    canonical: "https://crsetsolutions.com/en/help",
    languages: {
      'pt': 'https://crsetsolutions.com/ajuda',
      'en': 'https://crsetsolutions.com/en/help',
    },
  },
};

export default function HelpPageEN() {
  const faqs = [
    {
      category: "General",
      questions: [
        {
          q: "What services does CRSET Solutions offer?",
          a: "We offer process automation, cybersecurity, software development, and technology consulting services."
        },
        {
          q: "How long does implementation take?",
          a: "Implementation time varies depending on project complexity, but typically between 2 to 8 weeks."
        },
        {
          q: "Do you work with small businesses?",
          a: "Yes! We have solutions for businesses of all sizes, from startups to large enterprises."
        }
      ]
    },
    {
      category: "Pricing & Plans",
      questions: [
        {
          q: "What payment methods do you accept?",
          a: "We accept credit cards, bank transfers, and PayPal. For Enterprise plans, we can arrange custom payment terms."
        },
        {
          q: "Can I change plans at any time?",
          a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately."
        },
        {
          q: "Do you offer refunds?",
          a: "We offer a 30-day money-back guarantee for all plans. If you're not satisfied, we'll refund your payment."
        },
        {
          q: "Are there any setup fees?",
          a: "No, there are no setup fees. The price you see is the price you pay."
        }
      ]
    },
    {
      category: "Technical Support",
      questions: [
        {
          q: "What support channels are available?",
          a: "We offer support via email, phone, and live chat. Enterprise clients get dedicated support with guaranteed response times."
        },
        {
          q: "Do you offer support after implementation?",
          a: "Yes, all our plans include ongoing support. The level of support varies depending on the chosen plan."
        },
        {
          q: "What are your support hours?",
          a: "Essential and Pro plans have support during business hours (9am-6pm). Enterprise plans include 24/7 support."
        }
      ]
    },
    {
      category: "Technology",
      questions: [
        {
          q: "What technologies do you work with?",
          a: "We work with the latest technologies, including Python, Node.js, React, Next.js, and AI tools like OpenAI and Anthropic."
        },
        {
          q: "Can you integrate with our existing systems?",
          a: "Yes! We specialize in system integration and can connect with most existing platforms and tools."
        },
        {
          q: "Do you provide training?",
          a: "Yes, all implementations include training for your team. Additional training sessions can be arranged as needed."
        }
      ]
    },
    {
      category: "Security & Compliance",
      questions: [
        {
          q: "How do you ensure data security?",
          a: "We follow industry best practices including encryption, secure authentication, regular audits, and compliance with GDPR and other regulations."
        },
        {
          q: "Where is data stored?",
          a: "Data is stored in secure EU-based data centers with redundancy and backup systems."
        },
        {
          q: "Are you GDPR compliant?",
          a: "Yes, all our services are fully GDPR compliant. We can provide documentation upon request."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Header Navigation */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/en" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            CRSET<br />Solutions
          </Link>
          <nav className="hidden md:flex gap-8">
            <Link href="/en" className="text-gray-600 hover:text-purple-600 transition">Home</Link>
            <Link href="/en/services" className="text-gray-600 hover:text-purple-600 transition">Services</Link>
            <Link href="/en/pricing" className="text-gray-600 hover:text-purple-600 transition">Pricing</Link>
            <Link href="/en/help" className="text-purple-600 font-semibold">Help</Link>
          </nav>
          <LanguageSwitcher />
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Help & FAQ</h1>
            <p className="text-xl">
              Find answers to your questions
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {faqs.map((category, catIndex) => (
              <div key={catIndex}>
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {category.category}
                </h2>
                <div className="space-y-6">
                  {category.questions.map((faq, qIndex) => (
                    <div key={qIndex} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                      <h3 className="font-bold text-xl mb-3 text-gray-900">{faq.q}</h3>
                      <p className="text-gray-600">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Didn't find what you were looking for?
          </h2>
          <p className="text-xl mb-8">
            Our team is here to help answer your questions
          </p>
          <Link
            href="/en/contact"
            className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block"
          >
            Contact us
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold mb-4">CRSET Solutions</h3>
              <p className="text-sm">Smart solutions for your business</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/en" className="hover:text-white transition">Home</Link></li>
                <li><Link href="/en/services" className="hover:text-white transition">Services</Link></li>
                <li><Link href="/en/pricing" className="hover:text-white transition">Pricing</Link></li>
                <li><Link href="/en/contact" className="hover:text-white transition">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy" className="hover:text-white transition">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition">Terms</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <p className="text-sm">Email: crsetsolutions@gmail.com</p>
              <p className="text-sm">WhatsApp: +351 914 423 688</p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-sm">
            <p>&copy; 2025 CRSET Solutions. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
