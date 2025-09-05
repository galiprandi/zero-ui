"use client";
import type { Components } from "react-markdown";
import type { ComponentPropsWithoutRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Mapeo centralizado de elementos HTML para ReactMarkdown.
// Enfocado a mobile-first y dark mode friendly con clases Tailwind.
export const markdownComponents: Components = {
  h1: ({ node, ...props }) => (
    <h1
      className="mt-2 mb-2 text-2xl md:text-3xl font-semibold leading-tight"
      {...props}
    />
  ),
  h2: ({ node, ...props }) => (
    <h2
      className="mt-2 mb-2 text-xl md:text-2xl font-semibold leading-tight"
      {...props}
    />
  ),
  h3: ({ node, ...props }) => (
    <h3
      className="mt-2 mb-2 text-lg md:text-xl font-semibold leading-tight"
      {...props}
    />
  ),
  h4: ({ node, ...props }) => (
    <h4
      className="mt-2 mb-1 text-base font-semibold leading-tight"
      {...props}
    />
  ),
  p: ({ node, ...props }) => <p className="my-2 leading-relaxed" {...props} />,
  ul: ({ node, ...props }) => (
    <ul className="my-2 ml-5 list-disc space-y-1" {...props} />
  ),
  ol: ({ node, ...props }) => (
    <ol className="my-2 ml-5 list-decimal space-y-1" {...props} />
  ),
  li: ({ node, ...props }) => (
    <li
      className="leading-snug [&>h1]:text-base [&>h1]:font-medium [&>h1]:mt-0 [&>h1]:mb-0 [&>h2]:text-base [&>h2]:font-medium [&>h2]:mt-0 [&>h2]:mb-0 [&>h3]:text-sm [&>h3]:font-medium [&>h3]:mt-0 [&>h3]:mb-0 [&>h4]:text-sm [&>h4]:font-medium [&>h4]:mt-0 [&>h4]:mb-0"
      {...props}
    />
  ),
  blockquote: ({ node, ...props }) => (
    <blockquote
      className="my-3 border-l-4 border-zinc-400/40 pl-3 text-zinc-600 dark:text-zinc-300"
      {...props}
    />
  ),
  table: ({ node, ...props }) => (
    <div className="my-3 overflow-x-auto">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  thead: ({ node, ...props }) => (
    <thead className="border-b border-zinc-600/30" {...props} />
  ),
  tbody: ({ node, ...props }) => <tbody {...props} />,
  tr: ({ node, ...props }) => <tr className="align-top" {...props} />,
  th: ({ node, ...props }) => (
    <th className="text-left font-medium py-2 pr-2 text-zinc-300" {...props} />
  ),
  td: ({ node, ...props }) => (
    <td className="py-2 pr-2 border-b border-zinc-700/30" {...props} />
  ),
  code: (props) => {
    type CodeProps = ComponentPropsWithoutRef<"code"> & { inline?: boolean };
    const codeProps = props as CodeProps;
    const isInline = !!codeProps.inline;
    const { children, className } = codeProps;
    const base =
      "rounded bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100";
    if (isInline) {
      return (
        <code className={`px-1 py-0.5 ${base}`} {...codeProps}>
          {children}
        </code>
      );
    }
    // Detect fenced code blocks declared as ```markdown (or md/mdx) and render them as real Markdown
    const lang = (className || "").toString();
    const isMarkdownBlock = /language-(markdown|md|mdx)/i.test(lang);
    if (isMarkdownBlock) {
      const content = Array.isArray(children)
        ? children.join("")
        : String(children ?? "");
      return (
        <div className={`block w-full p-2 ${base}`}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
      );
    }
    return (
      <code
        className={`block w-full p-2 overflow-x-auto ${base}`}
        {...codeProps}
      >
        {children}
      </code>
    );
  },
  a: ({ node, ...props }) => (
    <a
      className="underline decoration-zinc-500 hover:decoration-zinc-300"
      target="_blank"
      rel="noreferrer"
      {...props}
    />
  ),
  hr: ({ node, ...props }) => <hr className="my-3" {...props} />,
  br: ({ node, ...props }) => <br {...props} />,
};
