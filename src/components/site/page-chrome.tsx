"use client";

import { useEffect } from "react";
import { Toaster as SonnerToaster, toast } from "sonner";

/**
 * Client-side page chrome: global toast listener + the sonner viewport.
 */
export default function PageChrome() {
  useEffect(() => {
    const onLabToast = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      toast(detail || "Coming soon.", {
        duration: 3500,
        style: {
          background: "#0D0D0B",
          color: "#EFEFEB",
          border: "1px solid #33332F",
          borderRadius: "2px",
        },
      });
    };
    window.addEventListener("kamlesh:toast", onLabToast);
    return () => window.removeEventListener("kamlesh:toast", onLabToast);
  }, []);

  return (
    <SonnerToaster
      position="bottom-center"
      toastOptions={{
        style: {
          background: "#0D0D0B",
          color: "#EFEFEB",
          border: "1px solid #33332F",
          borderRadius: "2px",
        },
      }}
    />
  );
}
