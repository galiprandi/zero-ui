import type { ChatStatus } from "ai";
import { useState } from "react";
import QuickReplies from "../QuickReplies";

export default function ChatInput({
  quickReplies,
  onSelect,
  sendMessage,
  status,
}: ChatInputProps) {
  const [input, setInput] = useState("");

  const disable = status === "submitted" || status === "streaming";
  const placeholder =
    status === "submitted"
      ? "Pensando..."
      : status === "streaming"
        ? "Respondiendo..."
        : "Escribe algo...";

  return (
    <div className="p-2">
      <QuickReplies
        replies={quickReplies}
        onSelect={onSelect}
        disabled={disable}
      />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (disable) return;
          if (!input.trim()) return;
          sendMessage({ text: input });
          setInput("");
        }}
        className="mt-2"
      >
        <input
          className="w-full dark:bg-zinc-900 p-2 px-5 border border-zinc-300 dark:border-zinc-800 rounded-full shadow-sm"
          value={input}
          placeholder={placeholder}
          onChange={(e) => setInput(e.target.value)}
          disabled={disable}
        />
      </form>
    </div>
  );
}

interface ChatInputProps {
  quickReplies: string[];
  onSelect: (reply: string) => void;
  sendMessage: (message: { text: string }) => void;
  status?: ChatStatus;
}
