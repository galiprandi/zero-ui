"use client";
import { demoMessages } from "@/app/data/messages";
import { useChatContext } from "@/app/providers/ChatProvider";
import type { TextUIPart, ToolUIPart, UITools } from "ai";
import { useEffect, useRef } from "react";
import MessageText from "../MessageText";
import ToolDetails from "../ToolDetails";

export default function MessagesList() {
  const { messages } = useChatContext();

  const list = messages.length > 0 ? messages : demoMessages;
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    const input = document.getElementById(
      "chat-input",
    ) as HTMLInputElement | null;
    input?.focus();
  });

  return (
    <>
      {list.map((message) => (
        <div
          key={message.id}
          className="message whitespace-normal leading-tight break-words"
        >
          {message.parts?.map((part, idx) => {
            // Tool invocation/result parts
            if (part.type.startsWith("tool-")) {
              return (
                <ToolDetails
                  key={`${message.id}-part-${idx}`}
                  part={part as ToolUIPart<UITools>}
                />
              );
            }
            // Text parts
            switch (part.type) {
              case "text": {
                return (
                  <MessageText
                    key={`${message.id}-text-${idx}`}
                    role={message.role as string}
                    part={part as TextUIPart}
                  />
                );
              }
              case "reasoning": {
                return (
                  <div key={`${message.id}-reasoning-${idx}`}>{part.text}</div>
                );
              }
              default:
                return null;
            }
          })}
        </div>
      ))}
      <div ref={endRef} />
    </>
  );
}
