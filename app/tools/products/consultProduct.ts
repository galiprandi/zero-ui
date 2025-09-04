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

    const consulting = getProductConsultingByEan(ean);

    // Construye un resumen legible en español (estilo mobile-first)
    let summary = "";
    let quickRepliesText = "";
    if (consulting) {
      const { name, price, quantity, inventory, restockAdvice } = consulting;
      const daysTo = (iso?: string | null) => {
        if (!iso) return null;
        const target = new Date(iso);
        const now = new Date();
        const diff = Math.ceil(
          (target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
        );
        return diff <= 0 ? "hoy" : `${diff} día${diff === 1 ? "" : "s"}`;
      };
      const nextIn = daysTo(inventory.nextArrival?.date ?? null);
      const lastWhen = (() => {
        const t = daysTo(inventory.lastArrival?.date ?? null);
        if (!t) return null;
        // si fue en el pasado, daysTo daría negativo como null; manejado arriba.
        return t === "hoy" ? "hoy" : `hace ${t}`;
      })();

      const parts: string[] = [];
      parts.push(`• ${name} — ${price}`);
      parts.push(`• En tienda: ${quantity} u`);
      if (inventory.warehouse > 0) {
        parts.push(`• En centro de distribución: ${inventory.warehouse} u`);
      } else {
        parts.push("• No hay en centro de distribución");
      }
      const nearTotal = inventory.neighborhoodStores.reduce(
        (a, b) => a + b.quantity,
        0,
      );
      if (nearTotal > 0) {
        parts.push(`• En tiendas cercanas: ${nearTotal} u totales`);
      } else {
        parts.push("• No hay stock en tiendas cercanas");
      }
      if (lastWhen) parts.push(`• Última llegada: ${lastWhen}`);
      if (nextIn) parts.push(`• Próxima llegada: llega en ${nextIn}`);
      parts.push(`• Consejo: ${restockAdvice}`);

      summary = parts.join("\n");

      // Quick replies específicos para el Consultor
      const qr: string[] = [];
      qr.push("🏬 Ver tiendas cercanas");
      if (inventory.warehouse === 0 && nearTotal > 0) {
        qr.push("📦 Solicitar a reposición");
      }
      qr.push("💲 Actualizar precio");
      qr.push("🧾 Registrar merma");
      qr.push("🏷️ Imprimir fleje");
      quickRepliesText = `<quick-replies>\n${qr.join(", ")}\n</quick-replies>`;
    }

    const result = { consulting, summary, quickRepliesText };

    logToolResult({
      toolName: "consultProduct",
      output: result,
      ts: new Date().toISOString(),
    });

    return result;
  },
});
