import { Markdown } from "./chat/Markdown";

export default function MessageText({ role, content, id }: MessageTextProps) {
  const isUser = role === "user";

  const ClassContainer = isUser
    ? "flex justify-end my-2"
    : "flex justify-start my-0";

  const classNameChild = isUser
    ? "block px-4 py-2 rounded-full shadow-sm break-words bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100 leading-snug text-sm"
    : "text-justify text-wrap-pretty hyphens-auto w-full leading-tight";
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
