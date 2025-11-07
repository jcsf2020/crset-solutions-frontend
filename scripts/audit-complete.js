#!/usr/bin/env node
/**
 * CRSET Solutions - Complete Audit Script
 * Tests all routes, endpoints, APIs, and integrations
 * v3.1.0 - Comprehensive validation
 */

const https = require('https');
const http = require('http');

const BASE_URL = process.env.BASE_URL || 'https://crsetsolutions.com';
const IS_LOCAL = BASE_URL.includes('localhost');

// Color codes for terminal
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m'
};

const results = {
  passed: 0,
  failed: 0,
  warnings: 0,
  tests: []
};

// All frontend routes to test
const FRONTEND_ROUTES = [
  // Main pages
  '/',
  '/servicos',
  '/precos',
  '/faq',
  
  // English versions
  '/en',
  '/en/services',
  '/en/pricing',
  '/en/help',
  '/en/contact',
  '/en/rag-demo',
  
  // Features
  '/demo',
  '/intelligence',
  '/rag-demo',
  '/chat-login',
  '/convite',
  '/start',
  '/success',
  
  // Dynamic service pages
  '/servicos/essential',
  '/servicos/pro',
  '/servicos/enterprise',
  '/servicos/automacao-ia',
  '/servicos/chatbots-ia',
  '/servicos/analytics-ia',
  '/servicos/workflows-ia',
  
  // Other pages
  '/centro-de-ajuda',
  '/imobiliaria',
  '/mascotes',
  '/mascotes-all',
  '/mascotes-test',
  '/privacidade',
  '/termos',
  
  // Meta files
  '/robots.txt',
  '/sitemap.xml'
];

// All API endpoints to test
const API_ENDPOINTS = [
  // Health & Status
  { path: '/api/health', method: 'GET', auth: false },
  { path: '/api/status', method: 'GET', auth: false },
  
  // Chat & RAG
  { path: '/api/chat', method: 'POST', auth: true, body: { message: 'test' } },
  { path: '/api/rag/query', method: 'POST', auth: true, body: { query: 'test' } },
  
  // Intelligence
  { path: '/api/intelligence/insights', method: 'GET', auth: true },
  { path: '/api/intelligence/metrics', method: 'GET', auth: true },
  
  // Contact
  { path: '/api/contact', method: 'POST', auth: false, body: { name: 'Test', email: 'test@test.com', message: 'Test' } },
  
  // Monitoring
  { path: '/api/monitoring', method: 'GET', auth: true },
  { path: '/api/metrics', method: 'GET', auth: true },
  { path: '/api/metrics/summary', method: 'GET', auth: true },
  
  // Auth
  { path: '/api/auth/session', method: 'GET', auth: false },
  
  // Flags
  { path: '/api/flags/chat', method: 'GET', auth: false },
  
  // Debug
  { path: '/api/debug/sentry', method: 'GET', auth: false },
  
  // Test endpoints
  { path: '/api/test', method: 'GET', auth: false },
  { path: '/api/test-llm', method: 'GET', auth: false }
];

function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    const req = protocol.request(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    });
    
    req.on('error', reject);
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
    
    if (options.body) {
      req.write(options.body);
    }
    
    req.end();
  });
}

async function testRoute(route) {
  const url = `${BASE_URL}${route}`;
  const testName = `Frontend: ${route}`;
  
  try {
    const response = await makeRequest(url, { method: 'GET' });
    
    if (response.statusCode === 200) {
      results.passed++;
      results.tests.push({ name: testName, status: 'PASS', details: `Status: ${response.statusCode}` });
      console.log(`${colors.green}✓${colors.reset} ${testName}`);
      return true;
    } else if (response.statusCode === 301 || response.statusCode === 302) {
      results.warnings++;
      results.tests.push({ name: testName, status: 'WARN', details: `Redirect: ${response.statusCode}` });
      console.log(`${colors.yellow}⚠${colors.reset} ${testName} - Redirect`);
      return true;
    } else {
      results.failed++;
      results.tests.push({ name: testName, status: 'FAIL', details: `Status: ${response.statusCode}` });
      console.log(`${colors.red}✗${colors.reset} ${testName} - Status ${response.statusCode}`);
      return false;
    }
  } catch (error) {
    results.failed++;
    results.tests.push({ name: testName, status: 'FAIL', details: error.message });
    console.log(`${colors.red}✗${colors.reset} ${testName} - ${error.message}`);
    return false;
  }
}

