"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { PhoneCall, FileText, PenTool, Code2, Rocket, LifeBuoy } from "lucide-react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";

const ICONS = [PhoneCall, FileText, PenTool, Code2, Rocket, LifeBuoy];
const COLORS = ["#a594ff", "#c084fc", "#ff6fd0", "#ff8a8a", "#ffbe6b", "#4ade80"];

/** Les étapes d'un projet : une frise en dégradé qui se trace au scroll. */
export default function Process({ index }: { index?: string }) {
  const t = useTranslations("process");
  const steps = t.raw("steps") as { title: string; description: string }[];
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          ".pr-line",
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { trigger: ".pr-grid", start: "top 80%", end: "bottom 60%", scrub: true },
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
          y: 50,
          autoAlpha: 0,
          stagger: 0.1,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: ".pr-grid", start: "top 85%", once: true },
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="process" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} index={index} />

        <div className="pr-grid relative mt-16">
          {/* Frise : horizontale (desktop) / verticale (mobile) */}
          <span className="absolute left-[27px] top-4 bottom-4 w-[2px] rounded-full bg-white/10 lg:hidden" aria-hidden />
          <span
            className="pr-line-y absolute left-[27px] top-4 bottom-4 w-[2px] origin-top rounded-full bg-gradient-to-b from-brand via-pink to-amber lg:hidden"
            aria-hidden
          />
          <span className="absolute inset-x-[8%] top-[27px] hidden h-[2px] rounded-full bg-white/10 lg:block" aria-hidden />
          <span
            className="pr-line absolute inset-x-[8%] top-[27px] hidden h-[2px] origin-left rounded-full bg-gradient-to-r from-brand via-pink to-amber lg:block"
            aria-hidden
          />

          <ol className="relative grid gap-6 lg:grid-cols-6 lg:gap-4">
            {steps.map((step, i) => {
              const Icon = ICONS[i % ICONS.length];
              const color = COLORS[i % COLORS.length];
              return (
                <li key={step.title} className="pr-step relative flex gap-5 lg:flex-col lg:items-center lg:gap-0 lg:text-center">
                  <span
                    className="relative z-10 grid size-14 shrink-0 place-items-center rounded-2xl border-2 bg-bg"
                    style={{ borderColor: color, boxShadow: `0 0 30px -6px ${color}`, color }}
                  >
                    <Icon className="size-6" />
                  </span>
                  <div className="spotlight flex-1 p-5 lg:mt-5 lg:w-full" style={{ "--spot": color } as React.CSSProperties}>
                    <span className="font-display text-sm font-extrabold" style={{ color }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display mt-1 text-lg font-bold leading-snug">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.description}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
