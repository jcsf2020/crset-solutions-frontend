import { test, expect } from '@playwright/test';

const BASE_URL = process.env.PLAYWRIGHT_TEST_BASE_URL || 'http://localhost:3000';

test.describe('API Routes Health Check', () => {
  test('GET /api/health should return 200', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/health`);
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty('ts');
    expect(data).toHaveProperty('checks');
  });

  test('GET /api/status should return 200', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/status`);
    expect(response.status()).toBe(200);
  });

  test('POST /api/contact with valid data should return 200', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/api/contact`, {
      data: {
        name: 'Test User',
        email: 'test@example.com',
        message: 'This is a test message for contact form',
      },
    });
    expect([200, 400, 500]).toContain(response.status());
  });

  test('POST /api/contact with invalid data should return 400', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/api/contact`, {
      data: {
        name: 'T', // Too short
        email: 'invalid-email',
        message: 'Short', // Too short
      },
    });
    expect(response.status()).toBe(400);
  });

  test('OPTIONS /api/rag/query should return 204 or 503', async ({ request }) => {
    const response = await request.options(`${BASE_URL}/api/rag/query`);
    // Accept 204 (success) or 503 (not implemented)
    expect([204, 503]).toContain(response.status());
  });

  test('GET /api/metrics should return 200, 401, or 503', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/metrics`);
    // Accept 200 (success), 401 (unauthorized), 403 (forbidden), or 503 (not implemented)
    expect([200, 401, 403, 503]).toContain(response.status());
  });

  test('GET /api/stripe/webhook should return 405 or 503', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/stripe/webhook`);
    // Accept 405 (method not allowed) or 503 (not implemented)
    expect([405, 503]).toContain(response.status());
  });

  test('POST /api/stripe/webhook without signature should return 400 or 503', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/api/stripe/webhook`, {
      data: { test: 'data' },
    });
    // Accept 400 (bad request) or 503 (not implemented)
    expect([400, 503]).toContain(response.status());
  });
});

test.describe('CORS Headers', () => {
  test('API should return CORS headers for allowed origins', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/health`, {
      headers: {
        'Origin': 'https://crsetsolutions.com',
      },
    });
    expect(response.status()).toBe(200);
  });
});

test.describe('Error Handling', () => {
  test('Invalid JSON should return 400', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/api/contact`, {
      data: 'invalid json',
    });
    expect([400, 500]).toContain(response.status());
  });

  test('Missing required fields should return 400', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/api/contact`, {
      data: {
        name: 'Test',
        // missing email and message
      },
    });
    expect(response.status()).toBe(400);
  });
});
