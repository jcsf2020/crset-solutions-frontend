'use client';

import { Clock, BarChart3, Target, MessageCircle, Zap, Shield } from "lucide-react";
import { useTranslations } from "next-intl";

export function ValueProps() {
  const t = useTranslations();
  
  const props = [
    {
      icon: Clock,
      title: t('homepage.features.fastDelivery.title'),
      description: t('homepage.features.fastDelivery.description')
    },
    {
      icon: BarChart3,
      title: t('homepage.features.visibleKPIs.title'),
      description: t('homepage.features.visibleKPIs.description')
    },
    {
      icon: Target,
      title: t('homepage.features.noNonsense.title'),
      description: t('homepage.features.noNonsense.description')
    },
    {
      icon: MessageCircle,
      title: t('homepage.features.directSupport.title'),
      description: t('homepage.features.directSupport.description')
    },
    {
      icon: Zap,
      title: t('homepage.features.intelligentAutomation.title'),
      description: t('homepage.features.intelligentAutomation.description')
    },
    {
      icon: Shield,
      title: t('homepage.features.guaranteedSecurity.title'),
      description: t('homepage.features.guaranteedSecurity.description')
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            {t('homepage.features.title')}{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              CRSET?
            </span>
          </h2>
          <p className="text-xl text-slate-700 max-w-3xl mx-auto leading-relaxed">
            {t('homepage.features.subtitle')}
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
            {t('homepage.cta.readyToStart')}
          </div>
          <p className="text-lg text-slate-700 mb-8 max-w-2xl mx-auto">
            {t('homepage.cta.description')}
          </p>
        </div>
      </div>
    </section>
  );
}
