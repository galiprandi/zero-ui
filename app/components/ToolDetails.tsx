import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface Part {
  type: string;
  code?: string;
  language?: string;
  [key: string]: unknown;
}

interface ToolDetailsProps {
  part: Part;
  id: string;
}

export default function ToolDetails({ part, id: _id }: ToolDetailsProps) {
  let code = "";
  let language = "javascript";
  if (part.type === "code" && part.code) {
    code = part.code;
    language = part.language || "javascript";
  } else {
    code = JSON.stringify(part, null, 2);
    language = "json";
  }
  return (
    <div className="text-right flex justify-end opacity-50">
      <details>
        <summary>{part.type} 🧰</summary>
        <SyntaxHighlighter
          language={language}
          style={oneLight}
          customStyle={{ fontSize: 14, borderRadius: 8, padding: 16 }}
        >
          {code}
        </SyntaxHighlighter>
      </details>
    </div>
  );
}
