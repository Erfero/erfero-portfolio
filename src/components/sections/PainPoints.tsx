"use client";

import { useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";

type Item = { title: string; description: string; stat?: number; source?: string };

/**
 * « Ça te parle ? » : les problèmes d'une boutique générique présentés comme
 * un ticket de caisse — « La note d'un thème générique » — avec chaque
 * problème, son coût chiffré quand il existe, et la source. Le ticket se
 * « déroule » à l'apparition.
 */
export default function PainPoints({ index }: { index?: string }) {
  const t = useTranslations("painPoints");
  const locale = useLocale();
  const items = t.raw("items") as Item[];
  const root = useRef<HTMLElement>(null);
  const fmt = new Intl.NumberFormat(locale === "en" ? "en-US" : "fr-FR", { maximumFractionDigits: 1 });
  const percent = (v: number) => (locale === "en" ? `${fmt.format(v)}%` : `${fmt.format(v)} %`);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(".rc-paper", {
          clipPath: "inset(0 0 100% 0)",
          duration: 1.6,
          ease: "power3.inOut",
          scrollTrigger: { trigger: ".rc-paper", start: "top 80%", once: true },
        });
        gsap.from(".rc-line", {
          autoAlpha: 0,
          y: 14,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.12,
          delay: 0.5,
          scrollTrigger: { trigger: ".rc-paper", start: "top 80%", once: true },
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="tone-sand relative py-24 sm:py-36">
      <div className="container-page grid items-start gap-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-20">
        <div className="lg:sticky lg:top-28">
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} index={index} />
        </div>

        <div className="relative mx-auto w-full max-w-[560px] [filter:drop-shadow(0_34px_40px_rgba(14,19,17,0.22))] lg:rotate-[1.2deg]">
          <div className="rc-paper receipt bg-[#fbfaf6] px-6 pb-12 pt-12 font-mono text-[#0e1311] sm:px-10">
            <div className="rc-line text-center">
              <p className="font-serif text-3xl italic">Erfero Studio</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-[#0e1311]/60">{t("receiptTitle")}</p>
            </div>
            <p className="rc-line mt-6 border-y border-dashed border-[#0e1311]/30 py-2 text-center text-[11px] uppercase tracking-[0.14em] text-[#0e1311]/60">
              {t("receiptMeta")}
            </p>

            <ol className="mt-4">
              {items.map((item, i) => (
                <li key={item.title} className="rc-line border-b border-dashed border-[#0e1311]/25 py-5">
                  <div className="flex items-baseline gap-3">
                    <span className="text-[11px] text-[#0e1311]/50">{String(i + 1).padStart(2, "0")}</span>
                    <p className="flex-1 font-sans text-[15px] font-semibold leading-snug">{item.title}</p>
                    <span className="shrink-0 font-serif text-2xl leading-none text-[#007a5b]">
                      {typeof item.stat === "number" ? percent(item.stat) : "×"}
                    </span>
                  </div>
                  <p className="mt-2 pl-7 font-sans text-[13px] leading-relaxed text-[#0e1311]/70">{item.description}</p>
                  {item.source && <p className="mt-1.5 pl-7 text-[10px] text-[#0e1311]/45">{item.source}</p>}
                </li>
              ))}
            </ol>

            <div className="rc-line mt-5 flex items-baseline justify-between gap-4 border-b-2 border-[#0e1311] pb-3">
              <p className="text-xs font-semibold uppercase tracking-[0.14em]">{t("receiptTotal")}</p>
              <p className="font-serif text-2xl italic">{t("receiptTotalValue")}</p>
            </div>
            <div className="rc-line mt-8 flex flex-col items-center gap-3">
              <span aria-hidden className="h-12 w-56 bg-[repeating-linear-gradient(90deg,#0e1311_0_2px,transparent_2px_4px,#0e1311_4px_5px,transparent_5px_8px,#0e1311_8px_11px,transparent_11px_13px)]" />
              <p className="text-center text-[11px] text-[#0e1311]/60">{t("receiptFooter")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
