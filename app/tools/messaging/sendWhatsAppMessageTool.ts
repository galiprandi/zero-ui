import { tool } from "ai";
import { z } from "zod";
import { sendWhatsAppMessage } from "../../services/whatsapp/sendMessage";
import { logToolExecute, logToolResult } from "../../lib/logger";

export const sendWhatsAppMessageTool = tool({
  description:
    "📲 WhatsApp — Enviar un mensaje por WhatsApp.\n\nCuándo usar: para compartir/resumir resultados (recepciones, ofertas, listados).\nCuándo NO usar: si el usuario no indicó destinatario o prefiere email/impresión.\nContrato de salida: retorna el resultado del envío.\nFormato: el cuerpo del mensaje puede ser Markdown simple.",
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
