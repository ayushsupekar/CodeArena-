'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Trash2, Save, ChevronLeft } from 'lucide-react'

const DIFFICULTIES = ['Easy', 'Medium', 'Hard']
const CATEGORIES = ['Array', 'String', 'Linked List', 'Tree', 'Graph', 'Dynamic Programming', 'Stack', 'Heap', 'Two Pointers', 'Backtracking', 'Math', 'Bit Manipulation', 'Design', 'Trie']

type Example = { input: string; output: string; explanation: string }
type TestCase = { input: string; expectedOutput: string; isHidden: boolean }
type Templates = { javascript: string; python: string; java: string; cpp: string }

export default function NewProblemPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  const [id, setId] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [difficulty, setDifficulty] = useState('Medium')
  const [category, setCategory] = useState('Array')
  const [constraints, setConstraints] = useState<string[]>([''])
  const [examples, setExamples] = useState<Example[]>([{ input: '', output: '', explanation: '' }])
  const [testCases, setTestCases] = useState<TestCase[]>([{ input: '', expectedOutput: '', isHidden: false }])
  const [templates, setTemplates] = useState<Templates>({
    javascript: 'function solution() {\n    // Write your code here\n    \n}',
    python: 'def solution():\n    # Write your code here\n    pass',
    java: 'class Solution {\n    public void solution() {\n        // Write your code here\n        \n    }\n}',
    cpp: 'class Solution {\npublic:\n    void solution() {\n        // Write your code here\n        \n    }\n};',
  })
  const [timeLimit, setTimeLimit] = useState(2000)
  const [memoryLimit, setMemoryLimit] = useState(256)

  const handleSave = async () => {
    setError('')
    if (!title.trim() || !description.trim()) {
      setError('Title and description are required')
      return
    }
    setSaving(true)
    try {
      const res = await fetch('/api/admin/problems', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...(id.trim() ? { id: id.trim() } : {}),
          title: title.trim(),
          description: description.trim(),
          difficulty,
          category,
          examples: examples.filter(e => e.input || e.output),
          constraints: constraints.filter(c => c.trim()),
          templates,
          testCases: testCases.filter(t => t.input || t.expectedOutput),
          timeLimit,
          memoryLimit,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to save')
      setSaved(true)
      setTimeout(() => router.push(`/problems/${data.problem.id}`), 1000)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setSaving(false)
    }
  }

  const inputCls = 'w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500'
  const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
  const sectionCls = 'bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-4'

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-16">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center space-x-3">
          <button onClick={() => router.back()} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">Add New Problem</h1>
        </div>
        <div className="flex items-center space-x-3">
          {error && <span className="text-sm text-red-500">{error}</span>}
          {saved && <span className="text-sm text-green-500">Saved! Redirecting...</span>}
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center space-x-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-400 text-white rounded-lg text-sm font-medium"
          >
            <Save className="h-4 w-4" />
            <span>{saving ? 'Saving...' : 'Save Problem'}</span>
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">

        {/* Basic Info */}
        <div className={sectionCls}>
          <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">Basic Info</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Problem ID <span className="text-gray-400 font-normal">(optional — auto-generated if blank)</span></label>
              <input value={id} onChange={e => setId(e.target.value)} placeholder="e.g. 500" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Title *</label>
              <input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Two Sum" className={inputCls} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Difficulty</label>
              <select value={difficulty} onChange={e => setDifficulty(e.target.value)} className={inputCls}>
                {DIFFICULTIES.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Category</label>
              <select value={category} onChange={e => setCategory(e.target.value)} className={inputCls}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Time Limit (ms)</label>
              <input type="number" value={timeLimit} onChange={e => setTimeLimit(Number(e.target.value))} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Memory Limit (MB)</label>
              <input type="number" value={memoryLimit} onChange={e => setMemoryLimit(Number(e.target.value))} className={inputCls} />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className={sectionCls}>
          <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">Description *</h2>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={8}
            placeholder="Write the full problem description here..."
            className={`${inputCls} resize-y font-mono`}
          />
        </div>

        {/* Examples */}
        <div className={sectionCls}>
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">Examples</h2>
            <button onClick={() => setExamples(p => [...p, { input: '', output: '', explanation: '' }])} className="flex items-center space-x-1 text-sm text-orange-500 hover:text-orange-600">
              <Plus className="h-4 w-4" /><span>Add Example</span>
            </button>
          </div>
          {examples.map((ex, i) => (
            <div key={i} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Example {i + 1}</span>
                {examples.length > 1 && (
                  <button onClick={() => setExamples(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Input</label>
                  <textarea rows={2} value={ex.input} onChange={e => setExamples(p => p.map((x, j) => j === i ? { ...x, input: e.target.value } : x))} placeholder='e.g. nums = [2,7,11,15], target = 9' className={`${inputCls} resize-none font-mono`} />
                </div>
                <div>
                  <label className={labelCls}>Output</label>
                  <textarea rows={2} value={ex.output} onChange={e => setExamples(p => p.map((x, j) => j === i ? { ...x, output: e.target.value } : x))} placeholder='e.g. [0,1]' className={`${inputCls} resize-none font-mono`} />
                </div>
              </div>
              <div>
                <label className={labelCls}>Explanation (optional)</label>
                <input value={ex.explanation} onChange={e => setExamples(p => p.map((x, j) => j === i ? { ...x, explanation: e.target.value } : x))} placeholder='Because nums[0] + nums[1] == 9...' className={inputCls} />
              </div>
            </div>
          ))}
        </div>

        {/* Constraints */}
        <div className={sectionCls}>
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">Constraints</h2>
            <button onClick={() => setConstraints(p => [...p, ''])} className="flex items-center space-x-1 text-sm text-orange-500 hover:text-orange-600">
              <Plus className="h-4 w-4" /><span>Add</span>
            </button>
          </div>
          {constraints.map((c, i) => (
            <div key={i} className="flex items-center space-x-2">
              <input value={c} onChange={e => setConstraints(p => p.map((x, j) => j === i ? e.target.value : x))} placeholder='e.g. 2 ≤ nums.length ≤ 10⁴' className={inputCls} />
              {constraints.length > 1 && (
                <button onClick={() => setConstraints(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600 shrink-0">
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Test Cases */}
        <div className={sectionCls}>
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">Test Cases</h2>
            <button onClick={() => setTestCases(p => [...p, { input: '', expectedOutput: '', isHidden: false }])} className="flex items-center space-x-1 text-sm text-orange-500 hover:text-orange-600">
              <Plus className="h-4 w-4" /><span>Add Test Case</span>
            </button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">These are used when running/submitting code. Hidden test cases are not shown to users.</p>
          {testCases.map((tc, i) => (
            <div key={i} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Test Case {i + 1}</span>
                  <label className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400 cursor-pointer">
                    <input type="checkbox" checked={tc.isHidden} onChange={e => setTestCases(p => p.map((x, j) => j === i ? { ...x, isHidden: e.target.checked } : x))} className="rounded" />
                    <span>Hidden</span>
                  </label>
                </div>
                {testCases.length > 1 && (
                  <button onClick={() => setTestCases(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Input</label>
                  <textarea rows={2} value={tc.input} onChange={e => setTestCases(p => p.map((x, j) => j === i ? { ...x, input: e.target.value } : x))} placeholder='e.g. nums = [2,7,11,15], target = 9' className={`${inputCls} resize-none font-mono`} />
                </div>
                <div>
                  <label className={labelCls}>Expected Output</label>
                  <textarea rows={2} value={tc.expectedOutput} onChange={e => setTestCases(p => p.map((x, j) => j === i ? { ...x, expectedOutput: e.target.value } : x))} placeholder='e.g. [0,1]' className={`${inputCls} resize-none font-mono`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Code Templates */}
        <div className={sectionCls}>
          <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">Code Templates</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">Starter code shown to users in the editor for each language.</p>
          {(['javascript', 'python', 'java', 'cpp'] as const).map(lang => (
            <div key={lang}>
              <label className={labelCls}>{lang === 'cpp' ? 'C++' : lang.charAt(0).toUpperCase() + lang.slice(1)}</label>
              <textarea
                rows={6}
                value={templates[lang]}
                onChange={e => setTemplates(p => ({ ...p, [lang]: e.target.value }))}
                className={`${inputCls} resize-y font-mono text-xs`}
              />
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
