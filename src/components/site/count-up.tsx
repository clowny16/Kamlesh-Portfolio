"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/**
 * CountUp — animates a stat like "02+" from 0 to its number (leading zeros
 * and any suffix preserved) the first time it scrolls into view.
 */
export default function CountUp({
  value,
  className = "",
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const match = value.match(/^(\d+)(.*)$/);
      if (!match || prefersReducedMotion()) {
        el.textContent = value;
        return;
      }

      const target = parseInt(match[1], 10);
      const suffix = match[2];
      const pad = match[1].length;
      const state = { v: 0 };

      gsap.to(state, {
        v: target,
        duration: 1.5,
        ease: "out-expo",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
        onUpdate: () => {
          el.textContent = String(Math.round(state.v)).padStart(pad, "0") + suffix;
        },
        onComplete: () => {
          el.textContent = value;
        },
      });
    },
    { scope: ref }
  );

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
