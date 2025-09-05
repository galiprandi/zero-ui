import { tool } from "ai";
import { number, object } from "zod";
import { logTool } from "@/app/lib/logger";

export const convertTemperatureTool = tool({
  description:
    "🌡️ Convertir temperatura — Convierte de °F a °C.\n\nCuándo usar: después de consultar el clima en °F.\nContrato: retorna { celsius } (entero redondeado).",
  inputSchema: object({
    temperature: number().describe("Temperature in °F to convert"),
  }),
  execute: async ({ temperature }) => {
    const toolName = "convertTemperature";
    const out = { celsius: Math.round((temperature - 32) * (5 / 9)) } as const;
    logTool({ toolName, input: { temperature }, output: out });
    return out;
  },
});
