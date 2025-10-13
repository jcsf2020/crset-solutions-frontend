import OpenAI from 'openai';

const EMBEDDING_MODEL = process.env.EMBEDDING_MODEL || 'text-embedding-3-small';

// Preferir um baseURL dedicado a embeddings, senão cair no OPENAI_BASE_URL, senão no default
const BASE_URL = process.env.EMBEDDINGS_BASE_URL || process.env.OPENAI_BASE_URL || undefined;

export function embeddingsClient() {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,   // mantém 1 só key para embeddings
    baseURL: BASE_URL,                     // pode ser undefined -> openai.com/v1
  });
}

export async function embed(text: string) {
  const client = embeddingsClient();
  const res = await client.embeddings.create({
    model: EMBEDDING_MODEL,
    input: text,
  });
  return res.data[0].embedding as number[];
}