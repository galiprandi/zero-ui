import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism'

interface ToolDetailsProps {
  part: any
  id: string
}

export default function ToolDetails({ part, id }: ToolDetailsProps) {
  let code = ''
  let language = 'javascript'
  if (part.type === 'code' && part.code) {
    code = part.code
    language = part.language || 'javascript'
  } else {
    code = JSON.stringify(part, null, 2)
    language = 'json'
  }
  return (
    <div className="text-right flex justify-end opacity-50">
      <details>
        <summary>{part.type} 🧰</summary>
        <SyntaxHighlighter
          language={language}
          style={oneLight}
          customStyle={{ fontSize: 14, borderRadius: 8, padding: 16 }}
        >
          {code}
        </SyntaxHighlighter>
      </details>
    </div>
  )
}
