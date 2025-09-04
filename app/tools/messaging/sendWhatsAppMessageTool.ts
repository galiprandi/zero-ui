import { tool } from "ai";
import { z } from "zod";
import { sendWhatsAppMessage } from "../../services/whatsapp/sendMessage";
import { logToolExecute, logToolResult } from "../../lib/logger";

export const sendWhatsAppMessageTool = tool({
  description:
    "Send a WhatsApp message to a recipient. Returns the sending result. Use to export or share summaries via 📲.",
  inputSchema: z.object({
    to: z
      .string()
      .describe(
        "Recipient phone (E.164 with country code), e.g. '+5491140012345'",
      ),
    message: z.string().describe("Message content (Markdown allowed)"),
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
