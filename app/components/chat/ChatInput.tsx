import { useState } from "react";
import QuickReplies from "../QuickReplies";

interface ChatInputProps {
  quickReplies: string[];
  onSelect: (reply: string) => void;
  sendMessage: (message: { text: string }) => void;
}

export default function ChatInput({
  quickReplies,
  onSelect,
  sendMessage,
}: ChatInputProps) {
  const [input, setInput] = useState("");

  return (
    <div className="p-2">
      <QuickReplies replies={quickReplies} onSelect={onSelect} />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage({ text: input });
          setInput("");
        }}
        className="mt-2"
      >
        <input
          className="w-full dark:bg-zinc-900 p-2 border border-zinc-300 dark:border-zinc-800 rounded-full shadow-sm"
          value={input}
          placeholder="Escribe algo..."
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
    </div>
  );
}
