import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Check, 
  Star, 
  ArrowRight, 
  Building2, 
  Calendar, 
  ShoppingCart, 
  FileText,
  Zap,
  Shield,
  Headphones,
  Sparkles
} from "lucide-react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export const metadata: Metadata = {
  title: "Pricing - CRSET Solutions",
  description: "Simple and transparent plans. Focus on results, no surprises. Prices without VAT, customizations upon request.",
  alternates: {
    canonical: "https://crsetsolutions.com/en/pricing",
    languages: {
      'pt': 'https://crsetsolutions.com/precos',
      'en': 'https://crsetsolutions.com/en/pricing',
    },
  },
};

const mainPlans = [
  {
    name: "Essential",
    subtitle: "To get started",
    setup: "990 EUR",
    monthly: "79 EUR/month",
    description: "Perfect for small businesses that want to get started quickly with a professional digital presence.",
    features: [
      "CRSET ready-to-use site",
      "Email lead capture (Resend)",
      "Basic updates included",
      "Email support",
      "SSL and automatic backup",
      "Basic analytics"
    ],
    highlight: false,
    icon: Zap,
    color: "blue"
  },
  {
    name: "Pro",
    subtitle: "Most popular",
    setup: "2.900 EUR",
    monthly: "149 EUR/month", 
    description: "The ideal choice for companies that want intelligent automation and integration with existing tools.",
    features: [
      "Everything from Essential",
      "Marketing automations",
      "Leads + Notion/Supabase integrations",
      "Detailed reports",
      "Priority support",
      "Custom integrations",
      "Metrics dashboard"
    ],
    highlight: true,
    icon: Star,
    color: "primary"
  },
  {
    name: "Enterprise",
    subtitle: "Maximum flexibility",
    setup: "5.900 EUR",
    monthly: "299 EUR/month",
    description: "Complete solution for large organizations with specific needs and security requirements.",
    features: [
      "Everything from Pro",
      "Custom layouts and modules",
      "Guaranteed priority SLA",
      "Unlimited advanced integrations",
      "Strategic consulting",
      "Security audit",
      "24/7 dedicated support"
    ],
    highlight: false,
    icon: Shield,
    color: "gray"
  }
];

export default function PricingPageEN() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/20 to-pink-50/10">
      {/* Header */}
      <div className="container mx-auto max-w-7xl px-4 py-16">
        {/* Language Switcher */}
        <div className="mb-8 flex items-center justify-end">
          <LanguageSwitcher />
        </div>
        
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200/50 shadow-sm mb-6">
            <Sparkles className="h-4 w-4 text-purple-600" />
            <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Transparent pricing
            </span>
          </div>
          
          <h1 className="font-display text-5xl md:text-7xl font-black mb-6 leading-tight">
            <span className="block text-slate-900">Plans & Pricing</span>
            <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
              for every budget
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Simple and transparent plans. Focus on results, no surprises.
            <br className="hidden md:block" />
            Prices without VAT, customizations upon request.
          </p>
        </div>

        {/* Main Plans Grid */}
        <div className="grid gap-8 md:grid-cols-3 mb-20">
          {mainPlans.map((plan, index) => (
            <div 
              key={index}
              className={`relative group ${plan.highlight ? 'md:scale-105 md:z-10' : ''}`}
            >
              {/* Gradient border wrapper */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${
                plan.highlight 
                  ? 'from-purple-600 via-pink-600 to-orange-500' 
                  : 'from-purple-300 to-pink-300'
              } rounded-3xl opacity-75 group-hover:opacity-100 blur group-hover:blur-md transition duration-300`}></div>
              
              {/* Card content */}
              <div className="relative bg-white rounded-3xl p-8 h-full flex flex-col">
                {/* Highlight Badge */}
                {plan.highlight && (
                  <div className="absolute top-6 right-6 px-4 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg">
                    Most Popular
                  </div>
                )}

                {/* Icon */}
                <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${
                  plan.highlight 
                    ? 'from-purple-600 to-pink-600' 
                    : 'from-purple-400 to-pink-400'
                } mb-6 shadow-lg w-fit`}>
                  <plan.icon className="h-8 w-8 text-white" />
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                <p className="text-sm text-purple-600 font-semibold mb-4">{plan.subtitle}</p>
                <p className="text-slate-600 mb-6 flex-grow">{plan.description}</p>
                
                {/* Price */}
                <div className="mb-8">
                  <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {plan.monthly}
                  </p>
                  <p className="text-sm text-slate-500 mt-2">Setup: {plan.setup}</p>
                </div>
                
                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {/* CTA Button */}
                <Button 
                  asChild
                  className={`w-full ${
                    plan.highlight 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white' 
                      : 'border-2 border-purple-300 text-purple-700 hover:bg-purple-50'
                  } font-semibold py-6 rounded-xl transition-all duration-300`}
                >
                  <Link href="/en/contact" className="flex items-center justify-center gap-2">
                    Get Started
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 text-center">
          <h2 className="text-4xl font-bold mb-6 text-slate-900">
            Questions about pricing?
          </h2>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Check our FAQ or contact our team for a custom quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50 px-8 py-6 text-lg font-bold rounded-2xl"
            >
              <Link href="/en/help">View FAQ</Link>
            </Button>
            <Button 
              asChild
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg font-bold rounded-2xl shadow-xl hover:shadow-glow-purple transition-all duration-300"
            >
              <Link href="/en/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
