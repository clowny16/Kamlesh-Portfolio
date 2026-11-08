import {
  Workflow, ClipboardCheck, Flame, RotateCcw, Puzzle, Monitor,
  BadgeCheck, Boxes, Search, Globe, MonitorSmartphone,
  FileCheck2, Bug, ListChecks, Repeat2, Sparkles,
} from "lucide-react";
const SKILLS = [
  {
    num: "01",
    title: "Manual & Functional Testing",
    description: 'From "we have a build" to smoke, sanity, regression, integration, system and UAT - across web, mobile and every browser in between.',
  },
  {
    num: "02",
    title: "API Testing (Postman)",
    description: "Design requests, validate request/response data and assert integration behavior across business-critical e-commerce workflows.",
  },
  {
    num: "03",
    title: "AI-Assisted QA",
    description: "Test cases, edge cases, test data, bug reports and exploratory charters - generated and sharpened with Claude, ChatGPT, Z.ai, Antigravity and Codex.",
  },
  {
    num: "04",
    title: "SQL & Database Validation",
    description: "Queries that prove what the UI claims - validating backend data, records and application behavior with AI-assisted log analysis.",
  },
] as const;

const TOOLKIT = [
  "SDLC, STLC",
  "Manual & Functional Testing",
  "Smoke and Sanity Testing",
  "Regression Testing",
  "Integration Testing",
  "System Testing",
  "User Acceptance Testing (UAT)",
  "Black Box & White Box Testing",
  "Exploratory, Ad-hoc Testing",
  "Cross-browser, Cross-platform",
  "Mobile & Web App Testing",
  "API Testing (Postman)",
  "Test Case Design",
  "Bug Reporting",
  "Defect Tracking",
  "Agile Methodology",
  "Asana, Trello",
  "Python (Basics)",
  "Shopify App Testing",
  "AI-assisted Testing",
] as const;

const TOOLKIT_ICONS = [
  Workflow, ClipboardCheck, Flame, RotateCcw, Puzzle, Monitor,
  BadgeCheck, Boxes, Search, Globe, MonitorSmartphone, null,
  FileCheck2, Bug, ListChecks, Repeat2, null, null, null, Sparkles,
] as const;
const TOOLKIT_LOGOS: Record<string, string[]> = {
  "API Testing (Postman)": ["postman"],
  "Asana, Trello": ["asana", "trello"],
  "Python (Basics)": ["python"],
  "Shopify App Testing": ["shopify"],
};

function ToolkitIcon({ tool, index }: { tool: string; index: number }) {
  const logos = TOOLKIT_LOGOS[tool];
  if (logos) {
    return (
      <span aria-hidden="true" className="inline-flex shrink-0 items-center gap-1.5">
        {logos.map((logo) => (
          <img key={logo} src={`/icons/tools/${logo}.svg`} alt="" width={18} height={18}
            className="h-[18px] w-[18px] object-contain" />
        ))}
      </span>
    );
  }
  const Icon = TOOLKIT_ICONS[index] ?? ClipboardCheck;
  return <Icon aria-hidden="true" strokeWidth={1.7} className="h-[18px] w-[18px] shrink-0 text-night-body" />;
}
export default function SkillsetSection() {
  return (
    <section
      id="skillset"
      aria-labelledby="skillset-heading"
      className="relative w-full bg-night py-16 text-canvas lg:py-24"
    >
      <div className="mx-auto w-full max-w-canvas px-6 sm:px-10 lg:px-margin">
        <h2 id="skillset-heading" className="text-section font-medium">Skillset</h2>

        <ol className="mt-10 border-t border-night-hr/60 lg:mt-12">
          {SKILLS.map((skill) => (
            <li key={skill.num} className="grid items-center gap-y-3 border-b border-night-hr/60 py-7 md:grid-cols-[56px_1fr] md:gap-x-6 lg:min-h-[124px] lg:grid-cols-[0.7fr_3.7fr_3.6fr] lg:gap-x-6 lg:py-8">
              <span className="text-body text-night-body">{skill.num}</span>
              <h3 className="text-subhead font-medium tracking-tight">{skill.title}</h3>
              <p className="text-body text-night-body md:col-start-2 lg:col-start-auto">{skill.description}</p>
            </li>
          ))}
        </ol>

        <div className="mt-12 lg:mt-14">
          <h3 className="text-label font-normal uppercase text-night-body">(Toolkit)</h3>
          <ul className="mt-6 flex flex-wrap gap-2.5">
            {TOOLKIT.map((tool, index) => (
              <li key={tool} className="inline-flex items-center gap-2.5 border border-white/10 bg-white/[0.03] px-4 py-2.5 font-space text-[13px] font-medium leading-5 text-canvas">
                <ToolkitIcon tool={tool} index={index} />
                <span>{tool}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
