import { useTranslations } from "next-intl";
import {
  TrendingDown,
  ShoppingCart,
  Smartphone,
  Palette,
  Blocks,
  SearchX,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import TiltCard from "@/components/ui/TiltCard";
import StatRing from "@/components/ui/StatRing";
import PainVisual from "@/components/ui/PainVisual";

const icons = [TrendingDown, ShoppingCart, Smartphone, Palette, Blocks, SearchX];
const visualKinds = ["mobile", "design", "apps", "seo"] as const;
const ringAccents = ["#b9ff5c", "#8b6bff"];

export default function PainPoints() {
  const t = useTranslations("painPoints");
  const items = t.raw("items") as {
    title: string;
    description: string;
    source?: string;
    stat?: number;
  }[];

  return (
    <section className="relative py-16 sm:py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const Icon = icons[i % icons.length];
            const hasStat = typeof item.stat === "number";

            return (
              <Reveal key={item.title} delay={i * 0.06}>
                <TiltCard strength={6}>
                  <div className="group flex h-full flex-col rounded-2xl border border-border bg-white/[0.02] p-6 transition-colors hover:border-lime/30 hover:bg-white/[0.04]">
                    <div className="flex items-start justify-between gap-4">
                      <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-lime/10 text-lime">
                        <Icon className="size-5" />
                      </div>
                      <div className="shrink-0 opacity-90">
                        {hasStat ? (
                          <StatRing
                            value={item.stat!}
                            accent={ringAccents[i % ringAccents.length]}
                          />
                        ) : (
                          <PainVisual
                            kind={visualKinds[(i - 2 + visualKinds.length) % visualKinds.length]}
                          />
                        )}
                      </div>
                    </div>
                    <h3 className="font-display mt-5 text-lg font-medium">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                      {item.description}
                    </p>
                    {item.source && (
                      <p className="mt-3 text-xs text-ink-muted/50">
                        {item.source}
                      </p>
                    )}
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
