import { tool } from "ai";
import { z } from "zod";
import { logToolExecute, logToolResult } from "../../lib/logger";
import { searchByName } from "../../services/products/searchByName";

export const findProductByNameTool = tool({
  description:
    "Buscar productos por nombre (parcial o completo). Retorna { products }. Usar cuando el usuario pide por nombre o palabra clave.",
  inputSchema: z.object({
    query: z
      .string()
      .describe(
        "Consulta de búsqueda (nombre parcial o completo), ej.: 'arroz'",
      ),
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
