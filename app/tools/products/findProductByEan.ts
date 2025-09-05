import { tool } from "ai";
import { z } from "zod";
import { searchByEan } from "../../services/products/searchByEan";
import { logToolExecute, logToolResult } from "../../lib/logger";

export const findProductByEanTool = tool({
  description:
    "🔎 Buscar por EAN — Busca un producto por su código de barras.\n\nCuándo usar: cuando el usuario escanea/proporciona un EAN explícito.\nCuándo NO usar: si pide por nombre o categoría (usar findProductByName/listProductsByCategory).\nContrato de salida: retorna { product } o { product: null } si no existe.\nFormato: responder de forma breve, y si hay product, sugerir acciones con <quick-replies> (consultar, imprimir, cambiar precio).",
  inputSchema: z.object({
    ean: z
      .string()
      .describe("Código EAN del producto (solo dígitos), ej.: '7791234567890'"),
  }),
  execute: async ({ ean }) => {
    logToolExecute({
      toolName: "findProductByEan",
      input: { ean },
      ts: new Date().toISOString(),
    });

    const product = searchByEan(ean);
    const quickRepliesText = product
      ? `<quick-replies>\n🧠 Consultor de productos, 🖨️ Imprimir ticket, 💲 Actualizar precio\n</quick-replies>`
      : "";
    const result = { product, quickRepliesText };

    logToolResult({
      toolName: "findProductByEan",
      output: result,
      ts: new Date().toISOString(),
    });

    return result;
  },
});
