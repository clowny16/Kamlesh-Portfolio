"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./reveal";
import SplitReveal from "./split-reveal";
import SwapWord from "./swap-word";
import SiteButton from "./site-button";
import { toast } from "sonner";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { SITE } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "failed";

const REASONS = ["QA / Contract work", "Full-time role", "Just saying hi"];

/**
 * "Let's Break It" — sky video backdrop, dark form card, swap headline
 * where NICELY periodically reads PROPERLY. Sends contact details via Web3Forms.
 */
export default function ContactSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    reason: "",
    message: "",
    website: "", // honeypot
  });

  // The sky slowly zooms while the section is on screen (GSAP scrub)
  useGSAP(
    () => {
      const video = videoRef.current;
      if (!video || prefersReducedMotion()) return;
      gsap.fromTo(
        video,
        { scale: 1 },
        {
          scale: 1.09,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  // Play the sky video while in view
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) video.play().catch(() => {});
          else video.pause();
        });
      },
      { threshold: 0.25 }
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  const set = (key: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;

    const nextErrors: typeof errors = {};
    if (!values.name.trim()) nextErrors.name = "required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) nextErrors.email = "required";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "e42c3e68-f704-4e50-b416-95f6b4f5220b",
          subject: "New contact from Kamlesh Portfolio",
          from_name: "Kamlesh Portfolio",
          name: values.name.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
          reason: values.reason,
          message: values.message.trim(),
          botcheck: Boolean(values.website.trim()),
        }),
        signal: AbortSignal.timeout(20000),
      });
      const result: { success?: boolean } = await res.json();
      if (res.ok && result.success === true) {
        setStatus("sent");
        setValues({ name: "", email: "", phone: "", reason: "", message: "", website: "" });
        toast.success("Details sent. Talk soon.");
        window.setTimeout(() => setStatus("idle"), 6000);
      } else {
        setStatus("failed");
        toast.error("That didn't go through. Try again in a moment.");
        window.setTimeout(() => setStatus("idle"), 4000);
      }
    } catch {
      setStatus("failed");
      toast.error("That didn't go through. Try again in a moment.");
      window.setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const inputCls = (invalid?: boolean) =>
    `mt-1 w-full border-b bg-transparent pb-2 text-body-lg text-white outline-none sm:mt-2 sm:pb-3 transition-colors duration-200 placeholder:text-white/35 ${
      invalid ? "border-accent" : "border-white/25 focus:border-white"
    }`;

  return (
    <div id="contact" className="relative bg-canvas">
      <section
        ref={sectionRef}
        className="relative flex min-h-[100svh] w-full flex-col justify-center overflow-hidden py-4 sm:py-16 lg:py-[7svh]"
      >
        <video
          ref={videoRef}
          aria-hidden="true"
          poster="/images/form-sky.webp"
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/videos/form-sky.mp4" type="video/mp4" />
        </video>

        <div className="relative mx-auto w-full max-w-canvas px-6 sm:px-10 lg:px-margin">
          <div
            id="start-project"
            data-cursor-invert="true"
            className="relative bg-night px-6 py-5 sm:px-10 sm:py-12 lg:mx-auto lg:w-3/5 lg:min-w-[calc(680*var(--px))] lg:px-[calc(52*var(--px))]"
          >
            <div className="flex items-center">
              <span className="text-label text-night-muted">(LEAVE YOUR DETAILS)</span>
            </div>

            <h2 className="pt-3 text-section font-medium uppercase text-canvas sm:pt-8 lg:pt-[calc(16*var(--px))] lg:text-[calc(68*var(--px))]">
              <span className="sr-only">Let&rsquo;s break it nicely</span>
              <span aria-hidden="true" className="block">
                <SplitReveal as="span" className="block">
                  LET&rsquo;S BREAK IT
                </SplitReveal>
                <SwapWord
                  className="mt-[0.08em] text-accent"
                  words={["NICELY.", "PROPERLY."]}
                />
              </span>
            </h2>

            <Reveal
              as="div"
              className="flex flex-wrap items-baseline gap-x-3 gap-y-1 pt-2 sm:pt-4 lg:pt-[calc(14*var(--px))]"
            >
              <span className="text-body text-night-muted">Or just write:</span>
              <a
                href={`mailto:${SITE.email}`}
                className="inline-flex items-center border-b border-white/30 pb-[calc(2*var(--px))] text-body text-canvas transition-colors duration-200 hover:border-white"
              >
                {SITE.emailDisplay}
              </a>
            </Reveal>

            <form noValidate onSubmit={onSubmit}>
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="sr-only"
                name="website"
                value={values.website}
                onChange={set("website")}
              />

              <Reveal
                as="div"
                className="grid gap-y-4 pt-4 sm:gap-y-7 sm:pt-7 lg:grid-cols-2 lg:gap-x-[calc(35*var(--px))] lg:pt-[calc(34*var(--px))]"
              >
                <div>
                  <label htmlFor="lead-name" className="block text-label text-night-muted">
                    NAME
                  </label>
                  <input
                    id="lead-name"
                    name="name"
                    placeholder="Your full name"
                    type="text"
                    autoComplete="name"
                    value={values.name}
                    onChange={set("name")}
                    aria-invalid={!!errors.name}
                    className={inputCls(!!errors.name)}
                  />
                </div>
                <div>
                  <label htmlFor="lead-email" className="block text-label text-night-muted">
                    EMAIL
                  </label>
                  <input
                    id="lead-email"
                    name="email"
                    placeholder="name@company.com"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    value={values.email}
                    onChange={set("email")}
                    aria-invalid={!!errors.email}
                    className={inputCls(!!errors.email)}
                  />
                </div>
              </Reveal>

              <Reveal
                as="div"
                className="grid gap-y-4 pt-4 sm:gap-y-7 sm:pt-7 lg:grid-cols-2 lg:gap-x-[calc(35*var(--px))] lg:pt-[calc(34*var(--px))]"
              >
                <div>
                  <label htmlFor="lead-phone" className="block text-label text-night-muted">
                    PHONE
                  </label>
                  <input
                    id="lead-phone"
                    name="phone"
                    placeholder="+91"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    value={values.phone}
                    onChange={set("phone")}
                    className={inputCls()}
                  />
                </div>
                <div>
                  <label htmlFor="lead-reason" className="block text-label text-night-muted">
                    REASON
                  </label>
                  <select
                    id="lead-reason"
                    name="reason"
                    value={values.reason}
                    onChange={set("reason")}
                    className={`${inputCls()} ${
                      values.reason ? "" : "text-white/35"
                    } [&>option]:text-ink`}
                  >
                    <option value="">Pick a reason</option>
                    {REASONS.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
              </Reveal>

              <Reveal as="div" className="grid grid-cols-1 pt-4 sm:pt-7 lg:pt-[calc(34*var(--px))]">
                <div className="lg:col-span-2">
                  <label htmlFor="lead-message" className="block text-label text-night-muted">
                    MESSAGE
                  </label>
                  <input
                    id="lead-message"
                    name="message"
                    placeholder="A few words"
                    type="text"
                    value={values.message}
                    onChange={set("message")}
                    className={inputCls()}
                  />
                </div>
              </Reveal>

              <Reveal
                as="div"
                className="flex flex-row items-center gap-4 pb-3 pt-5 sm:gap-[calc(36*var(--px))] sm:pb-20 sm:pt-9 lg:pb-[calc(46*var(--px))]"
              >
                <SiteButton type="submit" tone="dark" disabled={status === "sending"}>
                  {status === "sending"
                    ? "Sending"
                    : status === "sent"
                      ? "Details Sent"
                      : status === "failed"
                        ? "Try Again"
                        : "Send Details"}
                </SiteButton>
                <p aria-live="polite" className="text-label text-night-muted">
                  {status === "sent"
                    ? "Got it. Talk soon."
                    : status === "failed"
                      ? "Something went wrong."
                      : "No spam. Straight to my inbox."}
                </p>
              </Reveal>
            </form>

            <Reveal as="div" className="sm:-mt-14 lg:-mt-[calc(34*var(--px))]">
              <p className="text-label text-night-muted">
                Sent details land in my inbox and nowhere else.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
