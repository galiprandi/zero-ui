import {
  getMessageText,
  logAssistantResponse,
  logRequestMeta,
  parseQuickRepliesFromText,
} from "@/app/lib/logger";
import { system } from "@/app/prompts/system.prompt";
import { tools } from "@/app/tools/sets";
import { openai } from "@ai-sdk/openai";
import {
  convertToModelMessages,
  stepCountIs,
  streamText,
  type UIMessage,
} from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const total = messages.length;
  const last = total ? messages[total - 1] : undefined;
  const prevAssistant = [...messages]
    .reverse()
    .find((m) => m.role === "assistant");
  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  const lastUserText = lastUser ? getMessageText(lastUser) : "";
  const prevAssistantText = prevAssistant ? getMessageText(prevAssistant) : "";
  const prevQuick = parseQuickRepliesFromText(prevAssistantText);
  const typedOrQuick =
    prevQuick && lastUserText
      ? prevQuick.some((q: string) => q.trim() === lastUserText.trim())
        ? "quick"
        : "typed"
      : last?.role === "user"
        ? "typed"
        : "n/a";

  logRequestMeta({
    totalMessages: total,
    lastRole: last?.role ?? null,
    lastUserLength: lastUserText.length,
    prevAssistantHasQuickReplies: Array.isArray(prevQuick),
    prevAssistantQuickRepliesCount: prevQuick?.length ?? 0,
    userInputType: typedOrQuick,
    userMessage: lastUserText.slice(0, 200),
    model: "gpt-4.1-mini",
    stopWhenSteps: 5,
    systemPromptChars: system.length,
    ts: new Date().toISOString(),
  });

  const result = streamText({
    model: openai("gpt-4.1-mini"),
    stopWhen: stepCountIs(5),
    system,

    messages: convertToModelMessages(messages),
    tools,
    onFinish: ({ text }) => {
      logAssistantResponse({
        text: text.slice(0, 500),
        ts: new Date().toISOString(),
      });
    },
  });

  return result.toUIMessageStreamResponse();
}
