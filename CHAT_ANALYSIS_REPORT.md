# Relatório de Análise da Funcionalidade do Chat - CRSET Solutions

## Estado Atual do Sistema de Chat

### Componentes Identificados

1. **AGIWidget** (`src/app/_components/AGIWidget.tsx`)
   - Widget flutuante simples com links para `/agi-live` e WhatsApp
   - **Problema**: Não implementa chat real, apenas redirecionamentos

2. **Chatbox** (`src/components/Chatbox.tsx`)
   - Componente de chat funcional com interface de mensagens
   - Faz chamadas para `/api/agi/chat`
   - **Problema**: Não verifica autorização/flags antes de usar

3. **Sistema de Autenticação**
   - **ChatFlag** (`app/lib/chatFlag.ts`): Biblioteca para tokens HMAC
   - **Login API** (`app/api/flags/chat/login/route.ts`): Endpoint de login
   - **Flags API** (`app/api/flags/chat/route.ts`): Verificação de autorização
   - **Chat API** (`app/api/agi/chat/route.ts`): Endpoint principal do chat

4. **Página de Login** (`app/chat-login/page.tsx`)
   - Interface de login para obter cookie de autorização

### Fluxo de Autorização Atual

1. **Produção**: Requer login via `/chat-login` → cookie HMAC → acesso ao chat
2. **Preview**: Deveria permitir acesso livre baseado em `VERCEL_ENV === "preview"`
3. **Allowlist IP**: IPs específicos podem ter acesso direto

### Problemas Identificados

#### 1. Widget Principal Não Funcional
O `AGIWidget` atual apenas redireciona, não implementa chat real:
```tsx
<a href="/agi-live?src=widget">Iniciar AGI</a>
<a href={wa}>WhatsApp</a>
```

#### 2. Falta de Integração entre Componentes
- `Chatbox` não verifica flags de autorização
- `AGIWidget` não usa o `Chatbox` funcional
- Não há widget unificado que combine autorização + interface

#### 3. Lógica de Preview Incompleta
A rota `/api/flags/chat/route.ts` não implementa a verificação de preview:
```typescript
// MISSING: Preview environment check
if (process.env.VERCEL_ENV === "preview" || 
    process.env.NEXT_PUBLIC_VERCEL_ENV === "preview" ||
    process.env.NEXT_PUBLIC_CHAT_PUBLIC === "true") {
  return new NextResponse(JSON.stringify({ 
    ok: true, allowed: true, reason: "preview_mode" 
  }), resInit);
}
```

#### 4. Teste Playwright Desatualizado
O teste em `tests/chat-widget.spec.ts` procura por:
- `.crset-chat-fab` (não existe no código atual)
- `#chat-message-input` (não existe no AGIWidget)
- `.crset-chat-assistant` (não existe no código atual)

#### 5. Inconsistência de CORS/Credentials
- `Chatbox` não usa `credentials: 'include'`
- Pode causar problemas com cookies HttpOnly

## Melhorias Necessárias

### 1. Criar Widget de Chat Unificado

Substituir o `AGIWidget` atual por um widget completo que:
- Verifica autorização via `/api/flags/chat`
- Mostra interface de login quando necessário
- Implementa chat funcional quando autorizado
- Funciona em preview sem login

### 2. Implementar Lógica de Preview

Atualizar `/api/flags/chat/route.ts` para permitir acesso livre em preview:
```typescript
// Check if in preview environment
const isPreview = process.env.VERCEL_ENV === "preview" || 
                  process.env.NEXT_PUBLIC_VERCEL_ENV === "preview" ||
                  process.env.NEXT_PUBLIC_CHAT_PUBLIC === "true";

if (isPreview) {
  return new NextResponse(JSON.stringify({ 
    ok: true, allowed: true, reason: "preview_mode" 
  }), resInit);
}
```

### 3. Corrigir Chamadas de API

Garantir que todas as chamadas para `/api/agi/chat` usem:
```typescript
fetch('/api/agi/chat', {
  method: 'POST',
  credentials: 'include',  // Para cookies HttpOnly
  cache: 'no-store',      // Evitar cache
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ text: message })
});
```

### 4. Atualizar Testes Playwright

Corrigir seletores e fluxo no teste:
- Usar seletores que existem no código real
- Testar tanto preview (sem login) quanto produção (com login)
- Verificar resposta real do chat

### 5. Melhorar UX do Widget

- Loading states durante verificação de autorização
- Transições suaves entre estados (não autorizado → login → chat)
- Feedback visual claro sobre o estado atual
- Minimizar/maximizar widget

## Arquivos que Precisam de Alteração

### Críticos (Funcionalidade)
1. `src/app/_components/AGIWidget.tsx` - Substituir por widget completo
2. `app/api/flags/chat/route.ts` - Adicionar lógica de preview
3. `src/components/Chatbox.tsx` - Corrigir credentials e autorização
4. `tests/chat-widget.spec.ts` - Atualizar seletores e fluxo

### Opcionais (Melhorias)
1. `app/chat-login/page.tsx` - Melhorar UX da página de login
2. `app/api/agi/chat/route.ts` - Adicionar rate limiting
3. Criar componente `ChatWidget.tsx` unificado

## Critérios de Sucesso

### Preview Environment
- [ ] Widget abre sem necessidade de login
- [ ] Chat funciona e recebe respostas
- [ ] Teste Playwright passa

### Production Environment  
- [ ] Widget mostra estado não autorizado inicialmente
- [ ] Login via `/chat-login` funciona
- [ ] Após login, widget funciona normalmente
- [ ] Cookie persiste entre sessões
- [ ] Teste Playwright passa

### Geral
- [ ] Zero erros 401/403 no console
- [ ] CORS configurado corretamente
- [ ] Loading states apropriados
- [ ] Acessibilidade (focus, keyboard navigation)
- [ ] Responsivo (mobile + desktop)

## Próximos Passos

1. **Implementar lógica de preview** na API de flags
2. **Criar widget unificado** que substitua o AGIWidget atual
3. **Corrigir chamadas de API** com credentials corretos
4. **Atualizar testes** com seletores reais
5. **Testar em ambos os ambientes** (preview + produção)
