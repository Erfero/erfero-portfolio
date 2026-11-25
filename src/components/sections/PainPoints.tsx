"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { TrendingDown, ShoppingCart, Smartphone, Palette, Blocks, SearchX } from "lucide-react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";
import StatRing from "@/components/ui/StatRing";
import PainVisual from "@/components/ui/PainVisual";

const icons = [TrendingDown, ShoppingCart, Smartphone, Palette, Blocks, SearchX];
const visualKinds = ["mobile", "design", "apps", "seo"] as const;

/**
 * Problèmes fréquents des boutiques, en cartes empilées colorées : chaque
 * carte reste collée en haut de l'écran et la suivante vient la recouvrir.
 */
export default function PainPoints({ index }: { index?: string }) {
  const t = useTranslations("painPoints");
  const items = t.raw("items") as { title: string; description: string; source?: string; stat?: number }[];
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const cards = gsap.utils.toArray<HTMLElement>(".pp-card");
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (!next) return;
          gsap.to(card.querySelector(".pp-inner"), {
            scale: 0.94,
            ease: "none",
            scrollTrigger: { trigger: next, start: "top bottom", end: "top 25%", scrub: true },
          });
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="tone-stone relative py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} index={index} />

        <div className="mt-14 flex flex-col gap-6">
          {items.map((item, i) => {
            const Icon = icons[i % icons.length];
            const hasStat = typeof item.stat === "number";
            return (
              <div key={item.title} className="pp-card sticky" style={{ top: `calc(6rem + ${i * 1}rem)` }}>
                <div
                  className="pp-inner relative origin-top overflow-hidden rounded-[1.75rem] border border-line bg-surface p-7 shadow-[0_-24px_60px_-40px_rgba(14,19,17,0.45)] sm:p-10 lg:p-12"
                >
                  <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
                    <div>
                      <div className="flex items-center gap-4">
                        <span className="grid size-12 place-items-center rounded-2xl border border-accent/25 bg-accent/10 text-accent">
                          <Icon className="size-6" />
                        </span>
                        <span className="font-mono text-sm font-medium tabular-nums text-accent">
                          {String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                        </span>
                      </div>
                      <h3 className="font-display mt-6 max-w-2xl text-2xl font-semibold leading-tight tracking-[-0.03em] sm:text-4xl">
                        {item.title}
                      </h3>
                      <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
                        {item.description}
                      </p>
                      {item.source && <p className="mt-4 text-xs text-ink-dim">{item.source}</p>}
                    </div>
                    <div className="hidden shrink-0 scale-[1.7] place-self-center md:mr-12 md:block">
                      {hasStat ? (
                        <StatRing value={item.stat!} />
                      ) : (
                        <PainVisual kind={visualKinds[(i - 2 + visualKinds.length) % visualKinds.length]} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
