"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import Reveal from "@/components/site/reveal";
import styles from "./projects.module.css";
import { parseTags, type Project } from "@/lib/types";
import { PROJECTS } from "@/lib/site";

const FALLBACK_PROJECTS: Project[] = PROJECTS.map((p, i) => ({
  id: p.slug,
  slug: p.slug,
  title: p.title,
  role: p.role,
  timeline: p.timeline,
  year: p.year,
  team: p.team,
  company: p.company ?? null,
  link: p.link ?? null,
  cover: p.cover,
  tags: p.tags,
  description: p.description,
  sortOrder: i,
}));

/** Square app-store icons render best contained; site screenshots cover. */
const CONTAIN_COVERS = new Set(["rivyo", "editly", "wishlist", "addup", "utterbond", "uncap"]);

const META_KEYS = [
  ["TYPE", "role"],
  ["TIMELINE", "timeline"],
  ["YEAR", "year"],
  ["COMPANY", "team"],
] as const;

function MetaEntries({ project }: { project: Project }) {
  return (
    <>
      {META_KEYS.map(([label, key]) => (
        <div key={label}>
          <dt className="text-label text-muted">{label}</dt>
          <dd className="mt-1 text-body text-ink">{project[key]}</dd>
        </div>
      ))}
    </>
  );
}

/**
 * Selected Work — ten real, shipped products, each row linking to the
 * live app/site. Rows expand on hover; a details dialog carries the
 * testing story and the outbound link.
 */
