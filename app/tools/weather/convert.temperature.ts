import { tool } from "ai";
import { number, object } from "zod";
import { logToolExecute, logToolResult } from "@/app/lib/logger";

export const convertTemperatureTool = tool({
  description:
    "Convert a temperature from °F to °C. Returns { celsius }. Use after getting weather in °F.",
  inputSchema: object({
    temperature: number().describe("Temperature in °F to convert"),
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
