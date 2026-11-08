"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import HoverText from "./hover-text";
import { gsap, prefersReducedMotion, hasFinePointer } from "@/lib/gsap";
import { SITE } from "@/lib/site";

const MENU_LINKS = [
  { label: "Profile", href: "/#profile" },
  { label: "Work", href: "/#work" },
  { label: "AI Lab", href: "/#ai-lab" },
  { label: "Experience", href: "/#experience" },
  { label: "Skillset", href: "/#skillset" },
  { label: "Contact", href: "/#contact" },
];

/**
 * Header: text wordmark + resume pill + hamburger, opening a full-screen
 * menu panel with big Funnel Display links (hover sweep), contact details
 * and the resume download.
 */
export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLSpanElement>(null);

  const close = useCallback(() => setOpen(false), []);

  // Wordmark scramble on hover — a QA-flavored glitch via ScrambleTextPlugin
  useEffect(() => {
    const el = wordmarkRef.current;
    if (!el || !hasFinePointer() || prefersReducedMotion()) return;
    const original = "KAMLESH MALI";
    const onEnter = () => {
      gsap.to(el, {
        duration: 0.65,
        scrambleText: {
          text: original,
          chars: "!<>-_\\/[]{}—=+*^?#________",
          speed: 1.2,
        },
      });
    };
    el.addEventListener("mouseenter", onEnter);
    return () => el.removeEventListener("mouseenter", onEnter);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    if (open) {
      document.addEventListener("keydown", onKey);
      const lenis = (window as unknown as { __lenis?: { stop(): void; start(): void } }).__lenis;
      document.documentElement.style.overflow = "hidden";
      lenis?.stop();
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      if (open) {
        const lenis = (window as unknown as { __lenis?: { stop(): void; start(): void } }).__lenis;
        document.documentElement.style.overflow = "";
        lenis?.start();
      }
    };
  }, [open, close]);

  return (
    <>
      <header className="relative z-40 w-full">
        <div className="relative mx-auto w-full max-w-canvas px-6 sm:px-10 lg:px-margin">
          <nav
            aria-label="Primary"
            className="flex items-center justify-between pt-8 lg:h-[calc(26*var(--px))] lg:pt-0"
          >
            <a
              href="/#top"
              className="-my-2 -ml-2 inline-flex min-h-[calc(44*var(--px))] items-center px-2 text-body-lg"
            >
              <span
                className="font-funnel text-[1.05em] font-medium tracking-[-0.02em] text-ink"
              >
                <span ref={wordmarkRef}>KAMLESH MALI</span>
                <span className="text-accent">.</span>
                <span className="ml-[0.35em] align-middle font-archivo text-[0.52em] font-semibold uppercase tracking-[0.14em] text-muted">
                  QA
                </span>
              </span>
            </a>

            <div className="flex items-center gap-[calc(14*var(--px))]">
              <a
                href={SITE.resume}
                download="Kamlesh-Mali-Resume.pdf"
                className="group/res inline-flex items-center gap-2 border border-ink bg-canvas/70 px-[calc(14*var(--px))] py-[calc(9*var(--px))] text-label font-medium uppercase leading-none tracking-[calc(-0.2*var(--px))] text-ink transition-colors duration-300 ease-out-soft hover:bg-ink hover:text-canvas [@media(pointer:coarse)]:min-h-[calc(44*var(--px))]"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-[1.1em] w-[1.1em] transition-transform duration-300 ease-out-soft group-hover/res:translate-y-[2px]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span className="sr-only">Download resume PDF</span>
                <span aria-hidden="true" className="contents">
                  <HoverText>Resume</HoverText>
                </span>
              </a>

              <button
                type="button"
                aria-expanded={open}
                aria-controls="site-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                onClick={() => setOpen((v) => !v)}
                className="-my-4 -mr-2 flex w-[calc(56*var(--px))] flex-col items-end justify-center gap-[8px] px-2 py-4 lg:min-h-[calc(44*var(--px))]"
              >
                <span
                  className={`block h-[2px] w-[calc(40*var(--px))] bg-ink transition-transform duration-300 ease-out-soft ${
                    open ? "translate-y-[5px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-[2px] w-[calc(40*var(--px))] bg-ink transition-transform duration-300 ease-out-soft ${
                    open ? "-translate-y-[5px] -rotate-45" : ""
                  }`}
                />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Scrim */}
      <div
        aria-hidden="true"
        data-menu-scrim={open ? "open" : "closed"}
        onClick={close}
        className={`fixed inset-0 z-20 bg-ink/25 transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Menu panel */}
      <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
        <div
          id="site-menu"
          ref={panelRef}
          tabIndex={-1}
          aria-hidden={!open}
          data-menu={open ? "open" : "closed"}
          className={`pointer-events-auto absolute inset-0 overflow-y-auto overscroll-contain bg-canvas pb-16 pt-24 outline-none will-change-transform pamidor-scroll lg:pt-32 ${
            open ? "" : "invisible -translate-y-full"
          }`}
          style={{ transition: "transform 560ms cubic-bezier(0.22,1,0.36,1), visibility 0s linear 0s" }}
        >
          <div className="mx-auto flex w-full max-w-canvas flex-col px-6 pb-16 sm:px-10 lg:px-margin">
            <ul className="flex flex-col">
              {MENU_LINKS.map((link, i) => (
                <li
                  key={link.label}
                  style={{
                    ["--menu-i" as string]: i,
                    transition: "opacity 420ms ease, transform 520ms cubic-bezier(0.22,1,0.36,1)",
                    transitionDelay: open ? `${90 + i * 55}ms` : "0ms",
                    opacity: open ? 1 : 0,
                    transform: open ? "none" : "translateY(14px)",
                  }}
                >
                  <a
                    href={link.href}
                    onClick={close}
                    data-hw="true"
                    className="block py-3 text-project font-medium text-ink transition-colors duration-200 [--hw-base:#0A0A0A] hover:text-accent"
                  >
                    <span className="sr-only">{link.label}</span>
                    <span aria-hidden="true">
                      <HoverText>{link.label}</HoverText>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <div
              className="mt-10 flex flex-col gap-2"
              style={{
                transition: "opacity 420ms ease, transform 520ms cubic-bezier(0.22,1,0.36,1)",
                transitionDelay: open ? `${90 + MENU_LINKS.length * 55}ms` : "0ms",
                opacity: open ? 1 : 0,
                transform: open ? "none" : "translateY(14px)",
              }}
            >
              <a
                href={`mailto:${SITE.email}`}
                className="inline-flex items-center py-2 text-body text-muted underline underline-offset-4 transition-colors [@media(pointer:coarse)]:min-h-[calc(48*var(--px))] hover:text-ink"
              >
                {SITE.emailDisplay}
              </a>
              <a
                href={`tel:${SITE.phoneHref}`}
                className="inline-flex items-center py-2 text-body text-muted underline-offset-4 transition-colors [@media(pointer:coarse)]:min-h-[calc(48*var(--px))] hover:text-ink hover:underline"
              >
                {SITE.phone}
              </a>
              <a
                href={SITE.resume}
                download="Kamlesh-Mali-Resume.pdf"
                className="inline-flex w-fit items-center border border-ink px-[calc(15*var(--px))] py-[calc(9*var(--px))] text-label font-medium uppercase text-ink transition-colors duration-300 hover:bg-ink hover:text-canvas [@media(pointer:coarse)]:min-h-[calc(48*var(--px))]"
              >
                Download Resume (PDF)
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
