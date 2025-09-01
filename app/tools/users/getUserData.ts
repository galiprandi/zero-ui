import { tool } from "ai";
import { z } from "zod";
import { logToolExecute, logToolResult } from "../../lib/logger";
import { getUserData } from "../../services/users/getUserData";

export const getUserDataTool = tool({
  description:
    "Retrieve user data, including store information. Useful for getting details about the current user and their store. Use to get email, whatsapp and store information.",
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
