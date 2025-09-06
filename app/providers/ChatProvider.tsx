"use client";
import { useChat } from "@ai-sdk/react";
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

// Expose the full useChat return so consumers have access to messages, sendMessage, status, etc.

const ChatContext = createContext<ChatContextType | null>(null);

export function ChatProvider({ children }: { children: ReactNode }) {
  const chat = useChat({ id: "one-hand" });
  const [quickReplies, setQuickReplies] = useState<string[]>([]);

  useEffect(() => {
    const lastMessage = chat.messages.at(-1);
    if (!lastMessage || lastMessage.role !== "assistant") return;


    const type = 'tool-sendQuickReplies'

    // Find the tool call part and extract replies either from output (preferred) or input while streaming
    type ToolPart = {
      type: string;
      input?: { replies?: unknown };
      output?: { replies?: unknown };
    };

    const maybePart = lastMessage.parts.find((part) => (part as { type?: unknown }).type === type);
    const toolPart = maybePart as ToolPart | undefined;

    if (!toolPart) return;

    const replies: unknown = toolPart.output?.replies ?? toolPart.input?.replies;

    if (Array.isArray(replies) && replies.every((r) => typeof r === 'string')) {
      setQuickReplies(replies as string[]);
    }

  }, [chat.messages]);
  const clearQuickReplies = useCallback(() => setQuickReplies([]), []);
  return <ChatContext.Provider value={{ ...chat, quickReplies, clearQuickReplies }}>{children}</ChatContext.Provider>;
}

export function useChatContext(): ChatContextType {
  const ctx = useContext(ChatContext);
  if (!ctx)
    throw new Error("useChatContext must be used within <ChatProvider>");
  return ctx;
}

export type ChatContextType = ReturnType<typeof useChat> & {
  quickReplies: string[];
  clearQuickReplies: () => void;
};
