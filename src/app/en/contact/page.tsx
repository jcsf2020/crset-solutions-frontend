import type { Metadata } from "next";
import Link from "next/link";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact - CRSET Solutions",
  description: "Get in touch with us. We're here to help transform your business.",
  alternates: {
    canonical: "https://crsetsolutions.com/en/contact",
    languages: {
      'pt': 'https://crsetsolutions.com/contacto',
      'en': 'https://crsetsolutions.com/en/contact',
    },
  },
};

export default function ContactPageEN() {
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
            <Link href="/en/contact" className="text-purple-600 font-semibold">Contact</Link>
          </nav>
          <LanguageSwitcher />
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl">
              Get in touch with us. We're here to help transform your business.
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
              <h2 className="text-3xl font-bold mb-6">Send us a message</h2>
              <form className="space-y-6" action="/api/contact" method="POST">
                <div>
                  <label htmlFor="name" className="block font-medium mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Your name"
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
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block font-medium mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Your company"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition"
                >
                  Send message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6">Get in touch</h3>
                <p className="text-gray-600 mb-8">
                  Have a question or want to discuss your project? We'd love to hear from you. Reach out using any of the methods below.
                </p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-6">
                {/* Phone */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">Phone</h4>
                    <p className="text-gray-600">+351 914 423 688</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600">crsetsolutions@gmail.com</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">Location</h4>
                    <p className="text-gray-600">Vila Nova de Gaia, Porto, Portugal</p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">24/7 Service</h4>
                    <p className="text-gray-600">We're available around the clock to support your needs</p>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-gray-900 mb-2">Prefer WhatsApp?</h4>
                <p className="text-gray-600 mb-4">Chat with us directly on WhatsApp for quick responses.</p>
                <a
                  href="https://wa.me/351914423688?text=Hi! I would like to know more about CRSET services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition"
                >
                  WhatsApp direct
                </a>
              </div>
            </div>
          </div>
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
                <li><Link href="/en/help" className="hover:text-white transition">Help</Link></li>
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
