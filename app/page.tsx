'use client'

import { useChat } from '@ai-sdk/react'
import { useState, useRef, useEffect } from 'react'

import MessageText from './components/MessageText'
import ToolDetails from './components/ToolDetails'

export default function Chat() {
  const [input, setInput] = useState('')
  const { messages, sendMessage } = useChat()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const lastScrollRef = useRef(Date.now())

  useEffect(() => {
    const now = Date.now()
    if (now - lastScrollRef.current > 5000) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
      lastScrollRef.current = now
    }
  }, [messages])

  return (
    <div className="flex flex-col w-4/5 max-w-[1120px] mx-auto stretch h-screen">
      {messages.map(message => (
        <div key={message.id} className="whitespace-pre-wrap">
          {message.parts.map((part, i) => {
            const isTool = 'toolCallId' in part
            const partId = `${message.id}-${i}`
            if (isTool)
              return <ToolDetails part={part} id={`${message.id}-${i}`} />
            else
              switch (part.type) {
                case 'text':
                  return (
                    <MessageText
                      key={partId}
                      role={message.role}
                      text={part.text}
                      id={partId}
                    />
                  )
                default:
                  return null
              }
          })}
        </div>
      ))}

      <div ref={messagesEndRef} className="h-[calc(100vh-6em)]" />

      <form
        onSubmit={e => {
          e.preventDefault()
          sendMessage({ text: input })
          setInput('')
        }}
      >
        <input
          className="fixed dark:bg-zinc-900 bottom-0 w-4/5 max-w-[1120px] p-2 mb-8 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl left-1/2 transform -translate-x-1/2"
          value={input}
          placeholder="Say something..."
          onChange={e => setInput(e.currentTarget.value)}
        />
      </form>
    </div>
  )
}
