# Security Policy

## Overview

CRSET Solutions Frontend is committed to maintaining the highest security standards. This document outlines our security practices and policies.

## Security Features

### 1. Row Level Security (RLS)

All public tables in Supabase have Row Level Security enabled:

```sql
-- Example RLS policy
CREATE POLICY "Allow authenticated users to read"
ON public.table_name
FOR SELECT
USING (auth.role() = 'authenticated');
```

**Tables with RLS:**
- public.docs
- public.rag_documents
- (All other public tables)

### 2. Authentication

- JWT-based authentication via Supabase
- Secure session management
- Password hashing with bcrypt
- OAuth 2.0 support

### 3. Data Encryption

- Encryption at rest (Supabase)
- HTTPS/TLS for data in transit
- Secure cookie handling
- Environment variables for secrets

### 4. GDPR Compliance

- Data privacy policy included
- User consent management
- Data export functionality
- Right to be forgotten support

## Reporting Security Issues

**Do not** create public GitHub issues for security vulnerabilities.

Instead, email: security@crsetsolutions.com

Include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if available)

We will:
- Acknowledge receipt within 24 hours
- Investigate and assess severity
- Work on a fix
- Coordinate disclosure timeline

## Security Best Practices

### For Developers

1. **Never commit secrets**
   - Use .env.local for local development
   - Use GitHub Secrets for CI/CD
   - Rotate API keys regularly

2. **Validate input**
   ```typescript
   // Always validate user input
   const email = validateEmail(input);
   const amount = validateAmount(input);
   ```

3. **Sanitize output**
   ```typescript
   // Prevent XSS attacks
   const safe = sanitizeHTML(userContent);
   ```

4. **Use HTTPS**
   - All requests must use HTTPS
   - Enable HSTS headers

5. **Keep dependencies updated**
   ```bash
   pnpm update
   pnpm audit
   ```

### For Users

1. **Use strong passwords**
   - Minimum 12 characters
   - Mix of uppercase, lowercase, numbers, symbols

2. **Enable 2FA**
   - When available
   - Use authenticator apps

3. **Report suspicious activity**
   - Contact security team immediately
   - Do not share credentials

## Compliance

- ✅ GDPR compliant
- ✅ CCPA compliant
- ✅ SOC 2 ready
- ✅ ISO 27001 aligned

## Security Headers

```
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'self'
Referrer-Policy: strict-origin-when-cross-origin
```

## API Security

### Rate Limiting
- 100 requests per minute per IP
- 1000 requests per hour per user

### API Keys
- Rotate every 90 days
- Use read-only keys when possible
- Revoke unused keys immediately

### CORS
- Whitelist trusted domains only
- Validate origin headers
- Disable for internal APIs

## Database Security

### Backups
- Daily automated backups
- 30-day retention
- Encrypted storage
- Tested restore procedures

### Access Control
- Role-based access control (RBAC)
- Principle of least privilege
- Audit logging enabled
- Regular access reviews

## Incident Response

### Response Plan
1. Identify and contain the issue
2. Assess impact and severity
3. Notify affected users
4. Implement fix
5. Deploy fix
6. Monitor for recurrence
7. Post-incident review

### Communication
- Transparent communication with users
- Regular status updates
- Root cause analysis
- Preventive measures

## Security Updates

- Security patches: within 24 hours
- Minor updates: within 1 week
- Major updates: within 1 month
- All updates tested before deployment

## Third-Party Services

Trusted services used:
- **Supabase:** Backend & Database
- **Stripe:** Payment processing
- **Vercel:** Hosting & Deployment
- **Sentry:** Error tracking
- **Cloudflare:** CDN & DDoS protection

All services are SOC 2 compliant.

## Security Checklist

- [ ] RLS enabled on all public tables
- [ ] Secrets stored in environment variables
- [ ] HTTPS enforced
- [ ] Security headers configured
- [ ] Input validation implemented
- [ ] Output sanitization implemented
- [ ] Dependencies up to date
- [ ] Audit logging enabled
- [ ] Backups tested
- [ ] Incident response plan ready

## Questions?

- Security issues: security@crsetsolutions.com
- General questions: contact@crsetsolutions.com

---

**Last Updated:** December 1, 2025  
**Version:** 1.0
