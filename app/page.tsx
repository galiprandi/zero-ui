'use client'

import { useChat } from '@ai-sdk/react'
import { useState, useRef, useEffect } from 'react'

import MessageText from './components/MessageText'
import ToolDetails from './components/ToolDetails'
import useNavClick from './hooks/useNavClick'

export default function Chat() {
  const [input, setInput] = useState('')
  const { messages, sendMessage } = useChat()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const lastScrollRef = useRef(Date.now())
  const navRef = useNavClick(sendMessage)
  const messagesLengthRef = useRef(messages.length)
  const [navRemoved, setNavRemoved] = useState(false)

  useEffect(() => {
    const now = Date.now()
    if (now - lastScrollRef.current > 5000) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
      lastScrollRef.current = now
    }
  }, [messages])

  useEffect(() => {
    if (messages.length > messagesLengthRef.current) {
      setNavRemoved(false)
    }
    messagesLengthRef.current = messages.length
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
                      navRemoved={navRemoved}
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
          // Remove generated navs before sending
          document.querySelectorAll('.user-options').forEach(nav => {
            if (nav !== navRef.current) nav.remove()
          })
          setNavRemoved(true)
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
