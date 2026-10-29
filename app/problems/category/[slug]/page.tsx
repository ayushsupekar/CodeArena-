'use client'

import Link from 'next/link'
import { Search, ThumbsUp, Building2, ArrowLeft } from 'lucide-react'
import { popularProblems } from '@/lib/popular-problems'


const ProblemRow = ({ problem }: { problem: typeof popularProblems[0] }) => (
  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800">
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="w-4 h-4 rounded-full border-2 border-gray-300 dark:border-gray-600"></div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="flex items-center space-x-3">
        <span className="text-gray-500 dark:text-gray-400 font-medium">{problem.id}.</span>
        <div>
          <Link 
            href={`/problems/${problem.id}`}
            className="text-gray-900 dark:text-gray-100 hover:text-orange-600 font-medium"
          >
            {problem.title}
          </Link>
          {problem.isPremium && (
            <span className="text-xs text-orange-600 font-medium flex items-center mt-1">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
              </svg>
              Premium
            </span>
          )}
        </div>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
      {problem.acceptance}
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded ${
        problem.difficulty === 'Easy' ? 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20' :
        problem.difficulty === 'Medium' ? 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20' :
        'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20'
      }`}>
        {problem.difficulty}
      </span>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
        <ThumbsUp className="h-3 w-3" />
        <span>{(problem.likes / 1000).toFixed(1)}k</span>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="flex items-center space-x-1">
        {problem.companies.slice(0, 2).map((company, idx) => (
          <span key={idx} className="inline-flex items-center px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">
            <Building2 className="h-3 w-3 mr-1" />
            {company}
          </span>
        ))}
        {problem.companies.length > 2 && (
          <span className="text-xs text-gray-500 dark:text-gray-400">+{problem.companies.length - 2}</span>
        )}
      </div>
    </td>
  </tr>
)

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const categoryName = params.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  const categoryProblems = popularProblems.filter(problem => 
    problem.category.toLowerCase().replace(/\s+/g, '-') === params.slug
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">

      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <Link 
                  href="/problems" 
                  className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Problems</span>
                </Link>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{categoryName} Problems</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">{categoryProblems.length} problems in this category</p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                Pick One
              </button>
              <Link href="/problems/random" className="btn-primary">
                Random Question
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mb-6">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                <input
                  type="text"
                  placeholder={`Search ${categoryName.toLowerCase()} problems...`}
                  className="w-full pl-10 pr-4 py-2 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
              <div className="flex items-center space-x-2">
                <select className="px-3 py-2 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                  <option>All Difficulties</option>
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-8">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-20">
                    Acceptance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-20">
                    Difficulty
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-16">
                    Likes
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-32">
                    Companies
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {categoryProblems.map((problem) => (
                  <ProblemRow key={problem.id} problem={problem} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}