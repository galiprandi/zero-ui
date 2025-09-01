import { tool } from "ai";
import { z } from "zod";
import { searchByEan } from "../../services/products/searchByEan";
import { logToolExecute, logToolResult } from "../../lib/logger";

export const findProductByEanTool = tool({
  description:
    "Search for product by EAN code. Useful for verifying specific details.",
  inputSchema: z.object({
    ean: z.string().describe("Product EAN code"),
  }),
  execute: async ({ ean }) => {
    logToolExecute({
      toolName: "findProductByEan",
      input: { ean },
      ts: new Date().toISOString(),
    });

    const product = searchByEan(ean);
    const result = { product };

    logToolResult({
      toolName: "findProductByEan",
      output: result,
      ts: new Date().toISOString(),
    });

    return result;
  },
});
