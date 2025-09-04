import { tool } from "ai";
import { z } from "zod";
import { searchByCategory } from "../../services/products/searchByCategory";
import { logToolExecute, logToolResult } from "../../lib/logger";

export const listProductsByCategoryTool = tool({
  description:
    "Listar productos por ID de categoría. Retorna { products }. Usar para navegar por un pasillo/sección específica.",
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
    const result = { products };

    logToolResult({
      toolName: "listProductsByCategory",
      output: result,
      ts: new Date().toISOString(),
    });

    return result;
  },
});
