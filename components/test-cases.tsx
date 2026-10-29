'use client'

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

type TestCase = {
  input: string
  expectedOutput: string
  isHidden: boolean
}

type TestCasesProps = {
  testCases: TestCase[]
}

export default function TestCases({ testCases }: TestCasesProps) {
  const [showHidden, setShowHidden] = useState(false)
  
  const visibleCases = testCases.filter(tc => !tc.isHidden)
  const hiddenCases = testCases.filter(tc => tc.isHidden)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Test Cases</h3>
      </div>
      
      <div className="p-4 space-y-4">
        {visibleCases.map((testCase, index) => (
          <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-3">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Example {index + 1}:
            </div>
            <div className="space-y-2">
              <div>
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Input:</span>
                <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded font-mono text-sm text-gray-900 dark:text-white">
                  {testCase.input}
                </div>
              </div>
              <div>
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Output:</span>
                <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded font-mono text-sm text-gray-900 dark:text-white">
                  {testCase.expectedOutput}
                </div>
              </div>
            </div>
          </div>
        ))}

        {hiddenCases.length > 0 && (
          <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
            <button
              onClick={() => setShowHidden(!showHidden)}
              className="flex items-center space-x-2 text-sm text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300"
            >
              {showHidden ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              <span>{showHidden ? 'Hide' : 'Show'} Hidden Test Cases ({hiddenCases.length})</span>
            </button>

            {showHidden && (
              <div className="mt-4 space-y-4">
                {hiddenCases.map((testCase, index) => (
                  <div key={index} className="border border-orange-200 dark:border-orange-800 rounded-lg p-3 bg-orange-50 dark:bg-orange-900/20">
                    <div className="text-sm font-medium text-orange-700 dark:text-orange-300 mb-2">
                      Hidden Test Case {index + 1}:
                    </div>
                    <div className="space-y-2">
                      <div>
                        <span className="text-xs font-medium text-orange-600 dark:text-orange-400">Input:</span>
                        <div className="bg-orange-100 dark:bg-orange-900/40 p-2 rounded font-mono text-sm text-orange-900 dark:text-orange-100">
                          {testCase.input}
                        </div>
                      </div>
                      <div>
                        <span className="text-xs font-medium text-orange-600 dark:text-orange-400">Expected Output:</span>
                        <div className="bg-orange-100 dark:bg-orange-900/40 p-2 rounded font-mono text-sm text-orange-900 dark:text-orange-100">
                          {testCase.expectedOutput}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}