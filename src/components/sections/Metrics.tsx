"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import SplitHeading from "@/components/ui/SplitHeading";

/** Chiffres clés : chaque nombre compte jusqu'à sa valeur à l'apparition. */
export default function Metrics() {
  const t = useTranslations("metrics");
  const items = t.raw("items") as { value: string; suffix: string; label: string }[];
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.utils.toArray<HTMLElement>(".mt-num").forEach((el) => {
          const target = parseFloat(el.dataset.value ?? "0");
          const decimals = (el.dataset.value ?? "").split(".")[1]?.length ?? 0;
          const obj = { v: 0 };
          el.textContent = (0).toFixed(decimals);
          gsap.to(obj, {
            v: target,
            duration: 2,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
            onUpdate: () => {
              el.textContent = obj.v.toFixed(decimals);
            },
          });
        });
        gsap.from(".mt-cell", {
          y: 40,
          autoAlpha: 0,
          stagger: 0.08,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: root.current, start: "top 80%", once: true },
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative border-y border-white/10 bg-white/[0.015] py-20 sm:py-28">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em] text-lime">
              <span className="h-px w-8 bg-lime/70" />
              {t("eyebrow")}
            </span>
            <SplitHeading
              text={t("title")}
              className="font-display mt-5 max-w-2xl text-3xl font-medium leading-[1.05] tracking-[-0.03em] sm:text-5xl"
            />
          </div>
        </div>

        <dl className="mt-14 grid grid-cols-2 border-l border-t border-white/10 sm:grid-cols-3 lg:grid-cols-5">
          {items.map((item) => (
            <div key={item.label} className="mt-cell border-b border-r border-white/10 p-6 sm:p-8">
              <dt className="sr-only">{item.label}</dt>
              <dd className="font-display text-5xl font-semibold tracking-[-0.04em] sm:text-6xl">
                <span className="mt-num tabular-nums" data-value={item.value}>
                  {item.value}
                </span>
                <span className="text-lime">{item.suffix}</span>
              </dd>
              <dd className="mt-3 text-sm leading-snug text-ink-muted">{item.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
