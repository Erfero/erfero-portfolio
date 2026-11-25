"use client";

import { useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { onIntroReady } from "@/lib/intro";
import SplitHeading from "@/components/ui/SplitHeading";
import Magnetic from "@/components/ui/MagneticButton";
import { projectHost, projectThumb, type ProjectCard as Project } from "@/lib/projectMedia";

/** Profondeur (px) entre deux boutiques de la galerie 3D. */
const SPACING = 720;
/** Positions écran (vw / vh) des cartes : de part et d'autre du centre, pour
 * encadrer le titre au départ puis s'écarter quand la caméra avance. */
const SLOTS: [number, number][] = [
  [-62, -18], [60, 14], [-55, 22], [58, -22], [-66, 0], [64, 4],
  [-50, -26], [52, 26], [-60, 16], [57, -12], [-54, -8], [56, 10],
];
/** Teintes de fond qui changent doucement avec la boutique au premier plan. */
const TINTS = ["#f4f2ed", "#ebe6de", "#e4ddd3", "#e2e9e3", "#ece7df", "#e6e1d8"];

/**
 * Ouverture du site, inspirée des portfolios éditoriaux :
 * 1. un grand titre serif centré, entouré de vraies boutiques qui flottent
 *    en profondeur ;
 * 2. au défilement, la caméra plonge dans cette galerie 3D : les boutiques
 *    défilent une à une, avec leur nom en bas à gauche et un bouton pour la
 *    visiter en bas à droite.
 * Tout est en CSS 3D piloté par le scroll (pas de WebGL). En « mouvement
 * réduit », la galerie est remplacée par le simple hero.
 */
export default function Hero({ projects }: { projects: Project[] }) {
  const t = useTranslations("hero");
  const locale = useLocale() as "fr" | "en";
  const stats = t.raw("stats") as { value: string; label: string }[];
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(-1);
  const shops = projects;
  const count = shops.length;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const section = root.current!;
        const world = section.querySelector<HTMLElement>(".hg-world")!;
        const cards = gsap.utils.toArray<HTMLElement>(".hg-card", section);
        // À la fin du défilement, la dernière boutique est encore au premier plan.
        const depth = count * SPACING - 520;

        // Entrée : le texte apparaît, les cartes arrivent du fond.
        const intro = gsap.timeline({ paused: true, defaults: { ease: "expo.out" } });
        intro
          .fromTo(".hero-fade", { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 1.2, stagger: 0.08 }, 0.25)
          .fromTo(world, { z: -900, autoAlpha: 0 }, { z: 0, autoAlpha: 1, duration: 2.2 }, 0);
        const stop = onIntroReady(() => intro.play());

        let current = -2;
        const render = (p: number) => {
          const cam = p * depth;
          gsap.set(world, { z: cam });
          let best = -1;
          let bestScore = Infinity;
          cards.forEach((card, i) => {
            const rel = -(i + 1) * SPACING + cam; // < 0 : devant la caméra
            let o = 1;
            if (rel > 120) o = 0;
            else if (rel > -260) o = (120 - rel) / 380;
            else if (rel < -4600) o = 0;
            else if (rel < -3200) o = (rel + 4600) / 1400;
            card.style.opacity = String(Math.max(0, Math.min(1, o)));
            card.style.pointerEvents = o > 0.4 ? "auto" : "none";
            const score = Math.abs(rel + 1100);
            if (o > 0.5 && score < bestScore) {
              bestScore = score;
              best = i;
            }
          });
          // La galerie « commence » quand le titre s'est effacé.
          const next = p > 0.08 ? best : -1;
          if (next !== current) {
            current = next;
            setActive(next);
            section.style.setProperty("--hg-bg", TINTS[(next + TINTS.length) % TINTS.length]);
          }
        };
        render(0);

        gsap.to(".hg-veil", {
          autoAlpha: 0,
          ease: "none",
          scrollTrigger: { trigger: section, start: "2% top", end: "10% top", scrub: true },
        });
        gsap.to(".hg-copy", {
          autoAlpha: 0,
          y: -60,
          scale: 0.94,
          ease: "none",
          scrollTrigger: { trigger: section, start: "top top", end: "12% top", scrub: true },
        });
        gsap.to(".hg-bottom", {
          autoAlpha: 0,
          ease: "none",
          scrollTrigger: { trigger: section, start: "2% top", end: "8% top", scrub: true },
        });
        const st = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.4,
            onUpdate: (self) => render(self.progress),
          },
        });
        return () => {
          stop();
          st.kill();
        };
      });
    },
    { scope: root }
  );

  const shop = active >= 0 ? shops[active] : null;

  return (
    <section
      ref={root}
      aria-labelledby="hero-title"
      className="hg tone-light relative [--hg-bg:#f4f2ed] motion-safe:h-[430svh]"
      style={{ backgroundColor: "var(--hg-bg)", transition: "background-color 0.9s ease" }}
    >
      <div className="relative h-[100svh] overflow-hidden motion-safe:sticky motion-safe:top-0">
        {/* Galerie 3D */}
        <div aria-hidden={active < 0} className="absolute inset-0 hidden [perspective:1100px] motion-safe:block">
          <div className="hg-world absolute left-1/2 top-1/2 [transform-style:preserve-3d] will-change-transform">
            {shops.map((p, i) => {
              const [x, y] = SLOTS[i % SLOTS.length];
              return (
                <a
                  key={p.id}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={-1}
                  data-cursor={t("visit")}
                  className="hg-card absolute left-0 top-0 block w-[44vw] overflow-hidden rounded-xl bg-surface shadow-[0_40px_80px_-40px_rgba(14,19,17,0.55)] ring-1 ring-black/5 sm:w-[24vw] sm:max-w-[400px]"
                  style={{
                    transform: `translate(-50%, -50%) translate3d(${x}vw, ${y}vh, ${-(i + 1) * SPACING}px)`,
                    opacity: 0,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- vignettes WebP légères */}
                  <img
                    src={projectThumb(p)}
                    alt=""
                    loading={i < 6 ? "eager" : "lazy"}
                    decoding="async"
                    className="block aspect-[16/11] w-full object-cover object-top"
                  />
                </a>
              );
            })}
          </div>
        </div>

        {/* Voile clair derrière le titre : aucune capture ne gêne la lecture. */}
        <div
          aria-hidden
          className="hg-veil pointer-events-none absolute inset-0 z-[5] hidden motion-safe:block"
          style={{ background: "radial-gradient(ellipse 40% 42% at 50% 50%, var(--hg-bg) 55%, transparent 100%)" }}
        />

        {/* Titre */}
        <div className="hg-copy pointer-events-none relative z-10 flex h-full flex-col items-center justify-center px-5 pb-24 pt-28 text-center [@media(max-height:720px)]:pb-16 [@media(max-height:720px)]:pt-20">
          <p
            data-reveal
            className="hero-fade pointer-events-auto inline-flex items-center gap-2.5 text-xs text-ink-muted sm:text-sm"
          >
            <span>{locale === "en" ? "Freelance Shopify developer" : "Développeur Shopify freelance"}</span>
            <span className="pulse-dot size-2 shrink-0 rounded-full bg-[#008060]" />
            <span>{t("badge")}</span>
          </p>
          <SplitHeading
            as="h1"
            id="hero-title"
            trigger="intro"
            delay={0.1}
            text={`${t("titleLine1")} *${t("titleHighlight")}*`}
            className="mt-6 max-w-[15ch] font-serif text-[clamp(2.6rem,min(8.4vw,11.5svh),8.6rem)] font-normal leading-[0.95] tracking-[-0.02em]"
          />
          <p data-reveal className="hero-fade mt-7 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg [@media(max-height:640px)]:mt-4 [@media(max-height:640px)]:text-sm">
            {t("subtitle")}
          </p>
          <div data-reveal className="hero-fade pointer-events-auto mt-9 [@media(max-height:640px)]:mt-5 flex flex-wrap items-center justify-center gap-x-7 gap-y-4">
            <Magnetic>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2.5 rounded-full bg-[#0e1311] px-7 py-4 text-sm font-medium text-white transition-colors hover:bg-[#008060] sm:text-base"
              >
                {t("ctaPrimary")}
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
              </Link>
            </Magnetic>
            <Link
              href="/realisations"
              className="inline-flex items-center gap-2 border-b border-ink/40 pb-1 text-sm font-medium transition-colors hover:border-ink sm:text-base"
            >
              {t("ctaSecondary")}
            </Link>
          </div>
        </div>

        {/* Bas du hero : chiffres + invitation à défiler */}
        <div className="hg-bottom absolute inset-x-0 bottom-0 z-10">
          <div className="container-page flex items-end justify-between gap-6 pb-6 sm:pb-8">
            <dl data-reveal className="hero-fade flex gap-6 sm:gap-10">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-serif text-3xl leading-none sm:text-4xl">{s.value}</dd>
                  <dd className="mt-1.5 max-w-[9rem] text-[11px] leading-snug text-ink-muted sm:text-xs">{s.label}</dd>
                </div>
              ))}
            </dl>
            <p data-reveal className="hero-fade hidden items-center gap-2 text-xs text-ink-muted motion-safe:sm:flex">
              {t("galleryHint")}
              <ArrowDown className="size-3.5" />
            </p>
          </div>
        </div>

        {/* Légende de la boutique au premier plan */}
        <div
          className={`pointer-events-none absolute inset-x-0 bottom-0 z-20 transition-opacity duration-500 ${
            shop ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="container-page flex items-end justify-between gap-6 pb-6 sm:pb-10">
            <div className="min-w-0">
              <p className="font-mono text-xs text-ink-muted">
                {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
              </p>
              <p className="mt-1 truncate font-serif text-5xl leading-none sm:text-7xl">{shop?.name[locale]}</p>
              <p className="mt-2 line-clamp-1 text-sm text-ink-muted sm:text-base">{shop?.tagline[locale]}</p>
            </div>
            {shop && (
              <a
                href={shop.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${t("visit")} — ${projectHost(shop)}`}
                className="pointer-events-auto inline-flex shrink-0 items-center gap-2 rounded-full bg-[#0e1311] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#008060]"
              >
                {t("visit")}
                <ArrowUpRight className="size-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
