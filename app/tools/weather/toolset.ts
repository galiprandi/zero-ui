import { convertTemperatureTool } from "./convert.temperature";
import { weatherTool } from "./get.weathr";

/**
 * Weather tools, all tools related to weather
 */
export const weatherToolSet = {
  weather: weatherTool,
  convertTemperature: convertTemperatureTool,
} as const;
