import { marked } from "marked";
import { memo, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function parseMarkdownIntoBlocks(
  markdown: string,
): { content: string; key: string }[] {
  const tokens = marked.lexer(markdown);
  return tokens.map((token, index) => ({
    content: token.raw,
    key: `${index}`,
  }));
}

const MarkdownBlock = memo(
  ({ content }: { content: string }) => {
    return <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>;
  },
  (prevProps, nextProps) => {
    if (prevProps.content !== nextProps.content) return false;
    return true;
  },
);

MarkdownBlock.displayName = "MarkdownBlock";

export const Markdown = memo(
  ({ content, id }: { content: string; id: string }) => {
    const blocks = useMemo(() => parseMarkdownIntoBlocks(content), [content]);

    return blocks.map((block) => (
      <MarkdownBlock content={block.content} key={`${id}-block_${block.key}`} />
    ));
  },
);

Markdown.displayName = "Markdown";
