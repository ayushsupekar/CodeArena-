'use client'

import { useState, Suspense } from 'react'
import CodeEditor from '@/components/code-editor'
import { Users, MessageCircle, Video, Share } from 'lucide-react'

const initialCode = `function twoSum(nums, target) {
    // Collaborative solution
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    
    return [];
}`

const initialMessages = [
  { id: 1, user: 'Alice', message: 'Let us use a hash map approach', time: '2:30 PM' },
  { id: 2, user: 'Bob', message: 'Good idea! I will implement the logic', time: '2:31 PM' },
  { id: 3, user: 'You', message: 'I will add the edge cases', time: '2:32 PM' }
]

export default function CollaboratePage() {
  const [code, setCode] = useState(initialCode)
  const [isChatOpen, setIsChatOpen] = useState(true)
  const [messages, setMessages] = useState(initialMessages)
  const [newMessage, setNewMessage] = useState('')

  const handleRun = async () => {
    try {
      // Execute code logic here
      console.log('Running collaborative code...')
    } catch (error) {
      console.error('Error running code:', error)
    }
  }

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        user: 'You',
        message: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }])
      setNewMessage('')
    }
  }

  return (
    <div className="h-screen flex bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 flex flex-col">
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Two Sum - Collaborative Session</h1>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>3 active users</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-1">
                    <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                    <div className="w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                    <div className="w-6 h-6 bg-purple-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                  </div>
                  <span>Alice, Bob, You</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="flex items-center space-x-1 px-3 py-1 text-sm bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded hover:bg-green-200 dark:hover:bg-green-900/30">
                <Video className="h-4 w-4" />
                <span>Video Call</span>
              </button>
              <button className="flex items-center space-x-1 px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded hover:bg-blue-200 dark:hover:bg-blue-900/30">
                <Share className="h-4 w-4" />
                <span>Share</span>
              </button>
              <button 
                onClick={() => setIsChatOpen(!isChatOpen)}
                className="flex items-center space-x-1 px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600">
              
                <MessageCircle className="h-4 w-4" />
                <span>Chat</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <Suspense fallback={<div>Loading editor...</div>}>
            <CodeEditor
              language="javascript"
              value={code}
              onChange={setCode}
              onRun={handleRun}
              isCollaborative={true}
              onToggleChat={() => setIsChatOpen(!isChatOpen)}
            />
          </Suspense>
        </div>
      </div>

      {isChatOpen && (
        <div className="w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">Team Chat</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className="flex flex-col">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{msg.user}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{msg.time}</span>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2 text-sm text-gray-900 dark:text-gray-100">
                  {msg.message}
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-500 dark:placeholder-gray-400"
              />
              <button
                onClick={sendMessage}
                className="btn-primary"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}