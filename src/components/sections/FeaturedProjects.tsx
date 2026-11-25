"use client";

import { useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight, ArrowUpRight, Lock, MousePointer2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { gsap, useGSAP } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";
import { projectHost, projectShot, type ProjectCard as Project } from "@/lib/projectMedia";

const FEATURED_COUNT = 12;
/** Doit rester identique à la requête média de .fp-* dans globals.css. */
const PIN_QUERY = "(min-width: 1024px) and (min-height: 520px) and (prefers-reduced-motion: no-preference)";

/**
 * Vitrine des boutiques phares.
 * - Desktop : le panneau est épinglé et le scroll fait défiler une rangée de
 *   GRANDES cartes (taille calculée sur la hauteur de l'écran, jamais
 *   coupées), avec un léger effet de profondeur dans chaque capture.
 * - Mobile / tablette / écran très bas / mouvement réduit : carrousel natif
 *   (doigt, trackpad ou flèches).
 * Chaque carte ouvre la vraie boutique dans un nouvel onglet.
 */
export default function FeaturedProjects({
  projects,
  totalCount,
  index,
}: {
  projects: Project[];
  totalCount: number;
  index?: string;
}) {
  const t = useTranslations("projects");
  const tc = useTranslations("catalog");
  const locale = useLocale() as "fr" | "en";
  const root = useRef<HTMLElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const featured = projects.slice(0, FEATURED_COUNT);
  const nicheLabel = (n: string) => (tc.has(`niches.${n}`) ? tc(`niches.${n}`) : undefined);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(PIN_QUERY, () => {
        const track = rail.current!;
        const view = viewport.current!;
        // Largeur réelle de la rangée (marges comprises) moins la zone visible :
        // la dernière carte s'arrête toujours entièrement à l'écran.
        const distance = () => Math.max(track.offsetWidth - view.clientWidth, 0);
        const shopCount = featured.length;

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: panel.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const i = Math.min(shopCount, Math.floor(self.progress * shopCount) + 1);
              if (counter.current) counter.current.textContent = String(i).padStart(2, "0");
              gsap.set(".fp-progress", { scaleX: self.progress });
            },
          },
        });

        // Courbe 3D : chaque carte pivote doucement en traversant l'écran, comme
        // posée sur un écran incurvé (elle fait face au visiteur au centre).
        gsap.utils.toArray<HTMLElement>(".fp-card").forEach((card) => {
          gsap.fromTo(
            card,
            { rotationY: -12, transformPerspective: 2200, transformOrigin: "50% 50%" },
            {
              rotationY: 12,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                containerAnimation: tween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            }
          );
        });

        // Profondeur : chaque capture glisse un peu à contre-sens de la rangée.
        gsap.utils.toArray<HTMLElement>(".fp-img").forEach((img) => {
          gsap.fromTo(
            img,
            { xPercent: 5 },
            {
              xPercent: -5,
              ease: "none",
              scrollTrigger: {
                trigger: img.closest(".fp-card"),
                containerAnimation: tween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            }
          );
        });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".fp-card", {
          y: 70,
          autoAlpha: 0,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.07,
          scrollTrigger: { trigger: viewport.current, start: "top 88%", once: true },
        });
      });
    },
    { scope: root }
  );

  // Mode carrousel : une carte de plus / de moins.
  const step = (dir: 1 | -1) => {
    const view = viewport.current;
    const card = view?.querySelector<HTMLElement>(".fp-card");
    if (!view || !card) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    view.scrollBy({ left: dir * (card.offsetWidth + 24), behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <section ref={root} id="realisations" data-hide-cta className="fp tone-light relative scroll-mt-24 pt-24 sm:pt-32">
      <div className="container-page flex flex-wrap items-end justify-between gap-8">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} index={index} />
        <Link
          href="/realisations"
          className="group flex items-center gap-5 rounded-2xl border border-line bg-surface py-3 pl-5 pr-3 transition-colors hover:border-ink/40"
        >
          <span>
            <span className="block font-serif text-5xl leading-none text-ink">{totalCount}</span>
            <span className="mt-1 block text-xs text-ink-muted">{t("liveStores")}</span>
          </span>
          <span className="grid size-11 place-items-center rounded-full bg-ink text-bg transition-transform duration-500 group-hover:rotate-45">
            <ArrowUpRight className="size-5" />
          </span>
        </Link>
      </div>

      <div ref={panel} className="fp-panel relative mt-10 lg:mt-0">
        <div ref={viewport} className="fp-viewport no-scrollbar snap-x snap-mandatory overflow-x-auto">
          <div ref={rail} className="flex w-max items-start gap-5 px-5 pb-6 sm:gap-6 sm:px-8 lg:px-[max(2rem,calc((100vw-var(--container-page))/2+2rem))]">
            {featured.map((project, i) => {
              const name = project.name[locale];
              const niche = nicheLabel(project.niche);
              return (
                <a
                  key={project.id}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor={t("visit")}
                  aria-label={`${name} — ${t("visit")} (${projectHost(project)})`}
                  className="fp-card shot-trigger group block shrink-0 snap-center"
                  style={{ width: "var(--fp-w)" }}
                >
                  <div className="relative overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_30px_70px_-40px_rgba(14,19,17,0.45)] transition-[border-color,box-shadow,transform] duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-1.5 group-hover:border-ink/30 group-hover:shadow-[0_45px_90px_-40px_rgba(14,19,17,0.55)]">
                    <div className="flex h-9 items-center gap-2 border-b border-line bg-bg-soft px-3.5">
                      <span className="flex gap-1.5" aria-hidden>
                        <span className="size-2.5 rounded-full bg-ink/15" />
                        <span className="size-2.5 rounded-full bg-ink/15" />
                        <span className="size-2.5 rounded-full bg-ink/15" />
                      </span>
                      <span className="mx-auto flex min-w-0 max-w-[60%] items-center gap-1.5 rounded-md bg-ink/[0.06] px-3 py-0.5 font-mono text-[11px] text-ink-muted">
                        <Lock className="size-3 shrink-0 text-success" aria-hidden />
                        <span className="truncate">{projectHost(project)}</span>
                      </span>
                      <ArrowUpRight className="size-4 text-ink-muted transition-colors group-hover:text-ink" aria-hidden />
                    </div>
                    <div className="relative aspect-video overflow-hidden bg-bg-soft">
                      {/* eslint-disable-next-line @next/next/no-img-element -- captures WebP pré-optimisées */}
                      <img
                        src={projectShot(project)}
                        alt={`${name} — boutique Shopify`}
                        loading={i < 3 ? "eager" : "lazy"}
                        decoding="async"
                        className="fp-img shot-scroll absolute inset-0 size-full scale-[1.12]"
                      />
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/35 to-transparent transition-opacity duration-500 group-hover:opacity-0" />
                      {niche && (
                        <span className="absolute left-3 top-3 rounded-full bg-[#0e1311]/75 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                          {niche}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-4">
                    <div className="flex min-w-0 items-baseline gap-3">
                      <span className="font-mono text-sm font-medium tabular-nums text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-display truncate text-xl font-semibold tracking-[-0.03em] lg:text-2xl">{name}</h3>
                    </div>
                    <span className="grid size-9 shrink-0 place-items-center rounded-full border border-line transition-all duration-500 group-hover:rotate-45 group-hover:border-transparent group-hover:bg-ink group-hover:text-bg">
                      <ArrowUpRight className="size-4" aria-hidden />
                    </span>
                  </div>
                </a>
              );
            })}

            <Link
              href="/realisations"
              data-cursor={t("explore")}
              className="fp-card tone-green group relative flex shrink-0 snap-center flex-col justify-between overflow-hidden rounded-2xl p-5 [container-type:inline-size] sm:p-7"
              style={{ width: "calc(var(--fp-w) * 0.6)", height: "calc(var(--fp-w) * 9 / 16 + 2.25rem)" }}
            >
              <span className="label-mono">{t("viewAll")}</span>
              <span>
                <span className="block font-serif text-[32cqw] leading-[0.85] tracking-[-0.03em]">
                  {totalCount}
                </span>
                <span className="mt-2 block text-sm font-medium text-ink-muted sm:text-base">{t("liveStores")}</span>
              </span>
              <span className="inline-flex items-center gap-3 text-sm font-semibold">
                {t("explore")}
                <span className="grid size-10 place-items-center rounded-full bg-white text-[#0e1311] transition-transform duration-500 group-hover:rotate-45">
                  <ArrowUpRight className="size-4" />
                </span>
              </span>
            </Link>
          </div>
        </div>

        {/* Barre du mode épinglé : progression + lien */}
        <div className="fp-when-pinned container-page h-16 items-center justify-between gap-6 pb-4">
          <div className="flex items-center gap-4">
            <span className="font-mono text-sm font-medium tabular-nums text-ink-muted">
              <span ref={counter} className="text-ink">01</span> / {String(featured.length).padStart(2, "0")}
            </span>
            <span className="relative h-[2px] w-40 overflow-hidden rounded-full bg-ink/10">
              <span className="fp-progress absolute inset-0 origin-left scale-x-0 bg-accent" />
            </span>
          </div>
          <span className="hidden items-center gap-2 text-xs text-ink-dim xl:flex">
            <MousePointer2 className="size-3.5" aria-hidden />
            {t("scrollHint")}
          </span>
          <Link href="/realisations" className="btn-ghost px-5 py-2.5 text-sm">
            {t("viewAll")}
            <ArrowUpRight className="size-4" />
          </Link>
        </div>

        {/* Barre du mode carrousel : flèches + lien */}
        <div className="fp-when-free container-page flex items-center justify-between gap-4 pb-4 pt-2">
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => step(-1)} aria-label={t("prev")} className="btn-ghost size-11 p-0">
              <ArrowLeft className="size-4" />
            </button>
            <button type="button" onClick={() => step(1)} aria-label={t("next")} className="btn-ghost size-11 p-0">
              <ArrowRight className="size-4" />
            </button>
          </div>
          <Link href="/realisations" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
            {t("viewAll")} <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
