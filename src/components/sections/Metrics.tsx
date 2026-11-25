"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";

/** Chiffres clés dans un grand panneau vert : de grands nombres qui comptent
 * jusqu'à leur valeur. */
export default function Metrics() {
  const t = useTranslations("metrics");
  const items = t.raw("items") as { value: string; suffix: string; label: string }[];
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.utils.toArray<HTMLElement>(".mt-num").forEach((el) => {
          const raw = el.dataset.value ?? "0";
          const target = parseFloat(raw);
          const decimals = raw.split(".")[1]?.length ?? 0;
          const obj = { v: 0 };
          el.textContent = (0).toFixed(decimals);
          gsap.to(obj, {
            v: target,
            duration: 2.2,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
            onUpdate: () => {
              el.textContent = obj.v.toFixed(decimals);
            },
          });
        });
        gsap.from(".mt-cell", {
          y: 50,
          autoAlpha: 0,
          stagger: 0.08,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: ".mt-grid", start: "top 85%", once: true },
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="tone-light px-2 py-4 sm:px-3">
      <div className="tone-green relative overflow-hidden rounded-[2rem] py-16 sm:rounded-[3rem] sm:py-24">
        <div aria-hidden className="bg-grid mask-radial pointer-events-none absolute inset-0" />
        <div className="container-page relative">
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />

          <dl className="mt-grid mt-14 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-line pt-10 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-0">
            {items.map((item, i) => (
              <div
                key={item.label}
                className={`mt-cell min-w-0 lg:border-l lg:border-line lg:px-6 lg:first:border-l-0 lg:first:pl-0 ${
                  i === items.length - 1 ? "col-span-2 sm:col-span-1" : ""
                }`}
              >
                <dt className="sr-only">{item.label}</dt>
                <dd className="flex items-baseline font-serif text-6xl leading-none tracking-[-0.02em] sm:text-7xl">
                  <span className="mt-num tabular-nums" data-value={item.value}>
                    {item.value}
                  </span>
                  <span className="ml-0.5 text-4xl text-ink-muted sm:text-5xl">{item.suffix}</span>
                </dd>
                <dd className="mt-3 text-sm leading-snug text-ink-muted sm:text-base">{item.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
