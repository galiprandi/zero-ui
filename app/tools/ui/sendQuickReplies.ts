import { tool } from "ai";
import z from "zod";

export const sendQuickReplies = tool({
  description:
    "Envía quick replies a la interfaz del usuario para que este pueda seleccionar una acción próxima.",
  inputSchema: z.object({
    replies: z
      .string()
      .describe(
        "Quick replies a enviar al usuario ej: '🔎 Consultar stock', '💲 Cambiar precio', '🖨️ Imprimir fleje'",
      ),
  }),
  execute: async ({ replies }) => {
    console.log(`Quick replies: ${replies}`);
    return { replies };
  },
});
