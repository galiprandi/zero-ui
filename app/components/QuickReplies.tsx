"use client";
import { useOneHand } from "@/app/hooks/useOneHand";

export default function QuickReplies() {
  const { quickReplies, sendMessage, status } = useOneHand();

  const disabled = status !== "ready";

  return (
    <div className="w-full py-2">
      <div
        className="quick-replies flex gap-2 overflow-x-auto scrollbar-hide items-center justify-center"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {quickReplies.map((reply) => (
          <button
            key={reply}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              sendMessage({ text: reply });
            }}
            className="quick-reply-btn flex-shrink-0 px-3 py-1.5 text-sm font-medium text-gray-200 bg-gray-700 hover:bg-gray-600 active:bg-gray-500 rounded-full border border-gray-600 hover:border-gray-500 transition-all duration-200 whitespace-nowrap shadow-sm"
            type="button"
            disabled={disabled}
            aria-disabled={disabled}
          >
            {reply}
          </button>
        ))}
      </div>
    </div>
  );
}
