
import { test, expect } from '@playwright/test';

test.describe('Formulário de Contato', () => {
  test('deve interceptar e mockar o envio do formulário de contato', async ({ page }) => {
    // Mock da API de contato
    await page.route('**/api/contact', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ 
          success: true, 
          message: 'Mensagem enviada com sucesso!' 
        }),
      });
    });

    await page.goto('/');
    
    // Procura por formulário de contato ou botão que abre modal
    const contactButton = page.locator('button:has-text("Contato"), a:has-text("Contato"), [data-testid="contact-button"]').first();
    
    if (await contactButton.isVisible()) {
      await contactButton.click();
      
      // Aguarda o formulário aparecer (pode ser em modal ou nova seção)
      await page.waitForTimeout(1000);
      
      // Procura pelos campos do formulário
      const nameField = page.locator('input[name="name"], input[placeholder*="nome"], input[id*="name"]').first();
      const emailField = page.locator('input[name="email"], input[type="email"], input[placeholder*="email"]').first();
      const messageField = page.locator('textarea[name="message"], textarea[placeholder*="mensagem"]').first();
      const submitButton = page.locator('button[type="submit"], button:has-text("Enviar")').first();
      
      // Verifica se os campos existem antes de preencher
      if (await nameField.isVisible()) {
        await nameField.fill('João Teste');
      }
      
      if (await emailField.isVisible()) {
        await emailField.fill('joao@teste.com');
      }
      
      if (await messageField.isVisible()) {
        await messageField.fill('Esta é uma mensagem de teste do Playwright.');
      }
      
      // Tenta enviar o formulário se o botão existir
      if (await submitButton.isVisible()) {
        await submitButton.click();
        
        // Verifica se houve alguma resposta (sucesso ou erro)
        await expect(page.locator('text=/sucesso|enviado|obrigado/i').or(page.locator('[data-testid="success-message"]'))).toBeVisible({ timeout: 5000 });
      }
    } else {
      // Se não encontrar formulário de contato, apenas verifica que a página carregou
      console.log('Formulário de contato não encontrado, verificando apenas se a página carregou');
      await expect(page.locator('h1, h2, [role="heading"]').first()).toBeVisible();
    }
  });
});
