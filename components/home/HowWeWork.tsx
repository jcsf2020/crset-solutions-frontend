import { Search, FileText, Cog } from "lucide-react";

export function HowWeWork() {
  const steps = [
    {
      number: "01",
      icon: Search,
      title: "Diagnóstico (≤48h)",
      description: "Mapa de dores + oportunidades."
    },
    {
      number: "02", 
      icon: FileText,
      title: "Plano & OKRs",
      description: "O que muda, como medimos, quando entregamos."
    },
    {
      number: "03",
      icon: Cog,
      title: "Entrega & Operação", 
      description: "Iterações curtas, monitorização e melhoria contínua."
    }
  ];

  return (
    <section id="como-trabalhamos" className="py-16 bg-accent/20">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-4">
            Como trabalhamos
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Processo simples, transparente e focado em resultados mensuráveis.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                    {step.number}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

