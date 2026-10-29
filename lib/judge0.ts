const JUDGE0_API_URL = process.env.JUDGE0_API_URL || 'https://ce.judge0.com'

export const languageIds: Record<string, number> = {
  javascript: 63,
  python: 71,
  java: 62,
  cpp: 54,
  c: 50,
  go: 60,
  rust: 73,
  csharp: 51,
  typescript: 74,
  kotlin: 78,
  swift: 83,
  ruby: 72,
  php: 68,
  scala: 81,
}

export async function executeCode(
  code: string,
  languageId: number,
  input?: string,
  timeLimit?: number,
  memoryLimit?: number
) {
  const submitResponse = await fetch(`${JUDGE0_API_URL}/submissions?base64_encoded=false&wait=false`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      source_code: code,
      language_id: languageId,
      stdin: input || '',
      cpu_time_limit: timeLimit ? timeLimit / 1000 : 5,
      memory_limit: memoryLimit || 256000,
    }),
  })

  if (!submitResponse.ok) throw new Error(`Submission failed: ${submitResponse.status}`)

  const { token } = await submitResponse.json()
  if (!token) throw new Error('No token received')

  let result, attempts = 0
  do {
    await new Promise(r => setTimeout(r, 1000))
    const res = await fetch(`${JUDGE0_API_URL}/submissions/${token}?base64_encoded=false`)
    if (!res.ok) throw new Error(`Result fetch failed: ${res.status}`)
    result = await res.json()
    attempts++
    if (attempts > 15) throw new Error('Execution timeout')
  } while (result.status?.id <= 2)

  return {
    stdout: result.stdout || '',
    stderr: result.stderr || result.compile_output || '',
    status: result.status?.description || 'Unknown',
    statusId: result.status?.id || 0,
    time: parseFloat(result.time || '0') * 1000,
    memory: result.memory || 0,
  }
}

export async function runTestCases(
  code: string,
  languageId: number,
  testCases: { input: string; expected: string }[],
  timeLimit: number,
  memoryLimit: number
) {
  const results = []
  let passed = 0, totalTime = 0, maxMemory = 0

  for (let i = 0; i < testCases.length; i++) {
    const result = await executeCode(code, languageId, testCases[i].input, timeLimit, memoryLimit)
    const isCorrect = result.stdout.trim() === testCases[i].expected.trim()
    const ok = isCorrect && result.statusId === 3

    if (ok) passed++
    totalTime += result.time
    maxMemory = Math.max(maxMemory, result.memory)

    results.push({
      testCase: i + 1,
      input: testCases[i].input,
      expected: testCases[i].expected,
      output: result.stdout.trim(),
      passed: ok,
      time: result.time,
      memory: result.memory,
      error: result.stderr,
      status: result.status,
    })
  }

  return {
    results,
    passed,
    total: testCases.length,
    accepted: passed === testCases.length,
    totalTime,
    maxMemory,
    verdict: passed === testCases.length ? 'Accepted' : `Wrong Answer (${passed}/${testCases.length})`,
  }
}
