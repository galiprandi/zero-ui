import { tool } from "ai";
import { z } from "zod";
import { logTool } from "../../lib/logger";
import { getProductConsultingByEan } from "../../services/products/consultantService";

export const requestRestockTool = tool({
  description:
    "Solicitar reposición desde tiendas cercanas cuando CD no tiene stock. Simulado: valida situación, sugiere origen y devuelve confirmación.",
  inputSchema: z.object({
    ean: z
      .string()
      .describe("Código EAN del producto (sólo dígitos), ej.: '7791234567890'"),
    quantity: z
      .number()
      .int()
      .positive()
      .optional()
      .describe(
        "Cantidad a solicitar (opcional). Si se omite, se calculará sugerencia.",
      ),
  }),
  execute: async ({ ean, quantity }) => {
    const toolName = "requestRestock";

    const consulting = getProductConsultingByEan(ean);
    if (!consulting) {
      const output = { error: "Producto no encontrado por EAN." } as const;
      logTool({ toolName, input: { ean, quantity }, output });
      return output;
    }

    const { name, inventory } = consulting;

    if (inventory.warehouse > 0) {
      const message = `El centro de distribución tiene ${inventory.warehouse} u de ${name}. Conviene solicitar al CD en lugar de tiendas cercanas.`;
      const output = { message } as const;
      logTool({ toolName, input: { ean, quantity }, output });
      return output;
    }

    const near = inventory.neighborhoodStores
      .filter((s) => s.quantity > 0)
      .sort((a, b) => b.quantity - a.quantity);
    const nearTotal = near.reduce((a, b) => a + b.quantity, 0);

    if (nearTotal === 0) {
      const message = `No hay stock en tiendas cercanas ni en CD para ${name}. Se sugiere alternativa o consulta a proveedor.`;
      const output = { message } as const;
      logTool({ toolName, input: { ean, quantity }, output });
      return output;
    }

    const suggested =
      quantity ?? Math.min(nearTotal, Math.max(5, consulting.quantity * 2));
    const picks: { store: string; flag: string; take: number }[] = [];
    let remaining = suggested;
    for (const s of near) {
      if (remaining <= 0) break;
      const take = Math.min(s.quantity, remaining);
      if (take > 0) {
        picks.push({ store: s.store, flag: s.flag, take });
        remaining -= take;
      }
    }

    const lines = [
      `Reposición solicitada para ${name}: ${suggested} u (simulado).`,
      `Origen sugerido:`,
      ...picks.map((p) => `• ${p.flag} ${p.store}: ${p.take} u`),
    ];
    if (remaining > 0)
      lines.push(
        `• Faltante restante: ${remaining} u (no cubierto por tiendas cercanas).`,
      );

    const message = lines.join("\n");
    const output = {
      message,
      requested: suggested,
      picks,
    } as const;
    logTool({ toolName, input: { ean, quantity }, output });
    return output;
  },
});
