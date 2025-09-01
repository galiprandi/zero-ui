import type { UIMessage } from "@ai-sdk/react";
import { useEffect, useRef } from "react";

export function useScrollToBottom(messages: UIMessage[]) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastScrollRef = useRef(Date.now());

  // biome-ignore lint: messages.length is the correct dependency for scrolling logic
  useEffect(() => {
    const now = Date.now();
    if (now - lastScrollRef.current > 5000) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      lastScrollRef.current = now;
    }
  }, [messages.length]);

  return messagesEndRef;
}
