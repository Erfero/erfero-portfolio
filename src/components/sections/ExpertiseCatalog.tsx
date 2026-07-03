import { useTranslations } from "next-intl";
import {
  Sparkles,
  Wand2,
  HeartPulse,
  Droplet,
  Wind,
  Moon,
  Stethoscope,
  PawPrint,
  Plane,
  Shirt,
  Cpu,
  Car,
  LayoutGrid,
  type LucideIcon,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import TiltCard from "@/components/ui/TiltCard";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Project } from "@/data/projects";

const nicheIcons: Record<string, LucideIcon> = {
  beauty: Sparkles,
  "beauty-tech": Wand2,
  wellness: HeartPulse,
  "hair-care": Droplet,
  "hair-tools": Wind,
  "sleep-health": Moon,
  health: Stethoscope,
  pets: PawPrint,
  travel: Plane,
  fashion: Shirt,
  tech: Cpu,
  automotive: Car,
};

export default function ExpertiseCatalog({
  projects,
  nicheImages = {},
}: {
  projects: Project[];
  nicheImages?: Record<string, string>;
}) {
  const t = useTranslations("catalog");

  const counts = new Map<string, number>();
  for (const p of projects) {
    if (p.niche === "unknown") continue;
    counts.set(p.niche, (counts.get(p.niche) ?? 0) + 1);
  }
  const niches = Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);

  return (
    <section className="relative py-16 sm:py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {niches.map(([niche, count], i) => {
            const Icon = nicheIcons[niche] ?? LayoutGrid;
            const image = nicheImages[niche];
            return (
              <Reveal key={niche} delay={i * 0.05}>
                <TiltCard strength={5}>
                  <div className="flex h-full flex-col items-start gap-3 overflow-hidden rounded-2xl border border-border bg-white/[0.02] transition-colors hover:border-lime/30">
                    {image ? (
                      <div className="relative h-44 w-full overflow-hidden">
                        <img
                          src={image}
                          alt={t(`niches.${niche}`)}
                          loading="lazy"
                          className="size-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent" />
                        <div className="absolute bottom-2 left-2 grid size-9 place-items-center rounded-lg bg-bg/70 text-lime backdrop-blur">
                          <Icon className="size-4" />
                        </div>
                      </div>
                    ) : (
                      <div className="grid size-11 place-items-center rounded-xl bg-lime/10 text-lime mt-5 ml-5">
                        <Icon className="size-5" />
                      </div>
                    )}
                    <div className="px-5 pb-5">
                      <p className="font-display text-base font-medium">
                        {t(`niches.${niche}`)}
                      </p>
                      <p className="mt-0.5 text-xs text-ink-muted">
                        {count} {t(count > 1 ? "storesPlural" : "storeSingular")}
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
