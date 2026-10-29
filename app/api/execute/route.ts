import { NextRequest, NextResponse } from 'next/server'
import { problemData } from '@/lib/problem-data'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const JUDGE0_API_URL = process.env.JUDGE0_API_URL || 'https://ce.judge0.com'

const languageIds: Record<string, number> = {
  javascript: 63,
  python: 71,
  java: 62,
  cpp: 54,
  c: 50,
  go: 60,
  rust: 73,
}

async function runOnJudge0(sourceCode: string, languageId: number) {
  const submitRes = await fetch(`${JUDGE0_API_URL}/submissions?base64_encoded=false&wait=false`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      source_code: sourceCode,
      language_id: languageId,
      stdin: '',
      cpu_time_limit: 5,
      memory_limit: 256000,
    }),
  })
  if (!submitRes.ok) throw new Error(`Judge0 submit failed: ${submitRes.status}`)
  const { token } = await submitRes.json()
  if (!token) throw new Error('No token from Judge0')

  let result, attempts = 0
  do {
    await new Promise(r => setTimeout(r, 1000))
    const res = await fetch(`${JUDGE0_API_URL}/submissions/${token}?base64_encoded=false`)
    result = await res.json()
    attempts++
    if (attempts > 15) throw new Error('Execution timeout')
  } while (result.status?.id <= 2)

  return result
}

// Serialize a JS value to language-specific literal
function serializeArg(val: any, language: string): string {
  if (Array.isArray(val)) {
    const inner = val.map(v => serializeArg(v, language)).join(', ')
    if (language === 'python') return `[${inner}]`
    if (language === 'java' || language === 'cpp') {
      // detect type
      if (val.length === 0) return language === 'java' ? 'new int[]{}' : '{}'
      if (typeof val[0] === 'number') return language === 'java' ? `new int[]{${inner}}` : `{${inner}}`
      if (typeof val[0] === 'string') return language === 'java' ? `new String[]{${inner}}` : `{${inner}}`
      return language === 'java' ? `new Object[]{${inner}}` : `{${inner}}`
    }
    return `[${inner}]`
  }
  if (typeof val === 'string') return `"${val}"`
  if (typeof val === 'boolean') {
    if (language === 'python') return val ? 'True' : 'False'
    return val.toString()
  }
  return String(val)
}

