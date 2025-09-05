"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";

interface UIContextValue {
  toast: (message: string) => void;
}

const UIContext = createContext<UIContextValue | undefined>(undefined);

interface ToastState {
  id: string;
  message: string;
}

export function UIProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastState[]>([]);

  const toast = useCallback((message: string) => {
    const id = Math.random().toString(36).slice(2, 11);
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2000);
  }, []);

  // Global click handler for copy-to-clipboard on .copy-text and <code>
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as Element | null;
      if (!target) return;

      let el = target.closest(".copy-text") as HTMLElement | null;
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
        .then(() => toast("Texto copiado"))
        .catch(() => toast("No se pudo copiar"));
    }

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [toast]);

  return (
    <UIContext.Provider value={{ toast }}>
      {children}
      {/* Toast container */}
      <div
        style={{
          position: "fixed",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            style={{
              padding: "8px 16px",
              background: "rgba(24,24,27,0.95)",
              color: "white",
              borderRadius: "8px",
              fontSize: "14px",
              boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
              opacity: 1,
              transition: "opacity 120ms ease",
            }}
          >
            {t.message}
          </div>
        ))}
      </div>
    </UIContext.Provider>
  );
}

export function useUI() {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUI must be used within a UIProvider");
  }
  return context;
}
