import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  reporter: 'line',
  workers: 1,
  timeout: 30_000,
  expect: { timeout: 10_000 },
  use: {
    baseURL: 'https://crset-solutions-frontend-hdmz9w64r-joao-fonsecas-projects.vercel.app',
    trace: 'on-first-retry',
  },
});
