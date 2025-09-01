import type { Tool } from "ai";
import { weatherTool } from "./weather/get.weathr";
import { convertTemperatureTool } from "./weather/convert.temperature";
import { getTodaysShipmentsTool } from "./shipment/getTodaysShipments";
import { listShipmentProductsTool } from "./shipment/listShipmentProducts";

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

// Shipment tool set
export const shipmentToolSet: ToolSet = {
  name: "Shipment Tools",
  description: "Tools for managing shipments and deliveries",
  tools: {
    getTodaysShipments: getTodaysShipmentsTool,
    listShipmentProducts: listShipmentProductsTool,
  },
};

// Core set to use
export const coreToolSet = toolSets.basic;

export interface ToolSet {
  name: string;
  description: string;
  tools: Record<string, Tool>;
}
