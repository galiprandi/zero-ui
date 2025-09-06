import { tool } from "ai";
import { z } from "zod";
import { logTool } from "../../lib/logger";
import { searchByEan } from "../../services/products/searchByEan";

export const findProductByEanTool = tool({
  description: `
    Objetivo:
    Buscar un producto por su código de barras (EAN).

    Retorna:
    { product, quickRepliesText } donde product puede ser null si no existe.

    Cuando usar:
    - Cuando el usuario escanea/proporciona un EAN explícito.

    Cuando NO usar:
    - Si pide por nombre o categoría (usar findProductByName/listProductsByCategory).

    Herramientas complementarias:
    - consultProduct, changePrice, printTicket, printShelfLabel.
  `,
  inputSchema: z.object({
    ean: z
      .string()
      .describe("Código EAN del producto (solo dígitos), ej.: '7791234567890'"),
  }),
  execute: async ({ ean }) => {
    const toolName = "findProductByEan";
    const product = searchByEan(ean);
    const output = { product };
    logTool({ toolName, output, input: ean });
    return output;
  },
});
