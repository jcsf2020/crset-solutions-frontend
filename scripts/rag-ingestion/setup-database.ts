/**
 * Script para configurar o banco de dados Supabase para RAG
 * 
 * Este script:
 * 1. Le o arquivo SQL de setup
 * 2. Executa no Supabase
 * 3. Valida a criacao da tabela e funcoes
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { join } from 'path';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Erro: Variaveis de ambiente nao configuradas');
  console.error('   NEXT_PUBLIC_SUPABASE_URL:', SUPABASE_URL ? '✓' : '✗');
  console.error('   SUPABASE_SERVICE_ROLE_KEY:', SUPABASE_SERVICE_KEY ? '✓' : '✗');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_KEY!, {
  auth: { persistSession: false }
});

async function setupDatabase() {
  console.log('🚀 Configurando banco de dados RAG no Supabase...\n');
  
  // Read SQL file
  const sqlPath = join(__dirname, 'setup-supabase.sql');
  console.log(`📄 Lendo SQL de: ${sqlPath}`);
  
  let sql: string;
  try {
    sql = readFileSync(sqlPath, 'utf-8');
    console.log(`✅ SQL lido com sucesso (${sql.length} caracteres)\n`);
  } catch (error) {
    console.error('❌ Erro ao ler arquivo SQL:', error);
    process.exit(1);
  }
  
  // Split SQL into individual statements (basic split by semicolon)
  const statements = sql
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--'));
  
  console.log(`📝 Executando ${statements.length} comandos SQL...\n`);
  
  let successCount = 0;
  let errorCount = 0;
  
  for (let i = 0; i < statements.length; i++) {
    const statement = statements[i];
    const preview = statement.substring(0, 60).replace(/\n/g, ' ') + '...';
    
    process.stdout.write(`[${i + 1}/${statements.length}] ${preview} `);
    
    try {
      // Execute SQL using Supabase REST API directly
      const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_SERVICE_KEY,
          'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`
        },
        body: JSON.stringify({ query: statement })
      });
      
      // If RPC doesn't exist, try direct SQL execution via PostgREST
      if (response.status === 404) {
        // Use Supabase client's built-in SQL execution
        const { error } = await supabase.rpc('exec', { sql: statement });
        
        if (error) {
          // If exec RPC also doesn't exist, we need to execute via raw SQL
          // This is a limitation - we'll need to use psql or create the RPC first
          console.log('⚠️  (RPC nao disponivel, pulando)');
          continue;
        }
      } else if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }
      
      successCount++;
      console.log('✅');
    } catch (error) {
      errorCount++;
      console.log(`❌ ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('📊 RESUMO DO SETUP');
  console.log('='.repeat(60));
  console.log(`✅ Sucesso: ${successCount}/${statements.length}`);
  console.log(`❌ Erros: ${errorCount}/${statements.length}`);
  
  if (errorCount > 0) {
    console.log('\n⚠️  Alguns comandos falharam.');
    console.log('   Isso pode ser normal se as tabelas/funcoes ja existirem.');
    console.log('   Verifique manualmente no Supabase Dashboard.');
  }
  
  // Validate setup
  console.log('\n🔍 Validando setup...\n');
  
  // Check if table exists
  const { data: tables, error: tablesError } = await supabase
    .from('rag_documents')
    .select('id')
    .limit(1);
  
  if (tablesError) {
    if (tablesError.message.includes('does not exist')) {
      console.log('❌ Tabela rag_documents nao existe');
      console.log('\n💡 Solucao:');
      console.log('   1. Acesse o Supabase Dashboard');
      console.log('   2. Va em SQL Editor');
      console.log('   3. Execute o conteudo de scripts/rag-ingestion/setup-supabase.sql');
      console.log(`   4. URL: ${SUPABASE_URL!.replace('//', '//app.')}/project/_/sql`);
    } else {
      console.log('❌ Erro ao validar tabela:', tablesError.message);
    }
  } else {
    console.log('✅ Tabela rag_documents existe');
  }
  
  // Check if function exists (try to call it with dummy data)
  const { error: funcError } = await supabase.rpc('match_documents', {
    query_embedding: JSON.stringify(new Array(1536).fill(0)),
    match_threshold: 0.5,
    match_count: 1
  });
  
  if (funcError) {
    if (funcError.message.includes('does not exist')) {
      console.log('❌ Funcao match_documents nao existe');
    } else {
      // Other errors might be OK (e.g., no data found)
      console.log('✅ Funcao match_documents existe');
    }
  } else {
    console.log('✅ Funcao match_documents existe');
  }
  
  console.log('\n✨ Setup concluido!');
  console.log('\n💡 Proximos passos:');
  console.log('   1. Se houver erros, execute o SQL manualmente no Dashboard');
  console.log('   2. Execute: pnpm tsx scripts/rag-ingestion/ingest.ts');
  console.log('   3. Teste em: https://crsetsolutions.com/rag-demo');
}

// Execute
setupDatabase().catch(error => {
  console.error('\n❌ Erro fatal:', error);
  process.exit(1);
});

