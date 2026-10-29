import Link from 'next/link'
import { Calendar, Clock, Users, Trophy } from 'lucide-react'


const contests = [
  {
    id: '1',
    title: 'Weekly Contest 375',
    startTime: new Date('2024-01-15T10:00:00'),
    duration: 90,
    participants: 12543,
    status: 'upcoming'
  },
  {
    id: '2',
    title: 'Biweekly Contest 120',
    startTime: new Date('2024-01-12T14:30:00'),
    duration: 90,
    participants: 8921,
    status: 'live'
  },
  {
    id: '3',
    title: 'FAANG Mock Interview',
    startTime: new Date('2024-01-10T09:00:00'),
    duration: 120,
    participants: 5432,
    status: 'completed'
  }
]

const statusColors = {
  upcoming: 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400',
  live: 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400',
  completed: 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
} as const

const getStatusColor = (status: string) => {
  return statusColors[status as keyof typeof statusColors] || 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
}

export default function ContestsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Contests</h1>
          <Link href="/contests/create" className="btn-primary">
            Create Contest
          </Link>
        </div>

        <div className="grid gap-6">
          {contests.map((contest) => (
            <div key={contest.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{contest.title}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(contest.status)}`}>
                      {contest.status.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-6 text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{contest.startTime.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{contest.duration} minutes</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{contest.participants.toLocaleString()} participants</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  {contest.status === 'completed' && (
                    <Link 
                      href={`/contests/${contest.id}/leaderboard`}
                      className="flex items-center space-x-1 text-orange-600 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-300"
                    >
                      <Trophy className="h-4 w-4" />
                      <span>Leaderboard</span>
                    </Link>
                  )}
                  <Link 
                    href={`/contests/${contest.id}`}
                    className={`px-4 py-2 rounded-lg ${
                      contest.status === 'live' 
                        ? 'bg-green-600 hover:bg-green-700 text-white' 
                        : 'btn-primary'
                    }`}
                  >
                    {contest.status === 'live' ? 'Join Now' : 'View Contest'}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Practice Tests</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Data Structures</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Test your knowledge of arrays, linked lists, trees, and graphs</p>
              <Link href="/tests/data-structures" className="btn-primary">Start Test</Link>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Algorithms</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Practice sorting, searching, and dynamic programming</p>
              <Link href="/tests/algorithms" className="btn-primary">Start Test</Link>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">System Design</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Design scalable systems and architectures</p>
              <Link href="/tests/system-design" className="btn-primary">Start Test</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}