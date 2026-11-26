"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { ArrowUpRight, Briefcase } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";
import { LinkedinIcon } from "@/components/ui/BrandIcons";
import { siteConfig } from "@/data/site.config";

type Job = { title: string; company: string; period: string; bullets: string[] };

/**
 * Parcours professionnel (agences et entreprises), repris du contenu du CV.
 * La ligne de la frise se remplit en dégradé au rythme du scroll.
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
            x: 50,
            autoAlpha: 0,
            duration: 1,
            ease: "expo.out",
            scrollTrigger: { trigger: item, start: "top 88%", once: true },
          });
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="parcours" className="tone-stone relative scroll-mt-24 py-28 sm:py-40">
      <div className="container-page grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} index={index} />
          <div className="mt-10 flex flex-wrap gap-3">
            {showCv && (
              <Link href="/cv" className="btn-primary group px-6 py-3.5 text-sm">
                {t("ctaCv")}
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
              </Link>
            )}
            <a
              href={siteConfig.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost px-6 py-3.5 text-sm"
            >
              <LinkedinIcon className="size-4" />
              LinkedIn
            </a>
          </div>
        </div>

        {/* Les traits décoratifs vivent dans un conteneur à part : une <ol> ne
            doit contenir que des <li> (HTML valide, lecteurs d'écran). */}
        <div className="xp-list relative pl-10 sm:pl-14">
          <span className="absolute bottom-4 left-[15px] top-4 w-[2px] rounded-full bg-ink/10" aria-hidden />
          <span
            className="xp-progress absolute bottom-4 left-[15px] top-4 w-[2px] origin-top rounded-full bg-accent"
            aria-hidden
          />
          <ol className="flex flex-col gap-5">
            {jobs.map((job) => {
              return (
                <li key={`${job.company}-${job.period}`} className="xp-item relative">
                  <span
                    className="absolute -left-10 top-6 grid size-8 place-items-center rounded-full border-2 border-accent bg-bg text-accent sm:-left-14"
                    aria-hidden
                  >
                    <Briefcase className="size-3.5" />
                  </span>
                  <div className="spotlight p-6 sm:p-7">
                    <span className="inline-block rounded-full bg-ink/[0.06] px-3 py-1 font-mono text-xs font-medium text-ink-muted">
                      {job.period}
                    </span>
                    <h3 className="mt-4 font-serif text-[1.9rem] leading-tight sm:text-[2.2rem]">{job.title}</h3>
                    <p className="mt-1 text-base font-medium text-accent">{job.company}</p>
                    <ul className="mt-4 flex flex-col gap-2">
                      {job.bullets.map((b) => (
                        <li key={b} className="flex gap-3 text-sm leading-relaxed text-ink-muted sm:text-base">
                          <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
