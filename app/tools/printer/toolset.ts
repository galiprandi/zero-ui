import { printTicketTool } from "./printTicket";
import type { Tool } from "ai";

interface ToolSet {
  name: string;
  description: string;
  tools: Record<string, Tool>;
}

export const printerToolSet: ToolSet = {
  name: "Printer Tools",
  description: "Tools for printing",
  tools: {
    printTicket: printTicketTool,
  },
};
