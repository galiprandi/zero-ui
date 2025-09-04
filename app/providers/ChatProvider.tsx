"use client";
import { createContext, useContext, type ReactNode } from "react";
import { useChat } from "@ai-sdk/react";

// Expose the full useChat return so consumers have access to messages, sendMessage, status, etc.
export type ChatContextType = ReturnType<typeof useChat>;

const ChatContext = createContext<ChatContextType | null>(null);

export function ChatProvider({ children }: { children: ReactNode }) {
  const chat = useChat({ id: "one-hand" });
  return <ChatContext.Provider value={chat}>{children}</ChatContext.Provider>;
}

export function useChatContext(): ChatContextType {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChatContext must be used within <ChatProvider>");
  return ctx;
}
