import { tool } from "ai";
import { number, object } from "zod";
import { logToolExecute, logToolResult } from "@/app/lib/logger";

export const convertTemperatureTool = tool({
  description:
    "🌡️ Convertir temperatura — Convierte de °F a °C.\n\nCuándo usar: después de consultar el clima en °F.\nContrato: retorna { celsius } (entero redondeado).",
  inputSchema: object({
    temperature: number().describe("Temperature in °F to convert"),
  }),
  execute: async ({ temperature }) => {
    logToolExecute({
      toolName: "convertTemperature",
      input: { temperature },
      ts: new Date().toISOString(),
    });
    const celsius = Math.round((temperature - 32) * (5 / 9));
    const out = {
      celsius,
    };
    logToolResult({
      toolName: "convertTemperature",
      output: out,
      ts: new Date().toISOString(),
    });
    return out;
  },
});
