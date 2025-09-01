import { useEffect, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark as theme } from "react-syntax-highlighter/dist/esm/styles/prism";
// import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

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
      // First try to parse the entire text as JSON
      try {
        const parsed = JSON.parse(text);
        if (parsed.quick_replies && Array.isArray(parsed.quick_replies)) {
          return {
            displayText: parsed.message || "",
            quickReplies: parsed.quick_replies,
          };
        }
      } catch (_e) {
        // If full text isn't JSON, try to find JSON within the text
        // Use a simpler regex approach
        const jsonRegex = /\{[^}]*"quick_replies"[^}]*\}/g;
        const matches = text.match(jsonRegex);

        if (matches) {
          for (const match of matches) {
            try {
              const parsed = JSON.parse(match);
              if (parsed.quick_replies && Array.isArray(parsed.quick_replies)) {
                // Remove the JSON part from the display text
                const messageText = text.replace(match, "").trim();
                return {
                  displayText: messageText || parsed.message || "",
                  quickReplies: parsed.quick_replies,
                };
              }
            } catch (_e2) {
              // Continue to next match
            }
          }
        }

        // Try a different approach: look for JSON-like structures with line breaks
        const lines = text.split("\n");
        for (const line of lines) {
          if (line.includes('"quick_replies"')) {
            try {
              const parsed = JSON.parse(line.trim());
              if (parsed.quick_replies && Array.isArray(parsed.quick_replies)) {
                const messageText = text.replace(line, "").trim();
                return {
                  displayText: messageText || parsed.message || "",
                  quickReplies: parsed.quick_replies,
                };
              }
            } catch (_e3) {
              // Continue
            }
          }
        }

        // Last resort: try to extract JSON manually by finding braces
        const startIndex = text.indexOf('{"quick_replies"');
        if (startIndex !== -1) {
          let braceCount = 0;
          let endIndex = startIndex;

          for (let i = startIndex; i < text.length; i++) {
            if (text[i] === "{") braceCount++;
            if (text[i] === "}") braceCount--;

            if (braceCount === 0) {
              endIndex = i + 1;
              break;
            }
          }

          if (endIndex > startIndex) {
            const jsonCandidate = text.substring(startIndex, endIndex);

            try {
              const parsed = JSON.parse(jsonCandidate);
              if (parsed.quick_replies && Array.isArray(parsed.quick_replies)) {
                const messageText = text.replace(jsonCandidate, "").trim();
                return {
                  displayText: messageText || parsed.message || "",
                  quickReplies: parsed.quick_replies,
                };
              }
            } catch (_e4) {
              // Last attempt failed
            }
          }
        }
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
