import { useEffect, useRef } from "react";

const useZeroUi = (sendMessage: (message: { text: string }) => void) => {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleClick = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest(".zero-ui") && target !== navRef.current) {
        const text = target.textContent || "";
        if (
          text.toLowerCase() === "cerrar" ||
          text.toLowerCase() === "cancelar"
        ) {
          // Just remove without sending
          const nav = target.closest(".zero-ui") as HTMLElement;
          if (nav) nav.remove();
        } else {
          sendMessage({ text });
          // Remove the nav if it's not the static one
          const nav = target.closest(".zero-ui") as HTMLElement;
          if (nav && (!navRef.current || !navRef.current.contains(target))) {
            nav.remove();
          }
        }
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [sendMessage]);

  return navRef;
};

export default useZeroUi;
