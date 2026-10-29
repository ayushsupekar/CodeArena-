'use client'

import { useState, useEffect } from 'react'
import { Play, RotateCcw, Settings, Copy, Check, Plus, X, CheckCircle2, XCircle } from 'lucide-react'
import { Editor } from '@monaco-editor/react'
import { problemData } from '@/lib/problem-data'

const languages = [
  { id: 'javascript', name: 'JavaScript', extension: 'js' },
  { id: 'python', name: 'Python', extension: 'py' },
  { id: 'java', name: 'Java', extension: 'java' },
  { id: 'cpp', name: 'C++', extension: 'cpp' }
]

export default function ProblemPage({ params }: { params: { id: string } }) {
  const [problem, setProblem] = useState<any>(problemData[params.id] || null)
  const [loadingProblem, setLoadingProblem] = useState(!problemData[params.id])

  useEffect(() => {
    if (problemData[params.id]) return
    fetch(`/api/problems/${params.id}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data && !data.error) setProblem(data)
        setLoadingProblem(false)
      })
      .catch(() => setLoadingProblem(false))
  }, [params.id])

  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(`language-${params.id}`) || 'javascript'
    }
    return 'javascript'
  })
  const [code, setCode] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState<'testcase' | 'result'>('testcase')
  const [consoleHeight, setConsoleHeight] = useState(300)
  const [copied, setCopied] = useState(false)
  const [leftPanelWidth, setLeftPanelWidth] = useState(50)
  const [showResults, setShowResults] = useState(false)
  const [submissionResult, setSubmissionResult] = useState<any>(null)
  const [selectedCase, setSelectedCase] = useState(0)
  const [runResults, setRunResults] = useState<any[]>([])
  const [customCases, setCustomCases] = useState<{ input: string; output: string }[]>([])

  useEffect(() => {
    const savedCode = localStorage.getItem(`code-${params.id}-${selectedLanguage}`)
    if (savedCode) {
      setCode(savedCode)
    } else if (problem && problem.templates[selectedLanguage]) {
      setCode(problem.templates[selectedLanguage])
    }
  }, [selectedLanguage, problem, params.id])

  useEffect(() => {
    if (code && code !== problem?.templates[selectedLanguage]) {
      localStorage.setItem(`code-${params.id}-${selectedLanguage}`, code)
    }
  }, [code, params.id, selectedLanguage, problem])

  const handleRun = async () => {
    setIsRunning(true)
    setActiveTab('result')
    setRunResults([])
    try {
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language: selectedLanguage, problemId: params.id, customCases })
      })
      const result = await response.json()
      if (result.error) {
        setRunResults([{ testCase: 1, input: '', expected: '', output: result.details || result.error, passed: false, error: result.details || result.error, status: 'Error' }])
      } else {
        setRunResults(result.results || [])
      }
    } catch (error: any) {
      setRunResults([{ testCase: 1, input: '', expected: '', output: error.message, passed: false, error: error.message, status: 'Error' }])
    } finally {
      setIsRunning(false)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setShowResults(true)
    setActiveTab('result')

    try {
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language: selectedLanguage, problemId: params.id, runTests: true, userId: JSON.parse(localStorage.getItem('user') || '{}')?.id })
      })

      const result = await response.json()

      if (result.error) {
        setSubmissionResult(null)
        setShowResults(false)
        setRunResults([{ testCase: 1, input: '', expected: '', output: result.details || result.error, passed: false, error: result.details || result.error, status: 'Error' }])
        setActiveTab('result')
        return
      }

      const errorCase = result.results?.find((r: any) => r.error && !r.passed)
      if (errorCase) {
        setSubmissionResult(null)
        setShowResults(false)
        setRunResults(result.results)
        setActiveTab('result')
        return
      }

      const sub = {
        status: result.accepted ? 'Accepted' : 'Wrong Answer',
        runtime: `${result.totalTime?.toFixed(2) || 'N/A'} ms`,
        memory: `${((result.maxMemory || 0) / 1024).toFixed(1)} MB`,
        runtimePercentile: 'N/A',
        memoryPercentile: 'N/A',
        testsPassed: `${result.passed}/${result.total}`,
        language: languages.find(l => l.id === selectedLanguage)?.name || selectedLanguage,
        results: result.results,
      }
      setSubmissionResult(sub)
    } catch (error: any) {
      setSubmissionResult(null)
      setShowResults(false)
      setRunResults([{ testCase: 1, input: '', expected: '', output: error.message, passed: false, error: error.message, status: 'Error' }])
      setActiveTab('result')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    if (problem && problem.templates[selectedLanguage]) {
      setCode(problem.templates[selectedLanguage])
      localStorage.removeItem(`code-${params.id}-${selectedLanguage}`)
    }
    setRunResults([])
    setActiveTab('testcase')
  }

  const addCustomCase = () => {
    const firstExample = problem?.examples?.[0]
    setCustomCases(prev => [...prev, { input: firstExample?.input || '', output: '' }])
    setSelectedCase((problem?.examples?.length || 0) + customCases.length)
    setActiveTab('testcase')
  }

  const removeCustomCase = (idx: number) => {
    setCustomCases(prev => prev.filter((_, i) => i !== idx))
    setSelectedCase(0)
  }

  const copyCode = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }



  if (loadingProblem) {
    return <div className="p-8 text-gray-500 dark:text-gray-400">Loading problem...</div>
  }

  if (!problem) {
    return <div className="p-8">Problem not found</div>
  }

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">{params.id}. {problem.title}</h1>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              problem.difficulty === 'Easy' ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400' :
              problem.difficulty === 'Medium' ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400' :
              'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400'
            }`}>
              {problem.difficulty}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <Settings className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex relative">
        {/* Problem Description / Results Panel */}
        <div 
          className="bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col"
          style={{ width: `${leftPanelWidth}%` }}
        >
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {showResults && submissionResult ? 'Submission Result' : showResults ? 'Run Results' : 'Problem Description'}
              </h2>
              {showResults && (
                <button
                  onClick={() => { setShowResults(false); setSubmissionResult(null) }}
                  className="text-sm text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300"
                >
                  Back to Problem
                </button>
              )}
            </div>
            {!showResults && (
              <div className="prose prose-sm max-w-none text-gray-700 dark:text-gray-300">
                <p className="mb-4 whitespace-pre-wrap">{problem.description}</p>
              </div>
            )}
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            {showResults && submissionResult ? (
              <div className="space-y-6">
                {/* Status */}
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full ${
                    submissionResult.status === 'Accepted' ? 'bg-green-500' : 'bg-red-500'
                  }`}></div>
                  <span className={`text-xl font-bold ${
                    submissionResult.status === 'Accepted' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  }`}>
                    {submissionResult.status}
                  </span>
                </div>

                {/* Runtime */}
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Runtime</div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">{submissionResult.runtime}</div>
                  {submissionResult.runtimePercentile !== 'N/A' && (
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Beats {submissionResult.runtimePercentile} of users with {submissionResult.language}
                    </div>
                  )}
                </div>

                {/* Memory */}
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Memory</div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">{submissionResult.memory}</div>
                  {submissionResult.memoryPercentile !== 'N/A' && (
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Beats {submissionResult.memoryPercentile} of users with {submissionResult.language}
                    </div>
                  )}
                </div>

                {/* Test Cases */}
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Test Cases Passed</div>
                  <div className="text-lg font-semibold text-green-600 dark:text-green-400">{submissionResult.testsPassed}</div>
                </div>

                {/* Per test case breakdown */}
                {submissionResult.results && (
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Test Case Details:</div>
                    {submissionResult.results.map((tc: any, i: number) => (
                      <div key={i} className={`p-3 rounded-lg border-l-4 text-sm ${
                        tc.passed
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/10'
                          : 'border-red-500 bg-red-50 dark:bg-red-900/10'
                      }`}>
                        <div className="font-medium mb-1">
                          {tc.passed ? '✅' : '❌'} Case {tc.testCase}
                        </div>
                        <div className="font-mono text-xs space-y-1 text-gray-700 dark:text-gray-300">
                          <div><span className="text-gray-500">Input:</span> {tc.input}</div>
                          <div><span className="text-gray-500">Expected:</span> {tc.expected}</div>
                          <div><span className={tc.passed ? 'text-green-600' : 'text-red-600'}>Output:</span> {tc.output || 'No output'}</div>
                          {tc.error && <div className="text-red-500 whitespace-pre-wrap">{tc.error}</div>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Next Challenges */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Next Challenges</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">
                      <span className="text-gray-900 dark:text-gray-100">3Sum</span>
                      <span className="text-xs px-2 py-1 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400 rounded">Medium</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">
                      <span className="text-gray-900 dark:text-gray-100">4Sum</span>
                      <span className="text-xs px-2 py-1 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400 rounded">Medium</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">
                      <span className="text-gray-900 dark:text-gray-100">Two Sum II - Input Array Is Sorted</span>
                      <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 rounded">Easy</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : showResults ? (
              <div className="font-mono text-sm text-gray-800 dark:text-gray-200">
                Running...
              </div>
            ) : (
              <div className="space-y-6">
                {problem.examples?.map((example: any, index: number) => (
                  <div key={index}>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Example {index + 1}:</h3>
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg border border-gray-200 dark:border-gray-600">
                      <div className="font-mono text-sm text-gray-800 dark:text-gray-200">
                        <div><strong>Input:</strong> {example.input}</div>
                        <div><strong>Output:</strong> {example.output}</div>
                        {example.explanation && (
                          <div><strong>Explanation:</strong> {example.explanation}</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Constraints:</h3>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    {problem.constraints?.map((constraint: string, index: number) => (
                      <li key={index}>• {constraint}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Resizer */}
        <div 
          className="w-1 bg-gray-200 dark:bg-gray-600 cursor-col-resize hover:bg-orange-400 transition-colors"
          onMouseDown={(e) => {
            const startX = e.clientX
            const startWidth = leftPanelWidth
            
            const handleMouseMove = (e: MouseEvent) => {
              const deltaX = e.clientX - startX
              const containerWidth = window.innerWidth
              const newWidth = startWidth + (deltaX / containerWidth) * 100
              setLeftPanelWidth(Math.max(20, Math.min(80, newWidth)))
            }
            
            const handleMouseUp = () => {
              document.removeEventListener('mousemove', handleMouseMove)
              document.removeEventListener('mouseup', handleMouseUp)
            }
            
            document.addEventListener('mousemove', handleMouseMove)
            document.addEventListener('mouseup', handleMouseUp)
          }}
        />
        
        {/* Code Editor Panel */}
        <div 
          className="flex flex-col"
          style={{ width: `${100 - leftPanelWidth}%` }}
        >
          {/* Editor Header */}
          <div className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <select
                  value={selectedLanguage}
                  onChange={(e) => {
                    setSelectedLanguage(e.target.value)
                    localStorage.setItem(`language-${params.id}`, e.target.value)
                  }}
                  className="px-3 py-1.5 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  {languages.map(lang => (
                    <option key={lang.id} value={lang.id}>{lang.name}</option>
                  ))}
                </select>
                <button
                  onClick={copyCode}
                  className="flex items-center space-x-1 px-2 py-1 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleReset}
                  className="flex items-center space-x-1 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>Reset</span>
                </button>
                <button
                  onClick={handleRun}
                  disabled={isRunning}
                  className="flex items-center space-x-1 px-4 py-1.5 text-sm bg-orange-500 hover:bg-orange-600 disabled:bg-orange-400 text-white rounded-md font-medium"
                >
                  <Play className="h-3 w-3" />
                  <span>{isRunning ? 'Running...' : 'Run'}</span>
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-4 py-1.5 text-sm bg-green-600 hover:bg-green-700 disabled:bg-green-500 text-white rounded-md font-medium"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </div>
          </div>

          {/* Code Editor */}
          <div 
            className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 m-2"
            style={{ height: `calc(50vh - 80px)` }}
          >
            <Editor
              height="100%"
              language={selectedLanguage === 'cpp' ? 'cpp' : selectedLanguage}
              value={code}
              onChange={(value) => setCode(value || '')}
              onMount={(editor) => {/* editor ready */}}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                roundedSelection: false,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                wordWrap: 'on',
                tabSize: 2,
                insertSpaces: true,
                quickSuggestions: false,
                suggestOnTriggerCharacters: false,
                acceptSuggestionOnEnter: 'off',
                tabCompletion: 'off',
                wordBasedSuggestions: 'off',
                parameterHints: { enabled: false },
                snippetSuggestions: 'none',
              }}
            />
          </div>
          
          {/* Horizontal Resizer */}
          <div 
            className="h-1 bg-gray-200 dark:bg-gray-600 cursor-row-resize hover:bg-orange-400 transition-colors mx-2"
            onMouseDown={(e) => {
              const startY = e.clientY
              const startHeight = consoleHeight
              
              const handleMouseMove = (e: MouseEvent) => {
                const deltaY = startY - e.clientY
                const newHeight = startHeight + deltaY
                setConsoleHeight(Math.max(150, Math.min(400, newHeight)))
              }
              
              const handleMouseUp = () => {
                document.removeEventListener('mousemove', handleMouseMove)
                document.removeEventListener('mouseup', handleMouseUp)
              }
              
              document.addEventListener('mousemove', handleMouseMove)
              document.addEventListener('mouseup', handleMouseUp)
            }}
          />
          
          {/* Test Cases Panel */}
          <div 
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden m-2"
            style={{ height: `${consoleHeight}px` }}
          >
            <div className="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setActiveTab('testcase')}
                  className={`px-3 py-1 text-sm font-medium rounded ${
                    activeTab === 'testcase'
                      ? 'bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                  }`}
                >
                  Testcase
                </button>
                <button
                  onClick={() => setActiveTab('result')}
                  className={`px-3 py-1 text-sm font-medium rounded ${
                    activeTab === 'result'
                      ? 'bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                  }`}
                >
                  Result
                </button>
              </div>
              <button
                onClick={addCustomCase}
                className="flex items-center space-x-1 px-2 py-1 text-xs text-gray-500 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 border border-dashed border-gray-300 dark:border-gray-600 rounded"
              >
                <Plus className="h-3 w-3" />
                <span>Add Case</span>
              </button>
            </div>

            <div className="h-full overflow-y-auto p-4" style={{ height: 'calc(100% - 45px)', minHeight: '250px' }}>
              {activeTab === 'testcase' ? (
                <div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {problem.examples?.map((_: any, index: number) => (
                      <button
                        key={index}
                        onClick={() => setSelectedCase(index)}
                        className={`px-3 py-1 text-sm rounded ${
                          selectedCase === index
                            ? 'bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        Case {index + 1}
                      </button>
                    ))}
                    {customCases.map((_, index: number) => (
                      <div key={`custom-${index}`} className="flex items-center">
                        <button
                          onClick={() => setSelectedCase((problem.examples?.length || 0) + index)}
                          className={`px-3 py-1 text-sm rounded-l ${
                            selectedCase === (problem.examples?.length || 0) + index
                              ? 'bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                          }`}
                        >
                          Custom {index + 1}
                        </button>
                        <button
                          onClick={() => removeCustomCase(index)}
                          className="px-1 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-400 hover:text-red-500 rounded-r border-l border-gray-200 dark:border-gray-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Built-in example case */}
                  {selectedCase < (problem.examples?.length || 0) && problem.examples?.[selectedCase] && (
                    <div className="space-y-3">
                      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded border border-gray-200 dark:border-gray-600">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-medium">Input</div>
                        <div className="bg-white dark:bg-gray-800 p-2 rounded border font-mono text-sm text-gray-800 dark:text-gray-200">
                          {problem.examples[selectedCase].input}
                        </div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded border border-gray-200 dark:border-gray-600">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-medium">Expected Output</div>
                        <div className="bg-white dark:bg-gray-800 p-2 rounded border font-mono text-sm text-gray-800 dark:text-gray-200">
                          {problem.examples[selectedCase].output}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Custom case — editable */}
                  {selectedCase >= (problem.examples?.length || 0) && (() => {
                    const ci = selectedCase - (problem.examples?.length || 0)
                    const cc = customCases[ci]
                    if (!cc) return null
                    return (
                      <div className="space-y-3">
                        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded border border-gray-200 dark:border-gray-600">
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-medium">Input</div>
                          <textarea
                            value={cc.input}
                            onChange={e => setCustomCases(prev => prev.map((c, i) => i === ci ? { ...c, input: e.target.value } : c))}
                            className="w-full bg-white dark:bg-gray-800 p-2 rounded border font-mono text-sm text-gray-800 dark:text-gray-200 resize-none focus:outline-none focus:ring-1 focus:ring-orange-500"
                            rows={2}
                            placeholder="e.g. nums = [2,7,11,15], target = 9"
                          />
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded border border-gray-200 dark:border-gray-600">
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-medium">Expected Output (optional)</div>
                          <textarea
                            value={cc.output}
                            onChange={e => setCustomCases(prev => prev.map((c, i) => i === ci ? { ...c, output: e.target.value } : c))}
                            className="w-full bg-white dark:bg-gray-800 p-2 rounded border font-mono text-sm text-gray-800 dark:text-gray-200 resize-none focus:outline-none focus:ring-1 focus:ring-orange-500"
                            rows={1}
                            placeholder="e.g. [0,1]"
                          />
                        </div>
                      </div>
                    )
                  })()}
                </div>
              ) : (
                <div>
                  {runResults.length === 0 ? (
                    <div className="text-sm text-gray-500 dark:text-gray-400">Run your code to see results here...</div>
                  ) : (
                    <div className="space-y-3">
                      {runResults.map((tc: any, i: number) => (
                        <div
                          key={i}
                          className={`rounded-lg border-l-4 overflow-hidden ${
                            tc.error && !tc.passed
                              ? 'border-red-500'
                              : tc.passed
                              ? 'border-green-500'
                              : tc.custom
                              ? 'border-blue-400'
                              : 'border-red-500'
                          }`}
                        >
                          <div className={`flex items-center justify-between px-3 py-2 text-sm font-medium ${
                            tc.error && !tc.passed
                              ? 'bg-red-50 dark:bg-red-900/10 text-red-700 dark:text-red-400'
                              : tc.passed
                              ? 'bg-green-50 dark:bg-green-900/10 text-green-700 dark:text-green-400'
                              : tc.custom
                              ? 'bg-blue-50 dark:bg-blue-900/10 text-blue-700 dark:text-blue-400'
                              : 'bg-red-50 dark:bg-red-900/10 text-red-700 dark:text-red-400'
                          }`}>
                            <div className="flex items-center space-x-2">
                              {tc.passed
                                ? <CheckCircle2 className="h-4 w-4" />
                                : <XCircle className="h-4 w-4" />}
                              <span>{tc.custom ? `Custom ${i - (problem.examples?.length || 0) + 1}` : `Case ${tc.testCase}`}</span>
                              {tc.passed && <span className="text-xs font-normal opacity-75">Accepted</span>}
                              {!tc.passed && !tc.custom && !tc.error && <span className="text-xs font-normal opacity-75">Wrong Answer</span>}
                              {tc.error && <span className="text-xs font-normal opacity-75">Runtime Error</span>}
                            </div>
                            <span className="text-xs font-normal opacity-60">{tc.time?.toFixed(0)}ms · {tc.memory}KB</span>
                          </div>
                          <div className="px-3 py-2 bg-white dark:bg-gray-800 font-mono text-xs space-y-1.5 text-gray-700 dark:text-gray-300">
                            {tc.input && <div><span className="text-gray-400">Input: </span>{tc.input}</div>}
                            {!tc.custom && tc.expected && <div><span className="text-gray-400">Expected: </span>{tc.expected}</div>}
                            <div><span className={tc.passed ? 'text-green-500' : 'text-red-400'}>Output: </span>{tc.output || 'No output'}</div>
                            {tc.error && <div className="text-red-400 whitespace-pre-wrap">{tc.error}</div>}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}