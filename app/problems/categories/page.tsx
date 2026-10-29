import Link from 'next/link'
import { Code, TrendingUp, Clock, Users } from 'lucide-react'
import { ThemeToggle } from '../../../components/theme-toggle'

const categories = [
  { name: 'Array', count: 1547, difficulty: 'Mixed', color: 'bg-blue-50 text-blue-700', icon: '📊' },
  { name: 'String', count: 687, difficulty: 'Mixed', color: 'bg-green-50 text-green-700', icon: '📝' },
  { name: 'Hash Table', count: 598, difficulty: 'Mixed', color: 'bg-purple-50 text-purple-700', icon: '🗂️' },
  { name: 'Dynamic Programming', count: 467, difficulty: 'Hard', color: 'bg-red-50 text-red-700', icon: '🧮' },
  { name: 'Math', count: 445, difficulty: 'Mixed', color: 'bg-yellow-50 text-yellow-700', icon: '🔢' },
  { name: 'Sorting', count: 367, difficulty: 'Mixed', color: 'bg-indigo-50 text-indigo-700', icon: '📈' },
  { name: 'Greedy', count: 321, difficulty: 'Medium', color: 'bg-orange-50 text-orange-700', icon: '🎯' },
  { name: 'Tree', count: 276, difficulty: 'Mixed', color: 'bg-emerald-50 text-emerald-700', icon: '🌲' },
]

const studyPlans = [
  { name: 'CodeArena 75', problems: 75, duration: '2-3 months', level: 'Beginner' },
  { name: 'Top Interview 150', problems: 150, duration: '3-4 months', level: 'Intermediate' },
  { name: 'Blind 75', problems: 75, duration: '2 months', level: 'Interview Focused' },
  { name: 'NeetCode 150', problems: 150, duration: '3 months', level: 'Comprehensive' },
]

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Explore</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">Discover problems by category and study plans</p>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Study Plans</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {studyPlans.map((plan) => (
              <div key={plan.name} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-2 mb-3">
                  <TrendingUp className="h-5 w-5 text-orange-500" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">{plan.name}</h3>
                </div>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center space-x-1">
                    <Code className="h-4 w-4" />
                    <span>{plan.problems} problems</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{plan.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{plan.level}</span>
                  </div>
                </div>
                <button className="w-full mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium text-sm">
                  Start Plan
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Problem Categories</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link 
                key={category.name} 
                href={`/problems?category=${category.name}`}
                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{category.icon}</span>
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400">{category.name}</h3>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded ${category.color}`}>
                    {category.difficulty}
                  </span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{category.count}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">problems</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}