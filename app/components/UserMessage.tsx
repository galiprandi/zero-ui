import type React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark as theme } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";

interface UserMessageProps {
  text: string;
  id: string;
}

export default function UserMessage({ text, id }: UserMessageProps) {
  const components = {
    code: ({
      inline,
      className,
      children,
      ...props
    }: {
      inline?: boolean;
      className?: string;
      children?: React.ReactNode;
      [key: string]: any;
    }) => {
      const match = /language-(\w+)/.exec(className || "");
      if (inline)
        return (
          <code className={className} {...props}>
            {children}
          </code>
        );
      else if (match && match[1] === "markdown")
        return (
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {String(children).replace(/^\s+/, "").replace(/\n$/, "")}
          </ReactMarkdown>
        );
      else
        return (
          <SyntaxHighlighter
            style={theme}
            wrapLongLines={true}
            language={match ? match[1] : undefined}
          >
            {String(children).replace(/^\s+/, "").replace(/\n$/, "")}
          </SyntaxHighlighter>
        );
    },
    p: ({ children }: { children?: React.ReactNode }) => (
      <p className="my-1 leading-tight">{children}</p>
    ),
    ul: ({ children }: { children?: React.ReactNode }) => (
      <ul className="my-1 pl-5 list-disc leading-tight space-y-0.5">
        {children}
      </ul>
    ),
    li: ({ children }: { children?: React.ReactNode }) => (
      <li className="my-0">{children}</li>
    ),
  };

  return (
    <div className="block px-4 py-2 rounded-full shadow-sm break-words bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100 leading-snug text-sm text-justify text-wrap-pretty hyphens-auto">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={components}
        key={text.length}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
}
