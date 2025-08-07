import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Basic health check
    const healthCheck = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'CRSET Solutions Frontend',
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      uptime: process.uptime(),
    }

    return NextResponse.json(healthCheck, { status: 200 })
  } catch (error) {
    console.error('Health check failed:', error)
    
    return NextResponse.json(
      {
        status: 'error',
        timestamp: new Date().toISOString(),
        service: 'CRSET Solutions Frontend',
        error: 'Health check failed'
      },
      { status: 500 }
    )
  }
}

