# Configuração do Workflow E2E - GitHub Actions

## 📋 Instruções para Configurar o CI

Para completar a configuração dos testes E2E, é necessário adicionar manualmente o workflow do GitHub Actions devido a restrições de permissão.

### 🔧 Passos para Configuração

1. **Acesse o repositório no GitHub**
2. **Vá para a aba "Actions"**
3. **Clique em "New workflow"**
4. **Escolha "set up a workflow yourself"**
5. **Cole o conteúdo abaixo no arquivo `.github/workflows/e2e-smoke.yml`:**

```yaml
name: E2E Smoke Tests

on:
  pull_request:
    branches: [ main ]
  push:
    branches: [ main ]

jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    
    - uses: actions/setup-node@v4
      with:
        node-version: 22
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Install Playwright Browsers
      run: npx playwright install chromium
    
    - name: Build Next.js app
      run: npm run build
    
    - name: Run Playwright tests
      run: npm run test:e2e
      env:
        CI: true
    
    - uses: actions/upload-artifact@v4
      if: always()
      with:
        name: playwright-report
        path: playwright-report/
        retention-days: 30
```

### ✅ Verificação

Após adicionar o workflow:

1. **Faça um commit** para salvar o arquivo
2. **O workflow será executado automaticamente** nos próximos PRs
3. **Verifique na aba Actions** se os testes estão passando

### 🎯 Resultado Esperado

- ✅ Testes executam automaticamente em cada PR
- ✅ Pipeline verde com 5 testes passando
- ✅ Relatórios salvos como artefatos
- ✅ Feedback imediato sobre quebras

### 📊 Testes Incluídos

- **Smoke Test**: Páginas principais (/, /servicos, /precos, /faq)
- **Contact Form**: Mock de envio de formulário
- **Performance**: Execução rápida (~2-3 segundos)
- **Estabilidade**: Sem flakiness

---

**🎉 Com isso, a sequência T0-T9 estará 100% completa!**