'use client'

import { useEffect, useRef } from 'react'

interface SyntaxHighlighterProps {
  code: string
  language: string
  onChange: (code: string) => void
}

export default function SyntaxHighlighter({ code, language, onChange }: SyntaxHighlighterProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const highlightRef = useRef<HTMLPreElement>(null)

  const highlightCode = (code: string) => {
    return code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/(\/\/.*$)/gm, '<span class="comment">$1</span>')
      .replace(/(#.*$)/gm, '<span class="comment">$1</span>')
      .replace(/(".*?")/g, '<span class="string">$1</span>')
      .replace(/('.*?')/g, '<span class="string">$1</span>')
      .replace(/\b(function|const|let|var|if|else|for|while|return|class|def|public|private|int|void|vector|string|boolean)\b/g, '<span class="keyword">$1</span>')
      .replace(/\b(\d+)\b/g, '<span class="number">$1</span>')
      .replace(/([{}[\]()])/g, '<span class="bracket">$1</span>')
  }

  useEffect(() => {
    if (highlightRef.current) {
      highlightRef.current.innerHTML = highlightCode(code)
    }
  }, [code])

  const handleScroll = () => {
    if (textareaRef.current && highlightRef.current) {
      highlightRef.current.scrollTop = textareaRef.current.scrollTop
      highlightRef.current.scrollLeft = textareaRef.current.scrollLeft
    }
  }

  return (
    <div className="relative w-full h-full">
      <style jsx>{`
        .comment { color: #00ff88; font-style: italic; }
        .string { color: #ffa500; }
        .keyword { color: #569cd6; }
        .number { color: #b5cea8; }
        .bracket { color: #da70d6; }
        .highlight-bg { color: #ffffff; }
      `}</style>
      
      <pre
        ref={highlightRef}
        className="absolute inset-0 p-4 font-mono text-sm pointer-events-none overflow-auto highlight-bg"
        style={{ background: '#1e1e1e', margin: 0 }}
      />
      
      <textarea
        ref={textareaRef}
        value={code}
        onChange={(e) => onChange(e.target.value)}
        onScroll={handleScroll}
        className="absolute inset-0 w-full h-full p-4 font-mono text-sm bg-transparent text-transparent caret-white border-none outline-none resize-none z-10"
        placeholder="Write your code here..."
        spellCheck={false}
      />
    </div>
  )
}