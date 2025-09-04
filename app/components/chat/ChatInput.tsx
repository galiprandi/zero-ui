import { useOneHand } from "@/app/hooks/useOneHand";
import { useState } from "react";
import QuickReplies from "../QuickReplies";

export default function ChatInput() {
  const { sendMessage, status } = useOneHand();
  const [input, setInput] = useState("");

  const disable = status !== "ready";
  const placeholder =
    status === "submitted"
      ? "Pensando..."
      : status === "streaming"
        ? "Respondiendo..."
        : "Escribe algo...";

  return (
    <div className="p-2">
      <QuickReplies />

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
          onChange={({ target: { value } }) => setInput(value)}
          disabled={disable}
        />
      </form>
    </div>
  );
}
