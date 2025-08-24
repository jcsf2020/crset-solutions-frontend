export const runtime = 'nodejs';
import { NextResponse } from 'next/server';

export async function GET() {
  const items = [
    { when: new Date().toISOString(), name: 'E2E', email: 'crsetsolutions@gmail.com', utm: 'utm_source=test', score: 0.7, ip: '127.0.0.1' }
  ];
  return NextResponse.json({ items, total: items.length });
}
