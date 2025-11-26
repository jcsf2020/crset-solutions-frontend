import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { 
  Rocket, 
  Bot, 
  Database, 
  Building2, 
  ArrowRight, 
  Clock, 
  CheckCircle,
  ExternalLink,
  Sparkles
} from "lucide-react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export const metadata: Metadata = {
  title: "Services - CRSET Solutions",
  description: "Complete solutions for your business: automation, cybersecurity, development, and consulting.",
  alternates: {
    canonical: "https://crsetsolutions.com/en/services",
    languages: {
      'pt': 'https://crsetsolutions.com/servicos',
      'en': 'https://crsetsolutions.com/en/services',
    },
  },
};

const services = [
  {
    icon: Rocket,
    title: "Quick Launch",
    subtitle: "1–2 weeks",
    price: "From 2,500 EUR",
    description: "Complete solution to get started quickly with robust infrastructure and optimized processes.",
    features: [
      "Optimized landing + lead capture",
      "CRM/Supabase integration + email workflows",
      "Basic reports and automatic alerts",
      "Automated deployment and monitoring",
      "Technical support for 30 days"
    ],
    highlight: "Most popular",
    gradient: "from-blue-500 to-cyan-500",
    glowColor: "shadow-glow-purple"
  },
  {
    icon: Bot,
    title: "AGI & Automation",
    subtitle: "Applied intelligence",
    price: "From 4,000 EUR",
    description: "Intelligent assistants and process automation with cutting-edge technology.",
    features: [
      "Process-oriented assistants and chatbots",
      "Integrations with Notion, Gmail, Slack and webhooks",
      "Guardrails, metrics and 'human-in-the-loop' mode",
      "Custom training and continuous optimization",
      "Performance dashboard and analytics"
    ],
    highlight: "Innovation",
    gradient: "from-purple-500 to-pink-500",
    glowColor: "shadow-glow-purple"
  },
  {
    icon: Database,
    title: "Integrations & Data",
    subtitle: "Connected ecosystem",
    price: "From 3,200 EUR",
    description: "Connect all your systems and have full visibility of your data and processes.",
    features: [
      "Stripe, Resend, Supabase and third-party services",
      "Health dashboards (status/metrics) and telemetry",
      "CI/CD, monitoring and E2E testing",
      "Robust APIs and complete documentation",
      "Automatic backup and disaster recovery"
    ],
    highlight: "Essential",
    gradient: "from-teal-500 to-emerald-500",
    glowColor: "shadow-glow-pink"
  },
  {
    icon: Building2,
    title: "Enterprise Solutions",
    subtitle: "Scale and security",
    price: "Upon request",
    description: "Customized solutions for large organizations with specific requirements.",
    features: [
      "Customized and scalable architecture",
      "GDPR compliance and security audit",
      "Integration with legacy systems",
      "Dedicated SLA and priority support",
      "Strategic consulting and technical roadmap"
    ],
    highlight: "Premium",
    gradient: "from-slate-700 to-slate-900",
    glowColor: "shadow-xl"
  }
];

export default function ServicesPageEN() {
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
              Choose your path
            </span>
          </div>
          
          <h1 className="font-display text-5xl md:text-7xl font-black mb-6 leading-tight">
            <span className="block text-slate-900">Services that</span>
            <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
              deliver results
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Short cycles, visible KPIs and real delivery in production.
            <br className="hidden md:block" />
            Choose the solution that best fits your needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-8 md:grid-cols-2 mb-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            
            return (
              <div 
                key={index}
                className="group relative"
              >
                {/* Gradient border wrapper */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${service.gradient} rounded-3xl opacity-75 group-hover:opacity-100 blur group-hover:blur-md transition duration-300 ${service.glowColor}`}></div>
                
                {/* Card content */}
                <div className="relative bg-white rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1">
                  {/* Highlight Badge */}
                  <div className={`absolute top-6 right-6 px-4 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r ${service.gradient} shadow-lg`}>
                    {service.highlight}
                  </div>

                  {/* Icon */}
                  <div className={`inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${service.gradient} mb-6 shadow-xl`}>
                    <Icon className="h-10 w-10 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{service.title}</h3>
                  <p className="text-sm text-purple-600 font-semibold mb-4">{service.subtitle}</p>
                  <p className="text-slate-600 mb-6">{service.description}</p>
                  
                  {/* Price */}
                  <p className={`text-lg font-bold mb-6 bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}>
                    {service.price}
                  </p>
                  
                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* CTA Button */}
                  <Button 
                    asChild
                    className={`w-full bg-gradient-to-r ${service.gradient} hover:opacity-90 text-white font-semibold py-6 rounded-xl transition-all duration-300`}
                  >
                    <Link href="/en/contact" className="flex items-center justify-center gap-2">
                      Get Started
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <h2 className="text-4xl font-bold mb-6 text-slate-900">
            Ready to transform your business?
          </h2>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Let's discuss which solution is best for your needs. Schedule a free consultation with our team.
          </p>
          <Button 
            asChild
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg font-bold rounded-2xl shadow-xl hover:shadow-glow-purple transition-all duration-300 hover:scale-105"
          >
            <Link href="/en/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
