/**
 * Script para preparar dados do site CRSET Solutions para ingestao no RAG
 * 
 * Este script:
 * 1. Le conteudo extraido das paginas
 * 2. Cria chunks inteligentes com metadata
 * 3. Prepara para ingestao via API
 */

interface Document {
  id: string;
  content: string;
  metadata: {
    source: string;
    url: string;
    title: string;
    category: string;
    keywords: string[];
    lastUpdated: string;
  };
}

interface Chunk {
  text: string;
  metadata: Document['metadata'] & {
    chunkIndex: number;
    totalChunks: number;
  };
}

/**
 * Divide texto em chunks inteligentes respeitando limites semanticos
 */
function createSmartChunks(text: string, maxChunkSize: number = 1000): string[] {
  const chunks: string[] = [];
  const paragraphs = text.split('\n\n').filter(p => p.trim().length > 0);
  
  let currentChunk = '';
  
  for (const paragraph of paragraphs) {
    const trimmedParagraph = paragraph.trim();
    
    // Se o paragrafo sozinho ja e maior que o limite, divide por frases
    if (trimmedParagraph.length > maxChunkSize) {
      if (currentChunk) {
        chunks.push(currentChunk.trim());
        currentChunk = '';
      }
      
      const sentences = trimmedParagraph.split(/[.!?]+/).filter(s => s.trim().length > 0);
      let sentenceChunk = '';
      
      for (const sentence of sentences) {
        if ((sentenceChunk + sentence).length > maxChunkSize) {
          if (sentenceChunk) {
            chunks.push(sentenceChunk.trim());
          }
          sentenceChunk = sentence;
        } else {
          sentenceChunk += (sentenceChunk ? '. ' : '') + sentence;
        }
      }
      
      if (sentenceChunk) {
        chunks.push(sentenceChunk.trim());
      }
      continue;
    }
    
    // Se adicionar este paragrafo ultrapassar o limite, salva o chunk atual
    if ((currentChunk + '\n\n' + trimmedParagraph).length > maxChunkSize) {
      if (currentChunk) {
        chunks.push(currentChunk.trim());
      }
      currentChunk = trimmedParagraph;
    } else {
      currentChunk += (currentChunk ? '\n\n' : '') + trimmedParagraph;
    }
  }
  
  if (currentChunk) {
    chunks.push(currentChunk.trim());
  }
  
  return chunks;
}

/**
 * Extrai keywords de um texto
 */
function extractKeywords(text: string): string[] {
  const commonWords = new Set([
    'o', 'a', 'os', 'as', 'um', 'uma', 'de', 'da', 'do', 'das', 'dos',
    'em', 'no', 'na', 'nos', 'nas', 'para', 'com', 'sem', 'por', 'e',
    'que', 'se', 'mais', 'como', 'seu', 'sua', 'seus', 'suas'
  ]);
  
  const words = text.toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 3 && !commonWords.has(w));
  
  // Conta frequencia
  const frequency: Record<string, number> = {};
  words.forEach(word => {
    frequency[word] = (frequency[word] || 0) + 1;
  });
  
  // Retorna top 10 palavras mais frequentes
  return Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([word]) => word);
}

/**
 * Dados estruturados do site CRSET Solutions
 */
