"use client";

import { useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { gsap, useGSAP } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";
import { projectHost, projectShot, type ProjectCard } from "@/lib/projectMedia";

export type ShowcaseProject = ProjectCard & {
  description: { fr: string; en: string };
  tags: { fr: string[]; en: string[] };
  year: number;
};

/** Doit rester identique à la requête média des règles .ps-* (globals.css). */
const PIN_QUERY = "(min-width: 1024px) and (min-height: 560px) and (prefers-reduced-motion: no-preference)";
/** Fonds successifs, un par boutique (neutres chauds et verts très doux). */
const BG = ["#f4f2ed", "#d9cfc4", "#dfe5e0", "#e5e0d6", "#d6e4d9", "#e9e3da", "#d2d9d4", "#e2d8cc"];

/**
 * « 01 — Réalisations » : chaque boutique phare occupe un grand panneau
 * (capture à gauche ; numéro, nom, accroche, description, tags et boutons à
 * droite). Sur ordinateur, la section est épinglée et les panneaux défilent
 * horizontalement au scroll, pendant que le fond change de teinte d'une
 * boutique à l'autre. Sur mobile, les panneaux s'empilent.
 */
export default function ProjectShowcase({
  projects,
  totalCount,
  index,
}: {
  projects: ShowcaseProject[];
  totalCount: number;
  index?: string;
}) {
  const t = useTranslations("projects");
  const tc = useTranslations("catalog");
  const locale = useLocale() as "fr" | "en";
  const root = useRef<HTMLElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const count = projects.length;
  const nicheLabel = (n: string) => (tc.has(`niches.${n}`) ? tc(`niches.${n}`) : undefined);

  useGSAP(
    () => {
      const section = root.current!;
      const setBg = (i: number) => section.style.setProperty("--ps-bg", BG[i % BG.length]);
      const mm = gsap.matchMedia();

      mm.add(PIN_QUERY, () => {
        const track = rail.current!;
        const view = viewport.current!;
        const distance = () => Math.max(track.scrollWidth - view.clientWidth, 0);
        const panels = gsap.utils.toArray<HTMLElement>(".ps-panel", track);

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: view,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.7,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        panels.forEach((panel, i) => {
          // Changement de teinte quand le panneau arrive au centre.
          gsap.to({}, {
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tween,
              start: "left 55%",
              end: "right 55%",
              onToggle: (self) => self.isActive && setBg(i),
            },
          });
          // Légère profondeur : l'image et le texte glissent à des vitesses différentes.
          const img = panel.querySelector(".ps-media");
          const copy = panel.querySelector(".ps-copy");
          if (img) {
            gsap.fromTo(img, { xPercent: 8 }, {
              xPercent: -8,
              ease: "none",
              scrollTrigger: { trigger: panel, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
            });
          }
          if (copy) {
            gsap.fromTo(copy, { xPercent: 18, autoAlpha: 0.2 }, {
              xPercent: 0,
              autoAlpha: 1,
              ease: "power2.out",
              scrollTrigger: { trigger: panel, containerAnimation: tween, start: "left 85%", end: "left 35%", scrub: true },
            });
          }
        });
        setBg(0);
        return () => section.style.removeProperty("--ps-bg");
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".ps-panel").forEach((panel) => {
          if (window.matchMedia(PIN_QUERY).matches) return;
          gsap.from(panel.querySelectorAll(".ps-media, .ps-copy"), {
            y: 60,
            autoAlpha: 0,
            duration: 1.1,
            ease: "expo.out",
            stagger: 0.1,
            scrollTrigger: { trigger: panel, start: "top 85%", once: true },
          });
        });
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="realisations"
      data-hide-cta
      className="ps tone-light relative scroll-mt-24 pt-24 transition-[background-color] duration-700 sm:pt-32"
      style={{ backgroundColor: "var(--ps-bg, #f4f2ed)" }}
    >
      <div className="container-page">
        <SectionHeading
          layout="split"
          index={index}
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("showcaseSubtitle", { count: totalCount })}
        />
      </div>

      <div ref={viewport} className="ps-viewport mt-12 lg:mt-6">
        <div ref={rail} className="ps-rail gap-0 lg:gap-[6vw] lg:pl-[max(2rem,calc((100vw-var(--container-page))/2+2rem))] lg:pr-[8vw]">
          {projects.map((p, i) => {
            const name = p.name[locale];
            const niche = nicheLabel(p.niche);
            const tags = p.tags[locale]?.length ? p.tags[locale] : ["Shopify", ...(niche ? [niche] : [])];
            return (
              <article
                key={p.id}
                className="ps-panel px-5 py-14 sm:px-8 lg:px-0 lg:py-0"
                style={{ "--panel-bg": BG[i % BG.length] } as React.CSSProperties}
              >
                <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1fr)] lg:gap-[5vw]">
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor={t("visit")}
                    aria-label={`${name} — ${t("visit")} (${projectHost(p)})`}
                    className="ps-media shot-trigger group relative block overflow-hidden rounded-2xl bg-surface shadow-[0_50px_90px_-45px_rgba(14,19,17,0.6)] ring-1 ring-black/5"
                  >
                    <div className="relative aspect-[4/5] w-full lg:aspect-auto lg:h-[min(70svh,640px)]">
                      {/* eslint-disable-next-line @next/next/no-img-element -- captures WebP pré-optimisées */}
                      <img
                        src={projectShot(p)}
                        alt={`${name} — boutique Shopify`}
                        loading={i < 2 ? "eager" : "lazy"}
                        decoding="async"
                        className="shot-scroll absolute inset-0 size-full"
                      />
                    </div>
                  </a>

                  <div className="ps-copy max-w-xl">
                    <p className="font-mono text-sm text-ink-muted">
                      {String(i + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
                    </p>
                    <h3 className="mt-3 font-serif text-[clamp(3rem,6vw,6.2rem)] font-normal leading-[0.95] tracking-[-0.02em]">
                      {name}
                    </h3>
                    <p className="mt-3 font-serif text-2xl italic leading-snug text-ink/85 sm:text-[1.9rem]">
                      {p.tagline[locale]}
                    </p>
                    <p className="mt-6 line-clamp-5 text-base leading-relaxed text-ink-muted sm:text-[17px]">
                      {p.description[locale]}
                    </p>
                    <p className="mt-6 text-sm text-ink sm:text-base">
                      {tags.join(", ")}
                      {p.year ? <span className="text-ink-muted"> — {p.year}</span> : null}
                    </p>
                    <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 rounded-full bg-[#0e1311] px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#008060]"
                      >
                        {t("viewLive")}
                        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
                      </a>
                      <span className="font-mono text-xs text-ink-muted">{projectHost(p)}</span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}

          {/* Fin de la vitrine : toutes les boutiques */}
          <article className="ps-panel ps-end flex items-center px-5 py-16 sm:px-8 lg:px-0 lg:py-0">
            <div>
              <p className="font-serif text-[clamp(7rem,16vw,15rem)] leading-[0.8] tracking-[-0.03em]">{totalCount}</p>
              <p className="mt-4 max-w-sm font-serif text-3xl leading-tight">{t("liveStores")}</p>
              <Link
                href="/realisations"
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[#0e1311] px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#008060]"
              >
                {t("viewAll")}
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
