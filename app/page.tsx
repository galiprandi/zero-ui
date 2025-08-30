'use client'

import { useChat } from '@ai-sdk/react'
import { useState } from 'react'

import MessageRole from './components/MessageRole'
import MessageText from './components/MessageText'
import ToolDetails from './components/ToolDetails'

export default function Chat() {
  const [input, setInput] = useState('')
  const { messages, sendMessage } = useChat()
  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
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

      <form
        onSubmit={e => {
          e.preventDefault()
          sendMessage({ text: input })
          setInput('')
        }}
      >
        <input
          className="fixed dark:bg-zinc-900 bottom-0 w-full max-w-md p-2 mb-8 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={e => setInput(e.currentTarget.value)}
        />
      </form>
    </div>
  )
}
