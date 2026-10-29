import { completeProblems } from './complete-problems'
import { popularProblems } from './popular-problems'

// Build a lookup map from popularProblems for fast access
const popularMap: Record<string, any> = {}
for (const p of popularProblems) {
  if (!popularMap[p.id]) popularMap[p.id] = p
}

// Generate a proper problem entry from popular-problems metadata
function buildFromPopular(p: any) {
  const fnName = p.title
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, '')
    .split(' ')
    .map((w: string, i: number) => i === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1))
    .join('')

  const examples = p.testCases
    ? p.testCases.filter((tc: any) => !tc.isHidden).map((tc: any) => ({
        input: tc.input,
        output: tc.expectedOutput,
      }))
    : [{ input: 'See problem description', output: 'See problem description' }]

  return {
    title: p.title,
    difficulty: p.difficulty,
    category: p.category,
    companies: p.companies || [],
    description: `Given the problem constraints, implement an efficient solution for "${p.title}".\n\nThis is a ${p.difficulty} level ${p.category} problem.\n\nAcceptance Rate: ${p.acceptance}`,
    examples,
    constraints: [
      `Difficulty: ${p.difficulty}`,
      `Category: ${p.category}`,
      'Optimize for time and space complexity',
      'Handle all edge cases properly',
    ],
    templates: {
      javascript: `function ${fnName}() {\n    // Write your solution here\n    \n}`,
      python: `def ${fnName}():\n    # Write your solution here\n    pass`,
      java: `class Solution {\n    public void ${fnName}() {\n        // Write your solution here\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    void ${fnName}() {\n        // Write your solution here\n        \n    }\n};`,
    },
  }
}

// Merge: completeProblems takes priority, popularProblems fills the gaps
const merged: Record<string, any> = { ...completeProblems }
for (const [id, pop] of Object.entries(popularMap)) {
  if (!merged[id] || merged[id].title.startsWith('Problem ')) {
    merged[id] = buildFromPopular(pop)
  }
}

export const problemData: Record<string, any> = merged
