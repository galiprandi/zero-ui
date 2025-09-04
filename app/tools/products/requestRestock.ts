import { tool } from "ai";
import { z } from "zod";
import { logToolExecute, logToolResult } from "../../lib/logger";
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
    logToolExecute({
      toolName: "requestRestock",
      input: { ean, quantity },
      ts: new Date().toISOString(),
    });

    const consulting = getProductConsultingByEan(ean);
    if (!consulting) {
      const result = { error: "Producto no encontrado por EAN." } as const;
      logToolResult({
        toolName: "requestRestock",
        output: result,
        ts: new Date().toISOString(),
      });
      return result;
    }

    const { name, inventory } = consulting;

    if (inventory.warehouse > 0) {
      const message = `El centro de distribución tiene ${inventory.warehouse} u de ${name}. Conviene solicitar al CD en lugar de tiendas cercanas.`;
      const quickRepliesText = `<quick-replies>\nSolicitar al CD, 🏬 Ver tiendas cercanas, ❌ Cancelar\n</quick-replies>`;
      const result = { message, quickRepliesText } as const;
      logToolResult({
        toolName: "requestRestock",
        output: result,
        ts: new Date().toISOString(),
      });
      return result;
    }

    const near = inventory.neighborhoodStores
      .filter((s) => s.quantity > 0)
      .sort((a, b) => b.quantity - a.quantity);
    const nearTotal = near.reduce((a, b) => a + b.quantity, 0);

    if (nearTotal === 0) {
      const message = `No hay stock en tiendas cercanas ni en CD para ${name}. Se sugiere alternativa o consulta a proveedor.`;
      const quickRepliesText = `<quick-replies>\n🔍 Buscar alternativa, 🧾 Registrar merma, ❌ Cancelar\n</quick-replies>`;
      const result = { message, quickRepliesText } as const;
      logToolResult({
        toolName: "requestRestock",
        output: result,
        ts: new Date().toISOString(),
      });
      return result;
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
    const quickRepliesText = `<quick-replies>\n🏷️ Imprimir fleje, 🧾 Registrar merma, 📧 Email, 📲 WhatsApp\n</quick-replies>`;
    const result = {
      message,
      requested: suggested,
      picks,
      quickRepliesText,
    } as const;

    logToolResult({
      toolName: "requestRestock",
      output: result,
      ts: new Date().toISOString(),
    });
    return result;
  },
});
