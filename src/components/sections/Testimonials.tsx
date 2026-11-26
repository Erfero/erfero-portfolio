"use client";

import { useMemo, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import SectionHeading from "@/components/ui/SectionHeading";
import TestimonialCard from "@/components/ui/TestimonialCard";
import type { Testimonial } from "@/data/testimonials";

const DESKTOP = "(min-width: 1024px)";
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(DESKTOP);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
/** null côté serveur (et pendant l'hydratation), puis true/false dans le navigateur. */
function useIsDesktop() {
  return useSyncExternalStore(subscribe, () => window.matchMedia(DESKTOP).matches, () => null);
}

function Column({
  items,
  reverse,
  duration,
  loop,
  className,
}: {
  items: Testimonial[];
  reverse?: boolean;
  duration: number;
  /** Ajoute la copie qui permet la boucle infinie (uniquement dans le navigateur). */
  loop: boolean;
  className?: string;
}) {
  if (items.length === 0) return null;
  return (
    <div className={`marquee-pause relative h-[640px] overflow-hidden mask-fade-y sm:h-[760px] ${className ?? ""}`}>
      <div
        className="marquee-track flex flex-col gap-4"
        style={
          {
            "--marquee-name": loop ? (reverse ? "scroll-col-down" : "scroll-col-up") : "none",
            "--marquee-duration": `${duration}s`,
          } as React.CSSProperties
        }
      >
        {(loop ? [...items, ...items] : items).map((item, i) => (
          <div key={`${item.id}-${i}`} aria-hidden={i >= items.length || undefined}>
            <TestimonialCard testimonial={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Avis clients/agences en colonnes défilantes (pause au survol).
 * Pour une page légère, le HTML serveur ne contient chaque avis qu'une seule
 * fois (3 colonnes, les 2 dernières masquées sur mobile) ; le navigateur met
 * ensuite en place la vraie disposition (1 colonne sur mobile, 3 sur grand
 * écran) et la copie nécessaire au défilement infini.
 */
export default function Testimonials({ testimonials, index }: { testimonials: Testimonial[]; index?: string }) {
  const t = useTranslations("testimonials");
  const isDesktop = useIsDesktop();
  const ready = isDesktop !== null;

  // Les emplacements "screenshot"/"video" restent masqués tant qu'aucun média
  // réel n'a été ajouté depuis /admin/testimonials.
  const visible = useMemo(
    () =>
      testimonials.filter(
        (item) => (item.type !== "screenshot" && item.type !== "video") || item.mediaUrl
      ),
    [testimonials]
  );
  const cols = [0, 1, 2].map((c) => visible.filter((_, i) => i % 3 === c));

  if (visible.length === 0) return null;

  return (
    <section className="tone-sage relative py-28 sm:py-40">
      <div className="container-page">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} index={index} />
        {ready && !isDesktop ? (
          /* Mobile / tablette : une seule colonne avec tous les avis */
          <div className="mx-auto mt-14 max-w-xl">
            <Column items={visible} loop duration={Math.max(visible.length * 6, 60)} />
          </div>
        ) : (
          /* Desktop (et HTML serveur) : trois colonnes en sens alternés */
          <div className="mx-auto mt-14 grid max-w-xl gap-4 lg:max-w-none lg:grid-cols-3">
            <Column items={cols[0]} loop={ready} duration={Math.max(cols[0].length * 7, 40)} />
            <Column items={cols[1]} loop={ready} reverse duration={Math.max(cols[1].length * 8, 44)} className="hidden lg:block" />
            <Column items={cols[2]} loop={ready} duration={Math.max(cols[2].length * 7.5, 42)} className="hidden lg:block" />
          </div>
        )}
      </div>
    </section>
  );
}
