"use client";
import { Markdown } from "./chat/Markdown";

export default function MessageText({ role, content, id }: MessageTextProps) {
  const isUser = role === "user";

  const ClassContainer = isUser
    ? "flex justify-end my-2"
    : "flex justify-start my-0";

  const classNameChild = isUser
    ? "block max-w-[78%] px-4 py-2 rounded-2xl shadow-sm ring-1 ring-zinc-300/70 dark:ring-zinc-700/60 break-words bg-zinc-100 text-zinc-900 dark:bg-zinc-800/90 dark:text-zinc-100 leading-snug text-sm [&_p]:my-0 [&_ul]:my-0"
    : "text-justify text-wrap-pretty hyphens-auto w-full leading-tight text-zinc-900 dark:text-zinc-100";
  return (
    <div key={id} className={ClassContainer}>
      <div className={classNameChild}>
        <Markdown content={content} id={id} />
      </div>
    </div>
  );
}

interface MessageTextProps {
  role: string;
  content: string;
  id: string;
}
