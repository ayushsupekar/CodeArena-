'use client'

/**
 * OutputConsole — displays Judge0 execution result
 * Shows: stdout, stderr, compile_output, status, time, memory
 */

import { CheckCircle, XCircle, Clock, Cpu, AlertTriangle } from 'lucide-react'

const STATUS_COLORS = {
  3: 'text-green-400',   // Accepted
  6: 'text-red-400',     // Compilation Error
  11: 'text-red-400',    // Runtime Error
  5: 'text-yellow-400',  // Time Limit Exceeded
}

export default function OutputConsole({ result, loading }) {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400 text-sm gap-2">
        <span className="animate-pulse">⏳ Executing code...</span>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 text-sm">
        Click <span className="mx-1 text-green-400 font-semibold">Run</span> to execute your code
      </div>
    )
  }

  const isAccepted = result.status?.id === 3
  const statusColor = STATUS_COLORS[result.status?.id] || 'text-yellow-400'
  const StatusIcon = isAccepted ? CheckCircle : XCircle

  return (
    <div className="h-full overflow-y-auto p-4 space-y-4 font-mono text-sm">

      {/* Status bar */}
      <div className="flex flex-wrap items-center gap-4 pb-3 border-b border-gray-700">
        <span className={`flex items-center gap-1.5 font-semibold ${statusColor}`}>
          <StatusIcon className="h-4 w-4" />
          {result.status?.description || 'Unknown'}
        </span>
        {result.time && (
          <span className="flex items-center gap-1 text-gray-400 text-xs">
            <Clock className="h-3 w-3" /> {result.time}s
          </span>
        )}
        {result.memory && (
          <span className="flex items-center gap-1 text-gray-400 text-xs">
            <Cpu className="h-3 w-3" /> {(result.memory / 1024).toFixed(1)} MB
          </span>
        )}
      </div>

      {/* stdout */}
      {result.stdout && (
        <div>
          <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Output</div>
          <pre className="bg-gray-900 rounded p-3 text-green-300 whitespace-pre-wrap break-words">
            {result.stdout}
          </pre>
        </div>
      )}

      {/* compile_output */}
      {result.compile_output && (
        <div>
          <div className="text-xs text-yellow-500 uppercase tracking-wide mb-1 flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" /> Compile Error
          </div>
          <pre className="bg-gray-900 rounded p-3 text-yellow-300 whitespace-pre-wrap break-words">
            {result.compile_output}
          </pre>
        </div>
      )}

      {/* stderr */}
      {result.stderr && (
        <div>
          <div className="text-xs text-red-500 uppercase tracking-wide mb-1">Stderr</div>
          <pre className="bg-gray-900 rounded p-3 text-red-300 whitespace-pre-wrap break-words">
            {result.stderr}
          </pre>
        </div>
      )}

      {/* No output at all */}
      {!result.stdout && !result.stderr && !result.compile_output && (
        <div className="text-gray-500 text-xs">No output produced.</div>
      )}
    </div>
  )
}
