import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { problemId, language, code, userId } = await request.json()
    
    // For now, store in memory (replace with database later)
    // In production, save to database with userId, problemId, language, code
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save code' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const problemId = searchParams.get('problemId')
    const language = searchParams.get('language')
    const userId = searchParams.get('userId')
    
    // For now, return empty (replace with database query later)
    // In production, fetch from database where userId, problemId, language match
    
    return NextResponse.json({ code: null })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load code' }, { status: 500 })
  }
}