import OpenAI from "openai";
const EMBEDDING_MODEL = process.env.EMBEDDING_MODEL || "text-embedding-3-small";
const BASE_URL =
  process.env.EMBEDDINGS_BASE_URL || process.env.EMBEDDING_BASE_URL || process.env.OPENAI_BASE_URL || undefined;

export function embeddingsClient() {
  const apiKey = process.env.EMBEDDING_OPENAI_API_KEY || process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("Missing OpenAI API key");
  return new OpenAI({ apiKey, baseURL: BASE_URL });
}

export async function embed(text: string): Promise<number[]> {
  const c = embeddingsClient();
  const r = await c.embeddings.create({ model: EMBEDDING_MODEL, input: text });
  return r.data[0].embedding as number[];
}
