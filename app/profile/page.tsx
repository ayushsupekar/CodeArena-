'use client'

import { useState, useEffect } from 'react'
import { User, Mail, Camera, Code, CheckCircle, XCircle, Clock } from 'lucide-react'

interface Stats {
  totalSolved: number
  totalSubmissions: number
  acceptedSubmissions: number
  acceptanceRate: number
  solvedByDifficulty: { Easy: number; Medium: number; Hard: number }
  activity: Record<string, number>
  recentSubmissions: {
    id: string
    problemId: string
    problemTitle: string
    difficulty: string
    language: string
    status: string
    runtime: number | null
    memory: number | null
    createdAt: string
  }[]
}

function ActivityHeatmap({ activity }: { activity: Record<string, number> }) {
  const weeks: { date: string; count: number }[][] = []
  const today = new Date()
  const start = new Date(today)
  start.setDate(start.getDate() - 364)

  // Build 52 weeks of days
  let current = new Date(start)
  current.setDate(current.getDate() - current.getDay()) // align to Sunday

  for (let w = 0; w < 53; w++) {
    const week = []
    for (let d = 0; d < 7; d++) {
      const dateStr = current.toISOString().split('T')[0]
      week.push({ date: dateStr, count: activity[dateStr] || 0 })
      current.setDate(current.getDate() + 1)
    }
    weeks.push(week)
  }

  const getColor = (count: number) => {
    if (count === 0) return 'bg-gray-100 dark:bg-gray-700'
    if (count === 1) return 'bg-green-200 dark:bg-green-900'
    if (count <= 3) return 'bg-green-400 dark:bg-green-700'
    if (count <= 5) return 'bg-green-500 dark:bg-green-600'
    return 'bg-green-600 dark:bg-green-500'
  }

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-1">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {week.map((day, di) => (
              <div
                key={di}
                title={`${day.date}: ${day.count} submission${day.count !== 1 ? 's' : ''}`}
                className={`w-3 h-3 rounded-sm ${getColor(day.count)} cursor-pointer`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-1 text-xs text-gray-400">
        {months.map(m => <span key={m}>{m}</span>)}
      </div>
    </div>
  )
}

