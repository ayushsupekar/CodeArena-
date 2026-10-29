'use client'

import Link from 'next/link'
import { ThumbsUp, Building2, ChevronUp, ChevronDown } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { popularProblems } from '@/lib/popular-problems'

type Problem = typeof popularProblems[number]

const DIFFICULTY_ORDER: Record<string, number> = { Easy: 1, Medium: 2, Hard: 3 }

const CATEGORIES = [
  'All',
  'Array', 'String', 'Linked List', 'Tree', 'Graph',
  'Dynamic Programming', 'Backtracking', 'Two Pointers',
  'Stack', 'Heap', 'Math', 'Bit Manipulation',
  'Design', 'Trie', 'Database',
]

export default function ProblemsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const categoryParam = searchParams.get('category') || 'All'
  const [selectedCategory, setSelectedCategory] = useState(categoryParam)
  const [difficultyFilter, setDifficultyFilter] = useState('All')
  const [sortField, setSortField] = useState<'id' | 'difficulty' | null>(null)
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')
  const searchQuery = searchParams.get('search') || ''

  useEffect(() => {
    setSelectedCategory(searchParams.get('category') || 'All')
  }, [searchParams])

  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat)
    const params = new URLSearchParams(searchParams.toString())
    if (cat === 'All') params.delete('category')
    else params.set('category', cat)
    router.push(`/problems?${params.toString()}`)
  }

  const handleSort = (field: 'id' | 'difficulty') => {
    if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortField(field); setSortDir('asc') }
  }

  let filtered = [...popularProblems] as Problem[]

  if (selectedCategory !== 'All')
    filtered = filtered.filter(p => p.category === selectedCategory)

  if (difficultyFilter !== 'All')
    filtered = filtered.filter(p => p.difficulty === difficultyFilter)

  if (searchQuery) {
    const q = searchQuery.toLowerCase()
    filtered = filtered.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.id.toLowerCase().includes(q)
    )
  }

  if (sortField === 'id')
    filtered.sort((a, b) => sortDir === 'asc' ? Number(a.id) - Number(b.id) : Number(b.id) - Number(a.id))
  else if (sortField === 'difficulty')
    filtered.sort((a, b) => sortDir === 'asc'
      ? DIFFICULTY_ORDER[a.difficulty] - DIFFICULTY_ORDER[b.difficulty]
      : DIFFICULTY_ORDER[b.difficulty] - DIFFICULTY_ORDER[a.difficulty])

  const SortIcon = ({ field }: { field: 'id' | 'difficulty' }) => (
    <span className="inline-flex flex-col ml-1 opacity-50">
      <ChevronUp className={`h-2.5 w-2.5 -mb-0.5 ${sortField === field && sortDir === 'asc' ? 'opacity-100 text-orange-500' : ''}`} />
      <ChevronDown className={`h-2.5 w-2.5 ${sortField === field && sortDir === 'desc' ? 'opacity-100 text-orange-500' : ''}`} />
    </span>
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Problems</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Solve problems to improve your coding skills</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Category Filter */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mb-6 p-4">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Category</h3>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => {
              const count = cat === 'All' ? popularProblems.length : popularProblems.filter(p => p.category === cat).length
              if (count === 0) return null
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === cat
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {cat} {cat !== 'All' && <span className="opacity-70">({count})</span>}
                </button>
              )
            })}
          </div>
        </div>

        {/* Problems Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {selectedCategory === 'All' ? 'All Problems' : `${selectedCategory} Problems`}
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">({filtered.length})</span>
            </h3>
            <select
              value={difficultyFilter}
              onChange={e => setDifficultyFilter(e.target.value)}
              className="px-3 py-2 text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="All">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-8">Status</th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer select-none hover:text-gray-700 dark:hover:text-gray-200"
                    onClick={() => handleSort('id')}
                  >
                    <span className="flex items-center"># Title <SortIcon field="id" /></span>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-24">Acceptance</th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-28 cursor-pointer select-none hover:text-gray-700 dark:hover:text-gray-200"
                    onClick={() => handleSort('difficulty')}
                  >
                    <span className="flex items-center">Difficulty <SortIcon field="difficulty" /></span>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-20">Likes</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-36">Companies</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                      No problems found for the selected filters.
                    </td>
                  </tr>
                ) : filtered.map(problem => (
                  <tr key={`${problem.id}-${problem.category}`} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                    <td className="px-6 py-4">
                      <div className="w-4 h-4 rounded-full border-2 border-gray-300 dark:border-gray-600" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 dark:text-gray-500 text-sm">{problem.id}.</span>
                        <Link href={`/problems/${problem.id}`} className="text-gray-900 dark:text-gray-100 hover:text-orange-600 dark:hover:text-orange-400 font-medium text-sm">
                          {problem.title}
                        </Link>
                        {problem.isPremium && (
                          <span className="text-xs text-orange-500 font-medium">Premium</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{problem.acceptance}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded ${
                        problem.difficulty === 'Easy' ? 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20' :
                        problem.difficulty === 'Medium' ? 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20' :
                        'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20'
                      }`}>
                        {problem.difficulty}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                        <ThumbsUp className="h-3 w-3" />
                        <span>{(problem.likes / 1000).toFixed(1)}k</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 flex-wrap">
                        {problem.companies.slice(0, 2).map((company, idx) => (
                          <span key={idx} className="inline-flex items-center px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">
                            <Building2 className="h-3 w-3 mr-1" />{company}
                          </span>
                        ))}
                        {problem.companies.length > 2 && (
                          <span className="text-xs text-gray-400">+{problem.companies.length - 2}</span>
                        )}
                      </div>
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
