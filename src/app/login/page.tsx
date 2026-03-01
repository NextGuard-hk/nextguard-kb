'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState<'login' | 'otp'>('login')
  const [message, setMessage] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/kb-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (res.ok && data.requireOtp) {
        setStep('otp')
        setMessage(data.message || 'Verification code sent.')
      } else if (!res.ok) {
        setError(data.error || 'Login failed')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/kb-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, action: 'verify-otp' }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        const from = searchParams.get('from') || '/kb'
        router.push(from)
        router.refresh()
      } else {
        setError(data.error || 'Verification failed')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
      <div className="w-full max-w-md mx-auto p-8">
        <div className="bg-[#111111] border border-[#222222] rounded-2xl p-8 shadow-2xl">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-3">
              <img
                src="https://www.next-guard.com/images/nextguard-logo.png"
                alt="NextGuard"
                className="h-10 w-auto"
              />
              <span className="text-xl font-bold text-white">NextGuard KB</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-white text-center mb-2">Knowledge Base</h1>
          <p className="text-gray-400 text-center text-sm mb-6">
            {step === 'login' ? 'Sign in with your account' : 'Enter the verification code sent to your email'}
          </p>

          {step === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.name@next-guard.com"
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#333333] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  required
                  autoFocus
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#333333] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  required
                />
              </div>
              {error && <p className="text-red-400 text-sm text-center">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-600 text-white font-semibold rounded-lg transition-all"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              {message && <p className="text-green-400 text-sm text-center">{message}</p>}
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-300 mb-1">Verification Code</label>
                <input
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6-digit code"
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#333333] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-center text-2xl tracking-widest"
                  maxLength={6}
                  required
                  autoFocus
                />
              </div>
              {error && <p className="text-red-400 text-sm text-center">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-600 text-white font-semibold rounded-lg transition-all"
              >
                {loading ? 'Verifying...' : 'Verify & Access KB'}
              </button>
              <button
                type="button"
                onClick={() => { setStep('login'); setError(''); setOtp(''); setMessage('') }}
                className="w-full py-2 text-gray-400 hover:text-white text-sm transition-all"
              >
                Back to login
              </button>
            </form>
          )}

          <p className="text-gray-600 text-xs text-center mt-6">
            This knowledge base is restricted to authorized partners and staff.
          </p>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-gray-400">Loading...</div>}>
      <LoginForm />
    </Suspense>
  )
}
