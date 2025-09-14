const fs = require('fs');
const path = require('path');

function findTsxFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
      files.push(...findTsxFiles(fullPath));
    } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

function analyzeFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  
  const imports = [];
  const issues = [];
  
  // Encontrar imports
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('import ') && !line.includes('//')) {
      imports.push({ line: i + 1, content: line });
    }
  }
  
  // Verificar imports específicos que podem ser otimizados
  for (const imp of imports) {
    // React imports desnecessários
    if (imp.content.includes('import React') && !content.includes('React.')) {
      if (!content.includes('JSX.Element') && !content.includes('<>')) {
        issues.push(`Linha ${imp.line}: React import pode ser desnecessário`);
      }
    }
    
    // Imports de bibliotecas pesadas
    if (imp.content.includes('framer-motion') && !imp.content.includes('dynamic')) {
      issues.push(`Linha ${imp.line}: framer-motion pode ser lazy loaded`);
    }
    
    // Imports não utilizados (verificação básica)
    const importMatch = imp.content.match(/import\s+(?:\{([^}]+)\}|\*\s+as\s+(\w+)|(\w+))/);
    if (importMatch) {
      const imported = importMatch[1] || importMatch[2] || importMatch[3];
      if (imported && !imported.includes('type') && !content.slice(imp.content.length).includes(imported.split(',')[0].trim())) {
        // Esta é uma verificação muito básica, pode ter falsos positivos
      }
    }
  }
  
  return { imports: imports.length, issues };
}

const files = findTsxFiles('src');
let totalIssues = 0;

console.log('=== ANÁLISE DE IMPORTS ===\n');

for (const file of files.slice(0, 10)) { // Primeiros 10 arquivos
  const analysis = analyzeFile(file);
  if (analysis.issues.length > 0) {
    console.log(`📁 ${file.replace('src/', '')}`);
    analysis.issues.forEach(issue => console.log(`  ⚠️  ${issue}`));
    console.log('');
    totalIssues += analysis.issues.length;
  }
}

console.log(`Total de possíveis otimizações encontradas: ${totalIssues}`);
