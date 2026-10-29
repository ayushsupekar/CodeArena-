import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    if (!userId) return NextResponse.json({ error: 'userId required' }, { status: 400 })

    const submissions = await prisma.submission.findMany({
      where: { userId },
      include: { problem: { select: { title: true, difficulty: true } } },
      orderBy: { createdAt: 'desc' },
    })

    // Solved problems (unique, accepted only)
    const acceptedSubmissions = submissions.filter(s => s.status === 'Accepted')
    const solvedProblemIds = new Set(acceptedSubmissions.map(s => s.problemId))

    // Per difficulty
    const solvedByDifficulty = { Easy: 0, Medium: 0, Hard: 0 }
    for (const s of acceptedSubmissions) {
      const diff = s.problem?.difficulty as keyof typeof solvedByDifficulty
      if (diff && !solvedByDifficulty[diff]) {
        // count unique per difficulty
      }
    }

    // Unique solved per difficulty
    const uniqueSolvedByDiff: Record<string, Set<string>> = { Easy: new Set(), Medium: new Set(), Hard: new Set() }
    for (const s of acceptedSubmissions) {
      const diff = s.problem?.difficulty || 'Medium'
      if (uniqueSolvedByDiff[diff]) uniqueSolvedByDiff[diff].add(s.problemId)
    }

    // Submission activity (last 12 months, grouped by date)
    const activityMap: Record<string, number> = {}
    for (const s of submissions) {
      const date = s.createdAt.toISOString().split('T')[0]
      activityMap[date] = (activityMap[date] || 0) + 1
    }

    // Recent submissions (last 10)
    const recentSubmissions = submissions.slice(0, 10).map(s => ({
      id: s.id,
      problemId: s.problemId,
      problemTitle: s.problem?.title || `Problem ${s.problemId}`,
      difficulty: s.problem?.difficulty || 'Medium',
      language: s.language,
      status: s.status,
      runtime: s.runtime,
      memory: s.memory,
      createdAt: s.createdAt,
    }))

    return NextResponse.json({
      totalSolved: solvedProblemIds.size,
      totalSubmissions: submissions.length,
      acceptedSubmissions: acceptedSubmissions.length,
      solvedByDifficulty: {
        Easy: uniqueSolvedByDiff.Easy.size,
        Medium: uniqueSolvedByDiff.Medium.size,
        Hard: uniqueSolvedByDiff.Hard.size,
      },
      acceptanceRate: submissions.length > 0
        ? Math.round((acceptedSubmissions.length / submissions.length) * 100)
        : 0,
      activity: activityMap,
      recentSubmissions,
    })
  } catch (error: any) {
    console.error('Profile fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 })
  }
}
