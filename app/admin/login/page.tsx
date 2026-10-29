'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Lock } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [secret, setSecret] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret }),
      })
      if (!res.ok) {
        setError('Invalid secret. Access denied.')
        return
      }
      const from = searchParams.get('from') || '/admin/problems'
      router.push(from)
    } catch {
      setError('Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 rounded-2xl border border-gray-700 p-8 w-full max-w-sm space-y-6">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center">
            <Lock className="h-6 w-6 text-orange-500" />
          </div>
          <h1 className="text-xl font-bold text-gray-100">Admin Access</h1>
          <p className="text-sm text-gray-400 text-center">Enter your admin secret to continue</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="password"
            value={secret}
            onChange={e => setSecret(e.target.value)}
            placeholder="Admin secret"
            autoFocus
            className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2.5 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={loading || !secret}
            className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-400 text-white rounded-lg text-sm font-medium"
          >
            {loading ? 'Verifying...' : 'Enter Admin Panel'}
          </button>
        </form>
      </div>
    </div>
  )
}
