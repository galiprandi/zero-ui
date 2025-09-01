import { tool } from "ai";
import { z } from "zod";
import { sendWhatsAppMessage } from "../../services/whatsapp/sendMessage";
import { logToolExecute, logToolResult } from "../../lib/logger";

export const sendWhatsAppMessageTool = tool({
  description:
    "Send a WhatsApp message to a recipient. This is a fake service for demonstration purposes.",
  inputSchema: z.object({
    to: z.string().describe("Recipient phone number (with country code)"),
    message: z.string().describe("Message content"),
  }),
  execute: async ({ to, message }) => {
    logToolExecute({
      toolName: "sendWhatsAppMessage",
      input: { to, message },
      ts: new Date().toISOString(),
    });

    const result = sendWhatsAppMessage({ to, message });

    logToolResult({
      toolName: "sendWhatsAppMessage",
      output: result,
      ts: new Date().toISOString(),
    });

    return result;
  },
});
