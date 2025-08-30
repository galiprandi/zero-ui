import React from 'react'

interface ToolDetailsProps {
  part: any
  id: string
}

export default function ToolDetails({ part, id }: ToolDetailsProps) {
  return (
    <div className="text-right flex justify-end opacity-50">
      <details>
        <summary>{part.type} 🧰</summary>
        <pre key={id}>{JSON.stringify(part, null, 2)}</pre>
      </details>
    </div>
  )
}
