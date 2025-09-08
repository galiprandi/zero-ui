import { tool } from "ai";
import z from "zod";

export const sendQuickReplies = tool({
  description:
    "Envía quick replies a la interfaz del usuario (máximo 3). Para control de ticket, usa opciones numéricas en dígitos (p. ej., 1, 2, 3 o 0.25, 0.5, 1). No mezcles emojis de números.",
  inputSchema: z.object({
    replies: z
      .array(z.string().min(1))
      .min(1)
      .max(3)
      .describe(
        "Quick replies a enviar al usuario (máximo 3). Ej: '1', '2', '3' o '0.25', '0.5', '1'. Para otros flujos: '🔎 Consultar stock', '💲 Cambiar precio'",
      ),
  }),
  execute: async ({ replies }) => {
    console.log(`💡 Quick replies: ${replies.join(", ")}`);
    return { message: "Quick replies enviadas al usuario", replies };
  },
});
