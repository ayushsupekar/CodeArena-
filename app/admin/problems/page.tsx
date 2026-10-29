'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, ExternalLink, LogOut } from 'lucide-react'

export default function AdminProblemsPage() {
  const router = useRouter()
  const [problems, setProblems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/problems')
      .then(r => r.json())
      .then(data => { setProblems(data); setLoading(false) })
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Problems (Database)</h1>
          <div className="flex items-center space-x-3">
            <button
              onClick={async () => { await fetch('/api/admin/auth', { method: 'DELETE' }); router.push('/admin/login') }}
              className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-500 hover:text-red-500 border border-gray-200 dark:border-gray-700 rounded-lg"
            >
              <LogOut className="h-4 w-4" /><span>Logout</span>
            </button>
            <button
              onClick={() => router.push('/admin/problems/new')}
              className="flex items-center space-x-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium"
            >
              <Plus className="h-4 w-4" />
              <span>Add Problem</span>
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-gray-500 dark:text-gray-400">Loading...</div>
        ) : problems.length === 0 ? (
          <div className="text-center py-16 text-gray-500 dark:text-gray-400">
            <p className="mb-4">No problems in database yet.</p>
            <button onClick={() => router.push('/admin/problems/new')} className="text-orange-500 hover:text-orange-600 font-medium">
              Add your first problem →
            </button>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                <tr>
                  <th className="text-left px-4 py-3 font-medium">ID</th>
                  <th className="text-left px-4 py-3 font-medium">Title</th>
                  <th className="text-left px-4 py-3 font-medium">Difficulty</th>
                  <th className="text-left px-4 py-3 font-medium">Category</th>
                  <th className="text-left px-4 py-3 font-medium">Created</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {problems.map(p => (
                  <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-4 py-3 font-mono text-gray-500 dark:text-gray-400">{p.id.slice(0, 8)}...</td>
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">{p.title}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        p.difficulty === 'Easy' ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' :
                        p.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400' :
                        'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                      }`}>{p.difficulty}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{p.category}</td>
                    <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{new Date(p.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => router.push(`/problems/${p.id}`)} className="text-orange-500 hover:text-orange-600">
                        <ExternalLink className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
