import { tool } from "ai";
import { z } from "zod";
import { logTool } from "../../lib/logger";
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
    const toolName = "getOffers";
    const output = { offers: getRandomOffers() };
    logTool({ toolName, output });
    return output;
  },
});
