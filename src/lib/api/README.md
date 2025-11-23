# API Utilities

This directory contains shared utilities for API routes.

## Error Handler

The error handler provides standardized error handling for all API routes.

### Usage

```typescript
import { withErrorHandling, badRequest, forbidden } from '@/lib/api/error-handler';

export async function POST(req: Request) {
  return withErrorHandling(async () => {
    const body = await req.json();
    
    if (!body.email) {
      return badRequest('Email is required');
    }
    
    // Your logic here
    
    return NextResponse.json({ ok: true, data: result });
  });
}
```

### Benefits

1. **Consistent Error Format:** All errors follow the same structure
2. **Automatic Sentry Logging:** Exceptions are automatically sent to Sentry
3. **Development Logging:** Console errors only in development
4. **Type Safety:** Full TypeScript support

### Error Response Format

```typescript
{
  ok: false,
  error: string,      // Error code (e.g., 'bad_request', 'forbidden')
  message?: string,   // Human-readable error message
  details?: unknown   // Optional additional details
}
```

### Helper Functions

- `badRequest(message, details?)` - Returns 400 Bad Request
- `unauthorized(message?)` - Returns 401 Unauthorized
- `forbidden(message?)` - Returns 403 Forbidden
- `notFound(message?)` - Returns 404 Not Found
