"use client";
import { useChat } from "@ai-sdk/react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { initialQuickReplies } from "../prompts/quick-replies.prompt";

// Expose the full useChat return so consumers have access to messages, sendMessage, status, etc.

const ChatContext = createContext<ChatContextType | null>(null);

export function ChatProvider({ children }: { children: ReactNode }) {
  const chat = useChat({ id: "one-hand" });
  const [quickReplies, setQuickReplies] =
    useState<string[]>(initialQuickReplies);
  const lastRepliesRef = useRef<string[] | null>(null);

  // Update quick replies when assistant sends them
  useEffect(() => {
    console.log(chat.messages);

    const lastMessage = chat.messages.at(-1);
    if (!lastMessage || lastMessage.role !== "assistant") return;

    const type = "tool-sendQuickReplies";

    // Find the tool call part and extract replies either from output (preferred) or input while streaming
    type ToolPart = {
      type: string;
      input?: { replies?: unknown };
      output?: { replies?: unknown };
    };

    const maybePart = lastMessage.parts.find(
      (part) => (part as { type?: unknown }).type === type,
    );
    const toolPart = maybePart as ToolPart | undefined;

    if (!toolPart) return;

    const replies: unknown =
      toolPart.output?.replies ?? toolPart.input?.replies;

    if (Array.isArray(replies) && replies.every((r) => typeof r === "string")) {
      const next = replies as string[];
      const prev = lastRepliesRef.current;
      const isSame =
        Array.isArray(prev) &&
        prev.length === next.length &&
        prev.every((val, idx) => val === next[idx]);
      if (!isSame) {
        lastRepliesRef.current = next;
        setQuickReplies(next);
      }
    }
  }, [chat.messages]);
  const clearQuickReplies = useCallback(() => setQuickReplies([]), []);
  return (
    <ChatContext.Provider value={{ ...chat, quickReplies, clearQuickReplies }}>
      {children}
    </ChatContext.Provider>
  );
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
