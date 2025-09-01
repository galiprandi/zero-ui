import { tool } from "ai";
import { z } from "zod";
import { sendEmail } from "../../services/emails/sendEmail";
import { logToolExecute, logToolResult } from "../../lib/logger";

export const sendEmailTool = tool({
  description:
    "Send an email to a recipient. This is a fake service for demonstration purposes.",
  inputSchema: z.object({
    to: z.string().describe("Recipient email address"),
    subject: z.string().describe("Email subject line"),
    body: z.string().describe("Email body content"),
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
