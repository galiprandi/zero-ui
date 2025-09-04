"use client";

import ChatInput from "./components/chat/ChatInput";
import MessagesList from "./components/chat/MessagesList";

export default function Chat() {
  return (
    <div className="page-container flex flex-col w-full max-w-[1120px] mx-auto h-[100dvh] px-[1em] py-[1em]">
      <div
        className="page-content flex-1 overflow-y-auto"
        style={{ paddingRight: "1em", marginRight: "-1em" }}
      >
        <MessagesList />
      </div>
      <ChatInput />
    </div>
  );
}
