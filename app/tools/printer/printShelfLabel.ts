import { tool } from "ai";
import { z } from "zod";
import { logToolExecute, logToolResult } from "../../lib/logger";
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
    logToolExecute({
      toolName: "printShelfLabel",
      input: { ean },
      ts: new Date().toISOString(),
    });

    const product = searchByEan(ean);
    if (!product) {
      const result = { error: "Producto no encontrado por EAN." } as const;
      logToolResult({
        toolName: "printShelfLabel",
        output: result,
        ts: new Date().toISOString(),
      });
      return result;
    }

    printLabel(ean);
    const quickRepliesText = `<quick-replies>\n🔍 Ver producto, 💲 Cambiar precio, 🖨️ Imprimir ticket\n</quick-replies>`;
    const result = {
      message: `Fleje impreso para ${product.name} (${ean}).`,
      quickRepliesText,
    } as const;

    logToolResult({
      toolName: "printShelfLabel",
      output: result,
      ts: new Date().toISOString(),
    });
    return result;
  },
});
