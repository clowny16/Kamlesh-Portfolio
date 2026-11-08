"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion, hasFinePointer } from "@/lib/gsap";

const PATHS = [
  "m8 2 1.88 1.88M14.12 3.88 16 2M9 7.13v-1a3.003 3.003 0 1 1 6 0v1",
  "M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6",
  "M12 20v-9",
  "M6.53 9C4.6 8.8 3 7.1 3 5",
  "M6 13H2",
  "M3 21c0-2.1 1.7-3.9 3.8-4",
  "M17.47 9c1.93-.2 3.53-1.9 3.53-4",
  "M18 13h4",
  "M21 21c0-2.1-1.7-3.9-3.8-4",
];

const SVG_NS = "http://www.w3.org/2000/svg";

/**
 * The red bug trail — spawns a tiny bug glyph at the pointer every ~60ms.
 * Each bug pops in with a GSAP pop, drifts down and fades out; nodes are
 * created and removed imperatively (zero React re-renders).
 */
export default function TrailLayer({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const last = useRef(0);

  useEffect(() => {
    if (!hasFinePointer() || prefersReducedMotion()) return;
    const host = ref.current;
    if (!host) return;

    const spawn = (x: number, y: number) => {
      const size = 14 + Math.random() * 8;
      const svg = document.createElementNS(SVG_NS, "svg");
      svg.setAttribute("viewBox", "0 0 24 24");
      svg.setAttribute("width", String(size));
      svg.setAttribute("height", String(size));
      svg.setAttribute("fill", "none");
      svg.setAttribute("stroke", "currentColor");
      svg.setAttribute("stroke-width", "2");
      svg.setAttribute("stroke-linecap", "round");
      svg.setAttribute("stroke-linejoin", "round");
      svg.setAttribute("class", "text-accent");
      PATHS.forEach((d) => {
        const path = document.createElementNS(SVG_NS, "path");
        path.setAttribute("d", d);
        svg.appendChild(path);
      });
      svg.style.position = "absolute";
      svg.style.left = `${x}px`;
      svg.style.top = `${y}px`;
      svg.style.pointerEvents = "none";
      svg.style.willChange = "transform, opacity";
      host.appendChild(svg);

      const rot = (Math.random() - 0.5) * 60;
      gsap.set(svg, { xPercent: -50, yPercent: -55, rotation: rot, scale: 0.3, opacity: 0 });
      gsap
        .timeline({ onComplete: () => svg.remove() })
        .to(svg, { opacity: 0.95, scale: 1.06, duration: 0.22, ease: "out-soft" })
        .to(
          svg,
          {
            opacity: 0,
            scale: 0.7,
            y: `+=${6 + Math.random() * 10}`,
            rotation: rot + (Math.random() - 0.5) * 40,
            duration: 0.5,
            ease: "power1.in",
          },
          0.16
        );
    };

    const onMove = (e: PointerEvent) => {
      const now = performance.now();
      if (now - last.current < 60) return;
      last.current = now;

      const rect = host.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x < -40 || y < -40 || x > rect.width + 40 || y > rect.height + 40) return;
      spawn(x, y);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      host.querySelectorAll("svg").forEach((bug) => {
        gsap.killTweensOf(bug);
        bug.remove();
      });
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-10 ${className}`}
    />
  );
}
