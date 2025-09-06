"use client";
import { useChatContext } from "@/app/providers/ChatProvider";
import { useState } from "react";
import QuickReplies from "../QuickReplies";

export default function ChatInput() {
  const { status, sendMessage, clearQuickReplies } = useChatContext();
  const [input, setInput] = useState("");

  const disable = status !== "ready";
  const basePlaceholder = "Escribe algo...";
  const thinking = status === "submitted" || status === "streaming";
  const placeholder = thinking ? "Pensando..." : basePlaceholder;

  return (
    <div className="p-2">
      <QuickReplies />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (disable) return;
          if (!input.trim()) return;
          clearQuickReplies();
          setInput("");
          sendMessage({ text: input });
        }}
        className="mt-2"
      >
        <input
          className="w-full dark:bg-zinc-900 p-2 px-5 border border-zinc-300 dark:border-zinc-800 rounded-full shadow-sm"
          value={input}
          placeholder={placeholder}
          onChange={({ target: { value } }) => setInput(value)}
          id="chat-input"
          aria-disabled={disable}
          aria-busy={thinking}
        />
      </form>
    </div>
  );
}
