"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { onIntroReady } from "@/lib/intro";
import SplitHeading from "@/components/ui/SplitHeading";
import Magnetic from "@/components/ui/MagneticButton";
import HeroShowcase, { type HeroMock } from "@/components/ui/HeroShowcase";
import TechMarquee from "@/components/ui/TechMarquee";
import type { ProjectCard as Project } from "@/lib/projectMedia";

const SHOWCASE_COUNT = 6;

/**
 * Hero éditorial, fond nuit : la promesse en très grand (mots clés en serif
 * italique vert), deux appels à l'action, et à droite une vitrine vivante de
 * vraies boutiques. En bas : les chiffres clés en grand, puis le bandeau des
 * technologies (Shopify et Liquid en tête).
 */
export default function Hero({ projects }: { projects: Project[] }) {
  const t = useTranslations("hero");
  const stats = t.raw("stats") as { value: string; label: string }[];
  const mock = t.raw("mock") as HeroMock;
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const intro = gsap.timeline({ paused: true, defaults: { ease: "expo.out" } });
        intro.fromTo(
          ".hero-fade",
          { autoAlpha: 0, y: 26 },
          { autoAlpha: 1, y: 0, duration: 1.2, stagger: 0.09 },
          0.3
        );
        intro.fromTo(".hero-rule", { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: "expo.inOut" }, 0.5);
        const stop = onIntroReady(() => intro.play());

        // Au scroll, le texte remonte un peu plus vite que la page (profondeur).
        gsap.to(".hero-copy", {
          yPercent: -10,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
        return () => stop();
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="tone-dark relative isolate overflow-hidden" aria-labelledby="hero-title">
      {/* Fond : grille fine qui s'estompe + une seule lueur verte, discrète. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid mask-radial absolute inset-0" />
        <div className="absolute -right-40 -top-40 h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(closest-side,rgba(0,128,96,0.22),transparent)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />
      </div>

      <div className="flex min-h-[100svh] flex-col">
        <div className="container-page grid flex-1 items-center gap-16 pb-12 pt-28 sm:pt-32 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)] lg:gap-12 lg:pb-8 lg:pt-28">
          <div className="hero-copy">
            <div
              data-reveal
              className="hero-fade inline-flex items-center gap-2.5 rounded-full border border-line py-1.5 pl-3 pr-4 text-xs font-medium text-ink-muted sm:text-sm"
            >
              <span className="pulse-dot size-2 shrink-0 rounded-full bg-accent" />
              {t("badge")}
            </div>

            <SplitHeading
              as="h1"
              id="hero-title"
              trigger="intro"
              delay={0.1}
              text={`${t("titleLine1")} *${t("titleHighlight")}*`}
              className="font-display mt-7 text-[clamp(2.6rem,min(5.6vw,9.6svh),6rem)] font-semibold leading-[1] tracking-[-0.045em]"
            />

            <p data-reveal className="hero-fade mt-7 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
              {t("subtitle")}
            </p>

            <div data-reveal className="hero-fade mt-9 flex flex-wrap items-center gap-3">
              <Magnetic>
                <Link href="/contact" className="btn-primary group px-7 py-4 text-sm sm:text-base">
                  {t("ctaPrimary")}
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
                </Link>
              </Magnetic>
              <Magnetic strength={0.25}>
                <Link href="/realisations" className="btn-ghost group px-7 py-4 text-sm sm:text-base">
                  {t("ctaSecondary")}
                  <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                </Link>
              </Magnetic>
            </div>
          </div>

          <div className="pb-8 lg:pb-0">
            <HeroShowcase shops={projects.slice(0, SHOWCASE_COUNT)} mock={mock} />
          </div>
        </div>

        {/* Chiffres clés, en grand */}
        <div className="container-page">
          <div aria-hidden className="hero-rule h-px origin-left bg-line" />
          <dl data-reveal className="hero-fade grid grid-cols-3 gap-4 py-6 sm:py-8">
            {stats.map((s) => (
              <div key={s.label} className="min-w-0">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-serif text-[2.4rem] leading-none tracking-[-0.02em] text-ink sm:text-6xl lg:text-7xl">
                  {s.value}
                </dd>
                <dd className="mt-2 text-xs leading-snug text-ink-muted sm:text-sm">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div data-reveal className="hero-fade pb-8">
          <p className="label-mono container-page mb-3 text-ink-dim">{t("stackLabel")}</p>
          <TechMarquee />
        </div>
      </div>
    </section>
  );
}
