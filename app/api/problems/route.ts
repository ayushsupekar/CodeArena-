import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const difficulty = searchParams.get('difficulty')

    const problems = await prisma.problem.findMany({
      where: {
        ...(category && { category }),
        ...(difficulty && { difficulty }),
      },
      select: {
        id: true,
        title: true,
        difficulty: true,
        category: true,
        _count: {
          select: { submissions: { where: { status: 'Accepted' } } }
        }
      },
      orderBy: { id: 'asc' }
    })

    return NextResponse.json(problems)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch problems' }, { status: 500 })
  }
}
