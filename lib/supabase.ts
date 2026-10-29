import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database types
export interface Problem {
  id: string
  title: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  category: string
  description: string
  examples: any[]
  constraints: string[]
  starter_code: any
  test_cases: any[]
  is_premium: boolean
  companies: string[]
  acceptance_rate: string
  likes: number
  created_at: string
  updated_at: string
}

export interface UserSubmission {
  id: string
  user_id: string
  problem_id: string
  code: string
  language: string
  status: 'Accepted' | 'Wrong Answer' | 'Time Limit Exceeded' | 'Runtime Error'
  runtime: number
  memory: number
  created_at: string
}

export interface User {
  id: string
  email: string
  username: string
  solved_problems: string[]
  subscription: 'free' | 'premium'
  created_at: string
}