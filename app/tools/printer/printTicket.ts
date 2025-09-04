import { tool } from "ai";
import { z } from "zod";
import { printTicket } from "../../services/printers/ticketService";
import { logToolExecute, logToolResult } from "../../lib/logger";

export const printTicketTool = tool({
  description:
    "Imprimir un ticket/etiqueta para un producto. Retorna { message }. Usar luego de confirmar el EAN y el precio.",
  inputSchema: z.object({
    ean: z
      .string()
      .describe("Código EAN del producto (sólo dígitos), ej.: '7791234567890'"),
    price: z
      .string()
      .describe("Precio a imprimir (string), ej.: '$9.99' o '9,99'."),
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
