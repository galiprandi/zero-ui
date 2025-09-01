import { tool } from "ai";
import { object, string } from "zod";
import { logToolExecute, logToolResult } from "@/app/lib/logger";

export const weatherTool = tool({
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
});
