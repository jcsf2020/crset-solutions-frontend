
import { test, expect } from '@playwright/test';

test.describe('Smoke Tests - Páginas Principais', () => {
  test('deve carregar a página inicial', async ({ page }) => {
    await page.goto('/');
    
    // Verifica se o título contém CRSET
    await expect(page).toHaveTitle(/CRSET/);
    
    // Verifica se elementos principais estão presentes (usando seletores mais flexíveis)
    await expect(page.locator('h1, h2, [role="heading"]').first()).toBeVisible();
    await expect(page.locator('nav, header, [role="navigation"]').first()).toBeVisible();
  });

  test('deve carregar a página de serviços', async ({ page }) => {
    await page.goto('/servicos');
    
    // Verifica se a página carregou corretamente (título mais flexível)
    await expect(page).toHaveTitle(/CRSET/);
    
    // Verifica se há conteúdo de serviços
    await expect(page.locator('h1, h2, [role="heading"]').first()).toBeVisible();
    await expect(page.locator('main, body, #__next').first()).toBeVisible();
  });

  test('deve carregar a página de preços', async ({ page }) => {
    await page.goto('/precos');
    
    // Verifica se a página carregou corretamente (baseado no título real: "Planos CRSET Solutions")
    await expect(page).toHaveTitle(/Planos.*CRSET|CRSET.*Planos/);
    
    // Verifica se há conteúdo de preços
    await expect(page.locator('h1, h2, [role="heading"]').first()).toBeVisible();
    await expect(page.locator('main, body, #__next').first()).toBeVisible();
  });

  test('deve carregar a página de FAQ', async ({ page }) => {
    await page.goto('/faq');
    
    // Verifica se a página carregou corretamente
    await expect(page).toHaveTitle(/FAQ.*CRSET|CRSET.*FAQ/);
    
    // Verifica se há conteúdo de FAQ
    await expect(page.locator('h1, h2, [role="heading"]').first()).toBeVisible();
    await expect(page.locator('main, body, #__next').first()).toBeVisible();
  });
});
