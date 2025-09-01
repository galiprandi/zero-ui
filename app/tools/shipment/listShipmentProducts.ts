import { tool } from "ai";
import { z } from "zod";
import { getShipmentDetails } from "../../services/products/shipmentService";
import categories from "../../data/categories.json";
import { logToolExecute, logToolResult } from "../../lib/logger";

export const listShipmentProductsTool = tool({
  description:
    "List products in a shipment, either full list or categories only",
  inputSchema: z.object({
    id: z.string().describe("The shipment ID"),
    mode: z
      .enum(["full", "categories"])
      .describe(
        "Mode: 'full' for complete list, 'categories' for category summary",
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

    logToolResult({
      toolName: "listShipmentProducts",
      output: result,
      ts: new Date().toISOString(),
    });

    return result;
  },
});