export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [selected, setSelected] = useState<Project | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/projects")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<{ projects?: Project[] }>;
      })
      .then((json) => {
        if (cancelled) return;
        const list =
          Array.isArray(json.projects) && json.projects.length > 0
            ? json.projects
            : FALLBACK_PROJECTS;
        setProjects([...list].sort((a, b) => a.sortOrder - b.sortOrder));
      })
      .catch(() => {
        if (!cancelled) setProjects([...FALLBACK_PROJECTS]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      id="work"
      className={`${styles.work} relative flex min-h-[100svh] w-full flex-col justify-center bg-canvas py-16 lg:pt-32 lg:pb-[calc(164*var(--px))]`}
    >
      <div className="relative mx-auto w-full max-w-canvas px-6 sm:px-10 lg:px-margin">
        <WorkHeading />
        <Reveal delay={60}>
          <p className="mt-4 max-w-[calc(620*var(--px))] text-body text-muted">
            Ten shipped products I have tested end to end — every card opens the
            live project.
          </p>
        </Reveal>

        <div aria-hidden="true" className="h-[1.5px] w-full bg-rule mt-8 lg:mt-[calc(32*var(--px))]" />

        {projects === null ? (
          /* Skeleton rows while loading */
          <ul aria-hidden="true">
            {[0, 1, 2, 3].map((i) => (
              <li key={i} className="py-8 lg:py-[calc(28*var(--px))]">
                <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_calc(330*var(--px))] lg:gap-x-10">
                  <div className="h-9 w-1/2 max-w-[340px] animate-pulse rounded-[2px] bg-rule/50 lg:h-14" />
                  <div className="aspect-[16/10] w-full animate-pulse rounded-[2px] bg-rule/50 lg:aspect-[3/2] lg:w-[calc(330*var(--px))]" />
                </div>
                <div className="mt-8 h-[1.5px] w-full bg-rule/50" />
              </li>
            ))}
          </ul>
        ) : (
          <ul>
            {projects.map((project, i) => {
              const isActive = i === active;
              const href = project.link ?? "#work";
              const contain = CONTAIN_COVERS.has(project.slug);
              return (
                <li key={project.id} className={styles.row} data-active={isActive}
                  onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)}>
                  <div className="grid gap-4 py-6 lg:min-h-[112px] lg:grid-cols-[1fr_calc(330*var(--px))] lg:items-center lg:gap-x-10">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <h3 className={`${styles.title} text-project font-medium`}>
                          <a href={href} target="_blank" rel="noopener noreferrer">{project.title}</a>
                        </h3>
                        <div className="flex flex-wrap gap-3">
                          <a href={href} target="_blank" rel="noopener noreferrer"
                            className={`group/cta inline-flex items-center gap-2 border px-4 py-2 text-label font-medium transition-colors duration-300 hover:border-ink hover:text-ink ${isActive ? "border-ink text-ink" : "border-chip text-muted"}`}>
                            Jump To Project <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
                          </a>
                          <button type="button" onClick={() => setSelected(project)}
                            className="border border-chip px-4 py-2 text-label font-medium text-muted transition-colors hover:border-ink hover:text-ink">Details</button>
                        </div>
                      </div>
                      <dl aria-hidden={!isActive} className={`${styles.meta} grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4`}>
                        <MetaEntries project={project} />
                      </dl>
                    </div>
                    <a href={href} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden="true"
                      className={`${styles.preview} relative block rounded bg-rule/30 max-lg:hidden`}>
                      <img src={project.cover} alt="" loading="lazy" decoding="async"
                        className={`h-full w-full ${contain ? "bg-white object-contain p-[7%]" : "object-cover object-top"}`} />
                    </a>
                  </div>
                  <div aria-hidden="true" className="h-[1.5px] w-full bg-rule" />
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Project details modal */}
      <Dialog
        open={selected !== null}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      >
        <DialogContent className="max-w-[calc(880*var(--px))] sm:max-w-[calc(880*var(--px))] gap-0 overflow-hidden rounded-[calc(6*var(--px))] border-rule bg-canvas p-0 text-ink">
          {selected ? (
            <div className="pamidor-scroll max-h-[85vh] overflow-y-auto">
              { }
              <img
                src={selected.cover}
                alt={`${selected.title} cover`}
                decoding="async"
                className={`aspect-[16/9] w-full ${CONTAIN_COVERS.has(selected.slug) ? "bg-white object-contain p-[8%]" : "object-cover"}`}
              />
              <div className="p-6 sm:p-8">
                <DialogTitle className="text-project font-medium text-ink">{selected.title}</DialogTitle>
                <dl className="mt-6 grid grid-cols-2 gap-y-4 sm:grid-cols-4">
                  <MetaEntries project={selected} />
                </dl>
                <DialogDescription className="mt-4 text-body text-muted">
                  {selected.description}
                </DialogDescription>
                <div className="mt-8 flex flex-wrap gap-[calc(12*var(--px))]">
                  {tags(selected).map((tag) => (
                    <span
                      key={tag}
                      className="border border-chip p-[calc(9*var(--px))] text-label capitalize leading-none text-ink"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {selected.link ? (
                  <div className="mt-8">
                    <a
                      href={selected.link}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group/btn inline-flex items-center gap-3 border border-ink px-[calc(15*var(--px))] py-[calc(9*var(--px))] text-label font-medium uppercase leading-none tracking-[calc(-0.2*var(--px))] text-ink transition-colors duration-300 ease-out-soft hover:bg-ink hover:text-canvas [@media(pointer:coarse)]:min-h-[calc(48*var(--px))]"
                    >
                      Visit Live Project
                      <ArrowUpRight
                        aria-hidden="true"
                        className="h-4 w-4 shrink-0 transition-transform duration-300 ease-out-soft group-hover/btn:-rotate-45"
                      />
                    </a>
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  );
}

function tags(p: Project): string[] {
  return parseTags(p.tags);
}

function WorkHeading() {
  const ref = useRef<HTMLHeadingElement>(null);
  const [play, setPlay] = useState(false);
  useEffect(() => {
    const heading = ref.current;
    if (!heading) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setPlay(true); observer.disconnect(); }
    }, { threshold: 0.4 });
    observer.observe(heading);
    return () => observer.disconnect();
  }, []);
  return (
    <h2 ref={ref} data-play={play} className={`${styles.heading} text-section font-medium text-ink`}>
      <span className="sr-only">Selected Work</span>
      <span aria-hidden="true">{Array.from("Selected Work").map((char, i) => (
        <span key={i} data-work-char style={{ "--hwi": i } as CSSProperties}>{char}</span>
      ))}</span>
    </h2>
  );
}
