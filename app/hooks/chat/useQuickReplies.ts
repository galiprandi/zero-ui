import type { UIMessage } from "@ai-sdk/react";
import { useCallback, useEffect, useRef, useState } from "react";

export function useQuickReplies(messages: UIMessage[]) {
  const [quickReplies, setQuickReplies] = useState<string[]>([]);
  const messagesLengthRef = useRef(messages.length);

  // Load initial quick replies on component mount
  useEffect(() => {
    const initialOptions = ["🍽️ ¿Qué puedo cenar?", "🥞 ¿Desayuno saludable?"];
    setQuickReplies(initialOptions);
  }, []);

  // Clear quick replies when new message arrives
  useEffect(() => {
    if (messages.length > messagesLengthRef.current) {
      setQuickReplies([]);
    }
    messagesLengthRef.current = messages.length;
  }, [messages.length]);

  const handleQuickReplies = useCallback((replies: string[]) => {
    setQuickReplies(replies);
  }, []);

  const handleQuickReplySelect = useCallback(
    (sendMessage: (message: { text: string }) => void) => (reply: string) => {
      sendMessage({ text: reply });
      setQuickReplies([]);
    },
    [],
  );

  return {
    quickReplies,
    handleQuickReplies,
    handleQuickReplySelect,
  };
}
