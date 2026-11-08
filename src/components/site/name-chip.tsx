"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hero name chip — a photo chip opens inside the first name while the
 * trailing letters briefly give way, cycling through real project covers.
 * Reuses the door-grow / door-give keyframes from globals.css.
 */
export default function NameChip({
  prefix,
  suffix,
  frames,
}: {
  prefix: string;
  suffix: string;
  frames: string[];
}) {
  const boxRef = useRef<HTMLSpanElement>(null);
  const [armed, setArmed] = useState(false);
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const t = window.setTimeout(() => setArmed(true), 900);
    const flip = window.setInterval(
      () => setFrame((f) => (f + 1) % frames.length),
      5000
    );
    return () => {
      window.clearTimeout(t);
      window.clearInterval(flip);
    };
  }, [frames.length]);

  return (
    <span ref={boxRef} data-door-open={armed ? "true" : undefined} className="contents">
      <span className="block whitespace-nowrap">
        {prefix}
        <span
          aria-hidden="true"
          className="door-add relative inline-block h-[0.72em] w-0 overflow-visible align-baseline"
        >
          <span
            className="absolute left-0 top-1/2 block h-[0.72em] w-[0.72em] -translate-y-1/2 origin-left overflow-hidden rounded-[calc(4*var(--px))]"
            style={{ opacity: armed ? undefined : 0 }}
          >
            { }
            <img
              src={frames[frame]}
              alt=""
              className="door-add-img h-full w-full object-cover"
              draggable={false}
            />
          </span>
        </span>
        <span className="door-give inline-block">{suffix}</span>
      </span>
    </span>
  );
}
