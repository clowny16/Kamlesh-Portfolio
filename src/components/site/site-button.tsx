"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import HoverText from "./hover-text";
import { gsap, prefersReducedMotion, hasFinePointer } from "@/lib/gsap";

/**
 * The site's border button — uppercase label with the hover sweep and a
 * rotating arrow. On fine pointers the whole button is magnetic: it leans
 * toward the cursor (gsap.quickTo) and snaps back with an elastic ease.
 */
export default function SiteButton({
  children,
  href,
  onClick,
  type = "button",
  tone = "light",
  disabled = false,
  className = "",
  external = false,
  download,
}: {
  children: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  tone?: "light" | "dark";
  disabled?: boolean;
  className?: string;
  external?: boolean;
  download?: string | boolean;
}) {
  const btnRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = btnRef.current;
    if (!el || !hasFinePointer() || prefersReducedMotion()) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3" });

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.18);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.24);
    };
    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.45)", overwrite: "auto" });
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      gsap.killTweensOf(el);
    };
  }, []);

  const toneCls =
    tone === "dark"
      ? "border-white/25 text-canvas hover:border-white"
      : "border-chip text-ink hover:border-ink";

  const cls = `group/btn inline-flex items-center gap-3 border px-[calc(15*var(--px))] py-[calc(9*var(--px))] text-label font-medium uppercase leading-none tracking-[calc(-0.2*var(--px))] transition-colors duration-300 ease-out-soft will-change-transform [@media(pointer:coarse)]:min-h-[calc(48*var(--px))] disabled:pointer-events-none disabled:opacity-50 ${toneCls} ${className}`;

  const inner = (
    <>
      <span className="sr-only">{children}</span>
      <span aria-hidden="true" className="contents">
        <HoverText>{children}</HoverText>
      </span>
      <ArrowUpRight
        aria-hidden="true"
        className="h-4 w-4 shrink-0 transition-transform duration-300 ease-out-soft group-hover/btn:-rotate-45"
      />
    </>
  );

  if (href) {
    if (external || href.startsWith("http") || href.startsWith("mailto:")) {
      return (
        <a
          ref={btnRef as React.Ref<HTMLAnchorElement>}
          href={href}
          className={cls}
          onClick={onClick}
          {...(download ? { download: typeof download === "string" ? download : undefined } : {})}
        >
          {inner}
        </a>
      );
    }
    return (
      <Link
        ref={btnRef as React.Ref<HTMLAnchorElement>}
        href={href}
        className={cls}
        onClick={onClick}
        {...(download ? { download: typeof download === "string" ? download : undefined } : {})}
      >
        {inner}
      </Link>
    );
  }

  return (
    <button ref={btnRef as React.Ref<HTMLButtonElement>} type={type} onClick={onClick} disabled={disabled} className={cls}>
      {inner}
    </button>
  );
}
