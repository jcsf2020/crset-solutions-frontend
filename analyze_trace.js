const fs = require('fs');

// Ler o arquivo de trace
const traceData = fs.readFileSync('.next/trace', 'utf8');
const traces = JSON.parse('[' + traceData.replace(/}\s*{/g, '},{') + ']');

// Filtrar módulos que demoram mais de 30ms (30000 microsegundos)
const slowModules = traces
  .filter(trace => trace.duration > 30000 && trace.tags && trace.tags.name)
  .map(trace => ({
    name: trace.tags.name,
    duration: Math.round(trace.duration / 1000), // converter para ms
    layer: trace.tags.layer || 'unknown'
  }))
  .sort((a, b) => b.duration - a.duration);

console.log('=== MÓDULOS COM PARSE/HYDRATE > 30ms ===\n');

if (slowModules.length === 0) {
  console.log('✅ Nenhum módulo encontrado com tempo > 30ms');
} else {
  slowModules.forEach((module, index) => {
    console.log(`${index + 1}. ${module.name}`);
    console.log(`   Tempo: ${module.duration}ms`);
    console.log(`   Layer: ${module.layer}`);
    console.log('');
  });
}

console.log(`\nTotal de módulos lentos: ${slowModules.length}`);
