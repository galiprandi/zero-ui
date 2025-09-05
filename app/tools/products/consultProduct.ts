import { tool } from "ai";
import { z } from "zod";
import { logToolExecute, logToolResult } from "../../lib/logger";
import { getProductConsultingByEan } from "../../services/products/consultantService";

export const consultProductTool = tool({
  description:
    "Consultar stock y reposición de un producto por EAN. Retorna { consulting } con stock en tienda, tiendas cercanas, CD y recomendación de reposición.",
  inputSchema: z.object({
    ean: z
      .string()
      .describe("Código EAN del producto (sólo dígitos), ej.: '7791234567890'"),
  }),
  execute: async ({ ean }) => {
    logToolExecute({
      toolName: "consultProduct",
      input: { ean },
      ts: new Date().toISOString(),
    });

    const output = getProductConsultingByEan(ean);

    logToolResult({
      toolName: "consultProduct",
      ts: new Date().toISOString(),
      output: { ...output },
    });

    return output;
  },
});
