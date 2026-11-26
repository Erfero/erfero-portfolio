"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { projectThumb } from "@/lib/projectMedia";
import SectionHeading from "@/components/ui/SectionHeading";
import type { ProjectCard as Project } from "@/lib/projectMedia";

/**
 * Univers dans lesquels des boutiques ont été livrées : une carte image par
 * univers (vraie boutique en fond), avec le nombre de boutiques. Chaque
 * carte ouvre la galerie filtrée sur cet univers.
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

  const groups = new Map<string, Project[]>();
  for (const p of projects) {
    if (!p.niche || p.niche === "unknown" || !t.has(`niches.${p.niche}`)) continue;
    groups.set(p.niche, [...(groups.get(p.niche) ?? []), p]);
  }
  const niches = Array.from(groups.entries()).sort((a, b) => b[1].length - a[1].length);
  const imageFor = (niche: string) => nicheImages[niche] || projectThumb(groups.get(niche)![0]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(".ec-card", {
          y: 50,
          autoAlpha: 0,
          scale: 0.96,
          stagger: 0.06,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: ".ec-grid", start: "top 85%", once: true },
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="tone-dark relative py-28 sm:py-40">
      <div className="container-page">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} index={index} />

        <ul className="ec-grid mt-14 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {niches.map(([niche, list], i) => (
            <li key={niche} className={`ec-card ${i === 0 ? "col-span-2 row-span-2" : ""}`}>
              <Link
                href={`/realisations?niche=${niche}`}
                className="group relative block h-full min-h-44 overflow-hidden rounded-3xl border border-line sm:min-h-56"
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- vignette WebP pré-optimisée */}
                <img
                  src={imageFor(niche)}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 size-full object-cover object-top transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-110"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-[#0e1311] via-[#0e1311]/55 to-[#0e1311]/5 transition-opacity duration-500 group-hover:opacity-80" />
                <span className="relative flex h-full flex-col justify-between p-5 sm:p-6">
                  <span className="self-start rounded-full bg-[#0e1311]/70 px-3 py-1 text-xs font-semibold tabular-nums text-white ring-1 ring-white/15 backdrop-blur-md">
                    {list.length} {t(list.length > 1 ? "storesPlural" : "storeSingular")}
                  </span>
                  <span className="flex items-end justify-between gap-3">
                    <span
                      className={`min-w-0 font-serif font-normal leading-[1.02] text-white ${
                        i === 0 ? "text-3xl sm:text-5xl" : "text-xl sm:text-2xl"
                      }`}
                    >
                      {t(`niches.${niche}`)}
                    </span>
                    <span className="hidden size-10 shrink-0 place-items-center rounded-full bg-white text-[#0e1311] transition-transform duration-500 group-hover:rotate-45 group-hover:bg-[#3cc896] sm:grid">
                      <ArrowUpRight className="size-4" />
                    </span>
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
