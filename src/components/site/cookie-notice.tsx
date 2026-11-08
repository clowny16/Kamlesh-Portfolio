"use client";

import { useEffect, useState } from "react";

const CONSENT_KEY = "kamlesh-consent-v1";

export default function CookieNotice() {
  const [render, setRender] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(CONSENT_KEY);
    } catch {
      // storage unavailable (private mode etc.) — still show the notice
      stored = null;
    }
    if (stored) return;

    const timer = window.setTimeout(() => {
      setRender(true);
      requestAnimationFrame(() => setShown(true));
    }, 1200);

    return () => window.clearTimeout(timer);
  }, []);

  const decide = (accepted: boolean) => {
    try {
      window.localStorage.setItem(
        CONSENT_KEY,
        accepted ? "granted" : "denied"
      );
    } catch {
      // storage unavailable — just hide the notice
    }
    setShown(false);
    window.setTimeout(() => setRender(false), 500);
  };

  if (!render) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie notice"
      data-shown="true"
      className={`fixed bottom-4 left-4 z-50 w-[calc(300*var(--px))] max-w-[calc(100vw-32px)] border border-rule bg-canvas/95 p-4 [backdrop-filter:blur(4px)] shadow-[0_calc(10*var(--px))_calc(30*var(--px))_rgba(10,10,10,0.12)] transition-all duration-500 ease-out-soft ${
        shown ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <p className="text-label uppercase text-muted">Cookies</p>
      <p className="mt-2 text-body text-ink">
        A couple of cookies to understand how the site is used. Nothing creepy.
      </p>
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => decide(true)}
          className="border border-ink px-[calc(12*var(--px))] py-[calc(8*var(--px))] text-label font-medium uppercase text-ink transition-colors duration-200 hover:bg-ink hover:text-canvas [@media(pointer:coarse)]:min-h-[calc(44*var(--px))]"
        >
          GOT IT.
        </button>
        <button
          type="button"
          onClick={() => decide(false)}
          className="border border-chip px-[calc(12*var(--px))] py-[calc(8*var(--px))] text-label font-medium uppercase text-muted transition-colors duration-200 hover:border-ink hover:text-ink [@media(pointer:coarse)]:min-h-[calc(44*var(--px))]"
        >
          Decline
        </button>
      </div>
    </div>
  );
}
