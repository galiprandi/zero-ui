"use client";
import { demoMessages } from "@/app/data/messages";
import { useOneHand } from "@/app/hooks/useOneHand";
import { useEffect, useRef } from "react";
import MessageText from "../MessageText";
import ToolDetails from "../ToolDetails";


export default function MessagesList() {
  const { messages } = useOneHand();

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
          {message.parts.map((part, i) => {
            const isTool =
              typeof part.type === "string" && part.type.startsWith("tool-");
            const partId = `${message.id}-${i}`;
            if (isTool)
              return <ToolDetails key={partId} part={part} id={partId} />;

            if (part.type === "text")
              return (
                <MessageText
                  key={partId}
                  role={message.role}
                  content={part.text}
                  id={partId}
                />
              );

            return null;
          })}
        </div>
      ))}
      <div ref={endRef} />
    </>
  );
}
