"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { onIntroReady } from "@/lib/intro";
import { projectThumb } from "@/lib/projectMedia";
import SplitHeading from "@/components/ui/SplitHeading";
import Magnetic from "@/components/ui/MagneticButton";
import type { ProjectCard as Project } from "@/lib/projectMedia";

const COLUMNS = 6;
const PER_COLUMN = 6;

/** Répartit les boutiques en colonnes pour le mur 3D, sans doublon dans une
 * même colonne. */
function buildColumns(projects: Project[]): Project[][] {
  const pool = projects.slice(0, COLUMNS * PER_COLUMN);
  const cols: Project[][] = Array.from({ length: COLUMNS }, () => []);
  pool.forEach((p, i) => cols[i % COLUMNS].push(p));
  return cols.filter((c) => c.length > 0);
}

export default function Hero({ projects }: { projects: Project[] }) {
  const t = useTranslations("hero");
  const stats = t.raw("stats") as { value: string; label: string }[];
  const root = useRef<HTMLElement>(null);
  const columns = buildColumns(projects);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const intro = gsap.timeline({ paused: true, defaults: { ease: "expo.out" } });
        intro
          .fromTo(
            ".hero-wall-intro",
            { autoAlpha: 0, scale: 1.18 },
            { autoAlpha: 1, scale: 1, duration: 2.4 },
            0
          )
          .fromTo(
            ".hero-fade",
            { autoAlpha: 0, y: 28 },
            { autoAlpha: 1, y: 0, duration: 1.2, stagger: 0.08 },
            0.35
          );
        const stop = onIntroReady(() => intro.play());

        // Au scroll : on "plonge" dans le mur pendant que le texte s'efface.
        gsap.to(".hero-wall-scroll", {
          scale: 1.22,
          rotateX: -14,
          opacity: 0.25,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to(".hero-content", {
          yPercent: -18,
          autoAlpha: 0,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "75% top", scrub: true },
        });
        return () => stop();
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden"
      aria-labelledby="hero-title"
    >
      {/* Mur 3D de vraies boutiques */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 [perspective:1400px]">
        <div className="hero-wall-scroll absolute inset-0 origin-center">
          <div data-reveal className="hero-wall-intro absolute inset-0 origin-center">
          <div className="hero-wall absolute left-1/2 top-1/2 grid w-[230vw] grid-cols-3 gap-3 [transform:translate(-50%,-46%)_rotateX(34deg)_rotateZ(-16deg)] sm:w-[170vw] sm:grid-cols-4 sm:gap-4 lg:w-[140vw] lg:grid-cols-6 lg:gap-5">
            {columns.map((col, c) => (
              <div
                key={c}
                className={`h-[150vh] overflow-hidden ${c >= 4 ? "hidden lg:block" : c >= 3 ? "hidden sm:block" : ""}`}
              >
                <div
                  className="marquee-track flex flex-col gap-3 sm:gap-4 lg:gap-5"
                  style={
                    {
                      "--marquee-name": c % 2 === 0 ? "scroll-col-up" : "scroll-col-down",
                      "--marquee-duration": `${70 + c * 9}s`,
                    } as React.CSSProperties
                  }
                >
                  {[...col, ...col].map((p, i) => (
                    <div
                      key={`${p.id}-${i}`}
                      className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-white/10 bg-surface"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element -- vignettes WebP pré-optimisées */}
                      <img
                        src={projectThumb(p)}
                        alt=""
                        loading={i < 2 ? "eager" : "lazy"}
                        decoding="async"
                        className="size-full object-cover object-top"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>
        {/* Voiles de lisibilité */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_60%_40%,rgba(7,8,10,0.35),rgba(7,8,10,0.92)_75%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/70 to-bg/20" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-bg to-transparent" />
      </div>

      <div className="hero-content container-page relative w-full pb-10 pt-36 sm:pb-14 lg:pb-16">
        <div data-reveal className="hero-fade inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] py-1.5 pl-2.5 pr-4 text-xs text-ink/90 backdrop-blur-md">
          <span className="pulse-dot size-2 rounded-full bg-lime" />
          {t("badge")}
        </div>

        <SplitHeading
          as="h1"
          id="hero-title"
          trigger="intro"
          delay={0.15}
          text={`${t("titleLine1")} *${t("titleHighlight")}*`}
          className="font-display mt-7 max-w-[15ch] text-[clamp(2.75rem,8.4vw,8.6rem)] font-semibold leading-[0.93] tracking-[-0.045em]"
        />

        <div className="mt-8 grid gap-10 lg:mt-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <p data-reveal className="hero-fade max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
              {t("subtitle")}
            </p>
            <div data-reveal className="hero-fade mt-8 flex flex-wrap items-center gap-3">
              <Magnetic>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-lime px-7 py-4 text-sm font-semibold text-bg transition-transform active:scale-[0.97]"
                >
                  {t("ctaPrimary")}
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
                </Link>
              </Magnetic>
              <Magnetic strength={0.25}>
                <Link
                  href="/realisations"
                  className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-7 py-4 text-sm font-medium text-ink backdrop-blur-md transition-colors hover:border-white/35"
                >
                  {t("ctaSecondary")}
                  <ArrowDownRight className="size-4 transition-transform duration-300 group-hover:-rotate-45" />
                </Link>
              </Magnetic>
            </div>
          </div>

          <dl className="grid grid-cols-3 gap-6 border-t border-white/10 pt-6 sm:gap-10 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            {stats.map((s) => (
              <div key={s.label} data-reveal className="hero-fade">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{s.value}</dd>
                <dd className="mt-1 text-xs leading-snug text-ink-muted sm:text-sm">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div data-reveal className="hero-fade mt-12 hidden items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-ink-muted sm:flex">
          <span className="relative h-10 w-px overflow-hidden bg-white/10">
            <span className="scroll-hint-bar absolute inset-x-0 top-0 h-1/2 bg-lime" />
          </span>
          {t("scrollHint")}
        </div>
      </div>
    </section>
  );
}
