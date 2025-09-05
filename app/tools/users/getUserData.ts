import { tool } from "ai";
import { z } from "zod";
import { logTool } from "../../lib/logger";
import { getUserData } from "../../services/users/getUserData";

export const getUserDataTool = tool({
  description:
    "👤 Datos de usuario/tienda — Obtiene información del usuario y la tienda.\n\nCuándo usar: para personalizar respuestas o preparar exportaciones (email/WhatsApp).\nContrato: retorna { userData } con email, whatsapp y store.\nFormato: la tool devuelve JSON; el asistente debe renderizar un texto breve si corresponde.",
  inputSchema: z.object({}),
  execute: async () => {
    const toolName = "getUserData";
    const output = { userData: getUserData() } as const;
    logTool({ toolName, output });
    return output;
  },
});
