"use client";

import { useRef } from "react";
import { Check } from "lucide-react";
import Reveal from "@/components/site/reveal";
import SplitReveal from "@/components/site/split-reveal";
import SiteButton from "@/components/site/site-button";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

const LAB_SHADOW =
  "[box-shadow:0_calc(18*var(--px))_calc(40*var(--px))_rgba(10,10,10,0.18)]";

const CAPABILITIES: string[] = [
  "Test case generation from requirements & user stories",
  "Prompt engineering with context, constraints & examples",
  "Requirement analysis — ambiguities & missing acceptance criteria",
  "Sharper bug titles, repro steps, severity & impact",
  "Positive, negative, boundary & invalid test data",
  "Exploratory charters, personas & failure scenarios",
  "REST API scenario design, payloads & assertions",
  "SQL queries & AI-assisted database validation",
  "Log, error & stack-trace analysis for root cause",
  "Test plans, checklists, regression suites & QA summaries",
];

/**
 * The AI Lab — how Claude, ChatGPT, Z.ai, Antigravity and Codex are folded
 * into the daily QA workflow.
 */
export default function AiLabSection() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(root);

      // Prints rise out of the page with a rotation settle…
      const prints = q("[data-print-img]");
      if (prints.length) {
        gsap.set(prints, { opacity: 0, y: 70, rotation: (i: number) => (i % 2 === 0 ? 8 : -7) });
        gsap.to(prints, {
          opacity: 1,
          y: 0,
          rotation: (i: number) => (i % 2 === 0 ? -4 : 3),
          duration: 1.15,
          ease: "out-expo",
          stagger: 0.14,
          scrollTrigger: { trigger: root.current, start: "top 72%", once: true },
        });
      }

      // …then idle on a slow float.
      q("[data-print]").forEach((el, i) => {
        gsap.to(el, {
          y: i % 2 === 0 ? -8 : 7,
          duration: 2.8 + i * 0.35,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          delay: 1.5,
        });
      });
    },
    { scope: root }
  );

  return (
    <section
      id="ai-lab"
      ref={root}
      className="relative flex min-h-[100svh] w-full flex-col justify-center bg-canvas py-16 lg:py-32"
    >
      <div className="relative mx-auto w-full max-w-canvas px-6 sm:px-10 lg:px-margin">
        <div aria-hidden="true" className="h-[1.5px] w-full bg-rule" />

        <div className="pt-7 lg:pt-[calc(38*var(--px))]">
          <SplitReveal as="h2" className="text-section font-medium text-ink">
            The AI Lab
          </SplitReveal>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:mt-[calc(54*var(--px))] lg:gap-y-[calc(30*var(--px))]">
          {/* Desktop — the two prints pinned side by side */}
          <Reveal as="div" className="hidden sm:flex sm:flex-col">
            <div className="relative mt-2 flex items-start gap-5 lg:gap-[calc(26*var(--px))]">
              <span data-print="true" className="block w-[58%] shrink-0">
                {/* AI lab print 1 */}
                <img
                  data-print-img="true"
                  src="/images/gen/ai-lab-1.png"
                  alt="AI quality assurance illustration — a mind scanned by a magnifying lens"
                  loading="lazy"
                  decoding="async"
                  width={1152}
                  height={864}
                  className={`h-auto w-full ${LAB_SHADOW} will-change-transform`}
                />
              </span>
              <span data-print="true" className="mt-8 block w-[42%] shrink-0">
                {/* AI lab print 2 */}
                <img
                  data-print-img="true"
                  src="/images/gen/ai-lab-2.png"
                  alt="Chat bubbles turning into a checklist of test cases"
                  loading="lazy"
                  decoding="async"
                  width={1152}
                  height={864}
                  className={`h-auto w-full ${LAB_SHADOW} will-change-transform`}
                />
              </span>
            </div>
          </Reveal>

          <Reveal as="div" className="flex flex-col" delay={100}>
            <p className="mt-5 text-body text-muted lg:mt-[calc(30*var(--px))]">
              Let&rsquo;s get one thing straight — I don&rsquo;t test like it&rsquo;s 2015.
              Claude, ChatGPT, Z.ai, Antigravity and Codex are part of my daily
              toolkit, wired into every stage of the loop: from reading a fuzzy
              requirement to filing the bug, generating the data, and writing the
              release notes.
            </p>
            <p className="mt-4 text-body text-muted">
              AI never replaces the tester — it multiplies coverage. I prompt
              with real context and constraints, verify every output against the
              product, and keep sensitive data out of the loop. The result:
              sharper cases, faster turnaround and fewer escapes to production.
            </p>
          </Reveal>

          {/* Mobile — the prints drop below the copy */}
          <Reveal as="div" className="mt-2 flex items-start gap-5 sm:hidden">
            <span data-print="true" className="block w-[58%] shrink-0">
              {/* AI lab print 1 (mobile) */}
              <img
                data-print-img="true"
                src="/images/gen/ai-lab-1.png"
                alt="AI quality assurance illustration — a mind scanned by a magnifying lens"
                loading="lazy"
                decoding="async"
                width={1152}
                height={864}
                className={`h-auto w-full ${LAB_SHADOW} will-change-transform`}
              />
            </span>
            <span data-print="true" className="mt-8 block w-[42%] shrink-0">
              {/* AI lab print 2 (mobile) */}
              <img
                data-print-img="true"
                src="/images/gen/ai-lab-2.png"
                alt="Chat bubbles turning into a checklist of test cases"
                loading="lazy"
                decoding="async"
                width={1152}
                height={864}
                className={`h-auto w-full ${LAB_SHADOW} will-change-transform`}
              />
            </span>
          </Reveal>
        </div>

        {/* Capability checklist */}
        <Reveal as="div" className="mt-12 lg:mt-[calc(54*var(--px))]">
          <p className="text-label text-muted">(WHAT AI DOES IN MY WORKFLOW)</p>
          <ul className="mt-6 grid grid-cols-1 gap-x-10 gap-y-0 sm:grid-cols-2">
            {CAPABILITIES.map((cap, i) => (
              <li
                key={cap}
                className="flex items-baseline gap-3 border-b border-rule/70 py-[calc(11*var(--px))] last:border-b-0 sm:[&:nth-last-child(2)]:border-b-0"
                style={{ transitionDelay: `${i * 20}ms` }}
              >
                <Check aria-hidden="true" className="h-[1.05em] w-[1.05em] shrink-0 translate-y-[0.15em] text-accent" strokeWidth={2.5} />
                <span className="text-body text-ink">{cap}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-10 flex flex-wrap gap-4 lg:mt-[calc(44*var(--px))]">
          <SiteButton href="#work">See It In The Work</SiteButton>
          <SiteButton href="/resume/Kamlesh-Mali-Resume.pdf" external>
            Download Resume
          </SiteButton>
        </div>
      </div>
    </section>
  );
}
