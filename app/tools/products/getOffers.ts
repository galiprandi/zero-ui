import { tool } from "ai";
import { z } from "zod";
import { getRandomOffers } from "../../services/products/offerService";
import { logToolExecute, logToolResult } from "../../lib/logger";

export const getOffersTool = tool({
  description:
    "Obtener productos en oferta actuales. Retorna { offers }. Usar para mostrar '🎁 Ofertas' con imagen, nombre, categoría y precio.",
  inputSchema: z.object({}),
  execute: async () => {
    logToolExecute({
      toolName: "getOffers",
      input: {},
      ts: new Date().toISOString(),
    });

    const offers = getRandomOffers();
    const result = { offers };

    logToolResult({
      toolName: "getOffers",
      output: result,
      ts: new Date().toISOString(),
    });

    return result;
  },
});
