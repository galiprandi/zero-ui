import { tool } from "ai";
import { z } from "zod";
import { logToolExecute, logToolResult } from "../../lib/logger";
import { getRandomOffers } from "../../services/products/offerService";

export const getOffersTool = tool({
  description: `🎁 Ofertas — Obtener productos en oferta actuales para mostrar en un listado.

    Cuándo usar: cuando el usuario pide '🎁 ofertas', '🎁 promos' o necesita ver descuentos.
    Cuándo NO usar: si solicitó un producto específico por EAN o por nombre (usar findProductByEan/findProductByName).

    Contrato de salida: retorna { offers } (array de productos con imagen|name|category|price).
    Formato de salida: renderizar tabla/lista Markdown breve, mobile-first.
    Quick replies: no ofrecer exportación (Email, WhatsApp, Imprimir) al final.
    
   
    
    `,
  inputSchema: z.object({}),
  execute: async () => {
    logToolExecute({
      toolName: "getOffers",
      input: {},
      ts: new Date().toISOString(),
    });

    const offers = getRandomOffers();
    logToolResult({
      toolName: "getOffers",
      output: { offers },
      ts: new Date().toISOString(),
    });

    return offers;
  },
});
