export interface WhatsAppMessage {
  to: string;
  message: string;
}

export function sendWhatsAppMessage(message: WhatsAppMessage): {
  success: boolean;
  messageId?: string;
} {
  // Fake WhatsApp sending service - just log the message details
  console.log("FAKE WHATSAPP MESSAGE SENT:");
  console.log(`To: ${message.to}`);
  console.log(`Message: ${message.message}`);
  console.log("=================");

  // Simulate success
  return {
    success: true,
    messageId: `fake-whatsapp-msg-${Date.now()}`,
  };
}
