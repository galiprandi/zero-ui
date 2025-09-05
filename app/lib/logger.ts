const __DEV__ = process.env.NODE_ENV !== "production";

interface LogRequestMetaData {
  totalMessages: number;
  lastRole: string | null;
  lastUserLength: number;
  prevAssistantHasQuickReplies: boolean;
  prevAssistantQuickRepliesCount: number;
  userInputType: string;
  userMessage: string;
  model: string;
  stopWhenSteps: number;
  systemPromptChars: number;
  ts: string;
}

interface LogToolExecuteData {
  toolName: string;
  input?: Record<string, unknown>;
  ts?: string;
}

interface LogToolResultData {
  toolName: string;
  output?: unknown;
  ts?: string;
}

export function logRequestMeta(data: LogRequestMetaData): void {
  if (__DEV__) {
    console.debug("[dev][server][chat] request meta", data);
  }
}

export const logTool = (data: {
  toolName: string;
  input?: Record<string, unknown>;
  output?: unknown;
}) => {
  if (!__DEV__) return;
  console.debug(`[dev][server][tool] ${data.toolName}`, data);
};

export function logToolExecute({
  toolName,
  input = {},
  ts = new Date().toISOString(),
}: LogToolExecuteData): void {
  if (__DEV__) {
    console.debug(`[dev][server][tool] ${toolName}.execute`, {
      input,
      ts,
    });
  }
}

export function logToolResult({
  toolName,
  output,
  ts = new Date().toISOString(),
}: LogToolResultData): void {
  if (__DEV__) {
    console.debug(`[dev][server][tool] ${toolName}.result`, {
      output,
      ts,
    });
  }
}

export function getMessageText(msg: unknown): string {
  try {
    if (!msg) return "";
    const m = msg as {
      content?: unknown;
      text?: unknown;
      parts?: unknown;
    };
    if (typeof m.content === "string") return m.content;
    if (Array.isArray(m.content))
      return (m.content as unknown[]).map((v) => String(v)).join(" ");
    if (typeof m.text === "string") return m.text;
    if (Array.isArray(m.parts)) {
      return (m.parts as unknown[])
        .map((p) => {
          const pp = p as { type?: string; text?: unknown };
          return pp?.type === "text" && typeof pp.text === "string"
            ? pp.text
            : "";
        })
        .filter((s) => s)
        .join("\n");
    }
    return JSON.stringify((m as Record<string, unknown>) ?? {}, null, 2);
  } catch {
    return "";
  }
}

export function parseQuickRepliesFromText(text: string): string[] | null {
  if (!text) return null;
  // 1) Canonical <quick-replies> block (preferred)
  const tagMatch = text.match(/<quick-replies>([\s\S]*?)<\/quick-replies>/i);
  if (tagMatch && tagMatch[1]) {
    const inner = tagMatch[1]
      .split(/\n|\r/)
      .map((l) => l.trim())
      .filter(Boolean)
      .join(" ");
    const items = inner
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    return items.length ? items : null;
  }

  // 2) Legacy JSON with quick_replies
  try {
    const parsed = JSON.parse(text);
    if (parsed.quick_replies && Array.isArray(parsed.quick_replies)) {
      return parsed.quick_replies as string[];
    }
  } catch {
    const jsonMatch = text.match(/\{[\s\S]*"quick_replies"[\s\S]*\}/);
    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[0]);
        if (parsed.quick_replies && Array.isArray(parsed.quick_replies)) {
          return parsed.quick_replies as string[];
        }
      } catch {
        // ignore JSON parse fallback errors
      }
    }
  }
  return null;
}

export function logAssistantResponse(data: { text: string; ts: string }): void {
  if (__DEV__) {
    console.debug("[dev][server][chat] assistant response", {
      text: data.text,
      ts: data.ts,
    });
  }
}
