"use client";

import { useRef } from "react";
import { gsap, useGSAP, SplitText, prefersReducedMotion } from "@/lib/gsap";

/**
 * SplitText heading reveal — the text is split into masked chars that rise
 * out of their overflow windows when the heading scrolls into view.
 * Plain-text children only (no nested interactive markup).
 */
export default function SplitReveal({
  children,
  className = "",
  as = "h2",
  delay = 0,
}: {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;

      const split = SplitText.create(el, { type: "chars,words", mask: "chars" });
      gsap.from(split.chars, {
        yPercent: 120,
        duration: 0.9,
        delay,
        ease: "out-expo",
        stagger: 0.028,
        scrollTrigger: { trigger: el, start: "top 86%", once: true },
      });

      return () => {
        split.revert();
      };
    },
    { scope: ref }
  );

  const Tag = as as "h2";
  return (
    <Tag ref={ref as React.Ref<HTMLHeadingElement>} className={className}>
      {children}
    </Tag>
  );
}
