import { prisma } from './prisma'
import { problemData } from './problem-data'
import { problemTestCases } from './test-cases'

async function main() {
  // Seed problems
  for (const [id, problem] of Object.entries(problemData)) {
    const testCases = problemTestCases[id]
    
    await prisma.problem.upsert({
      where: { id },
      update: {},
      create: {
        id,
        title: problem.title,
        description: problem.description,
        difficulty: problem.difficulty,
        category: problem.category || 'Array',
        examples: problem.examples || [],
        constraints: problem.constraints || [],
        templates: problem.templates,
        testCases: testCases?.testCases || [],
        timeLimit: testCases?.timeLimit || 2000,
        memoryLimit: testCases?.memoryLimit || 256
      }
    })
  }

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })