"use client";

interface Part {
  type: string;
  input?: unknown;
  parameters?: unknown;
  output?: unknown;
  result?: unknown;
  errorText?: unknown;
  [key: string]: unknown;
}

interface ToolDetailsProps {
  part: Part;
  id: string;
}

export default function ToolDetails({ part }: ToolDetailsProps) {
  const isTool = typeof part.type === "string" && part.type.startsWith("tool-");
  const toolName = isTool ? part.type.replace("tool-", "") : "tool";

  const parameters = (part.input ?? part.parameters) as unknown;
  const response = (part.output ?? part.result ?? part.errorText) as unknown;
  const hasError = Boolean(part.errorText);

  return (
    <div className="w-full">
      <details className="group">
        <summary className="inline-flex items-center gap-1 text-[11px] text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 cursor-pointer select-none">
          <span aria-hidden>⚙️</span>
          <span className="font-medium">{toolName}</span>
          {hasError ? (
            <span className="ml-1 text-[10px] text-red-500">error</span>
          ) : null}
          <span className="ml-1 text-[10px] text-zinc-400 group-open:hidden">ver</span>
          <span className="ml-1 text-[10px] text-zinc-400 hidden group-open:inline">ocultar</span>
        </summary>
        <div className="mt-1 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-2 space-y-2">
          <section>
            <div className="mb-1 text-[10px] uppercase tracking-wide text-zinc-500">Parámetros</div>
            <pre className="text-xs overflow-x-auto">
              {JSON.stringify(parameters ?? null, null, 2)}
            </pre>
          </section>
          <section>
            <div className="mb-1 text-[10px] uppercase tracking-wide text-zinc-500">Respuesta</div>
            <pre className="text-xs overflow-x-auto">
              {JSON.stringify(response ?? null, null, 2)}
            </pre>
          </section>
        </div>
      </details>
    </div>
  );
}
