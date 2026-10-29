import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const { userId, problemId, problemTitle, difficulty, code, language, status, verdict, runtime, memory, passed, total } = await request.json()

    if (!userId || !problemId) {
      return NextResponse.json({ error: 'userId and problemId required' }, { status: 400 })
    }

    // Ensure problem record exists
    const problemExists = await prisma.problem.findUnique({ where: { id: problemId } })
    if (!problemExists) {
      await prisma.problem.create({
        data: {
          id: problemId,
          title: problemTitle || `Problem ${problemId}`,
          description: '',
          difficulty: difficulty || 'Medium',
          category: 'General',
          examples: [],
          constraints: [],
          templates: {},
          testCases: [],
        }
      })
    }

    const submission = await prisma.submission.create({
      data: {
        userId,
        problemId,
        code,
        language,
        status,
        verdict,
        runtime: runtime ? Math.round(runtime) : null,
        memory: memory ? Math.round(memory) : null,
        passed: passed || 0,
        total: total || 0,
      }
    })

    return NextResponse.json({ success: true, submission })
  } catch (error: any) {
    console.error('Save submission error:', error)
    return NextResponse.json({ error: 'Failed to save submission' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    if (!userId) return NextResponse.json({ error: 'userId required' }, { status: 400 })

    const submissions = await prisma.submission.findMany({
      where: { userId },
      include: { problem: { select: { title: true, difficulty: true } } },
      orderBy: { createdAt: 'desc' },
      take: 50,
    })

    return NextResponse.json({ submissions })
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch submissions' }, { status: 500 })
  }
}
