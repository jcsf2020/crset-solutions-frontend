const fs = require('fs');

// Ler o arquivo de trace linha por linha
const traceData = fs.readFileSync('.next/trace', 'utf8');

// Extrair módulos com duração > 30ms usando regex
const moduleRegex = /"name":"([^"]+)"[^}]*"duration":(\d+)/g;
const slowModules = [];
let match;

while ((match = moduleRegex.exec(traceData)) !== null) {
  const name = match[1];
  const duration = parseInt(match[2]);
  
  if (duration > 30000 && name.includes('/')) { // > 30ms e é um módulo real
    slowModules.push({
      name: name.replace(/.*\/([^\/]+)$/, '$1'), // só o nome do arquivo
      fullPath: name,
      duration: Math.round(duration / 1000) // converter para ms
    });
  }
}

// Remover duplicatas e ordenar
const uniqueModules = [...new Map(slowModules.map(m => [m.name, m])).values()]
  .sort((a, b) => b.duration - a.duration);

console.log('=== MÓDULOS COM PARSE/HYDRATE > 30ms ===\n');

if (uniqueModules.length === 0) {
  console.log('✅ Nenhum módulo encontrado com tempo > 30ms');
} else {
  uniqueModules.slice(0, 10).forEach((module, index) => {
    console.log(`${index + 1}. ${module.name}`);
    console.log(`   Tempo: ${module.duration}ms`);
    console.log(`   Path: ${module.fullPath.replace('/home/ubuntu/github_repos/crset-solutions-frontend/', '')}`);
    console.log('');
  });
}

console.log(`\nTotal de módulos lentos: ${uniqueModules.length}`);
