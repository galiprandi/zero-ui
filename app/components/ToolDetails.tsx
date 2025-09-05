"use client";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Markdown } from "./chat/Markdown";

interface Part {
  type: string;
  code?: string;
  language?: string;
  input?: unknown;
  output?: unknown;
  [key: string]: unknown;
}

interface ToolDetailsProps {
  part: Part;
  id: string;
}

export default function ToolDetails({ part, id: _id }: ToolDetailsProps) {
  let toolName = "";
  let content: React.ReactNode;
  if (part.type === "code" && part.code) {
    const lang = (part.language || "").toString().toLowerCase();
    if (lang === "markdown" || lang === "md" || lang === "mdx") {
      content = (
        <div className="text-sm">
          <Markdown content={part.code} id={_id} />
        </div>
      );
    } else {
      content = (
        <SyntaxHighlighter
          language={part.language || "javascript"}
          style={oneLight}
          customStyle={{ fontSize: 14, borderRadius: 8, padding: 16 }}
        >
          {part.code}
        </SyntaxHighlighter>
      );
    }
  } else if (part.type.startsWith("tool-")) {
    toolName = part.type.replace("tool-", "");
    const params = part.input;
    const response = part.output;
    const jsonData = {
      tool: toolName,
      parameters: params,
      response: response,
    };
    content = (
      <pre className="p-1 rounded text-xs overflow-x-auto">
        {JSON.stringify(jsonData, null, 2)}
      </pre>
    );
  } else {
    content = (
      <SyntaxHighlighter
        language="json"
        style={oneLight}
        customStyle={{ fontSize: 14, borderRadius: 8, padding: 16 }}
      >
        {JSON.stringify(part, null, 2)}
      </SyntaxHighlighter>
    );
  }
  return (
    <div className="w-full">
      <details>
        <summary className="text-[11px] text-zinc-500 cursor-pointer select-none">
          ⚙️ Tool: {toolName || "output"}
        </summary>
        <div className="mt-1">{content}</div>
      </details>
    </div>
  );
}
