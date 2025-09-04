import { tool } from "ai";
import { object, string } from "zod";
import { logToolExecute, logToolResult } from "@/app/lib/logger";

export const weatherTool = tool({
  description:
    "Get current weather for a location. Returns { location, temperature } with temperature in °F.",
  inputSchema: object({
    location: string().describe("City or location name, e.g., 'Buenos Aires'"),
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
