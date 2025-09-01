// Utility functions for parsing quick replies

export function parseQuickReplies(text: string): string[] {
  const lines = text.split('\n');
  const quickRepliesIndex = lines.findIndex(line => line.trim().startsWith('QUICK_REPLIES:'));
  if (quickRepliesIndex !== -1) {
    const repliesLine = lines[quickRepliesIndex].trim();
    const repliesPart = repliesLine.replace('QUICK_REPLIES:', '').trim();
    return repliesPart.split(',').map(s => s.trim()).filter(s => s);
  }
  return [];
}

export function parseQuickRepliesFromText(text: string): { message: string; quickReplies: string[] } | null {
  const lines = text.split('\n');
  const quickRepliesIndex = lines.findIndex(line => line.trim().startsWith('QUICK_REPLIES:'));
  if (quickRepliesIndex !== -1) {
    const repliesLine = lines[quickRepliesIndex].trim();
    const repliesPart = repliesLine.replace('QUICK_REPLIES:', '').trim();
    const quickReplies = repliesPart.split(',').map(s => s.trim()).filter(s => s);
    const message = lines.slice(0, quickRepliesIndex).join('\n').trim();
    return { message, quickReplies };
  }

  // Fallback to JSON parsing
  try {
    const parsed = JSON.parse(text);
    if (parsed.message && parsed.quick_replies) {
      return { message: parsed.message, quickReplies: parsed.quick_replies };
    }
  } catch {
    // ignore
  }

  // Fallback to old JSON parsing for replies only
  try {
    const parsed = JSON.parse(text);
    if (parsed.quick_replies && Array.isArray(parsed.quick_replies)) {
      return { message: "", quickReplies: parsed.quick_replies };
    }
  } catch {
    // ignore
  }

  return null;
}
