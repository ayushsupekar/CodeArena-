'use client'

/**
 * Compiler page — full online compiler
 * Frontend → Express backend → Judge0 Docker
 */

import { useState, useCallback } from 'react'
import { toast } from 'react-hot-toast'
import dynamic from 'next/dynamic'
import LanguageSelector, { LANGUAGES } from '@/components/compiler/LanguageSelector'
import RunButton from '@/components/compiler/RunButton'
import OutputConsole from '@/components/compiler/OutputConsole'
import { runCode } from '@/components/compiler/compilerApi'
import { RotateCcw, Terminal, AlignLeft } from 'lucide-react'

// Load Monaco dynamically (no SSR)
const CodeEditor = dynamic(() => import('@/components/compiler/CodeEditor'), { ssr: false })

export default function CompilerPage() {
  const [languageId, setLanguageId] = useState(71) // Python default
  const [code, setCode] = useState(LANGUAGES.find(l => l.id === 71)?.defaultCode || '')
  const [stdin, setStdin] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  // When language changes, load default code for that language
  const handleLanguageChange = useCallback((id) => {
    setLanguageId(id)
    const lang = LANGUAGES.find(l => l.id === id)
    if (lang) setCode(lang.defaultCode)
    setResult(null)
  }, [])

  const handleRun = async () => {
    if (!code.trim()) {
      toast.error('Please write some code first')
      return
    }

    setLoading(true)
    setResult(null)

    try {
      const data = await runCode(code, languageId, stdin)
      setResult(data)

      if (data.status?.id === 3) {
        toast.success('Accepted ✓')
      } else if (data.status?.id === 6) {
        toast.error('Compilation Error')
      } else {
        toast.error(data.status?.description || 'Runtime Error')
      }
    } catch (err) {
      const msg = err.response?.data?.error || err.message || 'Execution failed'
      toast.error(msg)
      setResult({ status: { id: 0, description: msg }, stdout: null, stderr: msg })
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    const lang = LANGUAGES.find(l => l.id === languageId)
    if (lang) setCode(lang.defaultCode)
    setStdin('')
    setResult(null)
  }

  return (
    <div className="h-screen bg-gray-950 flex flex-col overflow-hidden">

      {/* ── Top bar ── */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-gray-700 shrink-0">
        <div className="flex items-center gap-3">
          <Terminal className="h-5 w-5 text-orange-500" />
          <span className="text-white font-semibold text-sm">CodeArena Compiler</span>
        </div>
        <div className="flex items-center gap-3">
          <LanguageSelector selected={languageId} onChange={handleLanguageChange} />
          <button
            onClick={handleReset}
            title="Reset code"
            className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <RunButton onClick={handleRun} loading={loading} />
        </div>
      </div>

      {/* ── Main layout ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* Left: Code Editor */}
        <div className="flex flex-col w-1/2 border-r border-gray-700">
          <div className="flex items-center gap-2 px-4 py-1.5 bg-gray-800 border-b border-gray-700 text-xs text-gray-400">
            <AlignLeft className="h-3 w-3" />
            Code Editor
          </div>
          <div className="flex-1 overflow-hidden">
            <CodeEditor value={code} onChange={setCode} languageId={languageId} />
          </div>
        </div>

        {/* Right: stdin + output */}
        <div className="flex flex-col w-1/2">

          {/* stdin */}
          <div className="shrink-0 border-b border-gray-700">
            <div className="px-4 py-1.5 bg-gray-800 text-xs text-gray-400 border-b border-gray-700">
              stdin (optional input)
            </div>
            <textarea
              value={stdin}
              onChange={e => setStdin(e.target.value)}
              placeholder="Enter input for your program here..."
              className="w-full h-28 bg-gray-950 text-gray-200 text-sm font-mono px-4 py-3 resize-none focus:outline-none placeholder-gray-600"
            />
          </div>

          {/* Output */}
          <div className="flex flex-col flex-1 overflow-hidden">
            <div className="px-4 py-1.5 bg-gray-800 border-b border-gray-700 text-xs text-gray-400 shrink-0">
              Output
            </div>
            <div className="flex-1 overflow-hidden bg-gray-950">
              <OutputConsole result={result} loading={loading} />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
