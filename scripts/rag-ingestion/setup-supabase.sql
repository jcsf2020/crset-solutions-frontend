-- Setup para sistema RAG no Supabase
-- Este script cria a tabela e funcoes necessarias para o sistema RAG

-- 1. Habilitar extensao pgvector se ainda nao estiver habilitada
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. Criar tabela para armazenar documentos e embeddings
CREATE TABLE IF NOT EXISTS rag_documents (
  id BIGSERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  embedding vector(1536), -- OpenAI text-embedding-3-small gera vetores de 1536 dimensoes
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Criar indice para busca de similaridade (HNSW e mais eficiente que IVFFlat)
CREATE INDEX IF NOT EXISTS rag_documents_embedding_idx 
ON rag_documents 
USING hnsw (embedding vector_cosine_ops);

-- 4. Criar indice GIN para busca em metadata
CREATE INDEX IF NOT EXISTS rag_documents_metadata_idx 
ON rag_documents 
USING gin (metadata);

-- 5. Criar funcao para busca de similaridade
CREATE OR REPLACE FUNCTION match_documents(
  query_embedding vector(1536),
  match_threshold float DEFAULT 0.2,
  match_count int DEFAULT 3
)
RETURNS TABLE (
  id bigint,
  content text,
  metadata jsonb,
  similarity float
)
LANGUAGE sql STABLE
AS $$
  SELECT
    id,
    content,
    metadata,
    1 - (embedding <=> query_embedding) AS similarity
  FROM rag_documents
  WHERE 1 - (embedding <=> query_embedding) > match_threshold
  ORDER BY embedding <=> query_embedding
  LIMIT match_count;
$$;

-- 6. Criar trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_rag_documents_updated_at
BEFORE UPDATE ON rag_documents
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- 7. Comentarios para documentacao
COMMENT ON TABLE rag_documents IS 'Armazena documentos e seus embeddings para sistema RAG';
COMMENT ON COLUMN rag_documents.content IS 'Texto completo do documento ou chunk';
COMMENT ON COLUMN rag_documents.embedding IS 'Vetor de embedding (1536 dimensoes - OpenAI text-embedding-3-small)';
COMMENT ON COLUMN rag_documents.metadata IS 'Metadata do documento (source, url, title, category, keywords, etc)';
COMMENT ON FUNCTION match_documents IS 'Busca documentos similares usando cosine similarity';

-- 8. Exemplo de uso:
-- INSERT INTO rag_documents (content, embedding, metadata) 
-- VALUES ('texto exemplo', '[0.1, 0.2, ...]'::vector, '{"source": "website", "url": "https://example.com"}'::jsonb);

-- SELECT * FROM match_documents('[0.1, 0.2, ...]'::vector, 0.7, 5);

