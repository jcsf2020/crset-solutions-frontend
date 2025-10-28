# Configuracao RAG - CRSET Solutions

## Visao Geral

Os endpoints RAG (`/api/rag/ingest` e `/api/rag/query`) usam embeddings da OpenAI para processar e consultar documentos. Esta funcionalidade e separada do sistema AGI/Chat, que pode usar Groq ou outros providers.

## Variaveis de Ambiente Necessarias

### Para Producao (Vercel)

Adicionar as seguintes variaveis no dashboard da Vercel:

```
EMBEDDING_OPENAI_API_KEY=sk-...  # Chave OpenAI para embeddings
EMBEDDING_MODEL=text-embedding-3-small  # Opcional (tem default)
EMBEDDING_BASE_URL=https://api.openai.com/v1  # Opcional (tem default)
```

**Importante:**
- A variavel `EMBEDDING_OPENAI_API_KEY` deve conter uma chave valida da OpenAI
- Nao usar chaves Groq para embeddings (Groq nao suporta embeddings)
- Se `EMBEDDING_OPENAI_API_KEY` nao estiver definida, o sistema usa `OPENAI_API_KEY` como fallback

### Separacao AGI vs RAG

O sistema usa diferentes variaveis para diferentes funcionalidades:

| Funcionalidade | Variaveis | Provider |
| :--- | :--- | :--- |
| **RAG Embeddings** | `EMBEDDING_OPENAI_API_KEY`, `EMBEDDING_BASE_URL` | OpenAI |
| **AGI Chat** | `OPENAI_API_KEY`, `AGI_OPENAI_BASE_URL` | Groq ou OpenAI |

## Como Obter Chave OpenAI

1. Aceder a https://platform.openai.com/api-keys
2. Criar uma nova chave de API
3. Copiar a chave (comeca com `sk-`)
4. Adicionar a variavel `EMBEDDING_OPENAI_API_KEY` na Vercel

## Teste Local

Para testar localmente:

1. Criar ficheiro `.env.local`:
```bash
EMBEDDING_OPENAI_API_KEY=sk-...
```

2. Executar o servidor de desenvolvimento:
```bash
pnpm dev
```

3. Testar o endpoint de ingest:
```bash
curl -X POST http://localhost:3000/api/rag/ingest \
  -H "Content-Type: application/json" \
  -d '{"id":"test-1","source":"manual","text":"Teste de embedding"}'
```

4. Testar o endpoint de query:
```bash
curl -X POST http://localhost:3000/api/rag/query \
  -H "Content-Type: application/json" \
  -d '{"message":"Teste de consulta","match_count":3}'
```

## Smoke Tests em Producao

Apos configurar as variaveis e fazer deploy:

```bash
# Ingest
curl -X POST https://crsetsolutions.com/api/rag/ingest \
  -H "Content-Type: application/json" \
  -H "User-Agent: crset-smoke/1.0 (+https://crsetsolutions.com)" \
  -d '{"id":"smoke-1","source":"test","text":"Teste de producao"}'

# Query
curl -X POST https://crsetsolutions.com/api/rag/query \
  -H "Content-Type: application/json" \
  -H "User-Agent: crset-smoke/1.0 (+https://crsetsolutions.com)" \
  -d '{"message":"Teste de consulta","match_count":3}'
```

## Troubleshooting

### Erro: "Invalid URL"
- Verificar se `EMBEDDING_BASE_URL` nao tem aspas no valor
- Valor correto: `https://api.openai.com/v1`
- Valor incorreto: `"https://api.openai.com/v1"`

### Erro: "Failed to generate embedding"
- Verificar se `EMBEDDING_OPENAI_API_KEY` esta definida
- Verificar se a chave e valida (testar em https://platform.openai.com/playground)
- Verificar se a conta OpenAI tem creditos disponiveis

### Erro: "EMBEDDING_OPENAI_API_KEY or OPENAI_API_KEY must be set"
- Adicionar a variavel `EMBEDDING_OPENAI_API_KEY` na Vercel
- Ou garantir que `OPENAI_API_KEY` esta definida como fallback

## Custos

O modelo `text-embedding-3-small` tem os seguintes custos (OpenAI):
- $0.02 por 1M tokens
- Muito economico para uso normal

Exemplo: 1000 documentos de 500 palavras = ~$0.01

## Referencias

- [OpenAI Embeddings API](https://platform.openai.com/docs/guides/embeddings)
- [text-embedding-3-small](https://platform.openai.com/docs/guides/embeddings/embedding-models)

