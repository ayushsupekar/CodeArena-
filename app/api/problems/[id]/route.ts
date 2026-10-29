import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const problem = await prisma.problem.findUnique({ where: { id: params.id } })
    if (!problem) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(problem)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch problem' }, { status: 500 })
  }
}
