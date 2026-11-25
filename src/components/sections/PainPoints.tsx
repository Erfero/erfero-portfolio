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
const ringAccents = ["#b9ff5c", "#8b6bff"];

/**
 * Problèmes fréquents des boutiques, en cartes empilées : chaque carte reste
 * collée en haut de l'écran et la suivante vient la recouvrir pendant que
 * celle du dessous recule légèrement.
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
            scale: 0.92,
            ease: "none",
            scrollTrigger: { trigger: next, start: "top bottom", end: "top 20%", scrub: true },
          });
          gsap.to(card.querySelector(".pp-shade"), {
            opacity: 0.6,
            ease: "none",
            scrollTrigger: { trigger: next, start: "top bottom", end: "top 20%", scrub: true },
          });
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} index={index} />

        <div className="mt-16 flex flex-col gap-6">
          {items.map((item, i) => {
            const Icon = icons[i % icons.length];
            const hasStat = typeof item.stat === "number";
            return (
              <div key={item.title} className="pp-card sticky" style={{ top: `calc(6.5rem + ${i * 1.1}rem)` }}>
                <div className="pp-inner relative origin-top overflow-hidden rounded-3xl border border-white/10 bg-[#0e1014] p-7 shadow-[0_-20px_60px_-30px_rgba(0,0,0,0.9)] sm:p-10 lg:p-12">
                  <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
                    <div>
                      <div className="flex items-center gap-4">
                        <span className="font-display text-sm tabular-nums text-ink-muted/60">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="grid size-10 place-items-center rounded-xl bg-lime/10 text-lime">
                          <Icon className="size-5" />
                        </span>
                      </div>
                      <h3 className="font-display mt-6 max-w-2xl text-2xl font-medium leading-tight tracking-tight sm:text-4xl">
                        {item.title}
                      </h3>
                      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-muted sm:text-base">
                        {item.description}
                      </p>
                      {item.source && <p className="mt-4 text-xs text-ink-muted/50">{item.source}</p>}
                    </div>
                    <div className="hidden shrink-0 scale-[1.6] place-self-center md:mr-10 md:block">
                      {hasStat ? (
                        <StatRing value={item.stat!} accent={ringAccents[i % ringAccents.length]} />
                      ) : (
                        <PainVisual kind={visualKinds[(i - 2 + visualKinds.length) % visualKinds.length]} />
                      )}
                    </div>
                  </div>
                  <div className="pp-shade pointer-events-none absolute inset-0 bg-black opacity-0" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
