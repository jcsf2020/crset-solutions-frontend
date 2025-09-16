import { Clock, BarChart3, Target, MessageCircle } from "lucide-react";

export function ValueProps() {
  const props = [
    {
      icon: Clock,
      title: "Entrega rápida",
      description: "Ciclos curtos, impacto visível em dias, não meses."
    },
    {
      icon: BarChart3,
      title: "KPIs visíveis",
      description: "Métricas claras em produção (sem \"show\")."
    },
    {
      icon: Target,
      title: "Sem circo",
      description: "Design sóbrio, foco no resultado."
    },
    {
      icon: MessageCircle,
      title: "Suporte direto",
      description: "Fala com quem faz, sem camadas."
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-4">
            Por que escolher a CRSET?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Automação que funciona, sem drama. Resultados práticos com transparência total.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {props.map((prop, index) => {
            const Icon = prop.icon;
            return (
              <div 
                key={index}
                className="rounded-lg border p-6 text-center hover:bg-accent/50 transition-colors"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mx-auto mb-4">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{prop.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {prop.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

