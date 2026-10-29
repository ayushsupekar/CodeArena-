'use client'

/**
 * RunButton — triggers code execution, shows spinner while loading
 */

import { Play, Loader2 } from 'lucide-react'

export default function RunButton({ onClick, loading }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="flex items-center gap-2 px-5 py-1.5 bg-green-600 hover:bg-green-700 disabled:bg-green-800 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-md transition-colors"
    >
      {loading
        ? <><Loader2 className="h-4 w-4 animate-spin" /> Running...</>
        : <><Play className="h-4 w-4" /> Run</>
      }
    </button>
  )
}
