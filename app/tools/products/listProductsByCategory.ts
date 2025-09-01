import { tool } from "ai";
import { z } from "zod";
import { searchByCategory } from "../../services/products/searchByCategory";
import { logToolExecute, logToolResult } from "../../lib/logger";

export const listProductsByCategoryTool = tool({
  description: "Listar productos por categoría. Útil para gestionar secciones del supermercado.",
  inputSchema: z.object({
    categoryId: z.number().describe("ID de la categoría"),
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
