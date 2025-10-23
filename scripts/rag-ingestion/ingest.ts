/**
 * Script para ingerir dados preparados no sistema RAG via API
 * 
 * Usage:
 *   pnpm tsx scripts/rag-ingestion/ingest.ts
 */

import { prepareDocumentsForIngestion } from './prepare-data';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://crsetsolutions.com';
const INGEST_ENDPOINT = `${API_URL}/api/rag/ingest`;

interface IngestResponse {
  ok: boolean;
  dim?: number;
  error?: string;
}

async function ingestChunk(text: string, metadata: any): Promise<IngestResponse> {
  try {
    const response = await fetch(INGEST_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        metadata
      })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || `HTTP ${response.status}`);
    }
    
    return data;
  } catch (error) {
    console.error('Erro ao ingerir chunk:', error);
    return {
      ok: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

async function ingestAll() {
  console.log('🚀 Iniciando ingestao de dados no RAG...\n');
  
  const chunks = prepareDocumentsForIngestion();
  console.log(`📦 Total de chunks preparados: ${chunks.length}\n`);
  
  let successCount = 0;
  let errorCount = 0;
  const errors: string[] = [];
  
  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    const progress = `[${i + 1}/${chunks.length}]`;
    
    process.stdout.write(`${progress} Ingerindo chunk ${chunk.metadata.chunkIndex + 1}/${chunk.metadata.totalChunks} de "${chunk.metadata.title}"...`);
    
    const result = await ingestChunk(chunk.text, chunk.metadata);
    
    if (result.ok) {
      successCount++;
      console.log(` ✅ (dim=${result.dim})`);
    } else {
      errorCount++;
      const errorMsg = `${progress} ${chunk.metadata.title}: ${result.error}`;
      errors.push(errorMsg);
      console.log(` ❌ ${result.error}`);
    }
    
    // Rate limiting: aguardar 100ms entre requisicoes para nao ultrapassar limite
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('📊 RESUMO DA INGESTAO');
  console.log('='.repeat(60));
  console.log(`✅ Sucesso: ${successCount}/${chunks.length} (${(successCount/chunks.length*100).toFixed(1)}%)`);
  console.log(`❌ Erros: ${errorCount}/${chunks.length}`);
  
  if (errors.length > 0) {
    console.log('\n⚠️  ERROS ENCONTRADOS:');
    errors.forEach(err => console.log(`  - ${err}`));
  }
  
  console.log('\n✨ Ingestao concluida!');
  
  if (successCount > 0) {
    console.log('\n💡 Proximos passos:');
    console.log('  1. Testar queries em https://crsetsolutions.com/rag-demo');
    console.log('  2. Verificar qualidade dos resultados');
    console.log('  3. Ajustar parametros se necessario');
  }
}

// Executar
ingestAll().catch(error => {
  console.error('❌ Erro fatal:', error);
  process.exit(1);
});

