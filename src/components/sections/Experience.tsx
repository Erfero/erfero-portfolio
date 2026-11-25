"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";
import { LinkedinIcon } from "@/components/ui/BrandIcons";
import { siteConfig } from "@/data/site.config";

type Job = { title: string; company: string; period: string; bullets: string[] };

/**
 * Parcours professionnel (agences et entreprises), repris du contenu du CV
 * pour rester toujours synchronisé avec lui. La ligne de la frise se dessine
 * au rythme du scroll.
 */
export default function Experience({ showCv, index }: { showCv?: boolean; index?: string }) {
  const t = useTranslations("experience");
  const cv = useTranslations("cvPage");
  const jobs = cv.raw("experience") as Job[];
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          ".xp-progress",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: ".xp-list", start: "top 70%", end: "bottom 60%", scrub: true },
          }
        );
        gsap.utils.toArray<HTMLElement>(".xp-item").forEach((item) => {
          gsap.from(item, {
            x: 40,
            autoAlpha: 0,
            duration: 1,
            ease: "expo.out",
            scrollTrigger: { trigger: item, start: "top 85%", once: true },
          });
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="parcours" className="relative scroll-mt-28 py-24 sm:py-32">
      <div className="container-page grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} index={index} />
          <div className="mt-10 flex flex-wrap gap-3">
            {showCv && (
              <Link
                href="/cv"
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-bg transition-colors hover:bg-lime"
              >
                {t("ctaCv")}
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
              </Link>
            )}
            <a
              href={siteConfig.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm font-medium transition-colors hover:border-white/40"
            >
              <LinkedinIcon className="size-4" />
              LinkedIn
            </a>
          </div>
        </div>

        {/* Les traits décoratifs vivent dans un conteneur à part : une <ol> ne
            doit contenir que des <li> (HTML valide, lecteurs d'écran). */}
        <div className="xp-list relative pl-8 sm:pl-12">
          <span className="absolute bottom-2 left-[3px] top-2 w-px bg-white/10" aria-hidden />
          <span className="xp-progress absolute bottom-2 left-[3px] top-2 w-px origin-top bg-lime" aria-hidden />
          <ol>
          {jobs.map((job) => (
            <li key={`${job.company}-${job.period}`} className="xp-item relative pb-14 last:pb-0">
              <span className="absolute -left-8 top-2 size-[7px] rounded-full bg-lime ring-4 ring-bg sm:-left-12" aria-hidden />
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-ink-muted">{job.period}</p>
              <h3 className="font-display mt-3 text-2xl font-medium tracking-tight sm:text-3xl">{job.title}</h3>
              <p className="mt-1 text-base text-lime">{job.company}</p>
              <ul className="mt-4 flex flex-col gap-2">
                {job.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-sm leading-relaxed text-ink-muted sm:text-base">
                    <span className="mt-2.5 h-px w-3 shrink-0 bg-white/30" />
                    {b}
                  </li>
                ))}
              </ul>
            </li>
          ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
