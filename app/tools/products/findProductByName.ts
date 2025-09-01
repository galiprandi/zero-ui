import { tool } from "ai";
import { z } from "zod";
import { searchByName } from "../../services/products/searchByName";
import { logToolExecute, logToolResult } from "../../lib/logger";

export const findProductByNameTool = tool({
  description:
    "Search for products by partial name. Useful for locating items in the inventory.",
  inputSchema: z.object({
    query: z.string().describe("Product name query"),
  }),
  execute: async ({ query }) => {
    logToolExecute({
      toolName: "findProductByName",
      input: { query },
      ts: new Date().toISOString(),
    });

    const products = searchByName(query);
    const result = { products };

    logToolResult({
      toolName: "findProductByName",
      output: result,
      ts: new Date().toISOString(),
    });

    return result;
  },
});
