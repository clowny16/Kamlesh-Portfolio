"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion, px } from "@/lib/gsap";

type RevealTag = "div" | "section" | "li" | "span" | "p" | "h2" | "h3" | "ul" | "a";

/**
 * Scroll reveal — GSAP + ScrollTrigger. Children start translated + faded
 * ("waiting", mirrored in CSS so nothing flashes before hydration) and ease
 * into place with the pamidor expo ease once ~88% of the viewport is reached.
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  as = "div",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: RevealTag;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      if (prefersReducedMotion()) {
        el.setAttribute("data-reveal", "shown");
        return;
      }

      // Hand the hidden state over to GSAP (inline styles win over CSS),
      // then animate in exactly once.
      el.setAttribute("data-gsap", "true");
      gsap.set(el, { opacity: 0, y: px(13) });
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: delay / 1000,
        ease: "out-expo",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
        onComplete: () => el.setAttribute("data-reveal", "shown"),
      });
    },
    { scope: ref }
  );

  const Tag = as as "div";
  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      data-reveal="waiting"
      className={`reveal ${className}`}
      style={style}
    >
      {children}
    </Tag>
  );
}
