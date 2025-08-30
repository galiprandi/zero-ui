import React from 'react'

interface MessageRoleProps {
  role: string
}

export default function MessageRole({ role }: MessageRoleProps) {
  return <span>{role === 'user' ? 'User: ' : 'AI: '}</span>
}
