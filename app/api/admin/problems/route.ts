import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, title, description, difficulty, category, examples, constraints, templates, testCases, timeLimit, memoryLimit } = body

    if (!title || !description || !difficulty || !category) {
      return NextResponse.json({ error: 'title, description, difficulty, category are required' }, { status: 400 })
    }

    const problem = await prisma.problem.upsert({
      where: { id: id || '' },
      update: { title, description, difficulty, category, examples, constraints, templates, testCases, timeLimit: timeLimit || 2000, memoryLimit: memoryLimit || 256 },
      create: {
        ...(id ? { id } : {}),
        title, description, difficulty, category,
        examples: examples || [],
        constraints: constraints || [],
        templates: templates || {},
        testCases: testCases || [],
        timeLimit: timeLimit || 2000,
        memoryLimit: memoryLimit || 256,
      },
    })

    return NextResponse.json({ success: true, problem })
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to save problem', details: error.message }, { status: 500 })
  }
}

export async function GET() {
  try {
    const problems = await prisma.problem.findMany({
      select: { id: true, title: true, difficulty: true, category: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(problems)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch problems' }, { status: 500 })
  }
}
