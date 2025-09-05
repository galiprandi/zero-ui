import { tool } from "ai";
import { z } from "zod";
import { getRandomOffers } from "../../services/products/offerService";
import { logToolExecute, logToolResult } from "../../lib/logger";

export const getOffersTool = tool({
  description:
    "🎁 Ofertas — Obtener productos en oferta actuales.\n\nCuándo usar: cuando el usuario pide 'ofertas', 'promos' o necesita ver descuentos.\nCuándo NO usar: si solicitó un producto específico por EAN o por nombre (usar findProductByEan/findProductByName).\nContrato de salida: retorna { offers } (array de productos con imagen|name|category|price).\nFormato de salida: renderizar tabla/lista Markdown breve, mobile-first.\nQuick replies: ofrecer exportación (Email, WhatsApp, Imprimir) al final con <quick-replies>.",
  inputSchema: z.object({}),
  execute: async () => {
    logToolExecute({
      toolName: "getOffers",
      input: {},
      ts: new Date().toISOString(),
    });

    const offers = getRandomOffers();
    const quickRepliesText = `<quick-replies>\n📧 Al email, 📲 WhatsApp, 🖨️ Imprimir\n</quick-replies>`;
    const result = { offers, quickRepliesText } as const;

    logToolResult({
      toolName: "getOffers",
      output: result,
      ts: new Date().toISOString(),
    });

    return result;
  },
});
