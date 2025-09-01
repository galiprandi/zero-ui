import { tool } from "ai";
import { z } from "zod";
import { printTicket } from "../../services/printers/ticketService";
import { logToolExecute, logToolResult } from "../../lib/logger";

export const printTicketTool = tool({
  description:
    "Imprimir ticket para un producto. Útil para comprobantes de venta.",
  inputSchema: z.object({
    ean: z.string().describe("Código EAN del producto"),
    price: z.string().describe("Precio del producto"),
  }),
  execute: async ({ ean, price }) => {
    logToolExecute({
      toolName: "printTicket",
      input: { ean, price },
      ts: new Date().toISOString(),
    });

    printTicket(ean, price);
    const result = { message: "Ticket impreso correctamente." };

    logToolResult({
      toolName: "printTicket",
      output: result,
      ts: new Date().toISOString(),
    });

    return result;
  },
});
