import { test, expect } from '@playwright/test';

const BASE = 'https://crsetsolutions.com';
const PASS = process.env.CHAT_PASSWORD || 'Financeflow2025';

test('chat widget gated + reply', async ({ page, context }) => {
  // 1) Login para obter cookie crset-chat
  const res = await page.request.post(`${BASE}/api/flags/chat/login`, {
    headers: { 'content-type': 'application/json' },
    data: { password: PASS },
  });
  expect(res.status()).toBe(200);
  const setCookie = res.headers()['set-cookie'] || '';
  const m = /crset-chat=([^;]+)/.exec(setCookie);
  expect(m?.[1]).toBeTruthy();

  // injeta cookie no browser
  await context.addCookies([{
    name: 'crset-chat',
    value: m![1],
    domain: 'crsetsolutions.com',
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'Lax',
  }]);

  // 2) Abre homepage
  await page.goto(BASE, { waitUntil: 'domcontentloaded' });

  // 3) Aguarda o widget aparecer e abre
  const fab = page.locator('button[aria-label*="Assistente"]');
  await expect(fab).toBeVisible({ timeout: 10000 });
  await fab.click();

  // 4) Aguarda a janela do chat abrir
  await expect(page.locator('h3:has-text("Assistente CRSET")')).toBeVisible();

  // 5) Envia mensagem
  const input = page.locator('#chat-message-input');
  await expect(input).toBeVisible();
  await input.fill('E2E via Playwright');
  
  const sendButton = page.locator('button:has-text("Enviar")');
  await sendButton.click();

  // 6) Verifica resposta do assistente
  const assistantMessage = page.locator('.crset-chat-assistant').last();
  await expect(assistantMessage).toContainText('Recebi', { timeout: 10_000 });
});

test('chat widget preview mode (no login required)', async ({ page }) => {
  // Simular ambiente de preview
  await page.addInitScript(() => {
    Object.defineProperty(window, 'process', {
      value: { env: { NEXT_PUBLIC_VERCEL_ENV: 'preview' } }
    });
  });

  // Abre homepage
  await page.goto(BASE, { waitUntil: 'domcontentloaded' });

  // Widget deve aparecer sem necessidade de login
  const fab = page.locator('button[aria-label*="Assistente"]');
  await expect(fab).toBeVisible({ timeout: 10000 });
  await fab.click();

  // Chat deve funcionar diretamente
  const input = page.locator('#chat-message-input');
  await expect(input).toBeVisible();
  await input.fill('Preview test message');
  
  const sendButton = page.locator('button:has-text("Enviar")');
  await sendButton.click();

  // Verifica resposta
  const assistantMessage = page.locator('.crset-chat-assistant').last();
  await expect(assistantMessage).toContainText('Recebi', { timeout: 10_000 });
});
