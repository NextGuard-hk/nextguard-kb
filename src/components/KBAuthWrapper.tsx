'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function KBAuthWrapper({ children }: { children: React.ReactNode }) {
  const [isAuth, setIsAuth] = useState<boolean | null>(null)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch('/api/kb-auth')
      .then(r => {
        if (r.ok) setIsAuth(true)
        else setIsAuth(false)
      })
      .catch(() => setIsAuth(false))
  }, [])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const r = await fetch('/api/kb-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })
      if (r.ok) {
        setIsAuth(true)
      } else {
        setError('Invalid password')
      }
    } catch {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  // Loading state - checking auth
  if (isAuth === null) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    )
  }

  // Authenticated - show content
  if (isAuth) {
    return <>{children}</>
  }

  // Not authenticated - show login
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">\uD83D\uDD12</span>
            <h1 className="text-2xl font-bold text-white">Knowledge Base</h1>
          </div>
          <p className="text-gray-400 mb-6 text-sm">
            Access NextGuard internal knowledge base articles and documentation
          </p>

          {error && (
            <div className="bg-red-900/30 border border-red-800 text-red-400 rounded-lg px-4 py-2 mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Access Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder:text-gray-500 focus:border-cyan-500 focus:outline-none mb-4"
              placeholder="Enter KB password"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-cyan-600 hover:bg-cyan-500 disabled:bg-cyan-800 text-white font-medium py-2.5 rounded-lg transition-colors"
            >
              {loading ? 'Verifying...' : 'Access Knowledge Base'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
