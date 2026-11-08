"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

const FRAMES = [
  "/images/projects/rivyo.webp",
  "/images/projects/quickhunt.webp",
  "/images/projects/meyba.webp",
  "/images/projects/fleeto.webp",
  "/images/projects/dental.webp",
  "/images/projects/editly.webp",
  "/images/projects/addup.webp",
  "/images/projects/uncap.webp",
  "/images/projects/utterbond.webp",
];
const LETTERS = ["K", "A", "M", "L", "E", "S", "H"];

/**
 * Intro loader — a GSAP timeline: "KAMLESH" letters rise in, the project
 * cover chip flips through shipped products between "KAML" and "ESH",
 * then everything exits upward and the page is handed over.
 */
export default function IntroLoader() {
  const root = useRef<HTMLDivElement>(null);
  const chipImg = useRef<HTMLImageElement>(null);
  const [frame, setFrame] = useState(0);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      const rootEl = root.current;
      if (!rootEl || done) return;

      const finish = () => {
        document.documentElement.style.overflow = "";
        (window as unknown as { __lenis?: { stop(): void; start(): void } }).__lenis?.start();
        (window as unknown as { __introDone?: boolean }).__introDone = true;
        window.dispatchEvent(new CustomEvent("kamlesh:intro-done"));
        setDone(true);
      };

      if (prefersReducedMotion()) {
        finish();
        return;
      }

      // Lock scrolling while the loader plays
      const lenis = (window as unknown as { __lenis?: { stop(): void; start(): void } }).__lenis;
      document.documentElement.style.overflow = "hidden";
      lenis?.stop();

      // Chip flipbook (img src swap only — motion stays on the timeline)
      const flip = window.setInterval(() => setFrame((f) => (f + 1) % FRAMES.length), 170);

      const tl = gsap.timeline({ defaults: { ease: "out-expo" }, onComplete: finish });
      tl.fromTo(
        "[data-ltr]",
        { yPercent: 115 },
        { yPercent: 0, duration: 0.62, stagger: 0.045 },
        0.1
      )
        // the chip door opens between "KAML" and "ESH"
        .fromTo(
          "[data-chip-slot]",
          { width: 0, marginLeft: 0, marginRight: 0 },
          { width: "0.72em", marginLeft: "0.06em", marginRight: "0.06em", duration: 0.56 },
          1.18
        )
        .fromTo(
          chipImg.current,
          { opacity: 0, scale: 0.82 },
          { opacity: 1, scale: 1, duration: 0.36, ease: "out-soft" },
          1.2
        )
        // hold, then everything exits upward
        .to(
          "[data-ltr]",
          { yPercent: -70, opacity: 0, duration: 0.48, stagger: 0.045, ease: "power2.in" },
          2.35
        )
        .to(
          "[data-chip-slot]",
          { width: 0, marginLeft: 0, marginRight: 0, opacity: 0, duration: 0.4, ease: "power2.in" },
          2.35
        )
        .to(rootEl, { autoAlpha: 0, duration: 0.55, ease: "power1.out" }, 2.72);

      return () => {
        window.clearInterval(flip);
        document.documentElement.style.overflow = "";
        lenis?.start();
      };
    },
    { scope: root }
  );

  if (done) return null;

  return (
    <div
      ref={root}
      aria-hidden="true"
      data-intro="true"
      className="fixed inset-0 z-[70] flex items-center justify-center bg-canvas"
    >
      <div
        className="flex items-center font-medium leading-none tracking-[-0.03em] text-ink font-funnel"
        style={{ fontSize: "clamp(min(3rem, calc((100vw - 48px) / 6.75)), 9vw, 8rem)" }}
      >
        {LETTERS.map((letter, i) => {
          const isChipSlot = i === 4;
          return (
            <span key={i} className="flex items-center">
              {isChipSlot && (
                <span
                  data-chip-slot="true"
                  className="relative block shrink-0 overflow-hidden"
                  style={{ height: "0.72em", width: 0 }}
                >
                  <span
                    aria-hidden="true"
                    className="absolute left-1/2 top-0 block h-full w-[0.72em]"
                    style={{ transform: "translateX(-50%)" }}
                  >
                    <img
                      ref={chipImg}
                      src={FRAMES[frame]}
                      alt=""
                      className="h-full w-full object-cover opacity-0 will-change-transform"
                      draggable={false}
                    />
                  </span>
                </span>
              )}
              <span className="-mx-[0.06em] block overflow-hidden px-[0.06em]">
                <span data-ltr="true" className="block will-change-transform">
                  {letter}
                </span>
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
