"use client";
import { demoMessages } from "@/app/data/messages";
import { useOneHand } from "@/app/hooks/useOneHand";
import { useEffect, useRef } from "react";
import MessageText from "../MessageText";
import ToolDetails from "../ToolDetails";
import InlineQuickReplies from "./InlineQuickReplies";

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
          {/* Order: tools first, then text, to make executions visible */}
          {(() => {
            const parts = message.parts ?? [];
            const tools: typeof parts = [];
            const nonTools: typeof parts = [];
            parts.forEach((p) => {
              if (typeof p.type === "string" && p.type.startsWith("tool-")) tools.push(p);
              else nonTools.push(p);
            });

            // tools names header removed to keep UI non-invasive

            const renderPart = (part: (typeof parts)[number], i: number) => {
              const isTool = typeof part.type === "string" && part.type.startsWith("tool-");
              const partId = `${message.id}-${i}`;

              if (isTool) {
                const toolName = (part.type as string).replace("tool-", "");
                if (toolName === "displayQuickReplies") {
                  type QRPayload = { text?: string; replies?: string[] };
                  const p = part as unknown as { output?: QRPayload; result?: QRPayload };
                  const payload: QRPayload = p.output ?? p.result ?? {};
                  const text = typeof payload.text === "string" ? payload.text : "";
                  const replies = Array.isArray(payload.replies) ? payload.replies : [];
                  return (
                    <div key={partId} className="space-y-1">
                      {text ? (
                        <MessageText role={message.role} content={text} id={`${partId}-text`} />
                      ) : null}
                      <InlineQuickReplies replies={replies} />
                    </div>
                  );
                }
                return <ToolDetails key={partId} part={part} id={partId} />;
              }

              if (part.type === "text") {
                const text = part.text || "";
                const open = /<\s*quick-replies\s*>/i.exec(text);
                const close = /<\s*\/\s*quick-replies\s*>/i.exec(text);
                if (open && close && close.index > open.index) {
                  const before = text.slice(0, open.index).trimEnd();
                  const inner = text.slice(open.index + open[0].length, close.index).trim();
                  const after = text.slice(close.index + close[0].length).trimStart();
                  const cleaned = `${before}${before && after ? "\n\n" : ""}${after}`.trim();
                  const replies = inner
                    .split(/\n|\r|,/)
                    .map((s) => s.trim())
                    .filter(Boolean)
                    .slice(0, 5);
                  return (
                    <div key={partId} className="space-y-1">
                      {cleaned && (
                        <MessageText role={message.role} content={cleaned} id={partId} />
                      )}
                      <InlineQuickReplies replies={replies} />
                    </div>
                  );
                }
                return (
                  <MessageText key={partId} role={message.role} content={text} id={partId} />
                );
              }

              return null;
            };

            return (
              <>
                {/* tools first */}
                {tools.map((p, idx) => renderPart(p, idx))}
                {/* then other parts */}
                {nonTools.map((p, idx) => renderPart(p, tools.length + idx))}
              </>
            );
          })()}
        </div>
      ))}
      <div ref={endRef} />
    </>
  );
}
