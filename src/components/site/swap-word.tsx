"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/**
 * SwapWord — a headline word periodically collapses shut (scaleX) and the
 * next phrase grows back in its place, on a GSAP timeline. Width is
 * reserved by an invisible sizer holding the longest phrase, so nothing
 * around it reflows.
 */
export default function SwapWord({
  words,
  interval = 4200,
  className = "",
}: {
  words: string[];
  interval?: number;
  className?: string;
}) {
  const root = useRef<HTMLSpanElement>(null);
  const wordsKey = words.join("\u0000");

  useGSAP(
    () => {
      const el = root.current;
      if (!el || words.length < 2 || prefersReducedMotion()) return;

      const els = Array.from(el.querySelectorAll("[data-swap-word]")) as HTMLElement[];
      if (els.length < 2) return;

      let idx = 0;
      let cycling = false;

      const cycle = () => {
        if (cycling) return;
        cycling = true;
        const curr = els[idx];
        idx = (idx + 1) % els.length;
        const next = els[idx];
        gsap
          .timeline({ onComplete: () => (cycling = false) })
          .set(curr, { transformOrigin: "left center" })
          .to(curr, { scaleX: 0, opacity: 0, duration: 0.5, ease: "power3.in" })
          .set(next, { transformOrigin: "left center" })
          .fromTo(
            next,
            { scaleX: 0, opacity: 0 },
            { scaleX: 1, opacity: 1, duration: 0.55, ease: "out-soft" },
            "-=0.08"
          );
      };

      const timer = window.setInterval(cycle, interval);
      return () => window.clearInterval(timer);
    },
    { scope: root, dependencies: [wordsKey, interval] }
  );

  return (
    <span ref={root} className={`relative inline-block align-top ${className}`}>
      {/* invisible sizer reserves width + height of the longest phrase */}
      <span aria-hidden="true" className="block whitespace-nowrap opacity-0">
        {words.reduce((a, b) => (a.length >= b.length ? a : b))}
      </span>

      {words.map((word, i) => (
        <span
          key={word + i}
          aria-hidden="true"
          data-swap-word="true"
          className={`swap-word absolute inset-0 block origin-left whitespace-nowrap ${
            i === 0 ? "" : "opacity-0"
          }`}
          style={i === 0 ? undefined : { transform: "scaleX(0)" }}
        >
          {word}
        </span>
      ))}

      {/* screen readers get a stable phrase */}
      <span className="sr-only">{words[0]}</span>
    </span>
  );
}
