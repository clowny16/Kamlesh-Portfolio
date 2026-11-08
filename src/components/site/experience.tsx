import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/site/reveal";
import SplitReveal from "@/components/site/split-reveal";
import HoverText from "@/components/site/hover-text";
import SiteButton from "@/components/site/site-button";
import { SITE } from "@/lib/site";

const JOBS = [
  {
    company: "WebContrive Technologies Pvt. Ltd.",
    logo: "/images/companies/webcontrive.png",
    tagline: "Shopify Plus Partner",
    role: "QA Tester",
    period: "Jan 2026 – Present",
    location: "Surat, India",
    linkedin: SITE.linkedinWebcontrive,
    bullets: [
      "End-to-end manual testing of Shopify apps, Shopify Plus stores and SaaS products across web and mobile-responsive environments.",
      "Test cases, scenarios, regression suites, smoke/sanity checks, UI/UX and cross-browser coverage.",
      "Merchant workflows across Shopify Admin, storefronts, checkout, orders, customer accounts, product data and app integrations.",
      "API testing with Postman — validating request/response data and integration behavior.",
      "Defects identified, documented, prioritized and retested alongside developers and product teams.",
      "Agile/Scrum ceremonies, requirement analysis, sprint testing and release validation.",
    ],
    products: [
      { label: "Rivyo", href: "https://apps.shopify.com/rivyo-product-review" },
      { label: "Wishlist Club", href: "https://apps.shopify.com/wishlist-club" },
      { label: "Addup", href: "https://apps.shopify.com/addup-checkout-customization" },
      { label: "Editly", href: "https://apps.shopify.com/editly-order-editing" },
      { label: "Utterbond", href: "https://apps.shopify.com/utterbond-subscriptions" },
      { label: "Uncap", href: "https://apps.shopify.com/uncap-quotes" },
      { label: "QuickHunt", href: "https://quickhunt.app/" },
    ],
  },
  {
    company: "Netizens Technologies",
    logo: "/images/companies/netizens.svg",
    tagline: "Web & Mobile Products",
    role: "Manual QA Tester",
    period: "May 2024 – Dec 2025",
    location: "Surat, India",
    linkedin: SITE.linkedinNetizens,
    bullets: [
      "Designed and executed comprehensive test cases for web and mobile applications.",
      "Functional, regression and compatibility testing across multiple platforms.",
      "Defects identified, documented and tracked in Asana, with developers looped in for timely resolution.",
      "User acceptance testing with detailed, actionable feedback.",
    ],
    products: [
      { label: "Meyba", href: "https://www.meyba.com/" },
      { label: "Pentavite", href: "https://www.pentavite.com/" },
      { label: "Keg King", href: "https://www.kegking.com.au/" },
      { label: "Fleeto", href: "https://fleetotruck.com/" },
      { label: "AL Dental Studio", href: "https://www.aldentalstudio.com/" },
    ],
  },
] as const;

const EDUCATION = [
  {
    degree: "B.E. Electrical Engineering",
    school: "North Maharashtra University",
    period: "2020 – 2023",
  },
  {
    degree: "Diploma in Electrical Engineering",
    school: "MSBTE — Maharashtra State Board",
    period: "2016 – 2020",
  },
];

/**
 * Experience — two QA roles with real product links, plus education,
 * languages and a snapshot.
 */
