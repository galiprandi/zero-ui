"use client";

import { useChat } from "@ai-sdk/react";
import { useState, useRef, useEffect } from "react";
import React from "react";

import MessageText from "./components/MessageText";
import ToolDetails from "./components/ToolDetails";
import QuickReplies from "./components/QuickReplies";

export default function Chat() {
  const [input, setInput] = useState("");
  const { messages, sendMessage } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastScrollRef = useRef(Date.now());
  const messagesLengthRef = useRef(messages.length);
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const [quickReplies, setQuickReplies] = useState<string[]>([]);

  // Load initial quick replies on component mount
  useEffect(() => {
    const initialOptions = ["🍽️ ¿Qué puedo cenar?", "🥞 ¿Desayuno saludable?"];
    setQuickReplies(initialOptions);
  }, []);

  const handleQuickReplies = React.useCallback((replies: string[]) => {
    setQuickReplies(replies);
  }, []);

  const handleQuickReplySelect = React.useCallback(
    (reply: string) => {
      sendMessage({ text: reply });
      setQuickReplies([]);
      setInput("");
    },
    [sendMessage],
  );

  useEffect(() => {
    const now = Date.now()
    // Clear quick replies when new message arrives
    if (messages.length > messagesLengthRef.current) {
      setQuickReplies([])
    }
    if (now - lastScrollRef.current > 5000) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
      lastScrollRef.current = now
    }
    messagesLengthRef.current = messages.length
  }, [messages.length])

  useEffect(() => {
    const vv = window.visualViewport
    if (vv) {
      const handleResize = () => {
        const viewport = window.visualViewport;
        if (viewport) {
          const heightDiff = window.innerHeight - viewport.height;
          setKeyboardOffset(heightDiff);
        }
      };
      vv.addEventListener("resize", handleResize);
      return () => vv.removeEventListener("resize", handleResize);
    }
  }, []);

  return (
    <div
      className="flex flex-col w-4/5 max-w-[1120px] mx-auto stretch h-screen"
      style={{
        paddingBottom: `${(quickReplies.length ? 160 : 110) + keyboardOffset}px`,
      }}
    >
      {messages.map((message) => (
        <div key={message.id} className="whitespace-pre-wrap">
          {message.parts.map((part, i) => {
            const isTool = "toolCallId" in part;
            const partId = `${message.id}-${i}`;
            if (isTool)
              return <ToolDetails part={part} id={`${message.id}-${i}`} />;
            else
              switch (part.type) {
                case "text":
                  return (
                    <MessageText
                      key={partId}
                      role={message.role}
                      text={part.text}
                      id={partId}
                      onQuickReplies={handleQuickReplies}
                    />
                  );
                default:
                  return null;
              }
          })}
        </div>
      ))}

      <div ref={messagesEndRef} className="h-0" />

      <QuickReplies replies={quickReplies} onSelect={handleQuickReplySelect} />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage({ text: input });
          setInput("");
        }}
      >
        <input
          className="fixed dark:bg-zinc-900 w-4/5 max-w-[1120px] p-2 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl left-1/2 transform -translate-x-1/2"
          style={{ bottom: `${32 + keyboardOffset}px`, marginBottom: 0 }}
          value={input}
          placeholder="Say something..."
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
    </div>
  );
}
