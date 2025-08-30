import React from 'react'

interface MessageTextProps {
  role: string
  text: string
  id: string
}

export default function MessageText({ role, text, id }: MessageTextProps) {
  const isUser = role === 'user'
  return (
    <div
      key={id}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} my-2`}
    >
      {isUser ? (
        <div className="inline-block px-4 py-2 rounded-lg shadow-sm max-w-xs break-words bg-blue-100 text-blue-900">
          <span className="mr-2">👤</span>
          {text}
        </div>
      ) : (
        <span className="mt-4 text-justify">{text}</span>
      )}
    </div>
  )
}
