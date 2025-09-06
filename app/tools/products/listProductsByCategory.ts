import { tool } from "ai";
import { z } from "zod";
import { logTool } from "../../lib/logger";
import { searchByCategory } from "../../services/products/searchByCategory";

export const listProductsByCategoryTool = tool({
  description:
    "📂 Listar por categoría — Muestra productos de una categoría.\n\nCuándo usar: cuando el usuario pide navegar por un rubro/pasillo o selecciona una categoría.\nCuándo NO usar: si pide un producto específico por EAN o por nombre (usar findProductByEan/findProductByName).\nContrato de salida: retorna { products }.\nFormato: lista breve o tabla compacta, mobile-first.",
  inputSchema: z.object({
    categoryId: z
      .number()
      .describe("ID numérico de la categoría (ver listado de categorías)."),
  }),
  execute: async ({ categoryId }) => {
    const toolName = "listProductsByCategory";
    const output = { products: searchByCategory(categoryId) } as const;
    logTool({ toolName, input: { categoryId }, output });
    return output;
  },
});
