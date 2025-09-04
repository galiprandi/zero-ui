import { type UIMessage, useChat } from "@ai-sdk/react";
import type { UIDataTypes, UITools } from "ai";

export function useOneHand() {
  const { messages: rawMessages, sendMessage, status } = useChat();
  const { messages, quickReplies } = separateQuickRepliesFromText(rawMessages);
  return {
    messages,
    quickReplies,
    sendMessage,
    status,
  };
}

const separateQuickRepliesFromText = (
  messages: Messages,
): {
  messages: Messages;
  quickReplies: QuickReplies;
} => {
  if (
    !messages.length ||
    !messages.some(
      (message) =>
        message.role === "assistant" &&
        message.parts.some((part) => part.type === "text"),
    )
  )
    return {
      messages,
      quickReplies: [],
    };

  const lastMessage = messages.at(-1);
  const textParts = lastMessage?.parts?.filter((part) => part.type === "text");
  const quickRepliesLine = textParts?.find((part) =>
    part.text?.startsWith("QUICK_REPLIES:"),
  );
  const quickReplies =
    quickRepliesLine?.text?.split(",").map((s) => s.trim()) || [];

  return {
    messages,
    quickReplies,
  };
};

type Messages = UIMessage<unknown, UIDataTypes, UITools>[];
type QuickReplies = string[];
