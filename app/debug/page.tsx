'use client'

export default function DebugPage() {
  const clearStorage = () => {
    localStorage.clear()
    alert('Storage cleared')
  }

  return (
    <div className="p-8">
      <button onClick={clearStorage} className="bg-red-500 text-white p-2">
        Clear All Storage
      </button>
    </div>
  )
}