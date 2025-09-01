export function t(k: string): string {
  const dict: Record<string, string> = {
    // Hero
    hero_title: "Automacao Inteligente para o Futuro",
    hero_subtitle: "CRSET Solutions combina tecnologia de ponta com mascotes unicas para transformar negocios em experiencias inteligentes.",
    cta_explorar: "Ver Servicos",

    // Planos
    plans_title: "Planos e Precos",
    plans_subtitle: "Escolhe o plano certo para o teu momento. Upgrade facil quando estiveres pronto para escalar.",
    plan_starter: "Starter",
    plan_starter_desc: "Landing + captacao para validar canal.",
    plan_growth: "Growth",
    plan_growth_desc: "Stack para escalar aquisicao e operacao.",
    plan_scale: "Scale",
    plan_scale_desc: "Projeto sob-medida com roadmap continuo.",
    price_per_month: "EUR/mes",
    no_lockin: "sem fidelizacao",
    cta_start_now: "Comecar agora",
    cta_whatsapp: "Falar no WhatsApp",

    // Resultados / provas
    results_title: "Resultados consistentes, sem ruido",
    results_subtitle: "Casos reais com impacto em conversao, CPL e time-to-value.",

    // Admin login
    admin_login_title: "Login Admin",
    admin_login_placeholder: "ADMIN_PASSWORD",
    admin_login_button: "Entrar",
    admin_login_authenticating: "A autenticar...",
    admin_login_ok: "OK. Redirecionando...",
    admin_login_fail: "Falhou: ",

    // Admin home
    admin_home_title: "Admin",
    admin_home_nosession: "Sem sessao.",
    admin_home_do_login: "Faz login",
    admin_metric_total: "Total",
    admin_metric_24h: "24h",
    admin_metric_7d: "7d",
    export_csv: "Exportar CSV",
    view_json: "Ver JSON"
  };
  return dict[k] ?? k;
}
