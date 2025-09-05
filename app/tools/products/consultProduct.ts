import { tool } from "ai";
import { z } from "zod";
import { logTool } from "../../lib/logger";
import { getProductConsultingByEan } from "../../services/products/consultantService";

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
    const output = getProductConsultingByEan(ean);
    logTool({ toolName, output });
    return output;
  },
});
