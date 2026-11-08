"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion, hasFinePointer } from "@/lib/gsap";

type CursorMode = "default" | "click" | "light" | "click-light";

const ICONS: Record<CursorMode, string> = {
  default: "/icons/cursor-28.png",
  click: "/icons/cursor-click-28.png",
  light: "/icons/cursor-light-28.png",
  "click-light": "/icons/cursor-light-28.png",
};

/**
 * Custom cursor — a small ink pointer that follows the pointer through
 * gsap.quickTo (buttery lag), turns white over [data-cursor-invert] areas
 * and presses down on click. Disabled on touch devices / reduced motion.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const mode = useRef<CursorMode>("default");
  const visible = useRef(false);

  useEffect(() => {
    if (!hasFinePointer() || prefersReducedMotion()) return;
    document.documentElement.classList.add("pamidor-cursor");

    const el = dotRef.current;
    const img = imgRef.current;
    if (!el || !img) return;

    gsap.set(el, { x: -100, y: -100, scale: 1, autoAlpha: 0 });

    // quickTo keeps a single reusable tween per property — no rAF loop needed.
    const xTo = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3" });

    const applyIcon = () => {
      const next: CursorMode = mode.current;
      if (img.getAttribute("data-mode") !== next) {
        img.src = ICONS[next];
        img.setAttribute("data-mode", next);
      }
    };

    const show = () => {
      if (visible.current) return;
      visible.current = true;
      gsap.to(el, { autoAlpha: 1, scale: 1, duration: 0.25, ease: "out-soft" });
    };

    const onMove = (e: PointerEvent) => {
      xTo(e.clientX - 3);
      yTo(e.clientY - 2);
      show();
      const overInvert = !!(e.target as HTMLElement | null)?.closest?.("[data-cursor-invert]");
      const next: CursorMode =
        mode.current === "click" ? "click-light" : overInvert ? "light" : "default";
      if (overInvert !== (mode.current === "light" || mode.current === "click-light")) {
        mode.current = next;
        applyIcon();
      }
    };

    const onDown = () => {
      mode.current = mode.current === "light" ? "click-light" : "click";
      applyIcon();
      gsap.to(el, { scale: 0.82, duration: 0.22, ease: "out-soft", overwrite: "auto" });
    };
    const onUp = () => {
      mode.current = mode.current === "click-light" ? "light" : "default";
      applyIcon();
      gsap.to(el, { scale: 1, duration: 0.3, ease: "out-soft", overwrite: "auto" });
    };
    const onLeave = () => {
      visible.current = false;
      gsap.to(el, { autoAlpha: 0, scale: 0.6, duration: 0.2, ease: "power1.in", overwrite: "auto" });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      gsap.killTweensOf(el);
      document.documentElement.classList.remove("pamidor-cursor");
    };
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pamidor-cursor-dot"
      style={{ transform: "translate3d(-100px, -100px, 0)" }}
    >
      {/* The pointer glyph */}
      <img
        ref={imgRef}
        src={ICONS.default}
        alt=""
        width={22}
        height={22}
        className="h-[22px] w-[22px] select-none"
        draggable={false}
      />
    </div>
  );
}
