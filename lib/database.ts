import { supabase, Problem, UserSubmission } from './supabase'

// Problems API
export const problemsAPI = {
  async getAll() {
    const { data, error } = await supabase
      .from('problems')
      .select('*')
      .order('id')
    
    if (error) throw error
    return data as Problem[]
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('problems')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data as Problem
  },

  async getByCategory(category: string) {
    const { data, error } = await supabase
      .from('problems')
      .select('*')
      .eq('category', category)
      .order('id')
    
    if (error) throw error
    return data as Problem[]
  },

  async search(query: string) {
    const { data, error } = await supabase
      .from('problems')
      .select('*')
      .ilike('title', `%${query}%`)
      .order('id')
    
    if (error) throw error
    return data as Problem[]
  }
}

// Submissions API
export const submissionsAPI = {
  async create(submission: Omit<UserSubmission, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('submissions')
      .insert(submission)
      .select()
      .single()
    
    if (error) throw error
    return data as UserSubmission
  },

  async getByUser(userId: string) {
    const { data, error } = await supabase
      .from('submissions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as UserSubmission[]
  },

  async getByProblem(problemId: string, userId: string) {
    const { data, error } = await supabase
      .from('submissions')
      .select('*')
      .eq('problem_id', problemId)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as UserSubmission[]
  }
}

// User progress API
export const userAPI = {
  async getSolvedProblems(userId: string) {
    const { data, error } = await supabase
      .from('submissions')
      .select('problem_id')
      .eq('user_id', userId)
      .eq('status', 'Accepted')
    
    if (error) throw error
    return data.map(item => item.problem_id)
  },

  async getStats(userId: string) {
    const { data, error } = await supabase
      .from('submissions')
      .select('status, problem_id')
      .eq('user_id', userId)
    
    if (error) throw error
    
    const solved = new Set(data.filter(s => s.status === 'Accepted').map(s => s.problem_id)).size
    const attempted = new Set(data.map(s => s.problem_id)).size
    
    return { solved, attempted, total: data.length }
  }
}