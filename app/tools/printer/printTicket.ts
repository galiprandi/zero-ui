import { tool } from "ai";
import { z } from "zod";
import { printTicket } from "../../services/printers/ticketService";
import { logToolExecute, logToolResult } from "../../lib/logger";

export const printTicketTool = tool({
  description: "Print ticket for a product. Useful for sales receipts.",
  inputSchema: z.object({
    ean: z.string().describe("Product EAN code"),
    price: z.string().describe("Product price"),
  }),
  execute: async ({ ean, price }) => {
    logToolExecute({
      toolName: "printTicket",
      input: { ean, price },
      ts: new Date().toISOString(),
    });

    printTicket(ean, price);
    const result = { message: "Ticket printed successfully." };

    logToolResult({
      toolName: "printTicket",
      output: result,
      ts: new Date().toISOString(),
    });

    return result;
  },
});
