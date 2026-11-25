"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { ArrowUpRight, Building2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { siteConfig } from "@/data/site.config";
import SplitHeading from "@/components/ui/SplitHeading";
import TechIcon from "@/components/ui/TechIcon";

/**
 * À propos : portrait dans un cadre en dégradé, présentation en une phrase
 * forte (mots clés en dégradé), et les agences / entreprises partenaires.
 */
export default function Manifesto({ showCv }: { showCv?: boolean }) {
  const t = useTranslations("manifesto");
  const tc = useTranslations("contact");
  const agencies = t.raw("agencies") as string[];
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(".mf-photo", {
          y: 60,
          rotate: -4,
          autoAlpha: 0,
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: { trigger: root.current, start: "top 75%", once: true },
        });
        gsap.from(".mf-badge", {
          scale: 0.6,
          autoAlpha: 0,
          duration: 0.9,
          ease: "back.out(1.8)",
          stagger: 0.15,
          delay: 0.5,
          scrollTrigger: { trigger: root.current, start: "top 75%", once: true },
        });
        gsap.from(".mf-agency", {
          y: 20,
          autoAlpha: 0,
          stagger: 0.07,
          duration: 0.8,
          ease: "expo.out",
          scrollTrigger: { trigger: ".mf-agencies", start: "top 92%", once: true },
        });
        // Le portrait flotte légèrement au scroll (profondeur).
        gsap.to(".mf-photo-inner", {
          yPercent: -6,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="about" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="container-page grid items-center gap-16 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
        <div className="mf-photo relative mx-auto w-full max-w-[400px]">
          <div aria-hidden className="bg-brand-gradient absolute -inset-6 rounded-[3rem] opacity-50 blur-3xl" />
          <div className="mf-photo-inner relative">
            <div className="bg-brand-gradient rounded-[2.2rem] p-[3px] shadow-[0_50px_100px_-40px_rgba(255,111,208,0.6)]">
              <div className="overflow-hidden rounded-[2.05rem] bg-bg">
                {/* eslint-disable-next-line @next/next/no-img-element -- photo de profil locale */}
                <img
                  src="/cv-photo.jpg"
                  alt={siteConfig.name}
                  width={451}
                  height={433}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[451/433] w-full object-cover"
                />
              </div>
            </div>

            <div className="mf-badge hs-card absolute -left-4 top-8 flex items-center gap-2.5 rounded-2xl py-2 pl-2 pr-4 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)] sm:-left-10">
              <span className="grid size-9 place-items-center rounded-xl bg-[#95BF47]/15 ring-1 ring-[#95BF47]/40">
                <TechIcon name="shopify" className="size-5" />
              </span>
              <span className="text-sm font-semibold">{siteConfig.role}</span>
            </div>
            <div className="mf-badge hs-card absolute -bottom-7 left-4 right-4 flex items-center gap-3 rounded-2xl px-4 py-3 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)] sm:-right-8">
              <span className="pulse-dot size-2.5 shrink-0 rounded-full bg-success" />
              <span className="text-sm font-semibold leading-snug">{tc("availability")}</span>
            </div>
          </div>
        </div>

        <div>
          <span className="glass inline-flex items-center gap-2.5 rounded-full py-1.5 pl-2 pr-4 text-[11px] font-semibold uppercase tracking-[0.18em] sm:text-xs">
            <span className="bg-brand-gradient ml-1 size-2 rounded-full" />
            {t("eyebrow")}
          </span>
          <SplitHeading
            as="p"
            text={t("text")}
            stagger={0.05}
            className="font-display mt-6 text-[clamp(1.55rem,2.9vw,2.6rem)] font-semibold leading-[1.22] tracking-[-0.025em]"
          />

          <div className="mf-agencies mt-12">
            <p className="flex items-center gap-2 text-sm font-medium text-ink-muted">
              <Building2 className="size-4 text-brand" aria-hidden />
              {t("agenciesLabel")}
            </p>
            <ul className="mt-4 flex flex-wrap gap-3">
              {agencies.map((name) => (
                <li
                  key={name}
                  className="mf-agency glass font-display rounded-2xl px-5 py-3 text-lg font-bold tracking-tight sm:text-xl"
                >
                  {name}
                </li>
              ))}
            </ul>
            {showCv && (
              <Link href="/cv" className="btn-primary group mt-8 px-6 py-3.5 text-sm">
                {t("cta")}
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
