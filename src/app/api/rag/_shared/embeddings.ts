import OpenAI from "openai";

// Usar variaveis dedicadas para embeddings (separadas do AGI)
const EMBEDDING_MODEL = process.env.EMBEDDING_MODEL || "text-embedding-3-small";
const EMBEDDING_API_KEY = process.env.EMBEDDING_OPENAI_API_KEY || process.env.OPENAI_API_KEY;
const EMBEDDING_BASE_URL = process.env.EMBEDDING_BASE_URL || "https://api.openai.com/v1";

export function embeddingsClient() {
  if (!EMBEDDING_API_KEY) {
    throw new Error("EMBEDDING_OPENAI_API_KEY or OPENAI_API_KEY must be set");
  }
  return new OpenAI({ 
    apiKey: EMBEDDING_API_KEY,
    baseURL: EMBEDDING_BASE_URL
  });
}

export async function embed(text: string): Promise<number[]> {
  const c = embeddingsClient();
  const r = await c.embeddings.create({ model: EMBEDDING_MODEL, input: text });
  return r.data[0].embedding as number[];
}

