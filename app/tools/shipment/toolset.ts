import { getTodaysShipmentsTool } from "./getTodaysShipments";
import { listShipmentProductsTool } from "./listShipmentProducts";

/**
 * Shipment tools, all tools related to shipments
 */
export const shipmentToolSet = {
  getTodaysShipments: getTodaysShipmentsTool,
  listShipmentProducts: listShipmentProductsTool,
};
