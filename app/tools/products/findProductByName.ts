import { tool } from "ai";
import { z } from "zod";
import { logTool } from "../../lib/logger";
import { searchByName } from "../../services/products/searchByName";

export const findProductByNameTool = tool({
  description: `🔎 Buscar por nombre — Encuentra productos por nombre (parcial o completo). Retorna { products }.

    Cuándo usar:
    - El usuario pide por nombre o palabra clave: "mayonesa", "arroz gallo", "oreo".
    - Preguntas como: "stock de <nombre>", "¿hay <nombre>?", "precio de <nombre>", "buscar <nombre>", "necesito <nombre>".
    - Cuando NO hay EAN proporcionado explícitamente.

    Cuándo NO usar:
    - Si el usuario provee/escanea un EAN (usa findProductByEan).
    - Si el usuario ya seleccionó un producto específico y quiere stock/reposición (usa consultProduct con su EAN).

    Presentación (Markdown simple):
    - Si hay 1 resultado: puedes encadenar consultProduct automáticamente con su EAN.
    - Si hay varios: lista hasta 5 opciones como "- [Nombre] — EAN <ean> — [Categoría]".
    `,
  inputSchema: z.object({
    query: z
      .string()
      .describe(
        "Consulta de búsqueda (nombre parcial o completo), ej.: 'arroz'",
      ),
  }),
  execute: async ({ query }) => {
    const toolName = "findProductByName";
    const products = searchByName(query);
    const output = { products } as const;
    logTool({ toolName, input: { query }, output });
    return output;
  },
});
