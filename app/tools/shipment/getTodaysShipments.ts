import { tool } from "ai";
import { object } from "zod";
import { logToolExecute, logToolResult } from "../../lib/logger";
import { getTodaysShipments } from "../../services/shipment/shipmentService";

export const getTodaysShipmentsTool = tool({
  description:
    "Get information about today's shipments arriving at the branch, including shipment ID and approximate arrival time. Use this tool when the user asks about '🚚 Recepciones', shipments, or deliveries arriving today. It can also be used to show the complete list of products or to check if there are products that require refrigeration and immediate treatment.",
  inputSchema: object({}),
  execute: async () => {
    logToolExecute({
      toolName: "getTodaysShipments",
      input: {},
      ts: new Date().toISOString(),
    });

    const result = { shipments: getTodaysShipments() };

    logToolResult({
      toolName: "getTodaysShipments",
      output: result,
      ts: new Date().toISOString(),
    });

    return result;
  },
});
