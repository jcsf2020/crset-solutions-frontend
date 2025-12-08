import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

export function apiErrorHandler(error: unknown) {
  if (error instanceof ZodError) {
    return NextResponse.json(
      { ok: false, error: 'invalid_input', issues: error.errors },
      { status: 400 },
    );
  }

  if (error instanceof Error) {
    return NextResponse.json(
      { ok: false, error: 'server_error', message: error.message },
      { status: 500 },
    );
  }

  return NextResponse.json(
    { ok: false, error: 'unknown_error' },
    { status: 500 },
  );
}
