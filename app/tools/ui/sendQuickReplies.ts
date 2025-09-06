import { tool } from "ai";
import z from "zod";

export const sendQuickReplies = tool({
  description:
    "Envía quick replies a la interfaz del usuario para que este pueda seleccionar una acción próxima.",
  inputSchema: z.object({
    replies: z
      .array(z.string().min(1))
      .min(1)
      .max(4)
      .describe(
        "Quick replies a enviar al usuario (máximo 4). Ej: '🔎 Consultar stock', '💲 Cambiar precio', '🖨️ Imprimir fleje'",
      ),
  }),
  execute: async ({ replies }) => {
    console.log(`===============> Quick replies: ${replies.join(", ")}`);
    return "Quick replies enviadas al usuario";
  },
});
