"use client";

import { useCallback, useMemo, useRef } from "react";
import { gsap, prefersReducedMotion, ACCENT } from "@/lib/gsap";

/**
 * Hover-work text — a red flash sweeps across the characters on hover /
 * focus, driven by a GSAP staggered timeline. Words stay nowrap and wrap
 * as whole words (mirrors the original markup).
 */
export default function HoverText({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const running = useRef(false);

  const words = useMemo(() => {
    const out: Array<Array<{ ch: string; i: number }>> = [];
    let word: Array<{ ch: string; i: number }> = [];
    let i = 0;
    for (const ch of children) {
      if (ch === " ") {
        if (word.length) out.push(word);
        word = [];
        i++; // keep index rhythm for spaces
      } else {
        word.push({ ch, i });
        i++;
      }
    }
    if (word.length) out.push(word);
    return out;
  }, [children]);

  const run = useCallback(() => {
    const el = ref.current;
    if (!el || running.current || prefersReducedMotion()) return;
    const chars = Array.from(el.querySelectorAll("[data-hw-char]")) as HTMLElement[];
    if (!chars.length) return;
    running.current = true;

    const base = getComputedStyle(chars[0]).color;
    gsap
      .timeline({
        onComplete: () => {
          gsap.set(chars, { clearProps: "color" });
          running.current = false;
        },
      })
      .fromTo(
        chars,
        { color: base },
        { color: ACCENT, duration: 0.13, ease: "none", stagger: 0.02 },
        0
      )
      .to(chars, { color: base, duration: 0.3, ease: "power2.inOut", stagger: 0.02 }, 0.12);
  }, []);

  return (
    <span ref={ref} onMouseEnter={run} onFocus={run} aria-hidden="true" className={className}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {word.map(({ ch, i }) => (
            <span key={i} data-hw-char="true" className="inline-block">
              {ch === " " ? "\u00A0" : ch}
            </span>
          ))}
          {wi < words.length - 1 ? "\u00A0" : null}
        </span>
      ))}
    </span>
  );
}
