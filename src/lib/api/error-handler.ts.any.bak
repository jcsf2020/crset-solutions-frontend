import { NextResponse } from "next/server";
import { captureException } from "@sentry/nextjs";

/**
 * Standard API error response
 */
export interface APIError {
  ok: false;
  error: string;
  message?: string;
  details?: unknown;
}

/**
 * Wraps an API route handler with standardized error handling
 * 
 * @param handler - The async function to wrap
 * @returns NextResponse with proper error handling
 * 
 * @example
 * export async function POST(req: Request) {
 *   return withErrorHandling(async () => {
 *     const body = await req.json();
 *     // Your logic here
 *     return NextResponse.json({ ok: true, data: result });
 *   });
 * }
 */
export async function withErrorHandling(
  handler: () => Promise<NextResponse>
): Promise<NextResponse> {
  try {
    return await handler();
  } catch (error) {
    // Log to Sentry
    captureException(error);

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      // console.error('[API Error]', error);
    }

    // Return standardized error response
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return NextResponse.json<APIError>(
      {
        ok: false,
        error: 'internal_server_error',
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}

/**
 * Creates a bad request error response
 */
export function badRequest(message: string, details?: unknown): NextResponse {
  return NextResponse.json<APIError>(
    {
      ok: false,
      error: 'bad_request',
      message,
      details,
    },
    { status: 400 }
  );
}

/**
 * Creates a forbidden error response
 */
export function forbidden(message: string = 'Forbidden'): NextResponse {
  return NextResponse.json<APIError>(
    {
      ok: false,
      error: 'forbidden',
      message,
    },
    { status: 403 }
  );
}

/**
 * Creates an unauthorized error response
 */
export function unauthorized(message: string = 'Unauthorized'): NextResponse {
  return NextResponse.json<APIError>(
    {
      ok: false,
      error: 'unauthorized',
      message,
    },
    { status: 401 }
  );
}

/**
 * Creates a not found error response
 */
export function notFound(message: string = 'Not found'): NextResponse {
  return NextResponse.json<APIError>(
    {
      ok: false,
      error: 'not_found',
      message,
    },
    { status: 404 }
  );
}
