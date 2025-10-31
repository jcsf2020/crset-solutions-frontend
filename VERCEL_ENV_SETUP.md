# Configuracao de Variaveis de Ambiente no Vercel

## Variaveis necessarias para o Chat com autenticacao

Execute os seguintes comandos para configurar as variaveis de ambiente no Vercel:

```bash
# CHAT_FLAG_SECRET - Secret para assinar tokens JWT do chat
vercel env add CHAT_FLAG_SECRET production
# Valor: f866ccedd8b31d0f0ba7bf67c2baf32e1daf5ca9245bc634188fa1ab44df104d

# CHAT_PASS_SALT - Salt para hash da password do chat
vercel env add CHAT_PASS_SALT production
# Valor: 29c73f4e49690a9cd9b29d503436b9c8

# CHAT_PASS_HASH - Hash da password "Crsetsolutions2025"
vercel env add CHAT_PASS_HASH production
# Valor: 5b27f1067cd2d4aa59839f5981e730ef991b6edd551a11b9a67fbb6885679914
```

## Variaveis necessarias para OpenAI

```bash
# OPENAI_API_KEY - Chave API do OpenAI (ja configurada)
# AGI_OPENAI_BASE_URL - URL base da API OpenAI (opcional, default: https://api.openai.com/v1)
# AGI_OPENAI_MODEL - Modelo OpenAI a usar (opcional, default: gpt-4.1-mini)
```

## Verificacao

Apos configurar as variaveis, fazer redeploy:

```bash
vercel --prod
```

Testar login:

```bash
curl -i -c cookies.txt -X POST https://crsetsolutions.com/api/flags/chat/login \
  -H "content-type: application/json" \
  -d '{"password":"Crsetsolutions2025"}'
```

Esperado: `200 OK` com cookie `crset-chat`

Testar chat com cookie:

```bash
curl -b cookies.txt -X POST https://crsetsolutions.com/api/chat \
  -H "content-type: application/json" \
  -d '{"message":"Ola, tudo bem?"}'
```

Esperado: `200 OK` com resposta do modelo OpenAI
