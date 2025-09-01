import { tool } from "ai";
import { z } from "zod";
import { searchByCategory } from "../../services/products/searchByCategory";
import { logToolExecute, logToolResult } from "../../lib/logger";

export const listProductsByCategoryTool = tool({
  description:
    "List products by category. Useful for managing supermarket sections.",
  inputSchema: z.object({
    categoryId: z.number().describe("Category ID"),
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
