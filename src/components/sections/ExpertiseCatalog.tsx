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
}: {
  projects: Project[];
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
            return (
              <Reveal key={niche} delay={i * 0.05}>
                <TiltCard strength={5}>
                  <div className="flex h-full flex-col items-start gap-3 rounded-2xl border border-border bg-white/[0.02] p-5 transition-colors hover:border-lime/30">
                    <div className="grid size-11 place-items-center rounded-xl bg-lime/10 text-lime">
                      <Icon className="size-5" />
                    </div>
                    <div>
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
