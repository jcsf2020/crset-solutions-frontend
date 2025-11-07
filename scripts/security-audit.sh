#!/bin/bash
#
# CRSET Solutions - Security Audit Script
# v3.1.0 - Comprehensive security validation
#

set -e

echo "╔════════════════════════════════════════════╗"
echo "║   CRSET Security Audit v3.1.0              ║"
echo "╚════════════════════════════════════════════╝"
echo ""

REPORT_FILE="/tmp/security-audit-report.txt"
> "$REPORT_FILE"

echo "Security Audit Report - $(date)" >> "$REPORT_FILE"
echo "═══════════════════════════════════════════" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

# 1. Check for exposed secrets
echo "[1/8] Checking for exposed secrets..."
echo "1. Exposed Secrets Check" >> "$REPORT_FILE"
echo "───────────────────────────" >> "$REPORT_FILE"

if grep -r "sk-proj-" --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" src/ 2>/dev/null; then
    echo "❌ FAIL: OpenAI API keys found in source code!" | tee -a "$REPORT_FILE"
else
    echo "✓ PASS: No exposed API keys in source code" | tee -a "$REPORT_FILE"
fi

if grep -r "AKIA" --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" src/ 2>/dev/null; then
    echo "❌ FAIL: AWS credentials found in source code!" | tee -a "$REPORT_FILE"
else
    echo "✓ PASS: No AWS credentials in source code" | tee -a "$REPORT_FILE"
fi

echo "" >> "$REPORT_FILE"

# 2. Check environment variables
echo "[2/8] Checking environment variable usage..."
echo "2. Environment Variables" >> "$REPORT_FILE"
echo "───────────────────────────" >> "$REPORT_FILE"

ENV_VARS=$(grep -r "process.env" --include="*.ts" --include="*.tsx" src/ | wc -l)
echo "✓ Found $ENV_VARS environment variable usages" | tee -a "$REPORT_FILE"

# Check for NEXT_PUBLIC_ prefix on client-side vars
CLIENT_ENV=$(grep -r "process.env\." --include="*.tsx" src/components/ src/app/ 2>/dev/null | grep -v "NEXT_PUBLIC_" | wc -l)
if [ "$CLIENT_ENV" -gt 0 ]; then
    echo "⚠ WARNING: $CLIENT_ENV potential client-side env vars without NEXT_PUBLIC_ prefix" | tee -a "$REPORT_FILE"
else
    echo "✓ PASS: All client-side env vars properly prefixed" | tee -a "$REPORT_FILE"
fi

echo "" >> "$REPORT_FILE"

# 3. Check for SQL injection vulnerabilities
echo "[3/8] Checking for SQL injection risks..."
echo "3. SQL Injection Prevention" >> "$REPORT_FILE"
echo "───────────────────────────" >> "$REPORT_FILE"

RAW_SQL=$(grep -r "SELECT.*FROM.*WHERE" --include="*.ts" --include="*.tsx" src/ 2>/dev/null | grep -v "prepared" | grep -v "parameterized" | wc -l)
if [ "$RAW_SQL" -gt 0 ]; then
    echo "⚠ WARNING: $RAW_SQL potential raw SQL queries found" | tee -a "$REPORT_FILE"
else
    echo "✓ PASS: No raw SQL queries detected" | tee -a "$REPORT_FILE"
fi

echo "" >> "$REPORT_FILE"

# 4. Check for XSS vulnerabilities
echo "[4/8] Checking for XSS risks..."
echo "4. XSS Prevention" >> "$REPORT_FILE"
echo "───────────────────────────" >> "$REPORT_FILE"

DANGEROUS_HTML=$(grep -r "dangerouslySetInnerHTML" --include="*.tsx" --include="*.jsx" src/ 2>/dev/null | wc -l)
if [ "$DANGEROUS_HTML" -gt 0 ]; then
    echo "⚠ WARNING: $DANGEROUS_HTML uses of dangerouslySetInnerHTML found" | tee -a "$REPORT_FILE"
