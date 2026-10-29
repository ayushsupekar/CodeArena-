import { PrismaClient } from '@prisma/client'
import { popularProblems } from '../lib/popular-problems'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding problems...')

  // Clear existing data (submissions first due to FK)
  await prisma.submission.deleteMany()
  await prisma.problem.deleteMany()

  for (const p of popularProblems) {
    // Build description from title
    const description = `## ${p.title}\n\nSolve the ${p.title} problem.\n\n**Difficulty:** ${p.difficulty}\n**Category:** ${p.category}`

    // Use testCases if present, otherwise empty
    const testCases = 'testCases' in p && Array.isArray((p as any).testCases)
      ? (p as any).testCases
      : []

    await prisma.problem.upsert({
      where: { id: p.id },
      update: {},
      create: {
        id: p.id,
        title: p.title,
        difficulty: p.difficulty,
        category: p.category,
        description,
        examples: [],
        constraints: [],
        templates: {
          javascript: `/**\n * @param {*} input\n * @return {*}\n */\nfunction solution(input) {\n  // your code here\n}`,
          python: `def solution(input):\n    # your code here\n    pass`,
          java: `class Solution {\n    public Object solution(Object input) {\n        // your code here\n        return null;\n    }\n}`,
          cpp: `#include <bits/stdc++.h>\nusing namespace std;\n\nauto solution(auto input) {\n    // your code here\n}`,
        },
        testCases,
      },
    })
  }

  const count = await prisma.problem.count()
  console.log(`✅ Seeded ${count} problems`)
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
