"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { onIntroReady } from "@/lib/intro";
import SplitHeading from "@/components/ui/SplitHeading";
import Magnetic from "@/components/ui/MagneticButton";
import HeroShader from "@/components/ui/HeroShader";
import HeroShowcase, { type HeroMock } from "@/components/ui/HeroShowcase";
import TechMarquee from "@/components/ui/TechMarquee";
import type { ProjectCard as Project } from "@/lib/projectMedia";

const SHOWCASE_COUNT = 6;

/**
 * Hero : aurore WebGL en fond, promesse en très grand (mots clés en dégradé),
 * deux appels à l'action, chiffres clés, et à droite une vitrine vivante de
 * vraies boutiques. En bas, le bandeau des technologies maîtrisées.
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
          { autoAlpha: 0, y: 26, filter: "blur(8px)" },
          { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 1.2, stagger: 0.09, clearProps: "filter" },
          0.3
        );
        const stop = onIntroReady(() => intro.play());

        // Au scroll, le texte remonte un peu plus vite que la page (profondeur).
        gsap.to(".hero-copy", {
          yPercent: -12,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
        return () => stop();
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative isolate overflow-hidden" aria-labelledby="hero-title">
      {/* Fond : dégradé CSS de secours + aurore WebGL + grille */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_80%_15%,rgba(109,77,255,0.55),transparent_70%),radial-gradient(ellipse_50%_40%_at_45%_0%,rgba(255,111,208,0.3),transparent_70%)]" />
        <HeroShader className="absolute inset-0 size-full" />
        <div className="bg-grid mask-radial absolute inset-0 opacity-70" />
        <div className="absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-bg/70 to-transparent lg:w-1/2" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-bg via-bg/80 to-transparent" />
      </div>

      <div className="flex min-h-[100svh] flex-col">
        <div className="container-page grid flex-1 items-center gap-16 pb-14 pt-28 sm:pt-32 lg:pt-24 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-12 lg:pb-10">
          <div className="hero-copy">
            <div
              data-reveal
              className="hero-fade glass inline-flex items-center gap-2.5 rounded-full py-1.5 pl-3 pr-4 text-xs font-medium text-ink sm:text-sm"
            >
              <span className="pulse-dot size-2 rounded-full bg-success" />
              {t("badge")}
            </div>

            <SplitHeading
              as="h1"
              id="hero-title"
              trigger="intro"
              delay={0.1}
              text={`${t("titleLine1")} *${t("titleHighlight")}*`}
              className="font-display mt-6 text-[clamp(2.5rem,min(5.3vw,9.4svh),5.6rem)] font-extrabold leading-[0.98] tracking-[-0.045em]"
            />

            <p
              data-reveal
              className="hero-fade mt-6 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg"
            >
              {t("subtitle")}
            </p>

            <div data-reveal className="hero-fade mt-8 flex flex-wrap items-center gap-3">
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

            <dl data-reveal className="hero-fade mt-10 grid max-w-xl grid-cols-3 gap-3">
              {stats.map((s) => (
                <div key={s.label} className="glass rounded-2xl px-4 py-3.5">
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="text-gradient font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
                    {s.value}
                  </dd>
                  <dd className="mt-1 text-xs leading-snug text-ink-muted sm:text-sm">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="pb-8 lg:pb-0">
            <HeroShowcase shops={projects.slice(0, SHOWCASE_COUNT)} mock={mock} />
          </div>
        </div>

        <div data-reveal className="hero-fade pb-8">
          <p className="container-page mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-ink-dim">
            {t("stackLabel")}
          </p>
          <TechMarquee />
        </div>
      </div>
    </section>
  );
}
