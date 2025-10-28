# Relatório de Auditoria da UI - CRSET Solutions Frontend

## Problemas Identificados na Consistência de CTAs e Botões

### 1. Múltiplos Sistemas de Botões Coexistindo

**Problema**: O projeto utiliza pelo menos 4 sistemas diferentes para botões/CTAs:

1. **Componente Button oficial** (`components/ui/button.tsx`) - Sistema baseado em CVA com variantes
2. **Componente HoloButton** (`components/ui/holo-button.tsx`) - Efeito holográfico
3. **Componente BuyButton** (`src/components/BuyButton.tsx`) - Botões específicos para compra
4. **Classes CSS ad-hoc** - Aplicadas diretamente nos componentes

### 2. Inconsistências de Cores Identificadas

#### HomeCTAs (`src/app/_components/HomeCTAs.tsx`)
```tsx
<Link href="/servicos" className="px-5 py-3 rounded-md bg-blue-600 text-white">Ver Serviços</Link>
<Link href="/precos" className="px-5 py-3 rounded-md border">Planos & Preços</Link>
```
**Problema**: Primeiro CTA usa `bg-blue-600`, segundo usa apenas `border` sem cor de fundo.

#### Hero Component (`src/components/hero.tsx`)
```tsx
<Button asChild size="lg"><Link href="/start">Começar</Link></Button>
<Button asChild variant="ghost" size="lg"><Link href="/faq">FAQ</Link></Button>
```
**Problema**: Usa o sistema oficial de Button mas com variantes diferentes.

#### Contact Component (`src/components/Contact.tsx`)
```tsx
<button type="submit" className="btn-primary px-5 py-3">Enviar por email</button>
<a href="..." className="btn-secondary px-5 py-3">WhatsApp</a>
```
**Problema**: Usa classes CSS `btn-primary` e `btn-secondary` definidas no globals.css.

#### BuyButton Component
```tsx
variant === "primary"
  ? "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500"
  : "border border-blue-600 text-blue-700 hover:bg-blue-50 focus:ring-blue-500"
```
**Problema**: Hardcoded `bg-blue-600` diferente do sistema de design tokens.

### 3. Páginas com CTAs Inconsistentes

#### Serviços (`src/app/servicos/[slug]/page.tsx`)
- Usa `bg-blue-600` para CTA principal
- Usa `border border-gray-300` para CTA secundário
- Mistura com `bg-blue-50` para seções informativas

#### Convite (`src/app/convite/page.tsx`)
- Usa `bg-green-500 hover:bg-green-600` para um CTA
- Usa `bg-blue-500 hover:bg-blue-600` para outro CTA

### 4. Problemas no globals.css

O arquivo `globals.css` contém múltiplas definições conflitantes:

1. **Classes CSS personalizadas** (`.crset-button-primary`, `.crset-button-secondary`)
2. **Design tokens CRSET** (variáveis CSS `--brand`, `--brand-600`)
3. **Classes utilitárias** (`.btn-primary`, `.btn-secondary`)
4. **Múltiplas definições de cores** (algumas duplicadas)

### 5. Falta de Acessibilidade Consistente

- Nem todos os botões têm `focus-visible:outline-none` e `focus-visible:ring`
- Alguns CTAs não têm estados `:disabled` definidos
- Contraste pode não estar consistente entre variantes

## Recomendações para Correção

### 1. Unificar Sistema de Botões
- Expandir o componente `Button` existente com mais variantes
- Migrar todos os CTAs para usar este componente único
- Remover classes CSS ad-hoc do globals.css

### 2. Definir Design Tokens Consistentes
- Usar as variáveis CSS já definidas (`--brand`, `--brand-600`)
- Atualizar tailwind.config.ts para usar estes tokens
- Remover cores hardcoded dos componentes

### 3. Implementar Variantes Padronizadas
- `primary`: CTA principal (ações importantes)
- `secondary`: CTA secundário (ações alternativas)
- `ghost`: Links/botões discretos
- `outline`: Botões com borda
- `link`: Links simples

### 4. Garantir Acessibilidade
- Focus rings consistentes
- Estados disabled padronizados
- Contraste AA em todas as variantes

## Arquivos que Necessitam Alteração

1. `components/ui/button.tsx` - Expandir variantes
2. `src/app/_components/HomeCTAs.tsx` - Migrar para Button
3. `src/components/hero.tsx` - Padronizar variantes
4. `src/components/Contact.tsx` - Migrar para Button
5. `src/components/BuyButton.tsx` - Refatorar ou remover
6. `src/app/servicos/[slug]/page.tsx` - Migrar CTAs
7. `src/app/convite/page.tsx` - Padronizar cores
8. `src/app/globals.css` - Limpar classes duplicadas
9. `tailwind.config.ts` - Adicionar design tokens

## Critérios de Sucesso

- [ ] Todos os CTAs usam o mesmo componente Button
- [ ] Cores consistentes baseadas em design tokens
- [ ] Estados hover/focus/disabled padronizados
- [ ] Lighthouse Accessibility score = 100
- [ ] Zero regressões visuais
- [ ] Remoção de classes CSS ad-hoc
