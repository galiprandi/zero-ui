"use client";

import type { ToolUIPart, UITools } from "ai";

export default function ToolDetails({ part }: { part: ToolUIPart<UITools> }) {
  const isTool = typeof part.type === "string" && part.type.startsWith("tool-");
  const toolName = isTool ? part.type.replace("tool-", "") : "tool";

  console.log(part);

  const input = part.input;
  const output = part.output;
  const hasError = false; // Boolean(part.errorText);
  if (!isTool) return null;
  return (
    <div className="w-full">
      <details className="group">
        <summary className="inline-flex items-center gap-1 text-[11px] text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 cursor-pointer select-none">
          <span aria-hidden>⚙️</span>
          <span className="font-medium">{toolName}</span>
          {hasError ? (
            <span className="ml-1 text-[10px] text-red-500">error</span>
          ) : null}
          <span className="ml-1 text-[10px] text-zinc-400 group-open:hidden">
            +
          </span>
          <span className="ml-1 text-[10px] text-zinc-400 hidden group-open:inline">
            -
          </span>
        </summary>
        <div className="mt-1 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-2 space-y-2">
          <section>
            <div className="mb-1 text-[10px] uppercase tracking-wide text-zinc-500">
              Parameters:
            </div>
            <pre className="text-xs overflow-x-auto">
              {JSON.stringify(input ?? null, null, 2)}
            </pre>
          </section>
          <section>
            <div className="mb-1 text-[10px] uppercase tracking-wide text-zinc-500">
              Response:
            </div>
            <pre className="text-xs overflow-x-auto">
              {JSON.stringify(output ?? null, null, 2)}
            </pre>
          </section>
        </div>
      </details>
    </div>
  );
}
