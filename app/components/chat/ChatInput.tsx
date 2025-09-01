import { useState } from "react";
import QuickReplies from "../QuickReplies";

export default function ChatInput({
  quickReplies,
  onSelect,
  sendMessage,
  isStreaming = false,
}: ChatInputProps) {
  const [input, setInput] = useState("");

  return (
    <div className="p-2">
      <QuickReplies
        replies={quickReplies}
        onSelect={onSelect}
        disabled={isStreaming}
      />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (isStreaming) return;
          if (!input.trim()) return;
          sendMessage({ text: input });
          setInput("");
        }}
        className="mt-2"
      >
        <input
          className="w-full dark:bg-zinc-900 p-2 px-5 border border-zinc-300 dark:border-zinc-800 rounded-full shadow-sm"
          value={input}
          placeholder={
            isStreaming ? "Esperando respuesta..." : "Escribe algo..."
          }
          onChange={(e) => setInput(e.target.value)}
          disabled={isStreaming}
        />
      </form>
    </div>
  );
}

interface ChatInputProps {
  quickReplies: string[];
  onSelect: (reply: string) => void;
  sendMessage: (message: { text: string }) => void;
  isStreaming?: boolean;
}
