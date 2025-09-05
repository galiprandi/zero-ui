import { tool } from "ai";
import { z } from "zod";
import { getShipmentDetails } from "../../services/shipment/shipmentService";
import categories from "../../data/categories.json";
import { logToolExecute, logToolResult } from "../../lib/logger";

export const listShipmentProductsTool = tool({
  description:
    "📦 Contenido de envío — Lista productos o categorías de un envío.\n\nCuándo usar: luego de seleccionar un ID de envío desde 'Recepciones'.\nCuándo NO usar: si aún no se confirmó el ID (usar getTodaysShipments).\nContrato: cuando mode='full' retorna { products }; cuando mode='categories' retorna { categories }.\nFormato: tabla/lista breve. Evitar mostrar EAN en tablas de recepción.\nQuick replies: ofrecer exportación (Email/WhatsApp/Imprimir) al final con <quick-replies>.",
  inputSchema: z.object({
    id: z.string().describe("ID del envío (ej.: '#A102')"),
    mode: z
      .enum(["full", "categories"])
      .describe(
        "'full' = listado completo; 'categories' = resumen por categoría",
      ),
  }),
  execute: async ({ id, mode }) => {
    logToolExecute({
      toolName: "listShipmentProducts",
      input: { id, mode },
      ts: new Date().toISOString(),
    });

    const details = getShipmentDetails(id);
    if (!details) {
      const result = { error: "Envío no encontrado" };
      logToolResult({
        toolName: "listShipmentProducts",
        output: result,
        ts: new Date().toISOString(),
      });
      return result;
    }

    let result: {
      products?: unknown;
      categories?: { name: string; totalQuantity: number }[];
      quickRepliesText?: string;
    };
    if (mode === "full") {
      result = { products: details.products };
    } else {
      // Group by category
      const categoryCounts: Record<string, number> = {};
      details.products.forEach((product) => {
        const category = categories.find(
          (cat: { id: number; name: string }) => cat.id === product.categoryId,
        );
        const categoryName = category ? category.name : "Desconocida";
        categoryCounts[categoryName] =
          (categoryCounts[categoryName] || 0) + product.quantity;
      });
      const categoriesList = Object.entries(categoryCounts).map(
        ([name, count]) => ({
          name,
          totalQuantity: count,
        }),
      );
      result = { categories: categoriesList };
    }

    // Add canonical quick replies for export
    const quickRepliesText = `<quick-replies>\n📧 Al email, 📲 WhatsApp, 🖨️ Imprimir\n</quick-replies>`;
    result.quickRepliesText = quickRepliesText;

    logToolResult({
      toolName: "listShipmentProducts",
      output: result,
      ts: new Date().toISOString(),
    });

    return result;
  },
});
