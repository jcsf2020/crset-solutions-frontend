import { test, expect } from '@playwright/test';

const BASE = 'https://crsetsolutions.com';
const PASS = process.env.CHAT_PASSWORD || 'Gocrsetsolutions2025';

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

  // 3) Abre o widget
  const fab = page.locator('.crset-chat-fab');
  await expect(fab).toBeVisible();
  await fab.click();

  // 4) Envia mensagem
  const ta = page.locator('#chat-message-input');
  await ta.fill('E2E via Playwright');
  await page.getByRole('button', { name: 'Enviar' }).click();

  // 5) Verifica resposta do assistente
  const lastAssistant = page.locator('.crset-chat-assistant').last();
  await expect(lastAssistant).toContainText('Recebi', { timeout: 10_000 });
});
