import { ReactNode } from "react"

export interface Problem {
  acceptance: ReactNode
  likes: number
  id: string
  title: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  category: string
  description: string
  examples: Example[]
  constraints: string[]
  starterCode: Record<string, string>
  testCases: TestCase[]
  isPremium: boolean
  companies: string[]
}

export interface Example {
  input: string
  output: string
  explanation?: string
}

export interface TestCase {
  input: string
  expectedOutput: string
  isHidden: boolean
}

export interface User {
  id: string
  email: string
  username: string
  solvedProblems: string[]
  subscription: 'free' | 'premium'
}

export interface Contest {
  id: string
  title: string
  startTime: Date
  duration: number
  problems: string[]
  participants: number
}

export interface Project {
  id: string
  title: string
  description: string
  ownerId: string
  collaborators: string[]
  isPublic: boolean
  files: ProjectFile[]
}

export interface ProjectFile {
  id: string
  name: string
  content: string
  language: string
}

// amazonq-ignore-next-line
export type Language = 'javascript' | 'python' | 'java' | 'cpp' | 'c' | 'go' | 'rust'