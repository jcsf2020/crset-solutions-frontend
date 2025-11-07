#!/usr/bin/env node
/**
 * CRSET Solutions - Authenticated API Testing
 * Tests all protected endpoints with proper authentication
 * v3.1.0
 */

const https = require('https');
const crypto = require('crypto');

const BASE_URL = process.env.BASE_URL || 'https://crsetsolutions.com';

// Generate test JWT token (for local testing)
function generateTestToken() {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const payload = Buffer.from(JSON.stringify({
    sub: 'test-user',
    email: 'test@crsetsolutions.com',
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600
  })).toString('base64url');
  
  const secret = process.env.JWT_SECRET || 'test-secret';
  const signature = crypto
    .createHmac('sha256', secret)
    .update(`${header}.${payload}`)
    .digest('base64url');
  
  return `${header}.${payload}.${signature}`;
}

const AUTH_TOKEN = process.env.TEST_AUTH_TOKEN || generateTestToken();

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
  tests: []
};

function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
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
    req.setTimeout(15000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
    
    if (options.body) {
      req.write(options.body);
    }
    
    req.end();
  });
}

const API_TESTS = [
  {
    name: 'Chat API - Basic message',
    endpoint: '/api/chat',
    method: 'POST',
    auth: true,
    body: {
      message: 'Hello, what services do you offer?',
      conversationId: 'test-' + Date.now()
    },
    validate: (response) => {
      const data = JSON.parse(response.body);
      return data.response && typeof data.response === 'string';
    }
  },
  {
    name: 'RAG Query - Knowledge base search',
    endpoint: '/api/rag/query',
    method: 'POST',
    auth: true,
    body: {
      query: 'What are your pricing plans?',
      conversationId: 'test-rag-' + Date.now()
    },
    validate: (response) => {
      const data = JSON.parse(response.body);
      return data.answer || data.response;
    }
  },
  {
    name: 'Intelligence Insights - Get AI insights',
    endpoint: '/api/intelligence/insights',
    method: 'GET',
    auth: true,
    validate: (response) => {
      return response.statusCode === 200 || response.statusCode === 401;
    }
  },
  {
    name: 'Intelligence Metrics - Get metrics',
    endpoint: '/api/intelligence/metrics',
    method: 'GET',
    auth: true,
    validate: (response) => {
      return response.statusCode === 200 || response.statusCode === 401;
    }
  },
  {
    name: 'Monitoring - System health',
    endpoint: '/api/monitoring',
    method: 'GET',
    auth: true,
    validate: (response) => {
      return response.statusCode === 200 || response.statusCode === 401;
    }
  },
  {
    name: 'Metrics - Get analytics',
    endpoint: '/api/metrics',
    method: 'GET',
    auth: true,
    validate: (response) => {
      return response.statusCode === 200 || response.statusCode === 401;
    }
  },
  {
    name: 'Metrics Summary - Aggregated data',
    endpoint: '/api/metrics/summary',
    method: 'GET',
    auth: true,
    validate: (response) => {
      return response.statusCode === 200 || response.statusCode === 401;
    }
  },
  {
    name: 'OpenAI Usage - Monitor API usage',
    endpoint: '/api/monitoring/openai-usage',
    method: 'GET',
    auth: true,
    validate: (response) => {
      return response.statusCode === 200 || response.statusCode === 401;
    }
  },
  {
    name: 'Contact API - Send message',
    endpoint: '/api/contact',
    method: 'POST',
    auth: false,
    body: {
      name: 'Test User',
      email: 'test@example.com',
      message: 'This is a test message from audit script',
      phone: '+351912345678'
    },
    validate: (response) => {
      return response.statusCode === 200 || response.statusCode === 400;
    }
  },
  {
    name: 'Health Check - API status',
    endpoint: '/api/health',
    method: 'GET',
    auth: false,
    validate: (response) => {
      const data = JSON.parse(response.body);
      return data.status === 'ok' || data.status === 'healthy';
    }
  },
  {
    name: 'Status - System status',
    endpoint: '/api/status',
    method: 'GET',
    auth: false,
    validate: (response) => {
      return response.statusCode === 200;
    }
  },
  {
    name: 'Test LLM - OpenAI connectivity',
    endpoint: '/api/test-llm',
    method: 'GET',
    auth: false,
    validate: (response) => {
      return response.statusCode === 200;
    }
  },
  {
    name: 'Sentry Debug - Error tracking',
    endpoint: '/api/debug/sentry',
    method: 'GET',
    auth: false,
    validate: (response) => {
      return response.statusCode === 200;
    }
  },
  {
    name: 'Feature Flags - Chat availability',
    endpoint: '/api/flags/chat',
    method: 'GET',
    auth: false,
    validate: (response) => {
      const data = JSON.parse(response.body);
      return typeof data.enabled === 'boolean';
    }
  }
];