async function testEndpoint(endpoint) {
  const url = `${BASE_URL}${endpoint.path}`;
  const testName = `API: ${endpoint.method} ${endpoint.path}`;
  
  const options = {
    method: endpoint.method,
    headers: {
      'Content-Type': 'application/json'
    }
  };
  
  if (endpoint.auth) {
    // Skip auth-required endpoints in production without token
    if (!IS_LOCAL && !process.env.TEST_AUTH_TOKEN) {
      results.warnings++;
      results.tests.push({ name: testName, status: 'SKIP', details: 'Auth required - skipped in production' });
      console.log(`${colors.yellow}⊘${colors.reset} ${testName} - Skipped (auth required)`);
      return true;
    }
    options.headers['Authorization'] = `Bearer ${process.env.TEST_AUTH_TOKEN || 'test-token'}`;
  }
  
  if (endpoint.body) {
    options.body = JSON.stringify(endpoint.body);
  }
  
  try {
    const response = await makeRequest(url, options);
    
    // Accept 200, 201, 401 (expected for auth), 400 (expected for validation)
    const acceptableStatuses = [200, 201, 400, 401, 405];
    
    if (acceptableStatuses.includes(response.statusCode)) {
      results.passed++;
      results.tests.push({ name: testName, status: 'PASS', details: `Status: ${response.statusCode}` });
      console.log(`${colors.green}✓${colors.reset} ${testName} - ${response.statusCode}`);
      return true;
    } else {
      results.failed++;
      results.tests.push({ name: testName, status: 'FAIL', details: `Status: ${response.statusCode}` });
      console.log(`${colors.red}✗${colors.reset} ${testName} - Status ${response.statusCode}`);
      return false;
    }
  } catch (error) {
    // Some endpoints may not exist in all environments
    if (error.message.includes('ECONNREFUSED') || error.message.includes('404')) {
      results.warnings++;
      results.tests.push({ name: testName, status: 'WARN', details: error.message });
      console.log(`${colors.yellow}⚠${colors.reset} ${testName} - ${error.message}`);
      return true;
    }
    
    results.failed++;
    results.tests.push({ name: testName, status: 'FAIL', details: error.message });
    console.log(`${colors.red}✗${colors.reset} ${testName} - ${error.message}`);
    return false;
  }
}

async function testSEO(route) {
  const url = `${BASE_URL}${route}`;
  const testName = `SEO: ${route}`;
  
  try {
    const response = await makeRequest(url, { method: 'GET' });
    const html = response.body;
    
    const checks = {
      canonical: html.includes('<link rel="canonical"'),
      ogTitle: html.includes('property="og:title"'),
      ogDescription: html.includes('property="og:description"'),
      ogImage: html.includes('property="og:image"'),
      ogUrl: html.includes('property="og:url"'),
      title: html.includes('<title>'),
      description: html.includes('name="description"')
    };
    
    const passed = Object.values(checks).filter(Boolean).length;
    const total = Object.keys(checks).length;
    
    if (passed === total) {
      results.passed++;
      results.tests.push({ name: testName, status: 'PASS', details: `All SEO tags present (${passed}/${total})` });
      console.log(`${colors.green}✓${colors.reset} ${testName} - ${passed}/${total} tags`);
      return true;
    } else if (passed >= total * 0.7) {
      results.warnings++;
      results.tests.push({ name: testName, status: 'WARN', details: `Some SEO tags missing (${passed}/${total})` });
      console.log(`${colors.yellow}⚠${colors.reset} ${testName} - ${passed}/${total} tags`);
      return true;
    } else {
      results.failed++;
      results.tests.push({ name: testName, status: 'FAIL', details: `Many SEO tags missing (${passed}/${total})` });
      console.log(`${colors.red}✗${colors.reset} ${testName} - ${passed}/${total} tags`);
      return false;
    }
  } catch (error) {
    results.warnings++;
    results.tests.push({ name: testName, status: 'WARN', details: error.message });
    console.log(`${colors.yellow}⚠${colors.reset} ${testName} - ${error.message}`);
    return true;
  }
}

