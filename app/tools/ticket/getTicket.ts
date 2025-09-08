import { tool } from "ai";
import { z } from "zod";
import { getTicket } from "../../services/ticket/getTicketService";

// Minimalistic tool: short description, simple schema, delegates to service
export const getTicketTool = tool({
  description: "Obtiene un ticket por número.",
  inputSchema: z.object({
    ticketNumber: z
      .string()
      .trim()
      .min(1, "El número de ticket es requerido")
      .describe("Número de ticket a consultar"),
  }),
  execute: async ({ ticketNumber }) => {
    const ticket = getTicket(ticketNumber);
    return { ticket };
  },
});
