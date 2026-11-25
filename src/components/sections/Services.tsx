"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import {
  ArrowUpRight,
  LayoutTemplate,
  BadgeCheck,
  Timer,
  Scale,
  MessagesSquare,
  Smartphone,
  Palette,
  Headset,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";
import Magnetic from "@/components/ui/MagneticButton";

const ICONS = [LayoutTemplate, BadgeCheck, Timer, Scale, MessagesSquare, Smartphone, Palette, Headset];
const COLORS = ["#a594ff", "#ff6fd0", "#ffbe6b", "#4fdcff", "#4ade80", "#ff8a65", "#c084fc", "#38bdf8"];

/** Méthode / services : grille de cartes lumineuses, tout le texte visible. */
export default function Services({ index }: { index?: string }) {
  const t = useTranslations("services");
  const nav = useTranslations("nav");
  const items = t.raw("items") as { title: string; description: string }[];
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(".sv-card", {
          y: 60,
          autoAlpha: 0,
          duration: 1,
          ease: "expo.out",
          stagger: { each: 0.07, grid: "auto", from: "start" },
          scrollTrigger: { trigger: ".sv-grid", start: "top 85%", once: true },
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="services" className="relative scroll-mt-24 py-20 sm:py-28">
      <div aria-hidden className="glow-orb right-0 top-40 h-[30rem] w-[30rem] bg-brand-deep/30" />
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} index={index} />
          <Magnetic>
            <Link href="/contact" className="btn-primary group px-6 py-3.5 text-sm">
              {nav("cta")}
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
            </Link>
          </Magnetic>
        </div>

        <ol className="sv-grid mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            const color = COLORS[i % COLORS.length];
            return (
              <li
                key={item.title}
                className="sv-card spotlight flex flex-col p-6 sm:p-7"
                style={{ "--spot": color } as React.CSSProperties}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="grid size-12 place-items-center rounded-2xl"
                    style={{ background: `${color}22`, color, boxShadow: `0 0 30px -10px ${color}` }}
                  >
                    <Icon className="size-6" />
                  </span>
                  <span className="font-display text-3xl font-extrabold text-white/10">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-display mt-6 text-xl font-bold leading-snug tracking-tight">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-[15px]">{item.description}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
