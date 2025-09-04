import { tool } from "ai";
import { z } from "zod";
import { logToolExecute, logToolResult } from "../../lib/logger";
import { printLabel } from "../../services/printers/printerService";
import { searchByEan } from "../../services/products/searchByEan";

export const printShelfLabelTool = tool({
  description:
    "Imprimir un fleje/etiqueta de góndola para un producto. Retorna { message }.",
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
    const result = {
      message: `Fleje impreso para ${product.name} (${ean}).`,
    } as const;

    logToolResult({
      toolName: "printShelfLabel",
      output: result,
      ts: new Date().toISOString(),
    });
    return result;
  },
});