const documents: Document[] = [
  // Homepage
  {
    id: 'homepage',
    content: `
# CRSET Solutions - Automacao pratica. Sem circo.

A CRSET Solutions e uma empresa especializada em automacao e AGI aplicada ao negocio. Oferecemos resultados praticos, sem drama, com foco em metricas visiveis e entregas rapidas.

## Nossa Proposta de Valor

- Entrega rapida: Ciclos curtos, impacto visivel em dias, nao meses
- KPIs visiveis: Metricas claras em producao, dashboards transparentes
- Sem circo: Design sobrio, foco no resultado, zero buzzwords
- Suporte direto: Fala com quem faz, sem camadas
- Automacao inteligente: AGI aplicada onde faz sentido
- Seguranca garantida: Codigo auditado, infraestrutura segura, conformidade GDPR

## Metricas que Comprovam

- Lighthouse Desktop: 100/100/96/100 (Performance maxima)
- Lighthouse Mobile: 100/100/96/100 (Otimizado para mobile)
- Security Scan: GitGuardian verificado (Codigo auditado)
- Uptime: 99.9% (Disponibilidade garantida)
- Suporte: < 2h (Tempo de resposta)

## Como Trabalhamos

### 1. Diagnostico (≤48h)
Mapa completo de dores e oportunidades. Analise tecnica detalhada e identificacao de quick wins.

### 2. Plano & OKRs (Estrategia clara)
O que muda, como medimos, quando entregamos. Roadmap detalhado com marcos mensuráveis.

### 3. Entrega & Operacao (Melhoria continua)
Iteracoes curtas, monitorizacao em tempo real e otimizacao baseada em dados.

## Perguntas Frequentes

**Quanto tempo para ver valor?**
Normalmente na 1.ª sprint (1–2 semanas).

**Preciso de contrato longo?**
Nao. Comecamos pequeno, renovavel por entrega.

**Como funcionam os precos?**
Tabela simples em /precos; sem taxas escondidas.

**Podem integrar com o meu stack?**
Sim, trabalhamos em cima do que ja tens.

**Como comecar?**
Abre /servicos, escolhe o primeiro passo.
`,
    metadata: {
      source: 'website',
      url: 'https://crsetsolutions.com',
      title: 'CRSET Solutions - Homepage',
      category: 'geral',
      keywords: ['automacao', 'agi', 'resultados', 'metricas', 'entrega', 'rapida'],
      lastUpdated: new Date().toISOString()
    }
  },
  
  // Servicos
  {
    id: 'servicos',
    content: `
# Servicos CRSET Solutions

A CRSET Solutions oferece 4 servicos principais, cada um desenhado para necessidades especificas de negocio.

## 1. Lancamento Rapido (Mais Popular)

**Duracao:** 1-2 semanas
**Preco:** A partir de 2.500 EUR

Solucao completa para comecar rapidamente com infraestrutura robusta e processos otimizados.

**Inclui:**
- Landing otimizada + captacao de leads
- Integracao CRM/Supabase + workflows de e-mail
- Relatorios basicos e alertas automaticos
- Deploy automatizado e monitorizacao
- Suporte tecnico durante 30 dias

**Ideal para:** Pequenos negocios que querem comecar rapidamente com presenca digital profissional.

## 2. AGI & Automacao (Inovacao)

**Duracao:** Inteligencia aplicada
**Preco:** A partir de 4.000 EUR

Assistentes inteligentes e automacao de processos com tecnologia de vanguarda.

**Inclui:**
- Assistentes e chatbots orientados a processos
- Integracoes com Notion, Gmail, Slack e webhooks
- Guardrails, metricas e modo 'humano-no-loop'
- Treino personalizado e otimizacao continua
- Dashboard de performance e analytics

**Ideal para:** Empresas que querem automacao inteligente e integracao com ferramentas existentes.

## 3. Integracoes & Dados (Essencial)

**Duracao:** Ecosistema conectado
**Preco:** A partir de 3.200 EUR

Conecte todos os seus sistemas e tenha visibilidade total dos seus dados e processos.

**Inclui:**
- Stripe, Resend, Supabase e servicos de terceiros
- Dashboards de saude (status/metrics) e telemetry
- CI/CD, monitorizacao e testes E2E
- APIs robustas e documentacao completa
- Backup automatico e recuperacao de desastres

**Ideal para:** Empresas que precisam conectar multiplos sistemas e ter visibilidade total.

## 4. Solucoes Empresariais (Premium)

**Duracao:** Escala e seguranca
**Preco:** Sob consulta

Solucoes personalizadas para grandes organizacoes com requisitos especificos.

**Inclui:**
- Arquitetura personalizada e escalavel
- Conformidade GDPR e auditoria de seguranca
- Integracao com sistemas legados
- SLA dedicado e suporte prioritario
- Consultoria estrategica e roadmap tecnico

**Ideal para:** Grandes organizacoes com necessidades especificas e requisitos de seguranca.

## Solucoes Especializadas

Alem dos servicos principais, oferecemos pacotes otimizados para sectores especificos:

- **Imobiliaria:** Modulos de imoveis, agendamento de visitas, integracoes com portais
- **Agenda:** Paginas de servico, reserva de slots, alertas por email
- **E-commerce:** Catalogo + checkout, integracao Shopify, gestao de inventario
- **Catalogo:** Catalogo de produtos, formularios de pedido, gestao de conteudo
`,
    metadata: {
      source: 'website',
      url: 'https://crsetsolutions.com/servicos',
      title: 'Servicos - CRSET Solutions',
      category: 'servicos',
      keywords: ['servicos', 'lancamento', 'agi', 'automacao', 'integracoes', 'empresarial'],
      lastUpdated: new Date().toISOString()
    }
  },
  
  // Precos
  {
    id: 'precos',
    content: `
# Planos & Precos CRSET Solutions

Valores transparentes, sem surpresas. Foco em resultado, com suporte incluido e garantia de satisfacao.

**Nota:** Todos os valores sao apresentados sem IVA. Personalizacoes sob orcamento.

## Planos Principais

### Essential (Para comecar)

**Valor inicial:** 990 EUR
**Mensalidade:** 79 EUR/mes

Perfeito para pequenos negocios que querem comecar rapidamente com uma presenca digital profissional.

**Inclui:**
- Site CRSET pronto a usar
- Captacao de leads por email (Resend)
- Atualizacoes basicas incluidas
- Suporte por email
- SSL e backup automatico
- Analytics basicos

### Pro (Mais Popular)

**Valor inicial:** 2.900 EUR
**Mensalidade:** 149 EUR/mes

A escolha ideal para empresas que querem automacao inteligente e integracao com ferramentas existentes.

**Inclui:**
- Tudo do Essential
- Automacoes de marketing
- Leads + integracoes Notion/Supabase
- Relatorios detalhados
- Suporte prioritario
- Integracoes personalizadas
- Dashboard de metricas

### Enterprise (Maxima flexibilidade)

**Valor inicial:** 5.900 EUR
**Mensalidade:** 299 EUR/mes

Solucao completa para grandes organizacoes com necessidades especificas e requisitos de seguranca.

**Inclui:**
- Tudo do Pro
- Layout e modulos personalizados
- SLA de prioridade garantido
- Integracoes avancadas ilimitadas
- Consultoria estrategica
- Auditoria de seguranca
- Suporte dedicado 24/7

## Solucoes Especializadas

### Imobiliaria
**Valor inicial:** 3.900 EUR | **Mensalidade:** 199 EUR/mes
Modulos de imoveis completos, agendamento de visitas, integracoes com portais, CRM especializado.

### Agenda
**Valor inicial:** 1.900 EUR | **Mensalidade:** 119 EUR/mes
Paginas de servico, reserva de slots, alertas por email, sincronizacao de calendarios.

### E-commerce
**Valor inicial:** 3.500 EUR | **Mensalidade:** 149 EUR/mes
Catalogo + checkout, integracao Shopify (opcional), relatorios de vendas, gestao de inventario.

### Catalogo
**Valor inicial:** 2.500 EUR | **Mensalidade:** 129 EUR/mes
Catalogo de produtos, formularios de pedido, leads integradas, gestao de conteudo.

## Comparacao de Planos

| Caracteristica | Essential | Pro | Enterprise |
|---|---|---|---|
| Valor inicial | 990 EUR | 2.900 EUR | 5.900 EUR |
| Mensalidade | 79 EUR | 149 EUR | 299 EUR |
| Site pronto | ✓ | ✓ | ✓ |
| Captacao de leads | ✓ | ✓ | ✓ |
| Automacoes | - | ✓ | ✓ |
| Integracoes | Basicas | Avancadas | Ilimitadas |
| Suporte | Email | Prioritario | 24/7 Dedicado |
| SLA | - | - | Garantido |
| Consultoria | - | - | ✓ |
| Auditoria seguranca | - | - | ✓ |

## Garantias

- Garantia de satisfacao: Se nao ficar satisfeito nas primeiras 2 semanas, devolvemos o investimento inicial
- Sem contratos longos: Comecamos pequeno, renovavel por entrega
- Transparencia total: Sem taxas escondidas, tudo incluido no preco
`,
    metadata: {
      source: 'website',
      url: 'https://crsetsolutions.com/precos',
      title: 'Planos & Precos - CRSET Solutions',
      category: 'precos',
      keywords: ['precos', 'planos', 'essential', 'pro', 'enterprise', 'valores'],
      lastUpdated: new Date().toISOString()
    }
  },
  
  // FAQ
  {
    id: 'faq',
    content: `
# Perguntas Frequentes (FAQ) - CRSET Solutions

## Sobre Projetos e Prazos

### Quanto tempo demora um projeto?

Depende do plano escolhido:
- **Essential:** 1-2 semanas
- **Pro:** 2-3 semanas
- **Enterprise:** 3-4 semanas
- **Projetos personalizados:** Prazos definidos na proposta inicial

### Quanto tempo para ver valor?

Normalmente na 1.ª sprint (1–2 semanas). Focamos em quick wins e entregas incrementais para gerar valor rapidamente.

## Sobre o Processo

### Como funciona o processo de desenvolvimento?

Seguimos 3 etapas principais:

1. **Diagnostico (≤48h):** Mapear necessidades, dores e oportunidades
2. **Plano & OKRs:** Roadmap detalhado com marcos mensuráveis
3. **Entrega & Operacao:** Iteracoes curtas com monitorizacao continua

Mantemos transparencia total durante todo o processo.

### Como e feito o acompanhamento do projeto?

Mantemos comunicacao transparente via email, Slack ou ferramenta da sua preferencia. Fornecemos:
- Updates regulares
- Acesso ao repositorio
- Metricas de progresso em tempo real

## Sobre Tecnologia

### Que tecnologias utilizam?

Usamos tecnologias modernas e robustas:
- **Frontend:** Next.js, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes, Node.js
- **Database:** Supabase (PostgreSQL)
- **Email:** Resend
- **Deploy:** Vercel
- **Monitoring:** Sentry

Toda a infraestrutura e escalavel e segura, com deploy automatizado.

### Podem integrar com o meu stack existente?

Sim! Trabalhamos em cima do que ja tem. Fazemos integracoes com:
- CRMs (Salesforce, HubSpot, Pipedrive)
- Sistemas de pagamento (Stripe, PayPal)
- APIs existentes
- Ferramentas de produtividade (Notion, Gmail, Slack)
- Outras ferramentas que ja utiliza

## Sobre Precos e Contratos

### Como funcionam os precos?

Temos precos transparentes sem taxas escondidas:
- **Valor inicial:** Desenvolvimento e setup
- **Mensalidade:** Manutencao, suporte e hosting

Consulte /precos para ver todos os planos. Oferecemos possibilidade de personalizacao conforme necessidades especificas.

### Preciso de contrato longo?

Nao! Comecamos pequeno e renovamos por entrega. Nao ha compromissos longos - pode cancelar a qualquer momento apos o periodo inicial de desenvolvimento.

### Oferecem garantias?

Sim! Oferecemos garantia de satisfacao:
- Se nao ficar satisfeito com o resultado nas primeiras 2 semanas, devolvemos o investimento inicial sem questoes

## Sobre Suporte

### Oferecem suporte apos o lancamento?

Sim! Todos os planos incluem suporte continuo:
- **Essential:** Suporte por email
- **Pro:** Suporte prioritario
- **Enterprise:** Suporte dedicado 24/7 com SLA garantido

### Qual o tempo de resposta do suporte?

- **Essential:** < 24h (dias uteis)
- **Pro:** < 4h (dias uteis)
- **Enterprise:** < 2h (24/7)

## Sobre AGI e Automacao

### E a demo AGI?

A demo AGI esta disponivel num subdominio dedicado. No dominio principal pode estar temporariamente bloqueada por questoes de performance, mas pode sempre aceder via link direto.

### O que e AGI aplicada?

AGI (Artificial General Intelligence) aplicada significa usar IA de forma pratica e focada em resultados:
- Assistentes inteligentes para processos especificos
- Automacao de tarefas repetitivas
- Analise de dados e insights
- Chatbots orientados a conversao

Nao e buzzword - e tecnologia aplicada onde faz sentido.

## Como Comecar

### Como comecar?

Simples:
1. Visite /servicos
2. Escolha o servico que melhor se adapta as suas necessidades
3. Clique em 'Comecar agora'
4. Entraremos em contacto em menos de 24h para agendar o diagnostico inicial

### Trabalham com que tipo de empresas?

Trabalhamos com:
- PMEs (Pequenas e Medias Empresas)
- Startups
- Empresas estabelecidas
- Grandes organizacoes (Enterprise)

Temos solucoes desde pequenos negocios (Essential) ate grandes organizacoes (Enterprise) com necessidades especificas.

## Outras Questoes

### Oferecem personalizacoes?

Sim! Todos os planos podem ser personalizados conforme suas necessidades. Entre em contacto para discutir requisitos especificos.

### Como e a seguranca?

Levamos seguranca a serio:
- Codigo auditado (GitGuardian)
- Infraestrutura segura (Vercel)
- Conformidade GDPR
- SSL/TLS em todas as comunicacoes
- Backups automaticos
- Monitorizacao 24/7

### Nao encontrou a resposta?

Cada projeto e unico. Entre em contacto para conversarmos sobre suas necessidades especificas.
`,
    metadata: {
      source: 'website',
      url: 'https://crsetsolutions.com/faq',
      title: 'FAQ - CRSET Solutions',
      category: 'faq',
      keywords: ['faq', 'perguntas', 'duvidas', 'suporte', 'precos', 'processo'],
      lastUpdated: new Date().toISOString()
    }
  }
];

/**
 * Processa documentos e cria chunks para ingestao
 */
function prepareDocumentsForIngestion(): Chunk[] {
  const allChunks: Chunk[] = [];
  
  for (const doc of documents) {
    const chunks = createSmartChunks(doc.content, 800);
    const keywords = extractKeywords(doc.content);
    
    chunks.forEach((chunkText, index) => {
      allChunks.push({
        text: chunkText,
        metadata: {
          ...doc.metadata,
          keywords: [...doc.metadata.keywords, ...keywords].slice(0, 15),
          chunkIndex: index,
          totalChunks: chunks.length
        }
      });
    });
  }
  
  return allChunks;
}

// Exportar funcoes e dados
export {
  documents,
  prepareDocumentsForIngestion,
  createSmartChunks,
  extractKeywords
};

export type { Document, Chunk };

// Se executado diretamente
if (require.main === module) {
  const chunks = prepareDocumentsForIngestion();
  console.log(`Preparados ${chunks.length} chunks para ingestao`);
  console.log('\nExemplo de chunk:');
  console.log(JSON.stringify(chunks[0], null, 2));
}

