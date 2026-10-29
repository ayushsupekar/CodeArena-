'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Code, User, Search, Crown } from 'lucide-react'
import { ThemeToggle } from './theme-toggle'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Navigation() {
  const router = useRouter()
  const [authState, setAuthState] = useState<'loading' | 'loggedIn' | 'loggedOut'>('loading')
  const [userName, setUserName] = useState('')
  const [userPhoto, setUserPhoto] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const updateAuthState = () => {
      const token = localStorage.getItem('token')
      const user = localStorage.getItem('user')
      const photo = localStorage.getItem('userPhoto')
      
      if (token && user) {
        const userData = JSON.parse(user)
        setUserName(userData.name || 'User')
        setUserPhoto(photo)
        setAuthState('loggedIn')
      } else {
        setAuthState('loggedOut')
      }
    }

    updateAuthState()
    
    const handleStorageChange = () => {
      updateAuthState()
    }
    
    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('userPhotoUpdate', handleStorageChange)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('userPhotoUpdate', handleStorageChange)
    }
  }, [])

  const handleSignOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/'
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/problems?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-14">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
                <Code className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">CodeArena</span>
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/problems" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium">Problems</Link>
              <Link href="/contests" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium">Contest</Link>
              <Link href="/interview" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium">Interview</Link>
              <Link href="/projects" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium">Discuss</Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search problems..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-64 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400"
              />
            </form>
            <ThemeToggle />
            {authState === 'loading' ? (
              <div className="w-16 h-6"></div>
            ) : authState === 'loggedIn' ? (
              <Link href="/profile" className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center overflow-hidden ring-2 ring-orange-200 dark:ring-orange-800">
                  {userPhoto ? (
                    <Image 
                      src={userPhoto} 
                      alt="Profile" 
                      width={32}
                      height={32}
                      className="rounded-full object-cover" 
                      quality={100}
                      priority
                    />
                  ) : (
                    <User className="h-4 w-4 text-white" />
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium">{userName}</span>
                  <Link href="/premium" className="flex items-center space-x-1 px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-medium rounded-full hover:from-yellow-500 hover:to-orange-600">
                    <Crown className="h-3 w-3" />
                    <span>Premium</span>
                  </Link>
                </div>
              </Link>
            ) : (
              <button 
                onClick={() => window.location.href = '/login'}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}