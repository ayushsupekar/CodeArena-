'use client'

import { Editor } from '@monaco-editor/react'
import { useState } from 'react'
import { Play, Users, MessageCircle } from 'lucide-react'
import { Language } from '@/lib/types'

interface CodeEditorProps {
  language: Language
  value: string
  onChange: (value: string) => void
  onRun: () => void
  isCollaborative?: boolean
  onToggleChat?: () => void
}

const languageMap = {
  javascript: 'javascript',
  python: 'python',
  java: 'java',
  cpp: 'cpp',
  c: 'c',
  go: 'go',
  rust: 'rust'
} as const

const editorOptions = {
  minimap: { enabled: false },
  fontSize: 12,
  lineNumbers: 'on' as const,
  roundedSelection: false,
  scrollBeyondLastLine: false,
  automaticLayout: true,
} as const

export default function CodeEditor({ 
  language, 
  value, 
  onChange, 
  onRun, 
  isCollaborative = false,
  onToggleChat 
}: CodeEditorProps) {
  const [isRunning, setIsRunning] = useState(false)

  const handleRun = async () => {
    setIsRunning(true)
    try {
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: value, language, input: '' })
      })
      const result = await response.json()
      
      // Display actual execution result
      const outputElement = document.querySelector('.execution-output')
      if (outputElement) {
        outputElement.textContent = `Status: ${result.status}\nOutput: ${result.output}\nTime: ${result.time || 'N/A'}ms\nMemory: ${result.memory || 'N/A'}KB`
      }
    } catch (error) {
      console.error('Execution error:', error)
    }
    await onRun()
    setIsRunning(false)
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
        <select 
          value={language}
          className="px-3 py-1 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded"
          disabled
        >
          <option value={language}>{language.toUpperCase()}</option>
        </select>
        
        <div className="flex items-center space-x-2">
          {isCollaborative && (
            <>
              <button className="flex items-center space-x-1 px-3 py-1 text-sm bg-green-100 text-green-700 rounded">
                <Users className="h-4 w-4" />
                <span>2 users</span>
              </button>
              <button 
                onClick={onToggleChat}
                className="flex items-center space-x-1 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Chat</span>
              </button>
            </>
          )}
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center space-x-1 btn-primary disabled:opacity-50"
          >
            <Play className="h-4 w-4" />
            <span>{isRunning ? 'Running...' : 'Run'}</span>
          </button>
        </div>
      </div>
      
      <div className="flex-1">
        <Editor
          height="100%"
          language={languageMap[language]}
          value={value}
          onChange={(val) => onChange(val || '')}
          theme="vs-dark"
          options={editorOptions}
        />
      </div>
    </div>
  )
}