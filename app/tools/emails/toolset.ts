import { sendEmailTool } from "./sendEmail";
import type { Tool } from "ai";

interface ToolSet {
  name: string;
  description: string;
  tools: Record<string, Tool>;
}

export const emailsToolSet: ToolSet = {
  name: "Email Tools",
  description: "Tools for sending emails",
  tools: {
    sendEmail: sendEmailTool,
  },
};
