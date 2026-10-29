'use client'

/**
 * CodeEditor — Monaco editor wrapper
 */

import { Editor } from '@monaco-editor/react'

const LANGUAGE_MAP = {
  71: 'python',
  63: 'javascript',
  62: 'java',
  54: 'cpp',
  50: 'c',
}

export default function CodeEditor({ value, onChange, languageId }) {
  return (
    <Editor
      height="100%"
      language={LANGUAGE_MAP[languageId] || 'plaintext'}
      value={value}
      onChange={val => onChange(val || '')}
      theme="vs-dark"
      options={{
        fontSize: 14,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        automaticLayout: true,
        wordWrap: 'on',
        tabSize: 4,
        lineNumbers: 'on',
        renderLineHighlight: 'all',
        suggestOnTriggerCharacters: true,
        quickSuggestions: true,
        padding: { top: 12 },
      }}
    />
  )
}
