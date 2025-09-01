import type { UIMessage } from "@ai-sdk/react";
import type { RefObject } from "react";
import MessageText from "../MessageText";
import ToolDetails from "../ToolDetails";

interface MessagesListProps {
  messages: UIMessage[];
  onQuickReplies: (replies: string[]) => void;
  messagesEndRef: RefObject<HTMLDivElement | null>;
}

export default function MessagesList({
  messages,
  onQuickReplies,
  messagesEndRef,
}: MessagesListProps) {
  return (
    <>
      {messages.map((message) => (
        <div
          key={message.id}
          className="message whitespace-normal leading-tight break-words"
        >
          {message.parts.map((part, i) => {
            const isTool = "toolCallId" in part;
            const partId = `${message.id}-${i}`;
            if (isTool)
              return <ToolDetails key={partId} part={part} id={partId} />;
            else
              switch (part.type) {
                case "text":
                  return (
                    <MessageText
                      key={partId}
                      role={message.role}
                      text={part.text}
                      id={partId}
                      onQuickReplies={onQuickReplies}
                    />
                  );
                default:
                  return null;
              }
          })}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </>
  );
}
