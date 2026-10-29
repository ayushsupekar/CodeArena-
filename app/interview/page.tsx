import Link from 'next/link'
import { Play, Clock, Target, BookOpen, Users, Video } from 'lucide-react'


const companies = [
  { name: 'Google', logo: '🔍', problems: 245, difficulty: 'Hard' },
  { name: 'Amazon', logo: '📦', problems: 189, difficulty: 'Medium' },
  { name: 'Microsoft', logo: '🪟', problems: 156, difficulty: 'Medium' },
  { name: 'Apple', logo: '🍎', problems: 134, difficulty: 'Hard' },
  { name: 'Meta', logo: '👥', problems: 178, difficulty: 'Hard' },
  { name: 'Netflix', logo: '🎬', problems: 89, difficulty: 'Medium' }
]

const interviewTypes = [
  {
    title: 'Technical Coding',
    description: 'Practice algorithmic problems and data structures',
    icon: <Play className="h-8 w-8" />,
    duration: '45-60 min',
    href: '/interview/coding'
  },
  {
    title: 'System Design',
    description: 'Design scalable systems and architectures',
    icon: <Target className="h-8 w-8" />,
    duration: '45-60 min',
    href: '/interview/system-design'
  },
  {
    title: 'Behavioral',
    description: 'Practice leadership and situational questions',
    icon: <Users className="h-8 w-8" />,
    duration: '30-45 min',
    href: '/interview/behavioral'
  },
  {
    title: 'Mock Interview',
    description: 'Full interview simulation with AI or peers',
    icon: <Video className="h-8 w-8" />,
    duration: '60-90 min',
    href: '/interview/mock'
  }
]

// amazonq-ignore-next-line
export default function InterviewPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Interview Preparation</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Prepare for technical interviews at top companies with our comprehensive practice platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {interviewTypes.map((type) => (
            <Link key={type.title} href={type.href} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
              <div className="text-orange-600 dark:text-orange-400 mb-4">{type.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{type.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">{type.description}</p>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Clock className="h-4 w-4 mr-1" />
                <span>{type.duration}</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Company-Specific Practice</h2>
            <span className="text-sm text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/20 px-3 py-1 rounded-full">
              Premium Feature
            </span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.map((company) => (
              <div key={company.name} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3">{company.logo}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{company.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{company.problems} problems</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-sm px-2 py-1 rounded ${
                    company.difficulty === 'Hard' 
                      ? 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400' 
                      : 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400'
                  }`}>
                    {company.difficulty}
                  </span>
                  <Link 
                    href={`/interview/companies/${company.name.toLowerCase()}`}
                    className="text-orange-600 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-300 text-sm font-medium"
                  >
                    Practice →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="card">
            <div className="flex items-center mb-4">
              <BookOpen className="h-6 w-6 text-primary-600 mr-2" />
              <h3 className="text-xl font-semibold">Study Plans</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Structured learning paths to prepare for specific roles and companies
            </p>
            <div className="space-y-2">
              <Link href="/interview/plans/sde1" className="block p-3 bg-gray-50 rounded hover:bg-gray-100">
                <div className="font-medium">Software Engineer I</div>
                <div className="text-sm text-gray-600">4-week preparation plan</div>
              </Link>
              <Link href="/interview/plans/sde2" className="block p-3 bg-gray-50 rounded hover:bg-gray-100">
                <div className="font-medium">Software Engineer II</div>
                <div className="text-sm text-gray-600">6-week preparation plan</div>
              </Link>
              <Link href="/interview/plans/senior" className="block p-3 bg-gray-50 rounded hover:bg-gray-100">
                <div className="font-medium">Senior Engineer</div>
                <div className="text-sm text-gray-600">8-week preparation plan</div>
              </Link>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center mb-4">
              <Target className="h-6 w-6 text-orange-600 dark:text-orange-400 mr-2" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Progress Tracking</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Monitor your preparation progress and identify areas for improvement
            </p>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm text-gray-900 dark:text-gray-100 mb-1">
                  <span>Problems Solved</span>
                  <span>127/200</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-orange-600 h-2 rounded-full" style={{ width: '63.5%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm text-gray-900 dark:text-gray-100 mb-1">
                  <span>Mock Interviews</span>
                  <span>8/12</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '66.7%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}