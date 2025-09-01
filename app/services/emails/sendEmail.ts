export function sendEmail(email: EmailData): {
  success: boolean;
  messageId?: string;
} {
  // Fake email sending service - just log the email details
  console.log("FAKE EMAIL SENT:");
  console.log(`To: ${email.to}`);
  console.log(`Subject: ${email.subject}`);
  console.log(`Body: ${email.body}`);
  console.log("=================");

  // Simulate success
  return {
    success: true,
    messageId: `fake-msg-${Date.now()}`,
  };
}

export interface EmailData {
  to: string;
  subject: string;
  body: string;
}
