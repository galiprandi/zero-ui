"use client";

import { useChat } from "@ai-sdk/react";
import { useRef, useState } from "react";
import ChatInput from "./components/chat/ChatInput";
import MessagesList from "./components/chat/MessagesList";
import { useQuickReplies } from "./hooks/chat/useQuickReplies";

export default function Chat() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage } = useChat();
  const [isLoading, setIsLoading] = useState(false);

  const { quickReplies, handleQuickReplies, handleQuickReplySelect } =
    useQuickReplies(messages);

  const wrappedSendMessage = async (message: { text: string }) => {
    setIsLoading(true);
    await sendMessage(message);
    setIsLoading(false);
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSelect = handleQuickReplySelect(wrappedSendMessage);

  return (
    <div className="page-container flex flex-col w-full max-w-[1120px] mx-auto h-[100dvh] px-[1em] py-[1em]">
      <div
        className="page-content flex-1 overflow-y-auto"
        style={{ paddingRight: "1em", marginRight: "-1em" }}
      >
        <MessagesList
          messages={messages}
          onQuickReplies={handleQuickReplies}
          messagesEndRef={messagesEndRef}
        />
      </div>
      <ChatInput
        quickReplies={quickReplies}
        onSelect={handleSelect}
        sendMessage={wrappedSendMessage}
        isStreaming={isLoading}
      />
    </div>
  );
}
