import { NextRequest, NextResponse } from 'next/server'

const USERS_NPOINT_URL = process.env.NPOINT_DOWNLOAD_USERS_URL || ''
const RESEND_API_KEY = process.env.RESEND_API_KEY || ''
const LOG_NPOINT_URL = process.env.NPOINT_LOGS_URL || ''

interface DownloadUser {
  id: string
  email: string
  passwordHash: string
  company: string
  contactName: string
  active: boolean
  emailVerified: boolean
  otp?: string
  otpExpires?: string
  lastLogin?: string
  loginCount: number
  mustResetPassword?: boolean
}

async function writeLog(entry: Record<string, string>) {
  try {
    if (!LOG_NPOINT_URL) return
    const logEntry = { id: Date.now().toString(), timestamp: new Date().toISOString(), ...entry }
    const getRes = await fetch(LOG_NPOINT_URL, { cache: 'no-store' })
    const current = await getRes.json()
    const logs = current.logs || []
    logs.push(logEntry)
    await fetch(LOG_NPOINT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ logs: logs.slice(-500) }),
    })
  } catch (e) { console.error('Log write error:', e) }
}

async function getUsers(): Promise<DownloadUser[]> {
  if (!USERS_NPOINT_URL) return []
  try {
    const res = await fetch(USERS_NPOINT_URL, { cache: 'no-store' })
    const data = await res.json()
    return data.users || []
  } catch { return [] }
}

async function saveUsers(users: DownloadUser[]) {
  if (!USERS_NPOINT_URL) return
  await fetch(USERS_NPOINT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ users }),
  })
}

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password + (process.env.DOWNLOAD_USER_SESSION_SECRET || 'salt'))
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

const loginAttempts = new Map<string, { count: number; lastAttempt: number }>()
function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const attempts = loginAttempts.get(ip)
  if (!attempts) return false
  if (now - attempts.lastAttempt > 15 * 60 * 1000) { loginAttempts.delete(ip); return false }
  return attempts.count >= 5
}
function recordAttempt(ip: string) {
  const now = Date.now()
  const attempts = loginAttempts.get(ip)
  if (attempts) { attempts.count++; attempts.lastAttempt = now }
  else { loginAttempts.set(ip, { count: 1, lastAttempt: now }) }
}

// POST - Login with email + password, send OTP
export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || 'unknown'
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Too many attempts. Try again in 15 minutes.' }, { status: 429 })
  }
  try {
    const { email, password, otp, action } = await req.json()

    // Action: verify-otp
    if (action === 'verify-otp') {
      if (!email || !otp) {
        return NextResponse.json({ error: 'Email and verification code are required' }, { status: 400 })
      }
      const users = await getUsers()
      const user = users.find(u => u.email.toLowerCase() === email.toLowerCase())
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 })
      }
      if (!user.otp || user.otp !== otp) {
        await writeLog({ type: 'kb-login', action: 'otp-failed', email, ip, reason: 'wrong-code' })
        return NextResponse.json({ error: 'Invalid verification code' }, { status: 401 })
      }
      if (user.otpExpires && new Date(user.otpExpires) < new Date()) {
        await writeLog({ type: 'kb-login', action: 'otp-failed', email, ip, reason: 'expired' })
        return NextResponse.json({ error: 'Code expired. Please log in again.' }, { status: 410 })
      }
      // OTP verified
      delete user.otp
      delete user.otpExpires
      user.lastLogin = new Date().toISOString()
      user.loginCount = (user.loginCount || 0) + 1
      user.emailVerified = true
      await saveUsers(users)
      await writeLog({ type: 'kb-login', action: 'login-success', email, company: user.company, ip })

      const res = NextResponse.json({
        success: true,
        message: 'Login successful',
        company: user.company,
        contactName: user.contactName,
      })
      res.cookies.set('kb_auth', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      })
      res.cookies.set('kb_user_email', email.toLowerCase(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      })
      return res
    }

    // Action: login (default)
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }
    const users = await getUsers()
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase())
    if (!user) {
      recordAttempt(ip)
      await writeLog({ type: 'kb-login', action: 'login-failed', email, ip, reason: 'user-not-found' })
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }
    if (!user.active) {
      return NextResponse.json({ error: 'Account deactivated. Contact support.' }, { status: 403 })
    }
    const pwHash = await hashPassword(password)
    if (pwHash !== user.passwordHash) {
      recordAttempt(ip)
      await writeLog({ type: 'kb-login', action: 'login-failed', email, ip, reason: 'wrong-password' })
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }
    // Send OTP
    const otpCode = generateOTP()
    user.otp = otpCode
    user.otpExpires = new Date(Date.now() + 5 * 60 * 1000).toISOString()
    await saveUsers(users)
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'NextGuard KB <noreply@next-guard.com>',
        to: [user.email],
        subject: 'NextGuard KB - Login Verification Code',
        html: `
        <div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;padding:24px;background:#111;color:#fff;border-radius:12px">
        <h2 style="color:#22d3ee">NextGuard Knowledge Base</h2>
        <p>Hello ${user.contactName},</p>
        <p>Your login verification code is:</p>
        <div style="background:#1e293b;padding:16px;border-radius:8px;text-align:center;margin:16px 0">
        <span style="font-size:32px;font-weight:bold;letter-spacing:8px;color:#22d3ee">${otpCode}</span>
        </div>
        <p style="color:#94a3b8;font-size:14px">This code expires in 5 minutes.</p>
        <p style="color:#64748b;font-size:11px">IP: ${ip}</p>
        </div>
        `,
      }),
    })
    await writeLog({ type: 'kb-login', action: 'otp-sent', email, ip })
    return NextResponse.json({
      success: true,
      message: 'Verification code sent to your email.',
      requireOtp: true,
    })
  } catch (e: any) {
    return NextResponse.json({ error: 'Login failed: ' + (e.message || 'Unknown error') }, { status: 500 })
  }
}

// GET - Check auth status
export async function GET(req: NextRequest) {
  const cookie = req.cookies.get('kb_auth')
  if (cookie?.value === 'true' || cookie?.value === 'authenticated') {
    const email = req.cookies.get('kb_user_email')?.value || ''
    return NextResponse.json({ authenticated: true, email })
  }
  return NextResponse.json({ authenticated: false }, { status: 401 })
}

// DELETE - Logout
export async function DELETE() {
  const response = NextResponse.json({ success: true })
  response.cookies.delete('kb_auth')
  response.cookies.delete('kb_user_email')
  return response
}
