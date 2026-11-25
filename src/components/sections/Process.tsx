"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";

/** Les étapes d'un projet, sur une frise qui se trace au rythme du scroll. */
export default function Process({ index }: { index?: string }) {
  const t = useTranslations("process");
  const steps = t.raw("steps") as { title: string; description: string }[];
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          ".pr-line-x",
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { trigger: ".pr-grid", start: "top 80%", end: "bottom 55%", scrub: true },
          }
        );
        gsap.fromTo(
          ".pr-line-y",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: ".pr-grid", start: "top 75%", end: "bottom 60%", scrub: true },
          }
        );
        gsap.from(".pr-step", {
          y: 40,
          autoAlpha: 0,
          stagger: 0.1,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: ".pr-grid", start: "top 80%", once: true },
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="process" className="relative scroll-mt-28 py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} index={index} />

        <ol className="pr-grid relative mt-16 grid gap-10 pl-10 lg:grid-cols-6 lg:gap-6 lg:pl-0 lg:pt-14">
          {/* Ligne de progression : horizontale (desktop) / verticale (mobile) */}
          <span className="absolute left-[11px] top-0 bottom-0 w-px bg-white/10 lg:hidden" aria-hidden />
          <span className="pr-line-y absolute left-[11px] top-0 bottom-0 w-px origin-top bg-lime lg:hidden" aria-hidden />
          <span className="absolute inset-x-0 top-[11px] hidden h-px bg-white/10 lg:block" aria-hidden />
          <span className="pr-line-x absolute inset-x-0 top-[11px] hidden h-px origin-left bg-lime lg:block" aria-hidden />

          {steps.map((step, i) => (
            <li key={step.title} className="pr-step relative">
              <span
                className="absolute -left-10 top-0 grid size-[23px] place-items-center rounded-full border border-lime/60 bg-bg lg:-top-14 lg:left-0"
                aria-hidden
              >
                <span className="size-2 rounded-full bg-lime" />
              </span>
              <span className="font-display text-5xl font-semibold tracking-tight text-white/10 lg:text-6xl">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display mt-3 text-lg font-medium leading-snug">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
