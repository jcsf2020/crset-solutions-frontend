import { test, expect } from "@playwright/test";

test.describe("Mascot Interactivity", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/mascotes");
    await page.waitForLoadState("networkidle");
  });

  test("renders three mascot cards", async ({ page }) => {
    await expect(page.locator('[data-testid^="mascot-"]')).toHaveCount(3);
  });

  test("hover applies transform", async ({ page }) => {
    const img = page.locator('[data-testid="mascot-boris"] img').first();
    const before = await img.evaluate(el => getComputedStyle(el.parentElement!).transform);
    await img.hover();
    await page.waitForTimeout(400);
    const after = await img.evaluate(el => getComputedStyle(el.parentElement!).transform);
    expect(after).not.toBe(before);
  });

  test("click dispatches custom chat event", async ({ page }) => {
    const eventPromise = page.evaluate(() => new Promise(resolve => {
      window.addEventListener("crset:chat:open", (e: any) => resolve(e.detail), { once: true });
    }));
    await page.locator('[data-testid="mascot-boris"]').click();
    const detail: any = await eventPromise;
    expect(detail).toHaveProperty("mascot", "boris");
  });
});
