"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Smooth scrolling (Lenis) driven by the GSAP ticker, with ScrollTrigger
 * kept perfectly in sync (lenis.on("scroll") → ScrollTrigger.update).
 * Also handles in-page anchor scrolling. Mounted once at the page root.
 */
export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh).catch(() => {});

    if (reduce) {
      // Native scrolling only — still keep ScrollTrigger measurements fresh.
      refresh();
      return () => {
        window.removeEventListener("load", refresh);
      };
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Official Lenis ↔ GSAP wiring: one ticker, zero drift.
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Expose for anchor scrolling + intro loader lock
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    const onAnchorClick = (e: MouseEvent) => {
      const clicked = e.target as HTMLElement | null;
      const anchor = clicked?.closest?.('a[href*="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute("href") || "";
      const hashIndex = href.indexOf("#");
      if (hashIndex < 0) return;
      const id = href.slice(hashIndex + 1);
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      // Only intercept when the link points at this page
      const path = href.slice(0, hashIndex);
      if (path && path !== "/" && path !== window.location.pathname) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: 0, duration: 1.4 });
    };
    document.addEventListener("click", onAnchorClick);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(raf);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  return <>{children}</>;
}
