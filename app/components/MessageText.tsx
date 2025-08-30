import React from 'react'

interface MessageTextProps {
  text: string
  id: string
}

export default function MessageText({ text, id }: MessageTextProps) {
  return <div key={id}>{text}</div>
}
