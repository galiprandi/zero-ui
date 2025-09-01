import { tool } from "ai";
import { object } from "zod";
import { logToolExecute, logToolResult } from "../../lib/logger";
import { getTodaysShipmentId } from "../../services/shipment/shipmentService";

export const getTodaysShipmentsTool = tool({
  description:
    "Get information about today's shipments arriving at the branch, including shipment ID and approximate arrival time. Use this tool when the user asks about '🚚 Recepciones', shipments, or deliveries arriving today.",
  inputSchema: object({}),
  execute: async () => {
    logToolExecute({
      toolName: "getTodaysShipments",
      input: {},
      ts: new Date().toISOString(),
    });

    const id = getTodaysShipmentId();
    const hour = Math.floor(Math.random() * 8) + 10; // 10 to 17
    const minute = Math.floor(Math.random() * 60);
    const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;

    const result = {
      id,
      approximateTime: time,
      message: `El envío ${id} llegará aproximadamente a las ${time}. ¿Quieres ver la lista de productos o solo las categorías?`,
    };

    logToolResult({
      toolName: "getTodaysShipments",
      output: result,
      ts: new Date().toISOString(),
    });

    return result;
  },
});
