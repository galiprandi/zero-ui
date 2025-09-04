import { sendEmailTool } from "./sendEmail";
import { sendWhatsAppMessageTool } from "./sendWhatsAppMessageTool";

/**
 * Email tools, all tools related to emails
 */
export const emailsToolSet = {
  sendEmail: sendEmailTool,
  sendWhatsAppMessage: sendWhatsAppMessageTool,
};
