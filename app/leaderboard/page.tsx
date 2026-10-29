import { Trophy, Medal, Award, TrendingUp } from 'lucide-react'


const leaderboardData = [
  { rank: 1, username: 'CodeMaster2024', score: 2847, solved: 1247, streak: 89, country: '🇺🇸', badge: 'Grandmaster' },
  { rank: 2, username: 'AlgoNinja', score: 2756, solved: 1189, streak: 67, country: '🇨🇳', badge: 'Master' },
  { rank: 3, username: 'ByteWarrior', score: 2698, solved: 1156, streak: 45, country: '🇮🇳', badge: 'Master' },
  { rank: 4, username: 'DataStructGuru', score: 2634, solved: 1098, streak: 78, country: '🇰🇷', badge: 'Expert' },
  { rank: 5, username: 'RecursiveGenius', score: 2587, solved: 1067, streak: 34, country: '🇯🇵', badge: 'Expert' },
]

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1: return <Trophy className="h-5 w-5 text-yellow-500" />
    case 2: return <Medal className="h-5 w-5 text-gray-400" />
    case 3: return <Award className="h-5 w-5 text-amber-600" />
    default: return <span className="text-gray-500 font-medium">#{rank}</span>
  }
}

const getBadgeColor = (badge: string) => {
  switch (badge) {
    case 'Grandmaster': return 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400'
    case 'Master': return 'bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-400'
    case 'Expert': return 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400'
    default: return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
  }
}

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">

      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Leaderboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Top performers in the CodeArena community</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Rank</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Score</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Solved</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Badge</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {leaderboardData.map((user) => (
                  <tr key={user.rank} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getRankIcon(user.rank)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                            {user.username.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-gray-100">{user.username}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{user.country}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-medium text-gray-900 dark:text-gray-100">{user.score.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">
                      {user.solved}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded ${getBadgeColor(user.badge)}`}>
                        {user.badge}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
