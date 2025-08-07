import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email and message are required' },
        { status: 400 }
      )
    }

    // Here you would integrate with Resend or your email service
    // For now, we'll simulate success
    console.log('Contact form submission:', { name, email, message })

    // Simulate API call to backend
    try {
      const backendResponse = await fetch('https://5000-ik9s7mz3c8agvk6iqra27-678effc0.manusvm.computer/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message })
      })

      if (backendResponse.ok) {
        const result = await backendResponse.json()
        return NextResponse.json(result)
      }
    } catch (error) {
      console.error('Backend error:', error)
    }

    // Fallback response
    return NextResponse.json({
      success: true,
      message: 'Mensagem recebida! Entraremos em contacto em breve.'
    })

  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json(
      { 
        success: true,
        message: 'Mensagem recebida! Entraremos em contacto em breve.'
      },
      { status: 200 }
    )
  }
}

