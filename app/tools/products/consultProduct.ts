import { tool } from "ai";
import { z } from "zod";
import { logToolExecute, logToolResult } from "../../lib/logger";
import { getProductConsultingByEan } from "../../services/products/consultantService";

export const consultProductTool = tool({
  description: `Consultar stock y reposición de un producto por EAN. Muestra precio, stock en tienda, tiendas cercanas, 
    CD y recomendación de reposición.

    Utilizar cuando:
    - El usuario hace foco en un producto específico: 📦 Consultar stock
    - El usuario hace foco en un producto sin o con poco inventario: 🚚 Ver recepciones


    Formato de salida: Markdown simple, SIN bloques de código.
    
    Ejemplo:
    ## [Nombre del producto]
    
    - Precio: $999,99
    - 📦 Disponibilidad:
         - 🏪 En tienda: 34 unidades; 
         - 🏢 CD: 89 unidades; 
    - 📅 Proxima recepción: 10/09 (94 unidades) 🏢

    <quick-replies>
    💵 Actualizar precio, 🖨️ Imprimir fleje, 📲 WhatsApp, 
    </quick-replies>

    Si no hay envíos para hoy, responde:
    🚚 Próximas recepciones:
    - No hay envíos programados para hoy.
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
