import { useOneHand } from "../../hooks/useOneHand";
import MessageText from "../MessageText";
import ToolDetails from "../ToolDetails";

export default function MessagesList() {
  const { messages } = useOneHand();
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
    </>
  );
}
