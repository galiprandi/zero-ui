import { tool } from "ai";
import { z } from "zod";
import { logTool } from "../../lib/logger";
import { printLabel } from "../../services/printers/printerService";
import { searchByEan } from "../../services/products/searchByEan";

export const printShelfLabelTool = tool({
  description:
    "🏷️ Imprimir fleje — Imprime una etiqueta de góndola para un producto.\n\nCuándo usar: cuando el usuario quiere re-etiquetar en góndola.\nCuándo NO usar: si el producto no está identificado por EAN.\nContrato: retorna { message }.\nFormato: mensaje breve confirmando la impresión.",
  inputSchema: z.object({
    ean: z
      .string()
      .describe("Código EAN del producto (sólo dígitos), ej.: '7791234567890'"),
  }),
  execute: async ({ ean }) => {
    const toolName = "printShelfLabel";

    const product = searchByEan(ean);
    if (!product) {
      const output = { error: "Producto no encontrado por EAN." } as const;
      logTool({ toolName, input: { ean }, output });
      return output;
    }

    printLabel(ean);
    const output = {
      message: `Fleje impreso para ${product.name} (${ean}).`,
    } as const;
    logTool({ toolName, input: { ean }, output });
    return output;
  },
});
