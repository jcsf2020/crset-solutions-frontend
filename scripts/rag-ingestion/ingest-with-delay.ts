import fs from 'fs';
import path from 'path';

const API_URL = 'https://crsetsolutions.com/api/rag/ingest';
const DELAY_MS = 6500; // 6.5 segundos entre requisições (10 req/min = 6s, +0.5s margem)

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function ingestWithDelay() {
  const dataPath = path.join(__dirname, 'data.json');
  const chunks = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  
  console.log(`Total de chunks: ${chunks.length}`);
  
  let successCount = 0;
  let errorCount = 0;
  
  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    console.log(`\n[${i + 1}/${chunks.length}] Ingerindo chunk...`);
    
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
    
    // Aguardar antes da próxima requisição (exceto na última)
    if (i < chunks.length - 1) {
      console.log(`⏳ Aguardando ${DELAY_MS}ms...`);
      await sleep(DELAY_MS);
    }
  }
  
  console.log(`\n\n📊 Resumo:`);
  console.log(`✅ Sucesso: ${successCount}/${chunks.length}`);
  console.log(`❌ Erros: ${errorCount}/${chunks.length}`);
}

ingestWithDelay().catch(console.error);