export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="relative flex min-h-[100svh] w-full flex-col justify-center bg-canvas py-16 lg:py-32"
    >
      <div className="relative mx-auto w-full max-w-canvas px-6 sm:px-10 lg:px-margin">
        <SplitReveal as="h2" className="text-section font-medium text-ink">
          Experience
        </SplitReveal>

        <div aria-hidden="true" className="h-[1.5px] w-full bg-rule mt-8 lg:mt-[calc(32*var(--px))]" />

        {JOBS.map((job, i) => (
          <div key={job.company}>
            <Reveal as="div" delay={i * 80}>
              <article className="grid grid-cols-1 gap-y-5 py-10 lg:grid-cols-[calc(330*var(--px))_1fr] lg:gap-x-[calc(56*var(--px))] lg:py-[calc(44*var(--px))]">
                {/* left: company + meta */}
                <div>
                  <p className="text-label text-muted">({job.period})</p>
                  <div className="mt-3 flex items-center gap-3">
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-rule/60 bg-white p-2">
                      <img src={job.logo} alt="" aria-hidden="true" width={32} height={32} className="h-8 w-8 object-contain" />
                    </span>
                    <h3 className="font-funnel text-[clamp(1.375rem,2.2vw,2rem)] font-medium leading-tight text-ink">
                      {job.company}
                    </h3>
                  </div>
                  <p className="mt-1 text-body text-muted">
                    {job.tagline} — {job.location}
                  </p>
                  <a
                    href={job.linkedin}
                    target="_blank"
                    rel="noreferrer noopener"
                    data-hw="true"
                    className="mt-4 inline-flex items-center gap-2 border-b border-chip pb-[calc(2*var(--px))] text-label font-medium uppercase text-ink transition-colors duration-200 [--hw-base:currentColor] hover:border-ink hover:text-accent"
                  >
                    <span className="sr-only">{job.company} on LinkedIn</span>
                    <span aria-hidden="true" className="contents">
                      <HoverText>LinkedIn</HoverText>
                    </span>
                    <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                  </a>
                </div>

                {/* right: role + bullets + products */}
                <div>
                  <p className="text-subhead font-medium text-ink">{job.role}</p>
                  <ul className="mt-4 grid grid-cols-1 gap-x-10 md:grid-cols-2">
                    {job.bullets.map((b) => (
                      <li key={b} className="flex items-baseline gap-3 py-[calc(6*var(--px))]">
                        <span aria-hidden="true" className="mt-[0.55em] h-[5px] w-[5px] shrink-0 rounded-full bg-accent" />
                        <span className="text-body text-muted">{b}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 text-label text-muted">TESTED PRODUCTS</p>
                  <ul className="mt-3 flex flex-wrap gap-[calc(10*var(--px))]">
                    {job.products.map((p) => (
                      <li key={p.label}>
                        <a
                          href={p.href}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="group/p inline-flex items-center gap-2 border border-chip px-[calc(13*var(--px))] py-[calc(8*var(--px))] text-label font-medium capitalize text-ink transition-colors duration-200 hover:border-ink hover:text-accent [@media(pointer:coarse)]:min-h-[calc(44*var(--px))]"
                        >
                          {p.label}
                          <ArrowUpRight
                            aria-hidden="true"
                            className="h-3.5 w-3.5 opacity-40 transition-all duration-300 group-hover/p:-translate-y-[1px] group-hover/p:opacity-100"
                          />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
            <div aria-hidden="true" className="h-[1.5px] w-full bg-rule" />
          </div>
        ))}

        {/* education / languages / snapshot */}
        <div className="grid grid-cols-1 gap-x-[calc(56*var(--px))] gap-y-10 py-12 sm:grid-cols-2 lg:grid-cols-3 lg:py-[calc(56*var(--px))]">
          <Reveal as="div">
            <p className="text-label text-muted">(EDUCATION)</p>
            <ul className="mt-4 flex flex-col gap-5">
              {EDUCATION.map((e) => (
                <li key={e.degree}>
                  <p className="text-body font-medium text-ink">{e.degree}</p>
                  <p className="mt-[2px] text-body text-muted">
                    {e.school} · {e.period}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal as="div" delay={60}>
            <p className="text-label text-muted">(LANGUAGES)</p>
            <ul className="mt-4 flex flex-wrap gap-[calc(10*var(--px))]">
              {["English", "Hindi", "Marathi", "Gujarati"].map((lang) => (
                <li
                  key={lang}
                  className="border border-chip px-[calc(13*var(--px))] py-[calc(8*var(--px))] text-label font-medium text-ink"
                >
                  {lang}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal as="div" delay={120} className="sm:col-span-2 lg:col-span-1">
            <p className="text-label text-muted">(SNAPSHOT)</p>
            <ul className="mt-4 flex flex-col gap-2 text-body text-muted">
              <li>{SITE.locations}</li>
              <li>
                <a href={`mailto:${SITE.email}`} className="border-b border-chip pb-[1px] text-ink transition-colors hover:border-ink hover:text-accent">
                  {SITE.email}
                </a>
              </li>
              <li>
                <a href={`tel:${SITE.phoneHref}`} className="border-b border-chip pb-[1px] text-ink transition-colors hover:border-ink hover:text-accent">
                  {SITE.phone}
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <SiteButton href={SITE.resume} external download="Kamlesh-Mali-Resume.pdf">
                Download Resume
              </SiteButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
