import { tool } from "ai";
import { z } from "zod";
import { searchByName } from "../../services/products/searchByName";
import { logToolExecute, logToolResult } from "../../lib/logger";

export const findProductByNameTool = tool({
  description: "Buscar productos por nombre parcial. Útil para localizar artículos en el inventario.",
  inputSchema: z.object({
    query: z.string().describe("Consulta de nombre del producto"),
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
