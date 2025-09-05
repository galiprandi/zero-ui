import { tool } from "ai";
import { z } from "zod";
import { searchByCategory } from "../../services/products/searchByCategory";
import { logToolExecute, logToolResult } from "../../lib/logger";

export const listProductsByCategoryTool = tool({
  description:
    "📂 Listar por categoría — Muestra productos de una categoría.\n\nCuándo usar: cuando el usuario pide navegar por un rubro/pasillo o selecciona una categoría.\nCuándo NO usar: si pide un producto específico por EAN o por nombre (usar findProductByEan/findProductByName).\nContrato de salida: retorna { products }.\nFormato: lista breve o tabla compacta, mobile-first.\nQuick replies: ofrecer acciones de exportación y navegación al final con <quick-replies>.",
  inputSchema: z.object({
    categoryId: z
      .number()
      .describe("ID numérico de la categoría (ver listado de categorías)."),
  }),
  execute: async ({ categoryId }) => {
    logToolExecute({
      toolName: "listProductsByCategory",
      input: { categoryId },
      ts: new Date().toISOString(),
    });

    const products = searchByCategory(categoryId);
    const quickRepliesText = `<quick-replies>\n📧 Al email, 📲 WhatsApp, 🖨️ Imprimir\n</quick-replies>`;
    const result = { products, quickRepliesText } as const;

    logToolResult({
      toolName: "listProductsByCategory",
      output: result,
      ts: new Date().toISOString(),
    });

    return result;
  },
});
