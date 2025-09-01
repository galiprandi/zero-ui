import type { Tool } from "ai";
import { convertTemperatureTool } from "./convert.temperature";
import { weatherTool } from "./get.weathr";

export interface ToolSet {
  name: string;
  description: string;
  tools: Record<string, Tool>;
}

export const weatherToolSet: ToolSet = {
  name: "Weather Tools",
  description: "Tools focused on weather and temperature",
  tools: {
    weather: weatherTool,
    convertTemperature: convertTemperatureTool,
  },
};
