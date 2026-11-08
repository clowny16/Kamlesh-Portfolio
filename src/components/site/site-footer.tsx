"use client";

import { useRef } from "react";
import HoverText from "./hover-text";
import SocialLinks from "./social-links";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { SITE } from "@/lib/site";

/**
 * Footer — full-width text wordmark (GSAP scrub rise as it enters the
 * viewport), tagline + email, socials, legal row.
 */
export default function SiteFooter() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const word = root.current?.querySelector("[data-footer-word]");
      if (!word || prefersReducedMotion()) return;
      gsap.from(word, {
        yPercent: 42,
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: word, start: "top bottom", end: "top 58%", scrub: 0.6 },
      });
    },
    { scope: root }
  );

  return (
    <footer ref={root} data-cursor-invert="true" className="relative mt-auto w-full bg-night">
      <div className="mx-auto w-full max-w-canvas px-6 sm:px-10 lg:px-margin">
        <div aria-hidden="true" className="h-px w-full bg-white/10" />
      </div>

      <div className="mx-auto w-full max-w-canvas px-6 pt-16 sm:px-10 lg:px-margin lg:pt-[calc(104*var(--px))]">
        <p
          data-footer-word="true"
          aria-label="Kamlesh Mali — QA"
          className="w-full font-funnel font-medium uppercase leading-[0.9] tracking-[-0.03em] text-white will-change-transform"
          style={{ fontSize: "clamp(2.6rem, 11.5vw, calc(150 * var(--px)))" }}
        >
          Kamlesh Mali
          <span className="text-accent">.</span>
          <span className="ml-[0.18em] align-top font-archivo text-[0.24em] font-semibold uppercase tracking-[0.16em] text-night-muted">
            QA
          </span>
        </p>

        <div className="mt-12 flex flex-col gap-8 lg:mt-[calc(72*var(--px))] lg:flex-row lg:items-end lg:gap-0">
          <p className="text-subhead font-medium uppercase text-white lg:w-1/2">
            Somewhere between curiosity and coverage.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1 lg:w-1/2 lg:justify-end lg:pl-5">
            <a
              href={`mailto:${SITE.email}`}
              data-hw="true"
              className="inline-flex items-center py-[calc(11*var(--px))] text-body-lg text-white transition-colors duration-200 [--hw-base:currentColor] hover:text-accent"
            >
              <span className="sr-only">{SITE.emailDisplay}</span>
              <span aria-hidden="true">
                <HoverText>{SITE.emailDisplay}</HoverText>
              </span>
            </a>
            <SocialLinks includeWhatsApp className="-mx-[calc(10*var(--px))] flex items-center" />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 py-6 sm:flex-row sm:items-center sm:justify-between lg:mt-[calc(56*var(--px))]">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <a
              href={SITE.resume}
              download="Kamlesh-Mali-Resume.pdf"
              className="text-label text-night-muted transition-colors duration-200 underline-offset-4 hover:text-white hover:underline"
            >
              RESUME (PDF)
            </a>
            <a
              href={`tel:${SITE.phoneHref}`}
              className="text-label text-night-muted transition-colors duration-200 underline-offset-4 hover:text-white hover:underline"
            >
              {SITE.phone}
            </a>
            <span className="text-label text-night-muted">{SITE.locations}</span>
          </div>
          <p className="text-label text-night-muted">
            © 2026 Kamlesh Mali. All rights reserved. Manual Tester (QA).
          </p>
        </div>
      </div>
    </footer>
  );
}
