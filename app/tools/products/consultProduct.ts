import { tool } from "ai";
import { z } from "zod";
import { logTool } from "../../lib/logger";
import { getProductConsultingByEan } from "../../services/products/consultantService";
import { formatConsultingMessage } from "../../services/products/consultingFormatter";
import type { ConsultingLike } from "../../services/products/consultingFormatter";

export const consultProductTool = tool({
  description: `
    **Objetivo:**
    Consultar stock y reposición de un producto específico por su EAN para decidir acciones (reponer, imprimir, comunicar).

    **Retorno:**
    Retorna:
    { consulting } con: ean, name, price, quantity, inventory { store, warehouse, neighborhoodStores, lastArrival, nextArrival }, restockAdvice.

    Cuando usar:
    - Usuario ya seleccionó un producto o brindó un EAN y pide: "consultar", "stock", "disponibilidad", "reposiciones".
    - Luego de encontrar 1 resultado en búsqueda por nombre (findProductByName), encadenar con su EAN.

    Cuando NO usar:
    - Si el usuario pide buscar por nombre/palabra clave (usar findProductByName).
    - Si solo quiere actualizar precio (usar changePrice si corresponde al flujo).

    Como presentar al usuario los datos:
    - Markdown simple. Lista con: Precio, Disponibilidad (tienda/CD/tiendas cercanas), Próxima recepción, Recomendación.
    - Agregar bloque <quick-replies> con acciones al final.

    Siempre debes devolver el siguiente formato de respuesta:
    **Nombre del producto**
    — EAN 7798901234569
    — Precio $ 420.00
    - 📦 Disponibilidad:
         - 🏪 En tienda: 34 unidades; 
         - 🏢 CD: 89 unidades; 
    - 📅 Proxima recepción: 10/09 (94 unidades) 🏢
    
    Herramientas complementarias:
    - findProductByName, changePrice, printTicket, getTodaysShipments, sendEmail, sendWhatsAppMessage.
  `,
  inputSchema: z.object({
    ean: z
      .string()
      .describe("Código EAN del producto (sólo dígitos), ej.: '7791234567890'"),
  }),
  execute: async ({ ean }) => {
    const toolName = "consultProduct";
    const consulting = getProductConsultingByEan(ean);
    if (!consulting) {
      const output = { error: "Producto no encontrado por EAN." } as const;
      logTool({ toolName, input: { ean }, output });
      return output;
    }
    const message = formatConsultingMessage(consulting as ConsultingLike);
    const output = { message, consulting } as const;
    logTool({ toolName, input: { ean }, output });
    return output;
  },
});
