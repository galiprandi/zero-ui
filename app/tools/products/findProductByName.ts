import { tool } from "ai";
import { z } from "zod";
import { logToolExecute, logToolResult } from "../../lib/logger";
import { searchByName } from "../../services/products/searchByName";

export const findProductByNameTool = tool({
  description: `Buscar productos por nombre (parcial o completo). Retorna { products }.

    Cuándo usar (dispara esta herramienta):
    - El usuario pide por nombre o palabra clave: "mayonesa", "arroz gallo", "oreo".
    - Preguntas como: "stock de <nombre>", "¿hay <nombre>?", "precio de <nombre>", "buscar <nombre>", "necesito <nombre>".
    - Cuando no hay EAN proporcionado explícitamente.

    Cuándo NO usar:
    - Si el usuario provee/escanea un EAN (usa findProductByEan).
    - Si el usuario ya seleccionó un producto específico y quiere stock/reposición (usa consultProduct con su EAN).

    Presentación (Markdown simple):
    - Si hay 1 resultado: puedes continuar con el flujo del consultor (consultProduct) automáticamente.
    - Si hay varios: lista hasta 5 opciones como "- [Nombre] — EAN <ean> — [Categoría]".
    - Al final agrega <quick-replies> con 2–3 opciones para seleccionar el producto por EAN o nombre corto, por ejemplo: "🧠 Consultar <ean>", "💲 Precio <ean>".
    `,
  inputSchema: z.object({
    query: z
      .string()
      .describe(
        "Consulta de búsqueda (nombre parcial o completo), ej.: 'arroz'",
      ),
  }),
  execute: async ({ query }) => {
    logToolExecute({
      toolName: "findProductByName",
      input: { query },
      ts: new Date().toISOString(),
    });

    const products = searchByName(query);
    const result = { products };

    logToolResult({
      toolName: "findProductByName",
      output: result,
      ts: new Date().toISOString(),
    });

    return result;
  },
});
