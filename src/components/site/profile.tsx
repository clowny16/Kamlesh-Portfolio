"use client";

import { Database, ClipboardCheck, RotateCcw, Search, Repeat2, Globe, MonitorSmartphone, Bug, Wrench } from "lucide-react";
import Reveal from "@/components/site/reveal";
import Marquee from "@/components/site/marquee";
import WaveText from "@/components/site/wave-text";
import CountUp from "@/components/site/count-up";

const INTRO_COPY =
  "Hi, I'm Kamlesh — a manual QA tester who takes it personally when software misbehaves. E-commerce, healthcare, transport, legal: I've tested products across four domains, designing test cases, hunting edge cases and reporting bugs with the kind of detail developers actually enjoy. These days Claude, ChatGPT, Z.ai, Antigravity and Codex sit inside my daily workflow too.";

const STATS: Array<[string, string]> = [
  ["02+", "Years in QA"],
  ["10+", "Products tested"],
  ["04", "Domains covered"],
  ["05", "AI tools, daily"],
];

const TOOLS_ROW_ONE = [
  "Shopify",
  "Postman",
  "Asana",
  "Trello",
  "Python",
  "SQL",
  "UAT",
  "Regression",
  "Exploratory",
];

const TOOLS_ROW_TWO = [
  "Claude",
  "ChatGPT",
  "Z.ai",
  "Antigravity",
  "Codex",
  "Agile · Scrum",
  "Cross-Browser",
  "Mobile & Web",
  "Defect Tracking",
];

const TOOL_LOGOS: Record<string, string> = {
  Shopify: "shopify.svg", Postman: "postman.svg", Asana: "asana.svg",
  Trello: "trello.svg", Python: "python.svg", Claude: "claude.svg",
  ChatGPT: "chatgpt.png", "Z.ai": "zai.png", Antigravity: "antigravity.png", Codex: "codex.png",
};
const WORKFLOW_ICONS: Record<string, typeof Database> = {
  SQL: Database, UAT: ClipboardCheck, Regression: RotateCcw,
  Exploratory: Search, "Agile · Scrum": Repeat2, "Cross-Browser": Globe,
  "Mobile & Web": MonitorSmartphone, "Defect Tracking": Bug,
};

function ToolIcon({ tool }: { tool: string }) {
  const logo = TOOL_LOGOS[tool];
  const Icon = WORKFLOW_ICONS[tool] ?? Wrench;
  return logo ? (
    <img src={`/icons/tools/${logo}`} alt="" aria-hidden="true" width={28} height={28}
      className="h-[calc(26*var(--px))] w-[calc(26*var(--px))] shrink-0 object-contain" />
  ) : (
    <Icon aria-hidden="true" strokeWidth={1.7} className="h-[calc(25*var(--px))] w-[calc(25*var(--px))] shrink-0 text-ink/65" />
  );
}
function ToolRow({ tools }: { tools: string[] }) {
  return (
    <>
      {tools.map((tool, i) => (
        <span
          key={`${tool}-${i}`}
          className="mr-[calc(56*var(--px))] inline-flex shrink-0 items-center gap-[calc(14*var(--px))]"
        >
          <ToolIcon tool={tool} />
          <span className="whitespace-nowrap font-funnel text-[calc(22*var(--px))] font-medium uppercase tracking-[-0.01em] text-ink/55">
            {tool}
          </span>
          <span aria-hidden="true" className="h-[calc(6*var(--px))] w-[calc(6*var(--px))] rounded-full bg-accent/60" />
        </span>
      ))}
    </>
  );
}

export default function ProfileSection() {
  return (
    <section
      id="profile"
      className="relative flex min-h-[100svh] w-full flex-col justify-center bg-canvas lg:block lg:min-h-0 lg:py-0"
    >
      <div className="relative mx-auto w-full max-w-canvas px-6 py-16 sm:px-10 lg:px-margin lg:py-32">
        {/* Wave intro paragraph with floating QA flat-lay */}
        <p className="mt-6 max-w-[calc(1129*var(--px))] text-lead font-medium text-ink lg:mt-[calc(56*var(--px))]">
          <span
            aria-hidden="true"
            className="mb-6 mt-2 block w-[38%] float-right ml-8 sm:w-[26%] sm:max-w-[calc(206*var(--px))]"
          >
            <span className="pointer-events-none relative block aspect-square -rotate-[6deg] overflow-hidden [box-shadow:0_calc(18*var(--px))_calc(40*var(--px))_rgba(10,10,10,0.18)]">
              { }
              <img
                src="/images/profile-kamlesh.jpg"
                alt=""
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover object-[50%_65%]"
              />
            </span>
          </span>
          <WaveText as="span" className="inline" text={INTRO_COPY} />
        </p>

        <div aria-hidden="true" className="h-[1.5px] w-full bg-rule mt-12 lg:mt-[calc(64*var(--px))]" />

        {/* Bottom row: stats (desktop) + tools marquee */}
        <div className="pt-8 lg:flex lg:gap-x-[calc(45*var(--px))] lg:pt-[calc(15*var(--px))]">
          <Reveal as="div" className="lg:w-[calc(305*var(--px))] lg:shrink-0">
            <p className="text-label text-muted">(IN NUMBERS)</p>
            <dl className="mt-6 grid grid-cols-2 gap-y-6 lg:mt-[calc(24*var(--px))] lg:grid-cols-1 lg:gap-y-[calc(18*var(--px))]">
              {STATS.map(([num, label]) => (
                <div key={label} className="flex items-baseline gap-3 lg:gap-0 lg:flex-col lg:gap-y-1">
                  <dt className="font-funnel text-[calc(44*var(--px))] font-medium leading-none text-ink">
                    <CountUp value={num} />
                  </dt>
                  <dd className="text-label uppercase tracking-[0.06em] text-muted">{label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <div className="min-w-0 lg:flex-1 lg:pt-[calc(35*var(--px))]">
            <p className="text-label text-muted">(TOOLS &amp; WORKFLOWS)</p>
            <div className="relative mt-6 lg:mt-[calc(18*var(--px))]">
              <div className="flex flex-col gap-6 lg:gap-[calc(24*var(--px))]">
                <Marquee duration={38} className="h-[calc(30*var(--px))]">
                  <ToolRow tools={TOOLS_ROW_ONE} />
                </Marquee>
                <Marquee duration={46} reverse className="h-[calc(30*var(--px))]">
                  <ToolRow tools={TOOLS_ROW_TWO} />
                </Marquee>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
