"use client";

import { useRef } from "react";
import SiteHeader from "./site-header";
import { gsap, useGSAP, SplitText, prefersReducedMotion } from "@/lib/gsap";
import { SITE } from "@/lib/site";

const CHIPS = [
  "Manual Testing",
  "API · Postman",
  "Shopify & E-commerce",
  "AI-Assisted QA",
  "Cross-Browser & Mobile",
];

/**
 * Hero — Kamlesh's photo as the backdrop, with a GSAP entrance timeline
 * that fires the moment the intro loader hands over: photo settles,
 * label + name rise, "Mali" chars split out of a mask, chips pop in;
 * the artwork drifts on scroll (ScrollTrigger scrub).
 */
export default function HeroSection() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const rootEl = root.current;
      if (!rootEl || prefersReducedMotion()) return;

      const q = gsap.utils.selector(rootEl);

      // --- pre-entrance states (hidden behind the loader anyway) ---
      gsap.set(q("[data-hero-fade]"), { opacity: 0, y: 26 });
      gsap.set(q("[data-hero-img]"), { opacity: 0, scale: 1.08 });
      gsap.set(q("[data-hero-chip]"), { opacity: 0, y: 14, scale: 0.96 });

      // "Mali" — masked char split
      let split: SplitText | null = null;
      const mali = rootEl.querySelector<HTMLElement>("[data-hero-mali]");
      if (mali) {
        split = SplitText.create(mali, { type: "chars", mask: "chars" });
        gsap.set(split.chars, { yPercent: 120 });
      }

      // --- entrance, fired when the intro loader hands over ---
      let played = false;
      const play = () => {
        if (played) return;
        played = true;
        const tl = gsap.timeline({ defaults: { ease: "out-expo" } });
        tl.to(q("[data-hero-img]"), { opacity: 1, scale: 1, duration: 1.5, ease: "out-soft" }, 0)
          .to(q("[data-hero-fade]"), { opacity: 1, y: 0, duration: 0.95, stagger: 0.09 }, 0.12);
        if (split) {
          tl.to(split.chars, { yPercent: 0, duration: 0.85, stagger: 0.05 }, 0.28);
        }
        tl.to(
          q("[data-hero-chip]"),
          { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: "out-soft", stagger: 0.055 },
          0.62
        );
      };

      if ((window as unknown as { __introDone?: boolean }).__introDone) {
        play();
      } else {
        window.addEventListener("kamlesh:intro-done", play, { once: true });
      }
      const safety = window.setTimeout(play, 4200);

      // --- scroll parallax on the artwork ---
      q("[data-hero-parallax]").forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -3 },
          {
            yPercent: 3,
            ease: "none",
            scrollTrigger: { trigger: rootEl, start: "top top", end: "bottom top", scrub: true },
          }
        );
      });

      return () => {
        window.removeEventListener("kamlesh:intro-done", play);
        window.clearTimeout(safety);
        split?.revert();
      };
    },
    { scope: root }
  );

  return (
    <section id="top" ref={root} className="relative w-full overflow-hidden bg-canvas">
      {/* ≥1440px — full-bleed backdrop */}
      <div className="absolute inset-0 hidden overflow-hidden min-[1440px]:block">
        {/* Parallax artwork — Kamlesh by the river */}
        <img
          data-hero-img="true"
          data-hero-parallax="true"
          src="/images/hero-kamlesh.webp"
          width={1673}
          height={940}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover will-change-transform"
          style={{ objectPosition: "70% 38%" }}
        />
        {/* Canvas scrim — keeps the ink headline readable over the photo */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(239,238,235,0.94) 0%, rgba(239,238,235,0.72) 34%, rgba(239,238,235,0.16) 62%, rgba(239,238,235,0) 100%)",
          }}
        />
      </div>

      <div className="relative mx-auto flex w-full max-w-canvas flex-col lg:h-[100dvh] lg:min-h-[calc(680*var(--px))]">
        {/* lg (1024–1439) — positioned photo frame */}
        <div
          aria-hidden="true"
          className="hero-side absolute overflow-hidden"
          style={{ left: "42%", top: "12%", width: "54%", height: "82%" }}
        >
          {/* Parallax artwork (lg) — keeps Kamlesh framed on the right */}
          <img
            data-hero-img="true"
            data-hero-parallax="true"
            src="/images/hero-kamlesh.webp"
            width={1673}
            height={940}
            alt=""
            className="absolute max-w-none object-cover will-change-transform"
            style={{ left: 0, top: "-4%", width: "100%", height: "108%", objectPosition: "80% 38%" }}
          />
        </div>

        <SiteHeader />

        <div className="relative mx-auto flex w-full max-w-canvas flex-1 flex-col px-6 sm:px-10 lg:justify-center lg:px-margin">
          {/* Mobile photo */}
          <div className="relative mt-8 aspect-[1673/940] max-h-[38vh] w-full overflow-hidden lg:hidden">
            {/* Artwork (mobile) */}
            <img
              data-hero-img="true"
              src="/images/hero-kamlesh.webp"
              width={1673}
              height={940}
              alt="Kamlesh Mali standing on a wooden deck by a mountain river"
              className="absolute inset-0 h-full w-full object-cover will-change-transform"
              style={{ objectPosition: "68% 42%" }}
            />
          </div>

          <div className="mt-10 lg:mt-0">
            <p data-hero-fade="true" className="text-label font-medium uppercase text-muted">
              Manual Tester (QA) — {SITE.locations}
            </p>
            <h1
              data-hero-fade="true"
              className="-ml-[0.06em] mt-3 w-full text-display font-medium text-ink"
            >
              <span className="block whitespace-nowrap">Kamlesh</span>
              <span className="block">
                <span data-hero-mali="true" className="block">
                  Mali
                </span>
              </span>
            </h1>
            <p
              data-hero-fade="true"
              className="mt-[calc(5*var(--px))] text-body-lg text-ink lg:mt-[calc(9*var(--px))] lg:max-w-[40%]"
            >
              <span className="block">Web, mobile &amp; the bugs in between.</span>
              <span className="block">I take quality seriously.</span>
            </p>
            <ul className="mt-6 flex flex-wrap gap-[calc(10*var(--px))] min-[368px]:max-w-[calc(430*var(--px))] lg:mt-[calc(35*var(--px))]">
              {CHIPS.map((chip) => (
                <li
                  key={chip}
                  data-hero-chip="true"
                  className="border-[1.2px] border-chip bg-canvas/70 px-4 py-[calc(9*var(--px))] font-archivo text-label font-medium text-ink"
                >
                  {chip}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-canvas px-6 sm:px-10 lg:px-margin">
          <div
            data-hero-fade="true"
            aria-hidden="true"
            className="h-[1.5px] w-full bg-rule mt-12 lg:mt-0"
          />
        </div>
      </div>
    </section>
  );
}
