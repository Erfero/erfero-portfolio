"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { gsap, SplitText, useGSAP, MOTION_OK } from "@/lib/gsap";
import RichText from "@/components/ui/RichText";

/**
 * Présentation en une phrase forte : les mots s'allument un à un au rythme
 * du scroll, puis la liste des agences et entreprises partenaires.
 */
export default function Manifesto({ showCv }: { showCv?: boolean }) {
  const t = useTranslations("manifesto");
  const agencies = t.raw("agencies") as string[];
  const root = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const split = SplitText.create(textRef.current, { type: "words", wordsClass: "mf-word" });
        gsap.fromTo(
          split.words,
          { opacity: 0.13 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.1,
            scrollTrigger: { trigger: textRef.current, start: "top 82%", end: "bottom 50%", scrub: 0.6 },
          }
        );
        gsap.from(".mf-agency", {
          y: 24,
          autoAlpha: 0,
          stagger: 0.08,
          duration: 0.9,
          ease: "expo.out",
          scrollTrigger: { trigger: ".mf-agencies", start: "top 90%", once: true },
        });
        return () => split.revert();
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="about" className="relative scroll-mt-28 py-24 sm:py-36">
      <div className="container-page">
        <span className="inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em] text-lime">
          <span className="h-px w-8 bg-lime/70" />
          {t("eyebrow")}
        </span>
        <p
          ref={textRef}
          className="font-display mt-8 max-w-[22ch] text-[clamp(1.9rem,4.6vw,4.4rem)] font-medium leading-[1.08] tracking-[-0.03em] sm:max-w-[26ch]"
        >
          <RichText text={t("text")} />
        </p>

        <div className="mf-agencies mt-16 grid gap-8 border-t border-white/10 pt-8 lg:grid-cols-[260px_1fr] lg:items-center">
          <p className="text-sm leading-relaxed text-ink-muted">{t("agenciesLabel")}</p>
          <ul className="flex flex-wrap items-center gap-x-10 gap-y-4">
            {agencies.map((name) => (
              <li
                key={name}
                className="mf-agency font-display text-2xl font-medium tracking-tight text-ink/70 transition-colors hover:text-ink sm:text-3xl"
              >
                {name}
              </li>
            ))}
            {showCv && (
              <li className="mf-agency">
                <Link
                  href="/cv"
                  className="group inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-sm text-ink transition-colors hover:border-lime hover:text-lime"
                >
                  {t("cta")}
                  <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
