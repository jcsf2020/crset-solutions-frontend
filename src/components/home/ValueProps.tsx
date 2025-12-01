'use client';

import { Clock, BarChart3, Target, MessageCircle, Zap, Shield } from "lucide-react";

export function ValueProps() {
  const props = [
    {
      icon: Clock,
      title: "Fast delivery",
      description: "Short cycles, visible impact in days, not months. Rapid prototyping and continuous iteration."
    },
    {
      icon: BarChart3,
      title: "Visible KPIs",
      description: "Clear metrics in production, transparent dashboards and automated reports."
    },
    {
      icon: Target,
      title: "No nonsense",
      description: "Sober design, focus on results. Zero buzzwords, maximum efficiency."
    },
    {
      icon: MessageCircle,
      title: "Direct support",
      description: "Talk to those who do it, no layers. Direct access to technicians."
    },
    {
      icon: Zap,
      title: "Intelligent automation",
      description: "AGI applied where it makes sense. Optimized processes with cutting-edge technology."
    },
    {
      icon: Shield,
      title: "Guaranteed security",
      description: "Audited code, secure infrastructure and GDPR compliance."
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Why choose{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              CRSET?
            </span>
          </h2>
          <p className="text-xl text-slate-700 max-w-3xl mx-auto leading-relaxed">
            Automation that works, no drama. Practical results with total transparency and cutting-edge technology.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {props.map((prop, index) => {
            const Icon = prop.icon;
            return (
              <div 
                key={index}
                className="group card-glass shadow-elev-2 hover:shadow-elev-4 p-8 text-center transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-primary mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-neutral-900">{prop.title}</h3>
                <p className="text-slate-700 leading-relaxed">
                  {prop.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-green-50 border border-green-200 px-4 py-2 text-sm font-medium text-green-700 mb-4">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            Everything ready to start
          </div>
          <p className="text-lg text-slate-700 mb-8 max-w-2xl mx-auto">
            Robust infrastructure, tested processes and experienced team. The next step is yours.
          </p>
        </div>
      </div>
    </section>
  );
}
