"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";
import Magnetic from "@/components/ui/MagneticButton";

/** Méthode / services en lignes éditoriales : titre serif à gauche,
 * explication à droite, séparées par de fins filets. */
export default function Services({ index }: { index?: string }) {
  const t = useTranslations("services");
  const nav = useTranslations("nav");
  const items = t.raw("items") as { title: string; description: string }[];
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.utils.toArray<HTMLElement>(".sv-row").forEach((row) => {
          gsap.from(row.children, {
            y: 40,
            autoAlpha: 0,
            duration: 1,
            ease: "expo.out",
            stagger: 0.08,
            scrollTrigger: { trigger: row, start: "top 88%", once: true },
          });
          gsap.from(row.querySelector(".sv-rule"), {
            scaleX: 0,
            duration: 1.2,
            ease: "expo.inOut",
            scrollTrigger: { trigger: row, start: "top 92%", once: true },
          });
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="services" className="tone-light relative scroll-mt-24 py-24 sm:py-36">
      <div className="container-page">
        <SectionHeading layout="split" eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} index={index} />

        <ol className="mt-16 md:ml-[calc((100%-2.5rem)/3.6+2.5rem)]">
          {items.map((item, i) => (
            <li
              key={item.title}
              className="sv-row relative grid gap-3 py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:gap-12 md:py-10"
            >
              <span aria-hidden className="sv-rule absolute inset-x-0 top-0 h-px origin-left bg-line" />
              <h3 className="font-serif text-[1.9rem] leading-[1.06] tracking-[-0.01em] sm:text-[2.35rem]">
                <span className="mr-3 align-top font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                {item.title}
              </h3>
              <p className="text-[15px] leading-relaxed text-ink-muted sm:text-base md:pt-2">{item.description}</p>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex md:ml-[calc((100%-2.5rem)/3.6+2.5rem)]">
          <Magnetic>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-[#0e1311] px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#008060]"
            >
              {nav("cta")}
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
