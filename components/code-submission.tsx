'use client'

import { useState, useEffect } from 'react'
import { languageIds } from '@/lib/judge0'
import { problemData } from '@/lib/problem-data'
import Editor from '@monaco-editor/react'

interface TestResult {
  testCase: number
  passed: boolean
  time: number
  memory: number
  error?: string
  timeLimitExceeded: boolean
  memoryLimitExceeded: boolean
}

interface SubmissionResult {
  results: TestResult[]
  passed: number
  total: number
  accepted: boolean
  verdict: string
  totalTime: number
  maxMemory: number
}

export default function CodeSubmission({ problemId }: { problemId: string }) {
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState('javascript')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<SubmissionResult | null>(null)
  const problem = problemData[problemId as keyof typeof problemData]

  useEffect(() => {
    if (problem && problem.templates[language as keyof typeof problem.templates]) {
      setCode(problem.templates[language as keyof typeof problem.templates])
    }
  }, [language, problem])

  const handleSubmit = async () => {
    setLoading(true)
    setResult(null)

    try {
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          language,
          languageId: languageIds[language as keyof typeof languageIds],
          problemId,
          runTests: true
        })
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error('Submission failed:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!problem) {
    return <div className="p-8">Problem not found</div>
  }

  return (
    <div className="flex h-screen shadow-2xl">
      {/* Problem Description */}
      <div className="w-1/2 border-r overflow-y-auto bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">{problem.title}</h1>
            <span className={`px-3 py-1 text-xs font-bold rounded-full shadow-lg ${
              problem.difficulty === 'Easy' ? 'bg-gradient-to-r from-green-400 to-green-600 text-white' :
              problem.difficulty === 'Medium' ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white' :
              'bg-gradient-to-r from-red-400 to-red-600 text-white'
            }`}>
              {problem.difficulty}
            </span>
          </div>
          
          <div className="prose max-w-none mb-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {problem.description}
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Examples:</h3>
            {problem.examples.map((example, index) => (
              <div key={index} className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-gray-800 dark:to-gray-700 p-4 rounded-lg border-l-4 border-purple-500 shadow-md">
                <div className="font-mono text-sm">
                  <div className="text-blue-700 dark:text-blue-300"><strong className="text-purple-600">Input:</strong> {example.input}</div>
                  <div className="text-green-700 dark:text-green-300"><strong className="text-purple-600">Output:</strong> {example.output}</div>
                  {example.explanation && (
                    <div className="mt-2 text-gray-600 dark:text-gray-400">
                      <strong className="text-purple-600">Explanation:</strong> {example.explanation}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Constraints:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
              {problem.constraints.map((constraint, index) => (
                <li key={index}>{constraint}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Code Editor */}
      <div className="w-1/2 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-indigo-600 to-purple-600">
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
            className="px-4 py-2 border-2 border-white/20 rounded-lg bg-white/10 text-white font-medium backdrop-blur-sm"
          >
            <option value="javascript" className="text-gray-800">JavaScript</option>
            <option value="python" className="text-gray-800">Python</option>
            <option value="java" className="text-gray-800">Java</option>
            <option value="cpp" className="text-gray-800">C++</option>
          </select>
          
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-8 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold rounded-lg hover:from-green-500 hover:to-blue-600 disabled:opacity-50 shadow-lg transform hover:scale-105 transition-all"
          >
            {loading ? 'Running...' : 'Submit'}
          </button>
        </div>
        
        <div className="flex-1 pt-4" style={{ background: '#1e1e1e' }}>
          <Editor
            height="100%"
            language={language === 'cpp' ? 'cpp' : language}
            value={code}
            onChange={(value) => setCode(value || '')}
            theme="vs-dark"
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              wordWrap: 'on'
            }}
          />
        </div>
      </div>

      {/* Results Panel */}
      {result && (
        <div className="w-80 border-l bg-gray-50 dark:bg-gray-800 absolute right-0 top-0 h-full z-10 shadow-2xl">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold">Test Results</h3>
        </div>
        
        <div className="p-4 space-y-4">
          {result && (
            <>
              {/* Overall Result */}
              <div className={`p-4 rounded-lg shadow-lg ${result.accepted ? 'bg-gradient-to-r from-green-400 to-green-600 text-white' : 'bg-gradient-to-r from-red-400 to-red-600 text-white'}`}>
                <div className="font-semibold text-lg">{result.verdict}</div>
                <div className="text-sm mt-1">
                  {result.passed}/{result.total} test cases passed
                </div>
                <div className="text-xs mt-2">
                  Runtime: {result.totalTime.toFixed(2)}ms | Memory: {(result.maxMemory/1024).toFixed(1)}KB
                </div>
              </div>

              {/* Individual Test Cases */}
              <div className="space-y-2">
                <h4 className="font-medium">Test Cases:</h4>
                {result.results.map((test, index) => (
                  <div key={index} className={`p-3 rounded-lg shadow-md border-l-4 ${
                    test.passed ? 'border-green-500 bg-gradient-to-r from-green-50 to-green-100' : 'border-red-500 bg-gradient-to-r from-red-50 to-red-100'
                  }`}>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Test Case {test.testCase}</span>
                      <span className={`text-sm px-2 py-1 rounded ${
                        test.passed ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                      }`}>
                        {test.passed ? 'PASS' : 'FAIL'}
                      </span>
                    </div>
                    
                    <div className="text-xs text-gray-600 mt-1">
                      {test.time.toFixed(2)}ms | {(test.memory/1024).toFixed(1)}KB
                    </div>
                    
                    {test.timeLimitExceeded && (
                      <div className="text-xs text-red-600 mt-1">Time Limit Exceeded</div>
                    )}
                    
                    {test.memoryLimitExceeded && (
                      <div className="text-xs text-red-600 mt-1">Memory Limit Exceeded</div>
                    )}
                    
                    {test.error && (
                      <div className="text-xs text-red-600 mt-1 font-mono">{test.error}</div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
          
          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
              <p className="mt-2 text-gray-600">Running test cases...</p>
            </div>
          )}
          
          {!result && !loading && (
            <div className="text-center py-8 text-gray-500">
              Submit your code to see test results
            </div>
          )}
        </div>
        </div>
      )}
    </div>
  )
}