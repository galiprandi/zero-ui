"use client";

import { useChat } from "@ai-sdk/react";
import ChatInput from "./components/chat/ChatInput";
import MessagesList from "./components/chat/MessagesList";
import { useQuickReplies } from "./hooks/chat/useQuickReplies";
import { useScrollToBottom } from "./hooks/chat/useScrollToBottom";

export default function Chat() {
  const { messages, sendMessage } = useChat();
  const messagesEndRef = useScrollToBottom(messages);
  const { quickReplies, handleQuickReplies, handleQuickReplySelect } =
    useQuickReplies(messages);
  const handleSelect = handleQuickReplySelect(sendMessage);

  return (
    <div className="flex flex-col w-full max-w-[1120px] mx-auto h-screen px-[1em] py-[1em]">
      <div
        className="flex-1 overflow-y-auto"
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
        sendMessage={sendMessage}
      />
    </div>
  );
}