// Parse example input string into argument array
function parseExampleInput(inputStr: string): any[] {
  const args: any[] = []
  // Match patterns like: nums = [1,2,3], target = 9, s = "abc", n = 5, x = -121
  const pattern = /\w+\s*=\s*(\[[\s\S]*?\]|"[^"]*"|'[^']*'|-?\d+(?:\.\d+)?|true|false)/g
  let match
  while ((match = pattern.exec(inputStr)) !== null) {
    try {
      args.push(JSON.parse(match[1]))
    } catch {
      args.push(match[1].replace(/^["']|["']$/g, ''))
    }
  }
  // fallback: single value
  if (args.length === 0) {
    const trimmed = inputStr.trim()
    try { args.push(JSON.parse(trimmed)) } catch { args.push(trimmed) }
  }
  return args
}

// Extract function name from user code
function extractFunctionName(code: string, language: string): string | null {
  if (language === 'javascript') {
    const m = code.match(/function\s+(\w+)\s*\(/) || code.match(/(?:const|let|var)\s+(\w+)\s*=\s*(?:function|\()/)
    return m ? m[1] : null
  }
  if (language === 'python') {
    const m = code.match(/def\s+(\w+)\s*\(/)
    return m ? m[1] : null
  }
  if (language === 'java') {
    // extract method name (not constructor, not main)
    const m = code.match(/public\s+(?:static\s+)?(?!void\s+main)[\w<>\[\]]+\s+(\w+)\s*\(/)
    return m ? m[1] : null
  }
  if (language === 'cpp') {
    const m = code.match(/(?:public:|private:)?\s*[\w<>:*&\[\]]+\s+(\w+)\s*\(/)
    return m ? m[1] : null
  }
  return null
}

// Detect return type from code
function detectReturnType(code: string, language: string): string {
  if (language === 'java') {
    const m = code.match(/public\s+(?:static\s+)?([\w<>\[\]]+)\s+\w+\s*\(/)
    return m ? m[1] : 'Object'
  }
  if (language === 'cpp') {
    const m = code.match(/([\w<>:*&\[\]]+)\s+\w+\s*\(/)
    return m ? m[1] : 'auto'
  }
  return 'auto'
}

// Build full runnable code wrapping user solution
function buildRunnableCode(userCode: string, language: string, args: any[], expectedOutput: string): string {
  const fnName = extractFunctionName(userCode, language)
  if (!fnName) return userCode

  const serializedArgs = args.map(a => serializeArg(a, language))
  const isArrayOutput = expectedOutput.trim().startsWith('[')
  const isBoolOutput = expectedOutput.trim() === 'true' || expectedOutput.trim() === 'false'

  if (language === 'javascript') {
    const callArgs = serializedArgs.join(', ')
    const printExpr = isArrayOutput
      ? `JSON.stringify(result)`
      : `String(result)`
    return `${userCode}\n\ntry {\n  const result = ${fnName}(${callArgs});\n  console.log(${printExpr});\n} catch(e) {\n  console.error(e.message);\n  process.exit(1);\n}`
  }

  if (language === 'python') {
    const callArgs = serializedArgs.join(', ')
    const printExpr = isArrayOutput
      ? `import json\nprint(json.dumps(result, separators=(',', ':')))`
      : isBoolOutput
      ? `print(str(result).lower())`
      : `print(result)`
    return `${userCode}\n\ntry:\n    result = ${fnName}(${callArgs})\n    ${printExpr}\nexcept Exception as e:\n    import sys\n    print(str(e), file=sys.stderr)\n    sys.exit(1)`
  }

  if (language === 'java') {
    const returnType = detectReturnType(userCode, language)

    // Extract import statements from user code
    const importLines = (userCode.match(/^import\s+[\w.*]+;/gm) || []).join('\n')
    const codeWithoutImports = userCode.replace(/^import\s+[\w.*]+;\s*/gm, '')

    const cleanCode = codeWithoutImports
      .replace(/public\s+class\s+\w+/g, 'static class Solution')
      .replace(/class\s+Solution/g, 'static class Solution')

    let callExpr = `sol.${fnName}(${serializedArgs.join(', ')})`
    let printStmt = ''

    if (returnType.includes('[]')) {
      printStmt = `System.out.println(java.util.Arrays.toString(${callExpr}).replace(", ", ","));`
    } else if (returnType.includes('List')) {
      printStmt = `System.out.println(${callExpr}.toString().replace(", ", ","));`
    } else {
      printStmt = `System.out.println(${callExpr});`
    }

    return `import java.util.*;
import java.util.stream.*;
${importLines}
public class Main {
  ${cleanCode}
  public static void main(String[] args) {
    try {
      Solution sol = new Solution();
      ${printStmt}
    } catch (Exception e) {
      System.err.println(e.getMessage());
      System.exit(1);
    }
  }
}`
  }

  if (language === 'cpp') {
    const returnType = detectReturnType(userCode, language)
    const callArgs = serializedArgs.map((a, i) => {
      const orig = args[i]
      if (Array.isArray(orig)) {
        const inner = orig.map(v => serializeArg(v, 'cpp')).join(', ')
        if (typeof orig[0] === 'number') return `vector<int>{${inner}}`
        if (typeof orig[0] === 'string') return `vector<string>{${inner}}`
        return `{${inner}}`
      }
      return a
    }).join(', ')

    let printStmt = ''
    if (returnType.includes('vector')) {
      printStmt = `auto r = sol.${fnName}(${callArgs});\ncout << "[";\nfor(int i=0;i<r.size();i++){if(i)cout<<",";cout<<r[i];}\ncout << "]" << endl;`
    } else if (returnType === 'bool') {
      printStmt = `cout << (sol.${fnName}(${callArgs}) ? "true" : "false") << endl;`
    } else {
      printStmt = `cout << sol.${fnName}(${callArgs}) << endl;`
    }

    return `#include <bits/stdc++.h>
using namespace std;
${userCode}
int main() {
  try {
    Solution sol;
    ${printStmt}
  } catch(...) {
    cerr << "Runtime error" << endl;
    return 1;
  }
  return 0;
}`
  }

  return userCode
}

function normalizeOutput(raw: string): string {
  return raw.trim()
    .replace(/\s*,\s*/g, ',')
    .replace(/\[\s+/g, '[')
    .replace(/\s+\]/g, ']')
    .toLowerCase()
    .replace(/^"(.*)"$/, '$1')
}

export async function POST(request: NextRequest) {
  try {
    const { code, language, input, problemId, runTests, userId, customCases } = await request.json()

    const languageId = languageIds[language as string]
    if (!languageId) return NextResponse.json({ error: 'Unsupported language' }, { status: 400 })

    // Run all test cases (Run button) — no DB save
    if (!runTests || !problemId) {
      const problem = problemId ? problemData[problemId] : null
      const casesToRun: { input: string; output: string; custom?: boolean }[] = []

      if (problem?.examples?.length) {
        casesToRun.push(...problem.examples.map((e: any) => ({ input: e.input, output: e.output || '' })))
      }
      // custom cases passed from frontend
      if (Array.isArray(customCases)) {
        casesToRun.push(...customCases.map((c: any) => ({ input: c.input, output: c.output || '', custom: true })))
      }

      if (casesToRun.length === 0) {
        // plain run, no examples
        const result = await runOnJudge0(code, languageId)
        const stderr = result.stderr || result.compile_output || ''
        const stdout = result.stdout || ''
        return NextResponse.json({
          results: [{ testCase: 1, input: '', expected: '', output: stdout || stderr || 'No output', passed: false, time: parseFloat(result.time||'0')*1000, memory: result.memory||0, error: stderr, status: result.status?.description||'Unknown', custom: true }],
          passed: 0, total: 1, accepted: false, totalTime: 0, maxMemory: result.memory||0,
        })
      }

      const results = []
      let passed = 0, totalTime = 0, maxMemory = 0
      for (let i = 0; i < casesToRun.length; i++) {
        const tc = casesToRun[i]
        try {
          const args = parseExampleInput(tc.input)
          const runnableCode = buildRunnableCode(code, language, args, tc.output)
          const result = await runOnJudge0(runnableCode, languageId)
          const actualOutput = normalizeOutput(result.stdout || '')
          const expectedOutput = normalizeOutput(tc.output)
          const stderr = result.stderr || result.compile_output || ''
          const isCorrect = tc.custom ? false : (actualOutput === expectedOutput && result.status?.id === 3)
          const time = parseFloat(result.time || '0') * 1000
          const memory = result.memory || 0
          if (isCorrect) passed++
          totalTime += time
          maxMemory = Math.max(maxMemory, memory)
          results.push({ testCase: i + 1, input: tc.input, expected: tc.output, output: result.stdout?.trim() || stderr?.trim() || 'No output', passed: isCorrect, time, memory, error: stderr, status: result.status?.description || 'Unknown', custom: tc.custom || false })
        } catch (err: any) {
          results.push({ testCase: i + 1, input: tc.input, expected: tc.output, output: '', passed: false, time: 0, memory: 0, error: err.message, status: 'Error', custom: tc.custom || false })
        }
      }
      return NextResponse.json({ results, passed, total: casesToRun.filter(c => !c.custom).length, accepted: false, totalTime, maxMemory })
    }

    // Submit: run all test cases
    let problem = problemData[problemId]
    // Try DB if not in static data
    if (!problem) {
      const dbProblem = await prisma.problem.findUnique({ where: { id: problemId } })
      if (dbProblem) {
        problem = {
          ...dbProblem,
          examples: dbProblem.examples as any[],
          testCases: dbProblem.testCases as any[],
          templates: dbProblem.templates,
        }
      }
    }
    if (!problem) return NextResponse.json({ error: 'Problem not found' }, { status: 404 })

    // Use testCases if available (DB problems), otherwise fall back to examples
    const testCases = (problem.testCases?.length ? problem.testCases : problem.examples) || []
    if (testCases.length === 0) return NextResponse.json({ error: 'No test cases for this problem' }, { status: 400 })

    const results = []
    let passed = 0
    let totalTime = 0
    let maxMemory = 0

    for (let i = 0; i < testCases.length; i++) {
      const tc = testCases[i]
      try {
        const args = parseExampleInput(tc.input)
        const expectedOut = tc.expectedOutput || tc.output || ''
        const runnableCode = buildRunnableCode(code, language, args, expectedOut)
        const result = await runOnJudge0(runnableCode, languageId)

        const actualOutput = normalizeOutput(result.stdout || '')
        const expectedOutput = normalizeOutput(expectedOut)
        const stderr = result.stderr || result.compile_output || ''
        const isCorrect = actualOutput === expectedOutput && result.status?.id === 3
        const time = parseFloat(result.time || '0') * 1000
        const memory = result.memory || 0

        if (isCorrect) passed++
        totalTime += time
        maxMemory = Math.max(maxMemory, memory)

        results.push({
          testCase: i + 1,
          input: tc.input,
          expected: tc.expectedOutput || tc.output,
          output: result.stdout?.trim() || stderr?.trim() || 'No output',
          passed: isCorrect,
          time,
          memory,
          error: stderr,
          status: result.status?.description || 'Unknown',
          timeLimitExceeded: result.status?.id === 5,
          memoryLimitExceeded: result.status?.id === 6,
        })
      } catch (err: any) {
        results.push({
          testCase: i + 1,
          input: tc.input,
          expected: tc.expectedOutput || tc.output,
          output: '',
          passed: false,
          time: 0,
          memory: 0,
          error: err.message,
          status: 'Error',
          timeLimitExceeded: false,
          memoryLimitExceeded: false,
        })
      }
    }

    const finalResult = {
      results,
      passed,
      total: testCases.length,
      accepted: passed === testCases.length,
      totalTime,
      maxMemory,
      verdict: passed === testCases.length
        ? 'Accepted'
        : `Wrong Answer (${passed}/${testCases.length})`,
    }

    // Save submission to DB if userId provided
    if (userId) {
      try {
        const prob = problemData[problemId]
        const problemExists = await prisma.problem.findUnique({ where: { id: problemId } })
        if (!problemExists) {
          await prisma.problem.create({
            data: {
              id: problemId,
              title: prob?.title || `Problem ${problemId}`,
              description: prob?.description || '',
              difficulty: prob?.difficulty || 'Medium',
              category: 'General',
              examples: prob?.examples || [],
              constraints: prob?.constraints || [],
              templates: prob?.templates || {},
              testCases: [],
            }
          })
        }
        await prisma.submission.create({
          data: {
            userId,
            problemId,
            code,
            language,
            status: finalResult.accepted ? 'Accepted' : 'Wrong Answer',
            verdict: finalResult.verdict,
            runtime: Math.round(totalTime),
            memory: Math.round(maxMemory),
            passed,
            total: testCases.length,
          }
        })
      } catch (e) {
        console.error('Failed to save submission:', e)
      }
    }

    return NextResponse.json(finalResult)

  } catch (error: any) {
    return NextResponse.json({ error: 'Execution failed', details: error.message }, { status: 500 })
  }
}
