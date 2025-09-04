import { tool } from "ai";
import { z } from "zod";
import { sendEmail } from "../../services/emails/sendEmail";
import { logToolExecute, logToolResult } from "../../lib/logger";

export const sendEmailTool = tool({
  description:
    "Enviar un email con asunto y cuerpo a un destinatario. Retorna el resultado del envío. Usar para exportar salidas largas vía 📧.",
  inputSchema: z.object({
    to: z
      .string()
      .describe(
        "Dirección de email del destinatario, ej.: 'usuario@dominio.com'",
      ),
    subject: z.string().describe("Asunto del email (corto)"),
    body: z.string().describe("Cuerpo del email (se admite Markdown)"),
  }),
  execute: async ({ to, subject, body }) => {
    logToolExecute({
      toolName: "sendEmail",
      input: { to, subject, body },
      ts: new Date().toISOString(),
    });

    const result = sendEmail({ to, subject, body });

    logToolResult({
      toolName: "sendEmail",
      output: result,
      ts: new Date().toISOString(),
    });

    return result;
  },
});
