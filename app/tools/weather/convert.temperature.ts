import { tool } from "ai";
import { number, object } from "zod";
import { logToolExecute, logToolResult } from "@/app/lib/logger";

export const convertTemperatureTool = tool({
  description: "Convert a temperature in fahrenheit to celsius",
  inputSchema: object({
    temperature: number().describe("The temperature in fahrenheit to convert"),
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
});
