"use client";

import { useEffect } from "react";
import { useUI } from "./UIContext";

export default function CopyTextHandler() {
  const { toast } = useUI();

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as Element | null;
      if (!target) return;

      let el = target.closest(".copy-text") as HTMLElement | null;
      // Fallback: allow any <code> element to be copyable
      if (!el) {
        const codeEl = target.closest("code") as HTMLElement | null;
        if (codeEl) el = codeEl;
      }
      if (!el) return;

      const text = (
        el.getAttribute("data-copy") ??
        el.textContent ??
        ""
      ).trim();

      if (!text) {
        toast("Nada para copiar");
        return;
      }

      navigator.clipboard
        .writeText(text)
        .then(() => {
          toast("Texto copiado");
        })
        .catch(() => {
          toast("No se pudo copiar");
        });
    }

    document.addEventListener("click", handleClick, true);
    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [toast]);

  return null;
}
