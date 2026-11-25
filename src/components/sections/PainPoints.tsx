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
const TINTS = ["#ff6fd0", "#a594ff", "#4fdcff", "#ffbe6b", "#ff7a7a", "#4ade80"];

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
    <section ref={root} className="relative py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} index={index} />

        <div className="mt-14 flex flex-col gap-6">
          {items.map((item, i) => {
            const Icon = icons[i % icons.length];
            const tint = TINTS[i % TINTS.length];
            const hasStat = typeof item.stat === "number";
            return (
              <div key={item.title} className="pp-card sticky" style={{ top: `calc(6rem + ${i * 1}rem)` }}>
                <div
                  className="pp-inner relative origin-top overflow-hidden rounded-[1.75rem] border p-7 shadow-[0_-30px_80px_-40px_rgba(0,0,0,0.95)] sm:p-10 lg:p-12"
                  style={{
                    borderColor: `${tint}40`,
                    background: `radial-gradient(120% 140% at 100% 0%, ${tint}30, transparent 55%), linear-gradient(180deg, #15123a, #0d0b26)`,
                  }}
                >
                  <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
                    <div>
                      <div className="flex items-center gap-4">
                        <span
                          className="grid size-12 place-items-center rounded-2xl"
                          style={{ background: `${tint}26`, color: tint, boxShadow: `0 0 30px -8px ${tint}` }}
                        >
                          <Icon className="size-6" />
                        </span>
                        <span className="font-display text-sm font-bold tabular-nums" style={{ color: tint }}>
                          {String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                        </span>
                      </div>
                      <h3 className="font-display mt-6 max-w-2xl text-2xl font-bold leading-tight tracking-tight sm:text-4xl">
                        {item.title}
                      </h3>
                      <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
                        {item.description}
                      </p>
                      {item.source && <p className="mt-4 text-xs text-ink-dim">{item.source}</p>}
                    </div>
                    <div className="hidden shrink-0 scale-[1.7] place-self-center md:mr-12 md:block">
                      {hasStat ? (
                        <StatRing value={item.stat!} accent={tint} />
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
