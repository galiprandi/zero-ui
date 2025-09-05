import { tool } from "ai";
import { z } from "zod";
import { printTicket } from "../../services/printers/ticketService";
import { logToolExecute, logToolResult } from "../../lib/logger";

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
    logToolExecute({
      toolName: "printTicket",
      input: { ean, price },
      ts: new Date().toISOString(),
    });

    printTicket(ean, price);
    const quickRepliesText = `<quick-replies>\n🔍 Ver producto, 💲 Cambiar precio, 🏷️ Imprimir fleje\n</quick-replies>`;
    const result = { message: "Ticket impreso correctamente.", quickRepliesText } as const;

    logToolResult({
      toolName: "printTicket",
      output: result,
      ts: new Date().toISOString(),
    });

    return result;
  },
});
