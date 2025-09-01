import { getTodaysShipmentsTool } from "./getTodaysShipments";
import { listShipmentProductsTool } from "./listShipmentProducts";
import type { Tool } from "ai";

interface ToolSet {
  name: string;
  description: string;
  tools: Record<string, Tool>;
}

export const shipmentToolSet: ToolSet = {
  name: "Shipment Tools",
  description: "Tools for managing shipments and deliveries",
  tools: {
    getTodaysShipments: getTodaysShipmentsTool,
    listShipmentProducts: listShipmentProductsTool,
  },
};
