import { useChatContext } from "@/app/providers/ChatProvider";
import type { UIMessage } from "@ai-sdk/react";
import type { UIDataTypes, UITools } from "ai";
import { useEffect } from "react";
import { initialQuickReplies } from "../prompts/quick-replies.prompt";

export function useOneHand() {
  // Consume the shared chat state from context
  const { messages: rawMessages, sendMessage, status } = useChatContext();
  const { messages, quickReplies } = separateQuickRepliesFromText(rawMessages);

  // Debug: mantener log para inspeccionar mensajes crudos
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(rawMessages);
  }, [rawMessages]);

  // Mostrar quick replies iniciales mientras no haya QUICK_REPLIES de un mensaje de texto del asistente
  // Es decir, si aún no extrajimos quickReplies desde mensajes, usar las iniciales.
  const effectiveQuickReplies =
    quickReplies.length > 0
      ? quickReplies
      : parseQuickReplies(initialQuickReplies.join(", "));

  return {
    messages,
    quickReplies: effectiveQuickReplies,
    sendMessage,
    status,
  };
}

const separateQuickRepliesFromText = (
  messages: Messages,
): {
  messages: Messages;
  quickReplies: QuickReplies;
} => {
  if (!messages.length) return { messages, quickReplies: [] };

  // Parse solo formato <quick-replies>...</quick-replies>
  const TAG_OPEN = /<\s*quick-replies\s*>/i;
  const TAG_CLOSE = /<\s*\/\s*quick-replies\s*>/i;

  let extracted: string | undefined;
  let cleanedMessages: Messages = messages;

  for (let i = messages.length - 1; i >= 0; i--) {
    const m = messages[i];
    if (m.role !== "assistant") continue;
    const parts = m.parts ?? [];
    let updated = false;

    // 1) Fallback robusto: concatenar todos los textos del mensaje y extraer un único bloque
    const allText = parts
      .map((p) => (p as { type?: string; text?: unknown }).text)
      .filter((t): t is string => typeof t === "string" && t.length > 0)
      .join("\n");
    const openAll = TAG_OPEN.exec(allText ?? "");
    const closeAll = TAG_CLOSE.exec(allText ?? "");
    if (openAll && closeAll && closeAll.index > openAll.index) {
      const before = allText.slice(0, openAll.index).trimEnd();
      const inner = allText
        .slice(openAll.index + openAll[0].length, closeAll.index)
        .trim();
      const after = allText.slice(closeAll.index + closeAll[0].length).trimStart();
      if (inner) extracted = inner;
      const sep = before && after ? " " : "";
      const cleanedText = `${before}${sep}${after}`.trim();
      const newParts = cleanedText ? [{ type: "text", text: cleanedText }] : [];
      cleanedMessages = cleanedMessages.map((mm, idx) =>
        idx === i ? { ...mm, parts: newParts as typeof parts } : mm,
      );
      updated = true;
    }

    if (updated) break;

    // 2) Modo original: intentar por parte
    const newParts = parts
      .map((p) => {
        if (p.type !== "text" || !p.text) return p;
        const text = p.text;
        // Try block format first using regex exec to get indices safely
        const open = TAG_OPEN.exec(text);
        const close = TAG_CLOSE.exec(text);
        if (open && close && close.index > open.index) {
          const before = text.slice(0, open.index).trimEnd();
          const inner = text
            .slice(open.index + open[0].length, close.index)
            .trim();
          const after = text.slice(close.index + close[0].length).trimStart();
          if (inner) extracted = inner;
          const sep = before && after ? " " : "";
          const cleanedText = `${before}${sep}${after}`.trim();
          updated = true;
          return cleanedText ? { ...p, text: cleanedText } : null;
        }
        return p;
      })
      .filter((p): p is NonNullable<typeof p> => Boolean(p));

    if (updated) {
      cleanedMessages = cleanedMessages.map((mm, idx) =>
        idx === i ? { ...mm, parts: newParts } : mm,
      );
      break;
    }
  }

  const quickReplies = extracted ? parseQuickReplies(extracted) : [];

  return {
    messages: cleanedMessages,
    quickReplies,
  };
};

// Convierte una lista separada por comas en array de quick replies
function parseQuickReplies(text: string): string[] {
  return text
    .trim()
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

type Messages = UIMessage<unknown, UIDataTypes, UITools>[];
type QuickReplies = string[];
