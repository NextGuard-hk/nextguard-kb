import { NextRequest, NextResponse } from 'next/server'

const KB_PASSWORD = process.env.KB_ACCESS_PASSWORD || 'NextGuard123'

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json()
    if (password === KB_PASSWORD) {
      const response = NextResponse.json({ success: true })
      response.cookies.set('kb_auth', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/'
      })
      return response
    }
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}

export async function GET(req: NextRequest) {
  const cookie = req.cookies.get('kb_auth')
  if (cookie?.value === 'true') {
    return NextResponse.json({ authenticated: true })
  }
  return NextResponse.json({ authenticated: false }, { status: 401 })
}

export async function DELETE() {
  const response = NextResponse.json({ success: true })
  response.cookies.delete('kb_auth')
  return response
}
