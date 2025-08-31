import React from 'react'

interface QuickRepliesProps {
  replies: string[]
  onSelect: (reply: string) => void
  onDismiss: () => void
}

export default function QuickReplies({ replies, onSelect, onDismiss }: QuickRepliesProps) {
  if (!replies || replies.length === 0) return null

  return (
    <div className="fixed bottom-16 left-1/2 transform -translate-x-1/2 w-4/5 max-w-[1120px] z-10">
      <div className="quick-replies bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded-lg shadow-lg p-3 mb-2">
        <div className="flex flex-wrap gap-2 justify-center">
          {replies.map((reply, index) => (
            <button
              key={index}
              onClick={() => onSelect(reply)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-all duration-200 hover:shadow-md active:scale-95 whitespace-nowrap"
            >
              {reply}
            </button>
          ))}
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onDismiss()
            }}
            className="px-3 py-2 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-lg shadow-sm transition-all duration-200 hover:shadow-md active:scale-95 ml-2"
            title="Dismiss options"
            type="button"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  )
}