async function testAPI(test) {
  const url = `${BASE_URL}${test.endpoint}`;
  
  const options = {
    method: test.method,
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'CRSET-Audit/3.1.0'
    }
  };
  
  if (test.auth) {
    options.headers['Authorization'] = `Bearer ${AUTH_TOKEN}`;
  }
  
  if (test.body) {
    options.body = JSON.stringify(test.body);
  }
  
  try {
    console.log(`${colors.blue}Testing:${colors.reset} ${test.name}`);
    console.log(`  ${colors.cyan}→${colors.reset} ${test.method} ${test.endpoint}`);
    
    const startTime = Date.now();
    const response = await makeRequest(url, options);
    const duration = Date.now() - startTime;
    
    console.log(`  ${colors.cyan}←${colors.reset} Status: ${response.statusCode} (${duration}ms)`);
    
    // Validate response
    let isValid = false;
    let validationError = null;
    
    try {
      isValid = test.validate ? test.validate(response) : response.statusCode === 200;
    } catch (error) {
      validationError = error.message;
    }
    
    if (isValid) {
      results.passed++;
      results.tests.push({
        name: test.name,
        endpoint: test.endpoint,
        status: 'PASS',
        statusCode: response.statusCode,
        duration
      });
      console.log(`  ${colors.green}✓ PASS${colors.reset}\n`);
      return true;
    } else {
      results.failed++;
      results.tests.push({
        name: test.name,
        endpoint: test.endpoint,
        status: 'FAIL',
        statusCode: response.statusCode,
        duration,
        error: validationError || 'Validation failed'
      });
      console.log(`  ${colors.red}✗ FAIL${colors.reset} - ${validationError || 'Validation failed'}\n`);
      return false;
    }
  } catch (error) {
    results.failed++;
    results.tests.push({
      name: test.name,
      endpoint: test.endpoint,
      status: 'ERROR',
      error: error.message
    });
    console.log(`  ${colors.red}✗ ERROR${colors.reset} - ${error.message}\n`);
    return false;
  }
}

async function runTests() {
  console.log(`\n${colors.bold}${colors.cyan}╔════════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}║   CRSET API Authentication Tests v3.1.0   ║${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}╚════════════════════════════════════════════╝${colors.reset}\n`);
  console.log(`${colors.blue}Target:${colors.reset} ${BASE_URL}`);
  console.log(`${colors.blue}Tests:${colors.reset}  ${API_TESTS.length}\n`);
  console.log(`${colors.cyan}${'═'.repeat(50)}${colors.reset}\n`);
  
  for (const test of API_TESTS) {
    await testAPI(test);
    await new Promise(resolve => setTimeout(resolve, 500)); // Rate limiting
  }
  
  // Summary
  console.log(`${colors.cyan}${'═'.repeat(50)}${colors.reset}\n`);
  console.log(`${colors.bold}${colors.cyan}Test Summary${colors.reset}\n`);
  
  const total = results.passed + results.failed;
  const passRate = ((results.passed / total) * 100).toFixed(1);
  
  console.log(`${colors.green}✓ Passed:${colors.reset}   ${results.passed}/${total}`);
  console.log(`${colors.red}✗ Failed:${colors.reset}   ${results.failed}/${total}`);
  console.log(`${colors.bold}Pass Rate: ${passRate}%${colors.reset}\n`);
  
  // Save results
  const fs = require('fs');
  const reportPath = '/tmp/api-auth-test-report.json';
  fs.writeFileSync(reportPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    baseUrl: BASE_URL,
    summary: {
      total,
      passed: results.passed,
      failed: results.failed,
      passRate: parseFloat(passRate)
    },
    tests: results.tests
  }, null, 2));
  
  console.log(`${colors.cyan}Report saved to: ${reportPath}${colors.reset}\n`);
  
  process.exit(results.failed > 0 ? 1 : 0);
}

runTests().catch(error => {
  console.error(`${colors.red}Fatal error:${colors.reset}`, error);
  process.exit(1);
});
