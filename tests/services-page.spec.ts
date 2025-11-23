import { test, expect } from '@playwright/test';

const BASE_URL = process.env.PLAYWRIGHT_TEST_BASE_URL || 'https://crsetsolutions.com';

test.describe('Services Page', () => {
  test('should load services page successfully', async ({ page }) => {
    await page.goto(`${BASE_URL}/servicos`, { waitUntil: 'networkidle' });
    
    // Check page loaded
    await expect(page).toHaveTitle(/Serviços|Services/);
    
    // Check main heading
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
  });

  test('should display all main services', async ({ page }) => {
    await page.goto(`${BASE_URL}/servicos`, { waitUntil: 'networkidle' });
    
    const pageContent = await page.textContent('body');
    
    // Should mention key services
    expect(pageContent).toMatch(/Lançamento|Launch/i);
    expect(pageContent).toMatch(/AGI|Automação|Automation/i);
    expect(pageContent).toMatch(/Integrações|Integrations/i);
  });

  test('should have working navigation to pricing', async ({ page }) => {
    await page.goto(`${BASE_URL}/servicos`, { waitUntil: 'networkidle' });
    
    // Find links to pricing page
    const pricingLinks = page.locator('a[href*="/precos"], a[href*="/pricing"]');
    const count = await pricingLinks.count();
    
    expect(count).toBeGreaterThan(0);
  });

  test('should display service features', async ({ page }) => {
    await page.goto(`${BASE_URL}/servicos`, { waitUntil: 'networkidle' });
    
    // Should have bullet points or feature lists
    const lists = page.locator('ul, ol');
    const listCount = await lists.count();
    
    expect(listCount).toBeGreaterThan(0);
  });
});
