import { tool } from "ai";
import { z } from "zod";
import { logToolExecute, logToolResult } from "../../lib/logger";
import { getProductConsultingByEan } from "../../services/products/consultantService";

export const consultProductTool = tool({
  description: `Objetivo: consultar stock y reposición de un producto específico por su EAN. Devuelve información para decidir reposición y próximas acciones.

    Cuándo usar (disparadores):
    - El usuario ya seleccionó un producto o dio un EAN y pide: "consultar", "stock", "disponibilidad", "reposiciones".
    - Tras encontrar 1 resultado en búsqueda por nombre (findProductByName), encadenar automáticamente esta tool con su EAN.

    Cuándo NO usar:
    - Si el usuario pide buscar por nombre/palabra clave (usa findProductByName).
    - Si el usuario solo quiere saber el precio (puede usarse changePrice si corresponde al flujo de actualización).

    Contrato de datos (lo que retorna el servicio):
    - consulting: {
        ean, name, price, quantity,
        inventory: { store, warehouse, neighborhoodStores, lastArrival, nextArrival },
        restockAdvice
      }

    Formato de salida (Markdown simple, sin bloques de código):
    - Título opcional en una línea corta (no usar encabezados grandes dentro de listas).
    - Lista con claves: Precio, Disponibilidad (tienda/CD/tiendas cercanas), Próxima recepción si existe, Recomendación breve.
    - Al final, bloque <quick-replies> con acciones concretas.

    Ejemplo (ilustrativo):
    [Mayonesa Hellmann's 237g — EAN 7798901234569]
    - 💲 Precio: $420.00
    - 📦 Disponibilidad: 🏪 34 en tienda · 🏢 89 en CD · 🏬 cercanas OK
    - 📅 Próxima recepción: 10/09 (94 unidades) 🏢
    - ✅ Reposición recomendada: 24 unidades (hoy)

    <quick-replies>
    🖨️ Imprimir ticket, 💲 Actualizar precio, 📲 WhatsApp, 🚚 Ver recepciones
    </quick-replies>
    `,
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

    const output = getProductConsultingByEan(ean);

    logToolResult({
      toolName: "consultProduct",
      ts: new Date().toISOString(),
      output: { ...output },
    });

    return output;
  },
});
