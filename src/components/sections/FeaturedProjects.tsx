"use client";

import { useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { gsap, useGSAP } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";
import ShopCard from "@/components/ui/ShopCard";
import type { ProjectCard as Project } from "@/lib/projectMedia";

const FEATURED_COUNT = 12;

/**
 * Sélection de boutiques en défilement horizontal :
 * - desktop : la section est épinglée et le scroll vertical fait glisser les
 *   cartes horizontalement (GSAP ScrollTrigger) ;
 * - mobile/tablette : simple carrousel natif au doigt, avec aimantation.
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
  const track = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const featured = projects.slice(0, FEATURED_COUNT);
  const nicheLabel = (n: string) => (tc.has(`niches.${n}`) ? tc(`niches.${n}`) : undefined);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const el = track.current!;
        const distance = () => Math.max(el.scrollWidth - window.innerWidth, 0);
        // Seules les cartes de boutiques comptent (pas la carte finale « tout voir »).
        const shopCount = gsap.utils.toArray<HTMLElement>(".fp-shop", el).length;
        gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const i = Math.min(shopCount, Math.floor(self.progress * (shopCount + 1)) + 1);
              if (counter.current) counter.current.textContent = String(i).padStart(2, "0");
              gsap.set(".fp-progress", { scaleX: self.progress });
            },
          },
        });
      });
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".fp-card", {
          y: 60,
          autoAlpha: 0,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: { trigger: track.current, start: "top 85%", once: true },
        });
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="realisations"
      data-hide-cta
      className="relative scroll-mt-28 overflow-hidden py-20 lg:flex lg:min-h-[100svh] lg:flex-col lg:justify-center lg:py-0"
    >
      <div className="container-page flex flex-wrap items-end justify-between gap-6 lg:pt-20">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} index={index} />
        <div className="hidden items-center gap-4 lg:flex">
          <span className="font-display text-sm tabular-nums text-ink-muted">
            <span ref={counter} className="text-ink">01</span> / {String(featured.length).padStart(2, "0")}
          </span>
          <span className="relative h-px w-32 overflow-hidden bg-white/15">
            <span className="fp-progress absolute inset-0 origin-left scale-x-0 bg-lime" />
          </span>
        </div>
      </div>

      <div
        ref={track}
        className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:gap-8 sm:px-8 lg:mt-10 lg:snap-none lg:overflow-visible lg:px-[max(2rem,calc((100vw-var(--container-page))/2+2rem))] lg:pb-0"
      >
        {featured.map((project, i) => (
          <div
            key={project.id}
            className="fp-card fp-shop w-[82vw] shrink-0 snap-center sm:w-[62vw] lg:w-[min(42vw,calc((100svh-522px)*1.6))]"
          >
            <ShopCard
              project={project}
              locale={locale}
              nicheLabel={nicheLabel(project.niche)}
              visitLabel={t("visit")}
              index={i}
              size="lg"
              eager={i < 2}
            />
          </div>
        ))}

        <div className="fp-card flex w-[82vw] shrink-0 snap-center sm:w-[62vw] lg:w-[min(30vw,calc((100svh-522px)*1.15))]">
          <Link
            href="/realisations"
            data-cursor={t("explore")}
            className="group relative flex aspect-[16/11] w-full flex-col justify-between overflow-hidden rounded-2xl border border-lime/30 bg-lime/[0.04] p-7 transition-colors hover:bg-lime/[0.08] lg:aspect-auto lg:h-[calc(100%-4.5rem)]"
          >
            <span className="text-[11px] uppercase tracking-[0.22em] text-lime">{t("viewAll")}</span>
            <span className="font-display text-[clamp(2.4rem,5vw,4.5rem)] font-semibold leading-[0.95] tracking-tight">
              {totalCount}
              <span className="block text-lg font-medium tracking-normal text-ink-muted sm:text-xl">
                {t("liveStores")}
              </span>
            </span>
            <span className="inline-flex items-center gap-2 text-sm font-medium text-ink">
              {t("explore")}
              <span className="grid size-10 place-items-center rounded-full bg-lime text-bg transition-transform duration-500 group-hover:rotate-45">
                <ArrowUpRight className="size-4" />
              </span>
            </span>
          </Link>
        </div>
      </div>

      <div className="container-page mt-6 flex items-center justify-between text-xs text-ink-muted lg:hidden">
        <span>{t("swipeHint")}</span>
        <Link href="/realisations" className="inline-flex items-center gap-1 text-ink">
          {t("viewAll")} <ArrowUpRight className="size-3.5" />
        </Link>
      </div>
    </section>
  );
}
