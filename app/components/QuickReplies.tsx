import React from 'react'

interface QuickRepliesProps {
  replies: string[]
  onSelect: (reply: string) => void
  onDismiss: () => void
}

export default function QuickReplies({ replies, onSelect, onDismiss }: QuickRepliesProps) {
  if (!replies || replies.length === 0) return null

  return (
    <div className="fixed bottom-16 left-1/2 transform -translate-x-1/2 w-4/5 max-w-[1120px] z-10 mb-8">
      <div className="quick-replies flex gap-2 overflow-x-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onDismiss()
          }}
          className="quick-reply-btn flex-shrink-0 px-3 py-1.5 text-sm font-medium text-gray-400 bg-gray-800 hover:bg-gray-700 active:bg-gray-600 rounded-full border border-gray-700 hover:border-gray-600 transition-all duration-200 whitespace-nowrap shadow-sm"
          type="button"
          title="Dismiss options"
        >
          ✕
        </button>
        {replies.map((reply, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onSelect(reply)
            }}
            className="quick-reply-btn flex-shrink-0 px-3 py-1.5 text-sm font-medium text-gray-200 bg-gray-700 hover:bg-gray-600 active:bg-gray-500 rounded-full border border-gray-600 hover:border-gray-500 transition-all duration-200 whitespace-nowrap shadow-sm"
            type="button"
          >
            {reply}
          </button>
        ))}
      </div>
    </div>
  )
}
