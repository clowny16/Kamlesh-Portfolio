"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

/**
 * GSAP marquee — an endless -50% loop that reacts to scroll velocity
 * (speeds up while scrolling, briefly reverses on fast upward flicks)
 * and eases down when the pointer hovers it.
 */
export default function Marquee({
  children,
  duration = 28,
  reverse = false,
  className = "",
  trackClassName = "",
}: {
  children: ReactNode;
  duration?: number;
  reverse?: boolean;
  className?: string;
  trackClassName?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const trackEl = track.current;
      const wrapEl = wrap.current;
      if (!trackEl || !wrapEl || prefersReducedMotion()) return;

      const base = reverse ? -1 : 1;
      const tween = gsap.to(trackEl, { xPercent: -50, duration, ease: "none", repeat: -1 });
      tween.timeScale(base);

      let boost = 0;
      let current = base;
      let hovering = false;

      const st = ScrollTrigger.create({
        trigger: wrapEl,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          boost = gsap.utils.clamp(-6, 6, self.getVelocity() / 260);
        },
      });

      const onEnter = () => {
        hovering = true;
      };
      const onLeave = () => {
        hovering = false;
      };
      wrapEl.addEventListener("pointerenter", onEnter);
      wrapEl.addEventListener("pointerleave", onLeave);

      const tick = () => {
        boost *= 0.93;
        const target = (base + boost * 0.45) * (hovering ? 0.18 : 1);
        current += (target - current) * 0.08;
        tween.timeScale(current);
      };
      gsap.ticker.add(tick);

      return () => {
        gsap.ticker.remove(tick);
        wrapEl.removeEventListener("pointerenter", onEnter);
        wrapEl.removeEventListener("pointerleave", onLeave);
        st.kill();
        tween.kill();
      };
    },
    { scope: wrap }
  );

  return (
    <div ref={wrap} className={`marquee-wrapper ${className}`}>
      <div ref={track} className={`marquee-track ${trackClassName}`}>
        <div className="flex h-full shrink-0 items-center">{children}</div>
        <div aria-hidden="true" className="flex h-full shrink-0 items-center">
          {children}
        </div>
      </div>
    </div>
  );
}
