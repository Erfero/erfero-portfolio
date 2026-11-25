"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import ShopCard from "@/components/ui/ShopCard";
import { cn } from "@/lib/utils";
import type { ProjectCard as Project } from "@/lib/projectMedia";

/** Galerie complète des boutiques en ligne, filtrable par univers. */
export default function ShopGallery({ projects }: { projects: Project[] }) {
  const t = useTranslations("realisationsPage");
  const tp = useTranslations("projects");
  const tc = useTranslations("catalog");
  const locale = useLocale() as "fr" | "en";
  const label = (n: string) => (tc.has(`niches.${n}`) ? tc(`niches.${n}`) : undefined);

  const niches = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of projects) if (label(p.niche)) counts.set(p.niche, (counts.get(p.niche) ?? 0) + 1);
    return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- label dépend uniquement des messages (stables)
  }, [projects]);

  const [filter, setFilter] = useState<string>("all");

  // Filtre initial depuis l'URL (?niche=beauty, lien du catalogue d'expertise),
  // lu côté client pour que la page reste statique et entièrement indexable.
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("niche");
    if (requested && niches.some(([n]) => n === requested)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- synchronisation avec l'URL au montage
      setFilter(requested);
    }
  }, [niches]);
  const shown = filter === "all" ? projects : projects.filter((p) => p.niche === filter);

  const chips: [string, string, number][] = [
    ["all", t("filterAll"), projects.length],
    ...niches.map(([n, c]) => [n, label(n)!, c] as [string, string, number]),
  ];

  return (
    <div>
      <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0" role="tablist" aria-label={t("filterLabel")}>
        {chips.map(([key, text, count]) => {
          const active = filter === key;
          return (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(key)}
              className={cn(
                "relative isolate shrink-0 rounded-full border px-4 py-2 text-sm transition-colors",
                active ? "border-transparent font-medium text-bg" : "border-line bg-surface text-ink-muted hover:border-ink/30 hover:text-ink"
              )}
            >
              {active && (
                <motion.span
                  layoutId="gallery-chip"
                  className="absolute inset-0 -z-10 rounded-full bg-ink"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              {text}
              <span className={cn("ml-1.5 tabular-nums", active ? "text-bg/60" : "text-ink-dim")}>{count}</span>
            </button>
          );
        })}
      </div>

      <motion.div layout className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((project, i) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: Math.min(i, 8) * 0.04 }}
            >
              <ShopCard
                project={project}
                locale={locale}
                nicheLabel={label(project.niche)}
                visitLabel={tp("visit")}
                eager={i < 3}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
