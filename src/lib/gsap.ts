"use client";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { CustomEase } from "gsap/CustomEase";

/**
 * Central GSAP setup — every animation on the site imports from here so
 * plugins are registered exactly once and eases stay consistent with the
 * pamidor motion tokens (--ease-out-soft / --ease-out-expo).
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, ScrambleTextPlugin, CustomEase);

  // Mirrors the CSS tokens: cubic-bezier(0.22,1,0.36,1) and (0.16,1,0.3,1)
  if (!CustomEase.get("out-soft")) CustomEase.create("out-soft", "0.22, 1, 0.36, 1");
  if (!CustomEase.get("out-expo")) CustomEase.create("out-expo", "0.16, 1, 0.3, 1");
}

export { gsap, useGSAP, ScrollTrigger, SplitText, ScrambleTextPlugin, CustomEase };

export const ACCENT = "#d12424";
export const INK = "#0a0a0a";
export const CANVAS = "#efeeeb";

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Scale a design-space pixel (the --px unit) to a real pixel value. */
export function px(n: number): number {
  if (typeof window === "undefined") return n;
  const v = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--px"));
  return n * (Number.isFinite(v) && v > 0 ? v : 1);
}

/** True when the pointer can hover (desktop-like devices). */
export function hasFinePointer(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(pointer: fine)").matches) return true;
  // Some desktop environments (certain headless browsers, VMs, remote
  // desktops) report neither pointer class. Treat "no coarse pointer and
  // no touch hardware" as fine so hover-powered motion isn't lost there.
  return (
    !window.matchMedia("(pointer: coarse)").matches &&
    !("ontouchstart" in window) &&
    navigator.maxTouchPoints === 0
  );
}
