import { openai } from "@ai-sdk/openai";
import {
  convertToModelMessages,
  stepCountIs,
  streamText,
  tool,
  type UIMessage,
} from "ai";
import { number, object, string } from "zod";
import {
  getMessageText,
  logRequestMeta,
  logToolExecute,
  logToolResult,
  parseQuickRepliesFromText,
} from "@/app/lib/logger";
import { system } from "@/app/prompts/system.prompt";

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
      ? prevQuick.some((q) => q.trim() === lastUserText.trim())
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
    tools: {
      weather: tool({
        description: "Get the weather in a location (fahrenheit)",
        inputSchema: object({
          location: string().describe("The location to get the weather for"),
        }),
        execute: async ({ location }) => {
          logToolExecute({
            toolName: "weather",
            input: { location },
            ts: new Date().toISOString(),
          });
          const temperature = Math.round(Math.random() * (90 - 32) + 32);
          const out = {
            location,
            temperature,
          };
          logToolResult({
            toolName: "weather",
            output: out,
            ts: new Date().toISOString(),
          });
          return out;
        },
      }),
      convertFahrenheitToCelsius: tool({
        description: "Convert a temperature in fahrenheit to celsius",
        inputSchema: object({
          temperature: number().describe(
            "The temperature in fahrenheit to convert",
          ),
        }),
        execute: async ({ temperature }) => {
          logToolExecute({
            toolName: "convertFahrenheitToCelsius",
            input: { temperature },
            ts: new Date().toISOString(),
          });
          const celsius = Math.round((temperature - 32) * (5 / 9));
          const out = {
            celsius,
          };
          logToolResult({
            toolName: "convertFahrenheitToCelsius",
            output: out,
            ts: new Date().toISOString(),
          });
          return out;
        },
      }),
    },
  });

  return result.toUIMessageStreamResponse();
}
