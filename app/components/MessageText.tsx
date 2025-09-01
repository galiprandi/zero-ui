import React, { useEffect, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark as theme } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import { parseQuickRepliesFromText } from "@/app/utils/quickRepliesParser";

interface MessageTextProps {
  role: string;
  text: string;
  id: string;
  onQuickReplies?: (replies: string[]) => void;
}

export default function MessageText({
  role,
  text,
  id,
  onQuickReplies,
}: MessageTextProps) {
  const isUser = role === "user";

  const { displayText, quickReplies } = useMemo(() => {
    if (!isUser && text) {
      const parsed = parseQuickRepliesFromText(text);
      if (parsed) {
        return {
          displayText: parsed.message,
          quickReplies: parsed.quickReplies,
        };
      }
    }
    return {
      displayText: text,
      quickReplies: null,
    };
  }, [text, isUser]);

  useEffect(() => {
    if (quickReplies && onQuickReplies) {
      onQuickReplies(quickReplies);
    }
  }, [quickReplies, onQuickReplies]);

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
      // biome-ignore lint: necessary for react-markdown compatibility
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
    <div
      key={id}
      className={`flex ${isUser ? "justify-end my-2" : "justify-start my-0"}`}
    >
      {isUser ? (
        <div className="block px-4 py-2 rounded-full shadow-sm break-words bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100 leading-snug text-sm">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={components}
            key={text.length}
          >
            {text}
          </ReactMarkdown>
        </div>
      ) : (
        <div className="text-justify w-full leading-tight">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            // rehypePlugins={[rehypeRaw]}
            components={components}
          >
            {displayText}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
}