function DonutChart({ solved, total, label, color }: { solved: number; total: number; label: string; color: string }) {
  const pct = total > 0 ? (solved / total) * 100 : 0
  const r = 30
  const circ = 2 * Math.PI * r
  const dash = (pct / 100) * circ

  return (
    <div className="flex flex-col items-center">
      <svg width="80" height="80" viewBox="0 0 80 80">
        <circle cx="40" cy="40" r={r} fill="none" stroke="#e5e7eb" strokeWidth="8" />
        <circle
          cx="40" cy="40" r={r} fill="none"
          stroke={color} strokeWidth="8"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          transform="rotate(-90 40 40)"
        />
        <text x="40" y="44" textAnchor="middle" className="text-sm font-bold" fill="currentColor" fontSize="14">{solved}</text>
      </svg>
      <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{label}</span>
    </div>
  )
}

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [stats, setStats] = useState<Stats | null>(null)
  const [photo, setPhoto] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    const savedPhoto = localStorage.getItem('userPhoto')
    if (savedPhoto) setPhoto(savedPhoto)

    if (userData) {
      const parsed = JSON.parse(userData)
      setUser(parsed)
      fetchStats(parsed.id)
    } else {
      setLoading(false)
    }
  }, [])

  const fetchStats = async (userId: string) => {
    try {
      const res = await fetch(`/api/profile?userId=${userId}`)
      const data = await res.json()
      if (!data.error) setStats(data)
    } catch (e) {
      console.error('Failed to fetch stats', e)
    } finally {
      setLoading(false)
    }
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    img.onload = () => {
      const size = Math.min(img.width, img.height)
      canvas.width = 400; canvas.height = 400
      ctx?.drawImage(img, (img.width - size) / 2, (img.height - size) / 2, size, size, 0, 0, 400, 400)
      const dataUrl = canvas.toDataURL('image/jpeg', 0.95)
      setPhoto(dataUrl)
      localStorage.setItem('userPhoto', dataUrl)
    }
    const reader = new FileReader()
    reader.onload = e => { img.src = e.target?.result as string }
    reader.readAsDataURL(file)
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Please sign in to view profile</h1>
          <a href="/login" className="text-orange-500 hover:underline">Sign In</a>
        </div>
      </div>
    )
  }

  const totalProblems = { Easy: 50, Medium: 100, Hard: 50 }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-5xl mx-auto px-4 space-y-6">

        {/* Top: User Info + Solved Stats */}
        <div className="grid md:grid-cols-3 gap-6">

          {/* User Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 flex flex-col items-center text-center shadow-sm">
            <div className="relative mb-4">
              <div className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center overflow-hidden">
                {photo
                  ? <img src={photo} alt="Profile" className="w-full h-full object-cover" />
                  : <User className="h-12 w-12 text-white" />
                }
              </div>
              <label className="absolute bottom-0 right-0 bg-gray-700 rounded-full p-1.5 cursor-pointer hover:bg-gray-600">
                <Camera className="h-3 w-3 text-white" />
                <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
              </label>
            </div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
              <Mail className="h-3 w-3" /> {user.email}
            </p>
            <div className="mt-4 w-full border-t border-gray-100 dark:border-gray-700 pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Total Submissions</span>
                <span className="font-semibold text-gray-900 dark:text-white">{stats?.totalSubmissions ?? 0}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Acceptance Rate</span>
                <span className="font-semibold text-gray-900 dark:text-white">{stats?.acceptanceRate ?? 0}%</span>
              </div>
            </div>
            <button
              onClick={() => { localStorage.clear(); window.location.href = '/' }}
              className="mt-4 w-full text-sm text-red-500 hover:text-red-600 border border-red-200 dark:border-red-800 rounded-lg py-1.5"
            >
              Sign Out
            </button>
          </div>

          {/* Solved Stats */}
          <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Problems Solved</h2>
            <div className="flex items-center gap-8">
              {/* Big donut */}
              <div className="flex flex-col items-center">
                <svg width="120" height="120" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#e5e7eb" strokeWidth="10" />
                  <circle
                    cx="60" cy="60" r="50" fill="none"
                    stroke="#f97316" strokeWidth="10"
                    strokeDasharray={`${((stats?.totalSolved ?? 0) / 200) * 314} 314`}
                    strokeLinecap="round"
                    transform="rotate(-90 60 60)"
                  />
                  <text x="60" y="55" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#f97316">{stats?.totalSolved ?? 0}</text>
                  <text x="60" y="72" textAnchor="middle" fontSize="11" fill="#9ca3af">Solved</text>
                </svg>
              </div>

              {/* Per difficulty */}
              <div className="flex-1 space-y-3">
                {(['Easy', 'Medium', 'Hard'] as const).map(diff => {
                  const solved = stats?.solvedByDifficulty[diff] ?? 0
                  const total = totalProblems[diff]
                  const pct = Math.round((solved / total) * 100)
                  const colors = { Easy: 'bg-green-500', Medium: 'bg-yellow-500', Hard: 'bg-red-500' }
                  const textColors = { Easy: 'text-green-600', Medium: 'text-yellow-600', Hard: 'text-red-600' }
                  return (
                    <div key={diff}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className={`font-medium ${textColors[diff]}`}>{diff}</span>
                        <span className="text-gray-600 dark:text-gray-400">{solved}/{total}</span>
                      </div>
                      <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                        <div className={`${colors[diff]} h-2 rounded-full transition-all`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Activity Heatmap */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {stats?.totalSubmissions ?? 0} submissions in the past year
          </h2>
          {stats && <ActivityHeatmap activity={stats.activity} />}
          {!stats && <div className="h-20 bg-gray-50 dark:bg-gray-700 rounded animate-pulse" />}
        </div>

        {/* Recent Submissions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Submissions</h2>
          {loading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-10 bg-gray-100 dark:bg-gray-700 rounded animate-pulse" />
              ))}
            </div>
          ) : stats?.recentSubmissions.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <Code className="h-10 w-10 mx-auto mb-2 opacity-30" />
              <p>No submissions yet. Start solving problems!</p>
              <a href="/problems" className="text-orange-500 hover:underline text-sm mt-1 inline-block">Browse Problems →</a>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700">
                    <th className="pb-2 font-medium">Problem</th>
                    <th className="pb-2 font-medium">Difficulty</th>
                    <th className="pb-2 font-medium">Status</th>
                    <th className="pb-2 font-medium">Language</th>
                    <th className="pb-2 font-medium">Runtime</th>
                    <th className="pb-2 font-medium">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                  {stats?.recentSubmissions.map(sub => (
                    <tr key={sub.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="py-3">
                        <a href={`/problems/${sub.problemId}`} className="text-gray-900 dark:text-white hover:text-orange-500 font-medium">
                          {sub.problemTitle}
                        </a>
                      </td>
                      <td className="py-3">
                        <span className={`text-xs font-medium ${
                          sub.difficulty === 'Easy' ? 'text-green-600' :
                          sub.difficulty === 'Medium' ? 'text-yellow-600' : 'text-red-600'
                        }`}>{sub.difficulty}</span>
                      </td>
                      <td className="py-3">
                        <span className={`flex items-center gap-1 font-medium ${
                          sub.status === 'Accepted' ? 'text-green-600' : 'text-red-500'
                        }`}>
                          {sub.status === 'Accepted'
                            ? <CheckCircle className="h-3.5 w-3.5" />
                            : <XCircle className="h-3.5 w-3.5" />
                          }
                          {sub.status}
                        </span>
                      </td>
                      <td className="py-3 text-gray-600 dark:text-gray-400 capitalize">{sub.language}</td>
                      <td className="py-3 text-gray-600 dark:text-gray-400">
                        {sub.runtime != null ? `${sub.runtime} ms` : 'N/A'}
                      </td>
                      <td className="py-3 text-gray-500 dark:text-gray-400 text-xs">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {new Date(sub.createdAt).toLocaleDateString()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
