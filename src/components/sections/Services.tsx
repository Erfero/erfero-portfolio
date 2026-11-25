"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";
import Magnetic from "@/components/ui/MagneticButton";

/**
 * Méthode / services : le titre reste épinglé à gauche (desktop) pendant que
 * la liste défile à droite ; l'élément qui passe au centre de l'écran
 * s'allume, les autres restent en retrait.
 */
export default function Services({ index }: { index?: string }) {
  const t = useTranslations("services");
  const nav = useTranslations("nav");
  const items = t.raw("items") as { title: string; description: string }[];
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const rows = gsap.utils.toArray<HTMLElement>(".sv-item");
        rows.forEach((row) => {
          gsap.set(row, { opacity: 0.28 });
          ScrollTrigger.create({
            trigger: row,
            start: "top 62%",
            end: "bottom 38%",
            onToggle: (self) =>
              gsap.to(row, { opacity: self.isActive ? 1 : 0.28, duration: 0.5, ease: "power2.out", overwrite: true }),
          });
          gsap.from(row.querySelector(".sv-line"), {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: { trigger: row, start: "top 90%", once: true },
          });
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="services" className="relative scroll-mt-28 py-24 sm:py-32">
      <div className="container-page grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} index={index} />
          <div className="mt-10">
            <Magnetic>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3.5 text-sm font-semibold text-bg"
              >
                {nav("cta")}
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
              </Link>
            </Magnetic>
          </div>
        </div>

        <ol className="flex flex-col">
          {items.map((item, i) => (
            <li key={item.title} className="sv-item relative py-8 sm:py-10">
              <span className="sv-line absolute inset-x-0 top-0 h-px bg-white/15" />
              <div className="grid grid-cols-[3rem_1fr] gap-4 sm:grid-cols-[4.5rem_1fr]">
                <span className="font-display pt-1 text-sm tabular-nums text-lime">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-xl font-medium leading-snug tracking-tight sm:text-3xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-muted sm:text-base">
                    {item.description}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