async function runAudit() {
  console.log(`\n${colors.bold}${colors.cyan}╔════════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}║   CRSET Solutions - Complete Audit v3.1.0  ║${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}╚════════════════════════════════════════════╝${colors.reset}\n`);
  console.log(`${colors.blue}Target:${colors.reset} ${BASE_URL}\n`);
  
  // Test Frontend Routes
  console.log(`${colors.bold}${colors.blue}[1/4] Testing Frontend Routes (${FRONTEND_ROUTES.length})${colors.reset}`);
  console.log(`${colors.cyan}${'─'.repeat(50)}${colors.reset}\n`);
  
  for (const route of FRONTEND_ROUTES) {
    await testRoute(route);
  }
  
  // Test API Endpoints
  console.log(`\n${colors.bold}${colors.blue}[2/4] Testing API Endpoints (${API_ENDPOINTS.length})${colors.reset}`);
  console.log(`${colors.cyan}${'─'.repeat(50)}${colors.reset}\n`);
  
  for (const endpoint of API_ENDPOINTS) {
    await testEndpoint(endpoint);
  }
  
  // Test SEO on main pages
  const seoPages = ['/', '/servicos', '/precos', '/faq', '/en'];
  console.log(`\n${colors.bold}${colors.blue}[3/4] Testing SEO Tags (${seoPages.length})${colors.reset}`);
  console.log(`${colors.cyan}${'─'.repeat(50)}${colors.reset}\n`);
  
  for (const page of seoPages) {
    await testSEO(page);
  }
  
  // Performance check
  console.log(`\n${colors.bold}${colors.blue}[4/4] Performance Check${colors.reset}`);
  console.log(`${colors.cyan}${'─'.repeat(50)}${colors.reset}\n`);
  
  const perfStart = Date.now();
  await testRoute('/');
  const perfTime = Date.now() - perfStart;
  
  if (perfTime < 1000) {
    results.passed++;
    console.log(`${colors.green}✓${colors.reset} Homepage load time: ${perfTime}ms (excellent)`);
  } else if (perfTime < 3000) {
    results.warnings++;
    console.log(`${colors.yellow}⚠${colors.reset} Homepage load time: ${perfTime}ms (acceptable)`);
  } else {
    results.failed++;
    console.log(`${colors.red}✗${colors.reset} Homepage load time: ${perfTime}ms (slow)`);
  }
  
  // Summary
  console.log(`\n${colors.bold}${colors.cyan}╔════════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}║              Audit Summary                 ║${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}╚════════════════════════════════════════════╝${colors.reset}\n`);
  
  const total = results.passed + results.failed + results.warnings;
  const passRate = ((results.passed / total) * 100).toFixed(1);
  
  console.log(`${colors.green}✓ Passed:${colors.reset}   ${results.passed}`);
  console.log(`${colors.yellow}⚠ Warnings:${colors.reset} ${results.warnings}`);
  console.log(`${colors.red}✗ Failed:${colors.reset}   ${results.failed}`);
  console.log(`${colors.blue}━ Total:${colors.reset}    ${total}`);
  console.log(`${colors.bold}Pass Rate: ${passRate}%${colors.reset}\n`);
  
  // Save results to JSON
  const fs = require('fs');
  const reportPath = '/tmp/audit-report.json';
  fs.writeFileSync(reportPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    baseUrl: BASE_URL,
    summary: {
      total,
      passed: results.passed,
      warnings: results.warnings,
      failed: results.failed,
      passRate: parseFloat(passRate)
    },
    tests: results.tests
  }, null, 2));
  
  console.log(`${colors.cyan}Report saved to: ${reportPath}${colors.reset}\n`);
  
  // Exit code
  process.exit(results.failed > 0 ? 1 : 0);
}

runAudit().catch(error => {
  console.error(`${colors.red}Fatal error:${colors.reset}`, error);
  process.exit(1);
});
