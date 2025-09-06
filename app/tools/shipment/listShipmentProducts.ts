import { tool } from "ai";
import { z } from "zod";
import categories from "../../data/categories.json";
import { logTool } from "../../lib/logger";
import { getShipmentDetails } from "../../services/shipment/shipmentService";

export const listShipmentProductsTool = tool({
  description:
    "📦 Contenido de envío — Lista productos o categorías de un envío.\n\nCuándo usar: luego de seleccionar un ID de envío desde 'Recepciones'.\nCuándo NO usar: si aún no se confirmó el ID (usar getTodaysShipments).\nContrato: cuando mode='full' retorna { products }; cuando mode='categories' retorna { categories }.\nFormato: tabla/lista breve. Evitar mostrar EAN en tablas de recepción.",
  inputSchema: z.object({
    id: z.string().describe("ID del envío (ej.: '#A102')"),
    mode: z
      .enum(["full", "categories"])
      .describe(
        "'full' = listado completo; 'categories' = resumen por categoría",
      ),
  }),
  execute: async ({ id, mode }) => {
    const toolName = "listShipmentProducts";

    const details = getShipmentDetails(id);
    if (!details) {
      const output = { error: "Envío no encontrado" } as const;
      logTool({ toolName, input: { id, mode }, output });
      return output;
    }

    let output: {
      products?: unknown;
      categories?: { name: string; totalQuantity: number }[];
    };
    if (mode === "full") {
      output = { products: details.products };
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
      output = { categories: categoriesList };
    }

    logTool({ toolName, input: { id, mode }, output });
    return output;
  },
});
