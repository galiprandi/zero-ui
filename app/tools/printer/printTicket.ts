import { tool } from "ai";
import { z } from "zod";
import { logTool } from "../../lib/logger";
import { printTicket } from "../../services/printers/ticketService";

export const printTicketTool = tool({
  description:
    "🖨️ Imprimir ticket — Imprime un ticket/etiqueta para un producto.\n\nCuándo usar: luego de confirmar EAN y precio.\nCuándo NO usar: si no se identificó el producto o el precio.\nContrato: retorna { message }.\nFormato: mensaje breve confirmando la impresión.\nQuick replies: sugerir siguientes pasos (ver producto, cambiar precio, imprimir fleje).",
  inputSchema: z.object({
    ean: z
      .string()
      .describe("Código EAN del producto (sólo dígitos), ej.: '7791234567890'"),
    price: z
      .string()
      .describe("Precio a imprimir (string), ej.: '$9.99' o '9,99'."),
  }),
  execute: async ({ ean, price }) => {
    const toolName = "printTicket";
    printTicket(ean, price);
    const output = { message: "Ticket impreso correctamente." } as const;
    logTool({ toolName, input: { ean, price }, output });
    return output;
  },
});