else
    echo "✓ PASS: No dangerouslySetInnerHTML usage" | tee -a "$REPORT_FILE"
fi

echo "" >> "$REPORT_FILE"

# 5. Check dependencies for known vulnerabilities
echo "[5/8] Checking dependencies..."
echo "5. Dependency Security" >> "$REPORT_FILE"
echo "───────────────────────────" >> "$REPORT_FILE"

if command -v pnpm &> /dev/null; then
    echo "Running pnpm audit..." | tee -a "$REPORT_FILE"
    pnpm audit --prod 2>&1 | tee -a "$REPORT_FILE" || echo "⚠ Some vulnerabilities found" | tee -a "$REPORT_FILE"
else
    echo "⚠ pnpm not found, skipping dependency audit" | tee -a "$REPORT_FILE"
fi

echo "" >> "$REPORT_FILE"

# 6. Check for hardcoded credentials
echo "[6/8] Checking for hardcoded credentials..."
echo "6. Hardcoded Credentials" >> "$REPORT_FILE"
echo "───────────────────────────" >> "$REPORT_FILE"

PASSWORDS=$(grep -ri "password.*=.*['\"]" --include="*.ts" --include="*.tsx" --include="*.js" src/ 2>/dev/null | grep -v "type.*password" | grep -v "placeholder" | wc -l)
if [ "$PASSWORDS" -gt 0 ]; then
    echo "⚠ WARNING: $PASSWORDS potential hardcoded passwords found" | tee -a "$REPORT_FILE"
else
    echo "✓ PASS: No hardcoded passwords detected" | tee -a "$REPORT_FILE"
fi

echo "" >> "$REPORT_FILE"

# 7. Check HTTPS usage
echo "[7/8] Checking HTTPS enforcement..."
echo "7. HTTPS Enforcement" >> "$REPORT_FILE"
echo "───────────────────────────" >> "$REPORT_FILE"

HTTP_URLS=$(grep -r "http://" --include="*.ts" --include="*.tsx" --include="*.js" src/ 2>/dev/null | grep -v "localhost" | grep -v "127.0.0.1" | wc -l)
if [ "$HTTP_URLS" -gt 0 ]; then
    echo "⚠ WARNING: $HTTP_URLS HTTP URLs found (should use HTTPS)" | tee -a "$REPORT_FILE"
else
    echo "✓ PASS: All external URLs use HTTPS" | tee -a "$REPORT_FILE"
fi

echo "" >> "$REPORT_FILE"

# 8. Check security headers
echo "[8/8] Checking security headers configuration..."
echo "8. Security Headers" >> "$REPORT_FILE"
echo "───────────────────────────" >> "$REPORT_FILE"

if [ -f "next.config.js" ]; then
    if grep -q "X-Frame-Options" next.config.js; then
        echo "✓ PASS: X-Frame-Options configured" | tee -a "$REPORT_FILE"
    else
        echo "⚠ WARNING: X-Frame-Options not found in next.config.js" | tee -a "$REPORT_FILE"
    fi
    
    if grep -q "Content-Security-Policy" next.config.js; then
        echo "✓ PASS: CSP configured" | tee -a "$REPORT_FILE"
    else
        echo "⚠ WARNING: Content-Security-Policy not found" | tee -a "$REPORT_FILE"
    fi
else
    echo "⚠ WARNING: next.config.js not found" | tee -a "$REPORT_FILE"
fi

echo "" >> "$REPORT_FILE"

# Summary
echo "═══════════════════════════════════════════" >> "$REPORT_FILE"
echo "Audit completed at $(date)" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

echo ""
echo "╔════════════════════════════════════════════╗"
echo "║   Security Audit Complete                  ║"
echo "╚════════════════════════════════════════════╝"
echo ""
echo "Report saved to: $REPORT_FILE"
echo ""
cat "$REPORT_FILE"
