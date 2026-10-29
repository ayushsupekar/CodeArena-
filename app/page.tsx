'use client'

import Link from 'next/link'
import { Code, Users, Trophy, Bot } from 'lucide-react'
import { popularProblems } from '../lib/popular-problems'
import { useState } from 'react'

function AllProblemsSection() {
  const [showAll, setShowAll] = useState(false)
  const displayedProblems = showAll ? popularProblems : popularProblems.slice(0, 10)

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">All Problems</h2>
          <Link href="/problems" className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-medium">
            View by Category →
          </Link>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 dark:bg-gray-600">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Difficulty
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Acceptance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Category
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600">
                {displayedProblems.map((problem) => (
                  <tr key={problem.id} className="hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {problem.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <Link 
                          href={`/problems/${problem.id}`}
                          className="text-gray-900 dark:text-gray-100 hover:text-orange-600 dark:hover:text-orange-400 font-medium"
                        >
                          {problem.title}
                        </Link>
                        {problem.isPremium && (
                          <span className="text-xs text-orange-600 font-medium">
                            Premium
                          </span>
                        )}
                      </div>
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                      {problem.acceptance}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                      {problem.category}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {!showAll && popularProblems.length > 10 && (
          <div className="text-center mt-6">
            <button
              onClick={() => setShowAll(true)}
              className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium transition-colors"
            >
              See More ({popularProblems.length - 10} more problems)
            </button>
          </div>
        )}
        {showAll && (
          <div className="text-center mt-6">
            <button
              onClick={() => setShowAll(false)}
              className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 font-medium transition-colors"
            >
              Show Less
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main>
        {/* Hero Section */}
        <section className="bg-white dark:bg-gray-800 py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                  A New Way to Learn
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  CodeArena is the best platform to help you enhance your skills, expand your knowledge and prepare for technical interviews.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/problems" className="px-8 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium text-center">
                    Start Exploring
                  </Link>
                  <button className="px-8 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 font-medium">
                    View Questions
                  </button>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gray-900 rounded-lg p-6 text-green-400 font-mono text-sm">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="space-y-2">
                    <div><span className="text-purple-400">function</span> <span className="text-yellow-400">twoSum</span>(<span className="text-blue-400">nums, target</span>) {'{'}</div>
                    <div className="ml-4"><span className="text-gray-400">{"// Your solution here"}</span></div>
                    <div className="ml-4"><span className="text-purple-400">return</span> <span className="text-blue-400">result</span>;</div>
                    <div>{'}'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">2000+</div>
                <div className="text-gray-600 dark:text-gray-300">Questions</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">14</div>
                <div className="text-gray-600 dark:text-gray-300">Languages</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">100K+</div>
                <div className="text-gray-600 dark:text-gray-300">Students</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">50+</div>
                <div className="text-gray-600 dark:text-gray-300">Companies</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Start Exploring</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow bg-white dark:bg-gray-800">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4">
                  <Code className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Problems</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Solve algorithmic challenges and improve your coding skills</p>
              </div>
              <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow bg-white dark:bg-gray-800">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mb-4">
                  <Trophy className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Contest</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Participate in coding contests and compete with others</p>
              </div>
              <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow bg-white dark:bg-gray-800">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Interview</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Prepare for technical interviews with mock sessions</p>
              </div>
              <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow bg-white dark:bg-gray-800">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center mb-4">
                  <Bot className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">AI Help</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Get intelligent assistance when you are stuck</p>
              </div>
            </div>
          </div>
        </section>

        {/* All Problems Section */}
        <AllProblemsSection />
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12">
            {/* About CEO */}
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold mb-4">About Our CEO</h3>
              <div className="flex items-start space-x-4">
                <img 
                  src="/images/CEO.jpg" 
                  alt="CEO" 
                  className="w-56 h-56 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-lg font-semibold text-orange-400">Ayush Supekar</h4>
                  <p className="text-gray-300 mb-2">Founder & CEO</p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Passionate about empowering developers worldwide through innovative coding platforms. 
                    With years of experience in software engineering and education, Ayush founded CodeArena 
                    to bridge the gap between learning and real-world coding challenges.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Company */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-orange-400">About Us</a></li>
                <li><a href="#" className="hover:text-orange-400">Careers</a></li>
                <li><a href="#" className="hover:text-orange-400">Press</a></li>
                <li><a href="#" className="hover:text-orange-400">Contact</a></li>
              </ul>
            </div>
            
            {/* Support */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-orange-400">Help Center</a></li>
                <li><a href="#" className="hover:text-orange-400">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-orange-400">Terms of Service</a></li>
                <li><a href="#" className="hover:text-orange-400">Community</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 CodeArena. All rights reserved. Built with ❤️ for developers worldwide.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}