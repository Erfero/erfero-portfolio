"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { projectThumb } from "@/lib/projectMedia";
import SectionHeading from "@/components/ui/SectionHeading";
import type { ProjectCard as Project } from "@/lib/projectMedia";

/**
 * Univers dans lesquels des boutiques ont été livrées. Desktop : au survol
 * d'une ligne, un aperçu d'une vraie boutique de cet univers suit le curseur.
 * Chaque ligne ouvre la galerie filtrée sur cet univers.
 */
export default function ExpertiseCatalog({
  projects,
  nicheImages = {},
  index,
}: {
  projects: Project[];
  nicheImages?: Record<string, string>;
  index?: string;
}) {
  const t = useTranslations("catalog");
  const root = useRef<HTMLElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);

  const groups = new Map<string, Project[]>();
  for (const p of projects) {
    if (!p.niche || p.niche === "unknown" || !t.has(`niches.${p.niche}`)) continue;
    groups.set(p.niche, [...(groups.get(p.niche) ?? []), p]);
  }
  const niches = Array.from(groups.entries()).sort((a, b) => b[1].length - a[1].length);
  const imageFor = (niche: string) => nicheImages[niche] || projectThumb(groups.get(niche)![0]);

  useGSAP(
    () => {
      const section = root.current!;
      const el = preview.current!;
      const list = section.querySelector<HTMLElement>(".ec-list")!;
      const rows = gsap.utils.toArray<HTMLElement>("[data-niche]", section);

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(".ec-row", {
          y: 30,
          autoAlpha: 0,
          stagger: 0.05,
          duration: 0.9,
          ease: "expo.out",
          scrollTrigger: { trigger: list, start: "top 85%", once: true },
        });
      });

      // Aperçu flottant : écouteurs natifs (aucun accès aux refs pendant le rendu).
      const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3" });
      const onMove = (e: MouseEvent) => {
        const box = section.getBoundingClientRect();
        xTo(e.clientX - box.left);
        yTo(e.clientY - box.top);
      };
      const show = (niche: string | null) => {
        setActive(niche);
        gsap.to(el, { autoAlpha: niche ? 1 : 0, scale: niche ? 1 : 0.85, duration: 0.4, ease: "power3.out" });
      };
      const onEnter = (e: Event) => show((e.currentTarget as HTMLElement).dataset.niche ?? null);
      const onLeave = () => show(null);

      section.addEventListener("mousemove", onMove);
      list.addEventListener("mouseleave", onLeave);
      rows.forEach((row) => row.addEventListener("mouseenter", onEnter));
      return () => {
        section.removeEventListener("mousemove", onMove);
        list.removeEventListener("mouseleave", onLeave);
        rows.forEach((row) => row.removeEventListener("mouseenter", onEnter));
      };
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} index={index} />

        <ul className="ec-list mt-14 border-t border-white/10">
          {niches.map(([niche, list]) => (
            <li key={niche} className="ec-row border-b border-white/10">
              <Link
                href={`/realisations?niche=${niche}`}
                data-niche={niche}
                className="group flex items-center justify-between gap-6 py-5 sm:py-7"
              >
                <span className="flex min-w-0 items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element -- vignette WebP pré-optimisée */}
                  <img
                    src={imageFor(niche)}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="size-12 shrink-0 rounded-lg border border-white/10 object-cover object-top lg:hidden"
                  />
                  <span className="font-display truncate text-2xl font-medium tracking-tight text-ink/80 transition-[color,transform] duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-3 group-hover:text-ink sm:text-5xl lg:text-6xl">
                    {t(`niches.${niche}`)}
                  </span>
                </span>
                <span className="flex shrink-0 items-center gap-4">
                  <span className="text-sm tabular-nums text-ink-muted">
                    {list.length} {t(list.length > 1 ? "storesPlural" : "storeSingular")}
                  </span>
                  <span className="hidden size-10 place-items-center rounded-full border border-white/15 transition-all duration-500 group-hover:rotate-45 group-hover:border-lime group-hover:bg-lime group-hover:text-bg sm:grid">
                    <ArrowUpRight className="size-4" />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Aperçu flottant (desktop uniquement) */}
      <div
        ref={preview}
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-20 hidden h-64 w-52 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-white/15 opacity-0 shadow-2xl lg:block"
        style={{ visibility: "hidden" }}
      >
        {niches.map(([niche]) => (
          // eslint-disable-next-line @next/next/no-img-element -- vignette WebP pré-optimisée
          <img
            key={niche}
            src={imageFor(niche)}
            alt=""
            loading="lazy"
            decoding="async"
            className={`absolute inset-0 size-full object-cover object-top transition-opacity duration-300 ${active === niche ? "opacity-100" : "opacity-0"}`}
          />
        ))}
      </div>
    </section>
  );
}
