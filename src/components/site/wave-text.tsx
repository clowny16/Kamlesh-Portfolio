"use client";

import { useMemo, useRef } from "react";
import { gsap, useGSAP, ScrollTrigger, prefersReducedMotion, hasFinePointer, ACCENT } from "@/lib/gsap";

/**
 * Wave text — characters sit dim and light up with a red flash. Lighting is
 * driven by ScrollTrigger progress (works with Lenis) plus pointer proximity
 * on desktop; each char flashes dim → red → lit through a GSAP timeline.
 */
export default function WaveText({
  text,
  className = "",
  as = "span",
  tone = "light",
  segment = " ",
}: {
  text: string;
  className?: string;
  as?: "span" | "p" | "h2";
  tone?: "light" | "night";
  /** split boundary for nowrap word wrapping */
  segment?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const chars = useMemo(() => Array.from(text), [text]);
  const words = useMemo(() => {
    // group chars into words so lines can wrap at spaces
    const out: Array<Array<{ ch: string; index: number }>> = [];
    let word: Array<{ ch: string; index: number }> = [];
    chars.forEach((ch, index) => {
      if (ch === " ") {
        if (word.length) out.push(word);
        word = [];
        out.push([{ ch: "\u00A0", index }]);
      } else {
        word.push({ ch, index });
      }
    });
    if (word.length) out.push(word);
    return out;
  }, [chars]);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const charEls = Array.from(el.querySelectorAll("[data-char]")) as HTMLElement[];
      if (!charEls.length) return;

      // Capture the CSS "dim" color before any inline styles are written.
      const dim = getComputedStyle(charEls[0]).color;
      const lit = tone === "night" ? "#ffffff" : "#0a0a0a";

      const litSet = new Set<number>();
      const light = (i: number) => {
        if (litSet.has(i)) return;
        litSet.add(i);
        const c = charEls[i];
        gsap
          .timeline()
          .fromTo(c, { color: dim }, { color: ACCENT, duration: 0.14, ease: "none" })
          .to(c, { color: lit, duration: 0.26, ease: "power2.in" });
      };

      if (prefersReducedMotion()) {
        charEls.forEach((c) => gsap.set(c, { color: lit }));
        return;
      }

      // Scroll-progress lighting — one ScrollTrigger for the whole paragraph
      ScrollTrigger.create({
        trigger: el,
        start: "top 92%",
        end: "top 38%",
        onUpdate: (self) => {
          const n = Math.floor(self.progress * charEls.length + 0.0001);
          for (let i = 0; i < n; i++) light(i);
        },
        onLeave: () => charEls.forEach((_, i) => light(i)),
      });

      // Pointer proximity lighting (desktop) — offsets cached, cheap per move
      if (hasFinePointer()) {
        let offsets: Array<{ x: number; y: number }> = [];
        const measure = () => {
          offsets = charEls.map((c) => ({
            x: c.offsetLeft + c.offsetWidth / 2,
            y: c.offsetTop + c.offsetHeight / 2,
          }));
        };
        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(el);

        const onMove = (e: PointerEvent) => {
          if (!offsets.length) return;
          const rect = el.getBoundingClientRect();
          const radius = Math.max(90, rect.height * 1.4);
          const r2 = radius * radius;
          for (let i = 0; i < offsets.length; i++) {
            const dx = rect.left + offsets[i].x - e.clientX;
            const dy = rect.top + offsets[i].y - e.clientY;
            if (dx * dx + dy * dy < r2) light(i);
          }
        };
        window.addEventListener("pointermove", onMove, { passive: true });

        return () => {
          window.removeEventListener("pointermove", onMove);
          ro.disconnect();
        };
      }
    },
    { scope: ref, dependencies: [text, tone] }
  );

  const Tag = as as "span";
  return (
    <Tag
      ref={ref as React.Ref<HTMLSpanElement>}
      data-wave={tone === "night" ? "night" : ""}
      className={className}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, wi) => (
          <span key={wi} className="inline-block whitespace-nowrap">
            {word.map(({ ch, index }) => (
              <span key={index} data-char="true" className="inline-block">
                {ch}
              </span>
            ))}
          </span>
        ))}
      </span>
    </Tag>
  );
}
