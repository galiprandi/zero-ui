import { system } from "@/app/prompts/system.prompt";

import { toolSet } from "@/app/tools/sets";
import { openai } from "@ai-sdk/openai";
import {
  convertToModelMessages,
  stepCountIs,
  streamText,
  type UIMessage,
} from "ai";

export const maxDuration = 30;
const model = "gpt-5-nano";

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();
  const result = streamText({
    model: openai(model),
    stopWhen: stepCountIs(10),
    system,
    messages: convertToModelMessages(messages),
    providerOptions: {
      openai: {
        parallelToolCalls: true,
        reasoningEffort: "minimal",
      },
    },
    tools: toolSet,
  });

  return result.toUIMessageStreamResponse();
}
