import { tool } from "ai";
import { object } from "zod";
import { logTool } from "../../lib/logger";
import { getTodaysShipments } from "../../services/shipment/shipmentService";

export const getTodaysShipmentsTool = tool({
  description: `
    Objetivo: listar los envíos del día (ID y hora estimada). Retorna { shipments }.

    Cuándo usar (dispara esta herramienta):
    - El usuario pide "🚚 Recepciones" o preguntas equivalentes: "recepciones de hoy", "próximas entregas", "qué llega hoy".
    - El usuario visualiza/consulta un producto con poco o nulo stock y pide ver reposición/recepciones.
    - Consultas de disponibilidad futura del día ("¿a qué hora llega el envío #ID?", "¿qué llega más tarde?").

    Cuándo NO usar:
    - Preguntas históricas (ayer/semana pasada) o de otros días que no sean hoy.
    - Preguntas de detalle de UN envío específico (usa el flujo de detalle correspondiente si existe).
    - Preguntas de stock actual de un producto sin relación a recepciones (usa la herramienta de producto/stock).

    Salida (Markdown simple, sin bloques de código):
    - Primera línea: "🚚 Próximas recepciones:"
    - Luego, hasta 6 ítems en viñetas ("-"), ordenados por hora ascendente (HH:MMhs).
    - Si hay envíos con ETA >= ahora, mostrar solo esos; si no, mostrar los más cercanos del día.
    - Empate: secundario por ID ascendente.
    - Formato exacto por ítem: "HH:MMhs — Envío #ID — N productos" donde N = products.length del envío.
    - No agregues emojis ni puntuación extra dentro de cada ítem; usa exactamente los guiones y espacios indicados.

    Contrato de datos (lo que te entrego):
    - { shipments }: Array<{ id: string; estimatedTime: string; products: Product[]; ... }>
    - estimatedTime viene en formato HH:MM (24h). Usa ese valor sin modificar salvo agregar "hs".
    `,
  inputSchema: object({}),
  execute: async () => {
    const toolName = "getTodaysShipments";
    const output = getTodaysShipments();
    logTool({ toolName, output });
    return output;
  },
});
