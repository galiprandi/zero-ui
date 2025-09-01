import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { materialDark as theme } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useEffect, useMemo } from 'react'

interface MessageTextProps {
  role: string
  text: string
  id: string
  onQuickReplies?: (replies: string[]) => void
}

export default function MessageText({ role, text, id, onQuickReplies }: MessageTextProps) {
  const isUser = role === 'user'

  const { displayText, quickReplies } = useMemo(() => {
    if (!isUser && text) {
      try {
        const parsed = JSON.parse(text)
        if (parsed.quick_replies && Array.isArray(parsed.quick_replies)) {
          const messageText = parsed.message || text
          return {
            displayText: messageText,
            quickReplies: parsed.quick_replies
          }
        }
      } catch (e) {
        const jsonMatch = text.match(/\{[\s\S]*"quick_replies"[\s\S]*\}/)
        if (jsonMatch) {
          try {
            const parsed = JSON.parse(jsonMatch[0])
            if (parsed.quick_replies && Array.isArray(parsed.quick_replies)) {
              const messageText = text.replace(jsonMatch[0], '').trim()
              return {
                displayText: messageText || parsed.message || text,
                quickReplies: parsed.quick_replies
              }
            }
          } catch (e2) {
          }
        }
      }
    }
    return {
      displayText: text,
      quickReplies: null
    }
  }, [text, isUser])

  useEffect(() => {
    if (quickReplies && onQuickReplies) {
      onQuickReplies(quickReplies)
    }
  }, [quickReplies, onQuickReplies])

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
      className={`flex ${isUser ? 'justify-end my-2' : 'justify-start my-0'}`}
    >
      {isUser ? (
        <div className="block px-4 py-2 rounded-full shadow-sm break-words bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100 leading-snug">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={components as any} key={text.length}>{text}</ReactMarkdown>
        </div>
      ) : (
        <div className="text-justify w-full leading-snug">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={components as any}>{displayText}</ReactMarkdown>
        </div>
      )}
    </div>
  )
}
