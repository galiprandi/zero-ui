"use client";
import { useOneHand } from "@/app/hooks/useOneHand";

interface InlineQuickRepliesProps {
  replies: string[];
}

export default function InlineQuickReplies({
  replies,
}: InlineQuickRepliesProps) {
  const { sendMessage, status } = useOneHand();
  const disabled = status !== "ready";

  if (!Array.isArray(replies) || replies.length === 0) return null;

  return (
    <div className="w-full py-2">
      <div
        className="quick-replies flex gap-2 overflow-x-auto scrollbar-hide items-center"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {replies.map((reply) => (
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
