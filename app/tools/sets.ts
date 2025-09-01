import type { Tool } from "ai";
import { convertTemperatureTool } from "./weather/convert.temperature";
import { weatherTool } from "./weather/get.weathr";

export const toolSets: Record<string, ToolSet> = {
  basic: {
    name: "Basic Tools",
    description: "Basic utility tools for general assistance",
    tools: {
      weather: weatherTool,
      convertTemperature: convertTemperatureTool,
    },
  },
  empty: {
    name: "No Tools",
    description: "No tools available",
    tools: {},
  },
};

// Default set to use
export const defaultToolSet = toolSets.basic;

export interface ToolSet {
  name: string;
  description: string;
  tools: Record<string, Tool>;
}
