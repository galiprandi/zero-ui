import { tool } from "ai";
import { z } from "zod";
import { logToolExecute, logToolResult } from "../../lib/logger";
import { searchByEan } from "../../services/products/searchByEan";

function parsePrice(input: string) {
  // Acepta formatos como "$9.99", "9,99", "9.99"
  const cleaned = input.replace(/[^0-9.,]/g, "").replace(",", ".");
  const value = Number.parseFloat(cleaned);
  return Number.isFinite(value) ? value : null;
}

function formatPrice(value: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(value);
}

export const changePriceTool = tool({
  description:
    "💲 Cambiar precio — Actualiza el precio de un producto.\n\nCuándo usar: cuando el usuario pide cambiar/actualizar precio de un producto ya identificado por EAN.\nCuándo NO usar: si no se conoce el EAN (usar findProductByEan/findProductByName).\nContrato: si falta newPrice, retorna { message, quickRepliesText } pidiendo nuevo precio; si se envía y es válido, retorna { message, updatedPrice, quickRepliesText }; si no existe, { error }.\nFormato: Markdown simple, mobile-first.\nQuick replies: sugerir acciones posteriores (imprimir fleje, registrar merma, ver producto, cancelar) en bloque <quick-replies> al final.",
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
    logToolExecute({
      toolName: "changePrice",
      input: { ean, newPrice },
      ts: new Date().toISOString(),
    });

    const product = searchByEan(ean);
    if (!product) {
      const result = { error: "Producto no encontrado por EAN." } as const;
      logToolResult({
        toolName: "changePrice",
        output: result,
        ts: new Date().toISOString(),
      });
      return result;
    }

    // Precio actual desde dataset (string), intentamos parsear a número para normalizar
    const currentNumeric = parsePrice(product.price);
    const currentLabel =
      currentNumeric != null ? formatPrice(currentNumeric) : product.price;

    if (!newPrice) {
      const message = `Precio actual de ${product.name}: ${currentLabel}. ¿Cuál es el nuevo precio?`;
      const quickRepliesText = `<quick-replies>\n${["+5%", "+10%", "+20%", "-5%", "Cancelar"].join(", ")}\n</quick-replies>`;
      const result = { message, quickRepliesText } as const;
      logToolResult({
        toolName: "changePrice",
        output: result,
        ts: new Date().toISOString(),
      });
      return result;
    }

    const numeric = parsePrice(newPrice);
    if (numeric == null || numeric <= 0) {
      const result = {
        error: "Precio inválido. Ingresá un número mayor a 0 (ej.: 1234.56).",
      } as const;
      logToolResult({
        toolName: "changePrice",
        output: result,
        ts: new Date().toISOString(),
      });
      return result;
    }

    // Simular actualización (no hay persistencia). Devolver confirmación.
    const updatedLabel = formatPrice(numeric);
    const message = `Precio actualizado para ${product.name} (${ean}): ${currentLabel} → ${updatedLabel}.`;
    const quickRepliesText = `<quick-replies>\n${["🏷️ Imprimir fleje", "🧾 Registrar merma", "🔍 Ver producto", "❌ Cancelar"].join(", ")}\n</quick-replies>`;

    const result = {
      message,
      updatedPrice: updatedLabel,
      quickRepliesText,
    } as const;
    logToolResult({
      toolName: "changePrice",
      output: result,
      ts: new Date().toISOString(),
    });
    return result;
  },
});
