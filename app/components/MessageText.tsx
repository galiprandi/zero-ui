import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { materialDark as theme } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface MessageTextProps {
  role: string
  text: string
  id: string
}

export default function MessageText({ role, text, id }: MessageTextProps) {
  const isUser = role === 'user'
  const components = {
    code: ({ inline, className, children, ...props }: { inline?: boolean; className?: string; children?: React.ReactNode;[key: string]: any }) => {
      const match = /language-(\w+)/.exec(className || '')
      if (inline)
        return <code className={className} {...props}>{children}</code>
      else if (match && match[1] === 'markdown')
        return <ReactMarkdown remarkPlugins={[remarkGfm]}>{String(children).replace(/^\s+/, '').replace(/\n$/, '')}</ReactMarkdown>
      else
        return <SyntaxHighlighter style={theme} wrapLongLines={true} language={match ? match[1] : undefined}>{String(children).replace(/^\s+/, '').replace(/\n$/, '')}</SyntaxHighlighter>
    },
    p: ({ children }: { children?: React.ReactNode }) => <div>{children}</div>,

  }
  return (
    <div
      key={id}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} my-2`}
    >
      {isUser ? (
        <div className="block px-4 py-2 rounded-lg shadow-sm break-words bg-blue-100 text-blue-900 leading-snug">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={components as any} key={text.length}>{text}</ReactMarkdown>
        </div>
      ) : (
        <div className="mt-4 text-justify w-full leading-snug">
          <div style={{display: 'none'}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2 bg-green-500 hover:bg-green-700"></div>
          {(() => {
            const navRegex = /(&lt;nav className="user-options"[\s\S]*?&lt;\/nav&gt;)/
            const parts = text.split(navRegex)
            return parts.map((part, index) => {
              if (navRegex.test(part)) {
                const unescaped = part.replace(/&lt;/g, '<').replace(/&gt;/g, '>')
                return <div key={index} dangerouslySetInnerHTML={{ __html: unescaped }} />
              } else {
                return <ReactMarkdown key={index} remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={components as any}>{part}</ReactMarkdown>
              }
            })
          })()}
        </div>
      )}
    </div>
  )
}
