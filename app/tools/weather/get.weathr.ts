import { tool } from "ai";
import { object, string } from "zod";
import { logToolExecute, logToolResult } from "@/app/lib/logger";

export const weatherTool = tool({
  description:
    "⛅ Clima — Obtiene el clima actual para una ubicación.\n\nCuándo usar: cuando el usuario solicita el clima y puede ser relevante para operaciones (logística, horarios).\nContrato: retorna { location, temperature } con temperature en °F. Usar convertTemperature si se necesita en °C.",
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
