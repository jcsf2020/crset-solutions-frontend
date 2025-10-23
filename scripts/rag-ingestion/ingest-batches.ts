import { prepareDocumentsForIngestion } from './prepare-data';

const API_URL = 'https://crsetsolutions.com/api/rag/ingest';
const BATCH_SIZE = 10;
const BATCH_DELAY_MS = 65000; // 65 segundos entre batches
const REQUEST_DELAY_MS = 500; // 0.5 segundos entre requests no mesmo batch

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function ingestBatches() {
  const chunks = prepareDocumentsForIngestion();
  
  console.log(`Total de chunks: ${chunks.length}`);
  console.log(`Batches: ${Math.ceil(chunks.length / BATCH_SIZE)}\n`);
  
  let successCount = 0;
  let errorCount = 0;
  
  for (let batchIndex = 0; batchIndex < Math.ceil(chunks.length / BATCH_SIZE); batchIndex++) {
    const start = batchIndex * BATCH_SIZE;
    const end = Math.min(start + BATCH_SIZE, chunks.length);
    const batch = chunks.slice(start, end);
    
    console.log(`\n${'='.repeat(60)}`);
    console.log(`📦 BATCH ${batchIndex + 1}/${Math.ceil(chunks.length / BATCH_SIZE)} (chunks ${start + 1}-${end})`);
    console.log(`${'='.repeat(60)}\n`);
    
    for (let i = 0; i < batch.length; i++) {
      const chunk = batch[i];
      const globalIndex = start + i;
      
      console.log(`[${globalIndex + 1}/${chunks.length}] "${chunk.metadata.title}" (${chunk.metadata.chunkIndex + 1}/${chunk.metadata.totalChunks})`);
      
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
          console.log(`✅ Sucesso! (dim: ${result.dim})`);
        } else {
          errorCount++;
          console.log(`❌ Erro: ${result.error || 'Unknown'}`);
        }
      } catch (error: any) {
        errorCount++;
        console.log(`❌ Erro de rede: ${error.message}`);
      }
      
      // Pequeno delay entre requests no mesmo batch
      if (i < batch.length - 1) {
        await sleep(REQUEST_DELAY_MS);
      }
    }
    
    // Aguardar antes do próximo batch (exceto no último)
    if (batchIndex < Math.ceil(chunks.length / BATCH_SIZE) - 1) {
      console.log(`\n⏳ Aguardando ${BATCH_DELAY_MS/1000}s antes do próximo batch...\n`);
      await sleep(BATCH_DELAY_MS);
    }
  }
  
  console.log(`\n\n${'='.repeat(60)}`);
  console.log(`📊 RESUMO FINAL`);
  console.log(`${'='.repeat(60)}`);
  console.log(`✅ Sucesso: ${successCount}/${chunks.length} (${(successCount/chunks.length*100).toFixed(1)}%)`);
  console.log(`❌ Erros: ${errorCount}/${chunks.length}`);
  console.log(`${'='.repeat(60)}\n`);
}

ingestBatches().catch(console.error);
