import { prepareDocumentsForIngestion } from './prepare-data';

const API_URL = 'https://crsetsolutions.com/api/rag/ingest';
const DELAY_MS = 6500; // 6.5 segundos entre requisições

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function ingestAll() {
  const chunks = prepareDocumentsForIngestion();
  
  console.log(`Total de chunks: ${chunks.length}\n`);
  
  let successCount = 0;
  let errorCount = 0;
  
  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    console.log(`[${i + 1}/${chunks.length}] Ingerindo "${chunk.metadata.title}" (chunk ${chunk.metadata.chunkIndex + 1}/${chunk.metadata.totalChunks})...`);
    
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: chunk.text,
          metadata: chunk.metadata,
        }),
      });
      
      const result = await response.json();
      
      if (response.ok && result.ok) {
        successCount++;
        console.log(`✅ Sucesso! (dim: ${result.dim})\n`);
      } else {
        errorCount++;
        console.log(`❌ Erro: ${result.error || 'Unknown'}\n`);
      }
    } catch (error: any) {
      errorCount++;
      console.log(`❌ Erro de rede: ${error.message}\n`);
    }
    
    // Aguardar antes da próxima requisição (exceto na última)
    if (i < chunks.length - 1) {
      console.log(`⏳ Aguardando ${DELAY_MS/1000}s...\n`);
      await sleep(DELAY_MS);
    }
  }
  
  console.log(`\n${'='.repeat(50)}`);
  console.log(`📊 Resumo Final:`);
  console.log(`✅ Sucesso: ${successCount}/${chunks.length} (${(successCount/chunks.length*100).toFixed(1)}%)`);
  console.log(`❌ Erros: ${errorCount}/${chunks.length}`);
  console.log(`${'='.repeat(50)}\n`);
}

ingestAll().catch(console.error);
