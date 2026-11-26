"use client";

import { useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
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
  const locale = useLocale();
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
    <section ref={root} id="about" className="tone-stone relative scroll-mt-24 py-28 sm:py-40">
      <div className="container-page grid items-center gap-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-24">
        <div className="mf-photo relative mx-auto w-full max-w-[420px]">
          <div className="mf-photo-inner relative">
            <div className="rounded-[2.2rem] border border-line bg-surface p-2 shadow-[0_50px_100px_-50px_rgba(14,19,17,0.55)]">
              <div className="overflow-hidden rounded-[1.7rem] bg-bg-soft">
                {/* eslint-disable-next-line @next/next/no-img-element -- photo de profil locale */}
                <img
                  src="/portrait.webp"
                  alt={siteConfig.name}
                  width={840}
                  height={1126}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[955/1280] w-full object-cover"
                />
              </div>
            </div>

            {/* Badges SOUS la photo : rien ne masque le visage (la photo est
                déjà cadrée serré, elle s'affiche entière, sans recadrage). */}
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <div className="mf-badge hs-card tone-dark flex items-center gap-2.5 rounded-2xl py-2 pl-2 pr-4">
                <span className="grid size-9 place-items-center rounded-xl bg-[#008060] text-white">
                  <TechIcon name="shopify" color="currentColor" className="size-5" />
                </span>
                <span className="text-sm font-semibold">{locale === "en" ? siteConfig.roleEn : siteConfig.role}</span>
              </div>
              <div className="mf-badge hs-card flex items-center gap-3 rounded-2xl px-4 py-3">
                <span className="pulse-dot size-2.5 shrink-0 rounded-full bg-success" />
                <span className="text-sm font-semibold leading-snug">{tc("availability")}</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className="label-mono flex items-center gap-3">
            <span aria-hidden className="h-px w-8 bg-ink/30" />
            <span className="text-ink-muted">{t("eyebrow")}</span>
          </p>
          <SplitHeading
            as="p"
            text={t("text")}
            stagger={0.05}
            className="mt-7 font-serif text-[clamp(1.85rem,3.1vw,3rem)] font-normal leading-[1.18] tracking-[-0.01em] text-ink"
          />

          <div className="mf-agencies mt-12">
            <p className="flex items-center gap-2 text-sm font-medium text-ink-muted">
              <Building2 className="size-4 text-accent" aria-hidden />
              {t("agenciesLabel")}
            </p>
            <ul className="mt-4 flex flex-wrap gap-3">
              {agencies.map((name) => (
                <li
                  key={name}
                  className="mf-agency rounded-2xl border border-line bg-surface px-5 py-3 font-serif text-xl sm:text-2xl"
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
