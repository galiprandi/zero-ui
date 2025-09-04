import { tool } from "ai";
import { z } from "zod";
import { logToolExecute, logToolResult } from "../../lib/logger";
import { getUserData } from "../../services/users/getUserData";

export const getUserDataTool = tool({
  description:
    "Get current user and store information. Returns { userData } with email, WhatsApp and store fields. Use to personalize outputs or prepare exports.",
  inputSchema: z.object({}),
  execute: async () => {
    logToolExecute({
      toolName: "getUserData",
      input: {},
      ts: new Date().toISOString(),
    });

    const userData = getUserData();
    const result = { userData };

    logToolResult({
      toolName: "getUserData",
      output: result,
      ts: new Date().toISOString(),
    });

    return result;
  },
});
