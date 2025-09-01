import type { UIMessage } from "@ai-sdk/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { initialQuickReplies } from "@/app/config/initialQuickReplies";
import { parseQuickReplies } from "@/app/utils/quickRepliesParser";

export function useQuickReplies(messages: UIMessage[]) {
  const [quickReplies, setQuickReplies] = useState<string[]>([]);
  const messagesLengthRef = useRef(messages.length);

  // Load initial quick replies on component mount
  useEffect(() => {
    setQuickReplies(parseQuickReplies(initialQuickReplies));
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
