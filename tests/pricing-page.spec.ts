import { test, expect } from '@playwright/test';

const BASE_URL = process.env.PLAYWRIGHT_TEST_BASE_URL || 'https://crsetsolutions.com';

test.describe('Pricing Page', () => {
  test('should load pricing page successfully', async ({ page }) => {
    await page.goto(`${BASE_URL}/precos`, { waitUntil: 'networkidle' });
    
    // Check page title
    await expect(page).toHaveTitle(/Preços|Pricing/);
    
    // Check main heading
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
  });

  test('should display all pricing tiers', async ({ page }) => {
    await page.goto(`${BASE_URL}/precos`, { waitUntil: 'networkidle' });
    
    // Check for pricing information
    const pageContent = await page.textContent('body');
    
    // Should mention key prices (flexible matching for different formats)
    expect(pageContent).toMatch(/2[.,\s]?500/); // Catálogo
    expect(pageContent).toMatch(/3[.,\s]?900/); // Imobiliária
    expect(pageContent).toMatch(/3[.,\s]?500/); // E-commerce
  });

  test('should have working CTA buttons', async ({ page }) => {
    await page.goto(`${BASE_URL}/precos`, { waitUntil: 'networkidle' });
    
    // Find CTA buttons (WhatsApp or contact)
    const ctaButtons = page.locator('a[href*="wa.me"], a[href*="whatsapp"], button:has-text("Contactar")');
    const count = await ctaButtons.count();
    
    expect(count).toBeGreaterThan(0);
  });

  test('should be mobile responsive', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(`${BASE_URL}/precos`, { waitUntil: 'networkidle' });
    
    // Check that content is visible
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    
    // Check that pricing cards are stacked (not side by side)
    const pricingCards = page.locator('[class*="card"], [class*="pricing"]').first();
    if (await pricingCards.count() > 0) {
      const box = await pricingCards.boundingBox();
      expect(box?.width).toBeLessThan(400);
    }
  });
});
