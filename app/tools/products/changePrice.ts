import { tool } from "ai";
import { z } from "zod";
import { logTool } from "../../lib/logger";
import { changePriceService } from "../../services/products/priceService";

// Logic moved to services/products/priceService.ts

export const changePriceTool = tool({
  description:
    "💲 Cambiar precio — Actualiza el precio de un producto.\n\nCuándo usar: cuando el usuario pide cambiar/actualizar precio de un producto ya identificado por EAN.\nCuándo NO usar: si no se conoce el EAN (usar findProductByEan/findProductByName).\nContrato: si falta newPrice, retorna { message, quickRepliesText } pidiendo nuevo precio; si se envía y es válido, retorna { message, updatedPrice, quickRepliesText }; si no existe, { error }.\nFormato: Markdown simple, mobile-first.",
  inputSchema: z.object({
    ean: z
      .string()
      .describe("Código EAN del producto (sólo dígitos), ej.: '7791234567890'"),
    newPrice: z
      .string()
      .optional()
      .describe(
        "Nuevo precio propuesto (opcional). Si se omite, la tool pedirá el nuevo precio.",
      ),
  }),
  execute: async ({ ean, newPrice }) => {
    const toolName = "changePrice";
    const output = changePriceService({ ean, newPrice });
    logTool({ toolName, input: { ean, newPrice }, output });
    return output;
  },
});
