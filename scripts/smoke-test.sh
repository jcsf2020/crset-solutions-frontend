#!/bin/bash

# CRSET Solutions Frontend - Smoke Test Script
# Tests critical API endpoints to verify deployment health

set -e  # Exit on error

BASE_URL="${1:-https://crsetsolutions.com}"
FAILED=0
PASSED=0

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "=========================================="
echo "  CRSET Solutions - API Smoke Tests"
echo "  Base URL: $BASE_URL"
echo "=========================================="
echo ""

# Helper function to test endpoints
test_endpoint() {
    local name="$1"
    local url="$2"
    local method="${3:-GET}"
    local data="${4:-}"
    local expected_status="${5:-200}"
    
    echo -n "Testing $name... "
    
    if [ "$method" = "GET" ]; then
        response=$(curl -s -w "\n%{http_code}" "$url" -H "User-Agent: smoke-test/1.0")
    else
        response=$(curl -s -w "\n%{http_code}" -X "$method" "$url" \
            -H "Content-Type: application/json" \
            -H "User-Agent: smoke-test/1.0" \
            -d "$data")
    fi
    
    status_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d')
    
    if [ "$status_code" = "$expected_status" ]; then
        echo -e "${GREEN}✓ PASS${NC} (HTTP $status_code)"
        ((PASSED++))
        return 0
    else
        echo -e "${RED}✗ FAIL${NC} (Expected $expected_status, got $status_code)"
        echo "  Response: ${body:0:200}"
        ((FAILED++))
        return 1
    fi
}

echo "📍 Core Health Endpoints"
echo "----------------------------------------"
test_endpoint "Status Endpoint" "$BASE_URL/api/status" "GET"
test_endpoint "Health Check" "$BASE_URL/api/health" "GET"
echo ""

echo "💬 Chat & AI Endpoints"
echo "----------------------------------------"
test_endpoint "Status Chat Action" "$BASE_URL/api/status" "POST" \
    '{"action":"chat","message":"Olá","language":"pt"}'
test_endpoint "Assistant Endpoint" "$BASE_URL/api/assistant" "POST" \
    '{"message":"Hello","language":"en"}' "200,404"
echo ""

echo "📊 Intelligence Hub Endpoints"
echo "----------------------------------------"
test_endpoint "Intelligence Metrics" "$BASE_URL/api/intelligence/metrics" "GET"
test_endpoint "Intelligence Insights" "$BASE_URL/api/intelligence/insights" "GET"
echo ""

echo "🔍 RAG Endpoints (May fail if OpenAI key not configured)"
echo "----------------------------------------"
# RAG tests are informational only - don't fail the build
set +e
test_endpoint "RAG Ingest" "$BASE_URL/api/rag/ingest" "POST" \
    '{"id":"test-smoke","source":"smoke-test","text":"CRSET Solutions test"}' || true
test_endpoint "RAG Query" "$BASE_URL/api/rag/query" "POST" \
    '{"message":"What is CRSET?","match_count":3}' || true
set -e
echo ""

echo "🌐 Frontend Pages"
echo "----------------------------------------"
test_endpoint "Homepage (PT)" "$BASE_URL/" "GET"
test_endpoint "Homepage (EN)" "$BASE_URL/en" "GET"
test_endpoint "Services (PT)" "$BASE_URL/servicos" "GET"
test_endpoint "Services (EN)" "$BASE_URL/en/services" "GET"
test_endpoint "Pricing (PT)" "$BASE_URL/precos" "GET"
test_endpoint "Pricing (EN)" "$BASE_URL/en/pricing" "GET"
echo ""

echo "📄 SEO & Metadata"
echo "----------------------------------------"
test_endpoint "Sitemap" "$BASE_URL/sitemap.xml" "GET"
test_endpoint "Robots.txt" "$BASE_URL/robots.txt" "GET"
echo ""

echo "=========================================="
echo "  Test Results Summary"
echo "=========================================="
echo -e "${GREEN}Passed: $PASSED${NC}"
echo -e "${RED}Failed: $FAILED${NC}"
echo ""

if [ $FAILED -gt 0 ]; then
    echo -e "${RED}⚠️  Some tests failed. Please review the errors above.${NC}"
    exit 1
else
    echo -e "${GREEN}✅ All smoke tests passed!${NC}"
    exit 0
fi
