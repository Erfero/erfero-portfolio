"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";

const COLORS = ["#a594ff", "#ff6fd0", "#ffbe6b", "#4fdcff", "#4ade80"];

/** Chiffres clés : grands nombres en dégradé qui comptent jusqu'à leur valeur. */
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
    <section ref={root} className="relative py-16 sm:py-24">
      <div className="container-page">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />

        <dl className="mt-grid mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {items.map((item, i) => (
            <div
              key={item.label}
              className={`mt-cell spotlight p-6 sm:p-7 ${i === items.length - 1 ? "col-span-2 sm:col-span-1" : ""}`}
              style={{ "--spot": COLORS[i % COLORS.length] } as React.CSSProperties}
            >
              <span
                aria-hidden
                className="absolute inset-x-6 top-0 h-[3px] rounded-b-full"
                style={{ background: COLORS[i % COLORS.length], boxShadow: `0 0 20px ${COLORS[i % COLORS.length]}` }}
              />
              <dt className="sr-only">{item.label}</dt>
              <dd className="font-display flex items-baseline text-5xl font-extrabold tracking-[-0.04em] sm:text-6xl">
                <span className="mt-num tabular-nums text-ink" data-value={item.value}>
                  {item.value}
                </span>
                <span className="text-gradient">{item.suffix}</span>
              </dd>
              <dd className="mt-3 text-sm font-medium leading-snug text-ink-muted sm:text-base">{item.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
