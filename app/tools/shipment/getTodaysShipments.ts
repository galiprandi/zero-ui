import { tool } from "ai";
import { object } from "zod";
import { logToolExecute, logToolResult } from "../../lib/logger";
import { getTodaysShipments } from "../../services/shipment/shipmentService";

export const getTodaysShipmentsTool = tool({
  description:
    "Listar los envíos del día (ID y hora estimada). Retorna { shipments }. Útil para '🚚 Recepciones' o entregas de hoy.",
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
