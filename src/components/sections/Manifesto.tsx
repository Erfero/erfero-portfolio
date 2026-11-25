"use client";

import { Fragment, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { siteConfig } from "@/data/site.config";

/**
 * Présentation (juste après la galerie) : portrait en arche à gauche, et à
 * droite une grande phrase serif dont les mots passent du gris à l'encre au
 * fil du défilement. Les passages `*...*` sont en italique vert.
 */
export default function Manifesto({ showCv }: { showCv?: boolean }) {
  const t = useTranslations("manifesto");
  const tc = useTranslations("contact");
  const locale = useLocale();
  const agencies = t.raw("agencies") as string[];
  const root = useRef<HTMLElement>(null);

  // Découpe en mots, en gardant l'information « accent » des passages *...*.
  const words = t("text")
    .split(/(\*[^*]+\*)/g)
    .filter(Boolean)
    .flatMap((part) => {
      const accent = part.startsWith("*") && part.endsWith("*");
      const clean = accent ? part.slice(1, -1) : part;
      return clean
        .split(/\s+/)
        .filter(Boolean)
        .map((w) => ({ w, accent }));
    });

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          ".mf-word",
          { opacity: 0.16 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.05,
            scrollTrigger: { trigger: ".mf-text", start: "top 78%", end: "bottom 45%", scrub: true },
          }
        );
        gsap.from(".mf-photo", {
          y: 60,
          autoAlpha: 0,
          duration: 1.3,
          ease: "expo.out",
          scrollTrigger: { trigger: ".mf-photo", start: "top 88%", once: true },
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="about" className="tone-light relative scroll-mt-24 py-24 sm:py-36">
      <div className="container-page grid items-end gap-14 lg:grid-cols-[minmax(0,0.62fr)_minmax(0,1.38fr)] lg:gap-20">
        <figure className="mf-photo mx-auto w-full max-w-[300px] lg:mx-0">
          <div className="overflow-hidden rounded-t-full rounded-b-2xl bg-bg-soft">
            {/* eslint-disable-next-line @next/next/no-img-element -- photo de profil locale */}
            <img
              src="/cv-photo.jpg"
              alt={siteConfig.name}
              width={451}
              height={433}
              loading="lazy"
              decoding="async"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <figcaption className="mt-4">
            <p className="font-serif text-2xl italic">{siteConfig.name}</p>
            <p className="mt-1 flex items-center gap-2 text-sm text-ink-muted">
              {locale === "en" ? siteConfig.roleEn : siteConfig.role}
              <span className="pulse-dot size-2 shrink-0 rounded-full bg-[#008060]" />
            </p>
          </figcaption>
        </figure>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-ink-muted">{t("eyebrow")}</p>
          <p className="mf-text mt-6 font-serif text-[clamp(2rem,4.2vw,4rem)] leading-[1.08] tracking-[-0.01em]">
            {words.map(({ w, accent }, i) => (
              <Fragment key={i}>
                <span className={`mf-word ${accent ? "italic text-accent" : ""}`}>{w}</span>{" "}
              </Fragment>
            ))}
          </p>
          <p className="mt-8 max-w-xl text-sm text-ink-muted sm:text-base">{tc("availability")}</p>

          <div className="mt-10 border-t border-line pt-6">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-ink-muted">{t("agenciesLabel")}</p>
            <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
              {agencies.map((name) => (
                <li key={name} className="font-serif text-2xl sm:text-3xl">
                  {name}
                </li>
              ))}
            </ul>
            {showCv && (
              <Link
                href="/cv"
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[#0e1311] px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#008060]"
              >
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
