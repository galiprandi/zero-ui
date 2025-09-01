import { sendWhatsAppMessageTool } from "./sendMessage";
import type { Tool } from "ai";

interface ToolSet {
  name: string;
  description: string;
  tools: Record<string, Tool>;
}

export const whatsappToolSet: ToolSet = {
  name: "WhatsApp Tools",
  description: "Tools for sending WhatsApp messages",
  tools: {
    sendWhatsAppMessage: sendWhatsAppMessageTool,
  },
};
