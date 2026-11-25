"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import SectionHeading from "@/components/ui/SectionHeading";
import TestimonialCard from "@/components/ui/TestimonialCard";
import type { Testimonial } from "@/data/testimonials";

function Column({
  items,
  reverse,
  duration,
  className,
}: {
  items: Testimonial[];
  reverse?: boolean;
  duration: number;
  className?: string;
}) {
  if (items.length === 0) return null;
  return (
    <div className={`marquee-pause relative h-[640px] overflow-hidden mask-fade-y sm:h-[760px] ${className ?? ""}`}>
      <div
        className="marquee-track flex flex-col gap-4"
        style={
          {
            "--marquee-name": reverse ? "scroll-col-down" : "scroll-col-up",
            "--marquee-duration": `${duration}s`,
          } as React.CSSProperties
        }
      >
        {[...items, ...items].map((item, i) => (
          <div key={`${item.id}-${i}`} aria-hidden={i >= items.length || undefined}>
            <TestimonialCard testimonial={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

/** Avis clients/agences en colonnes défilantes (pause au survol). */
export default function Testimonials({ testimonials, index }: { testimonials: Testimonial[]; index?: string }) {
  const t = useTranslations("testimonials");

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
    <section className="relative py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} index={index} />
        {/* Mobile / tablette : une seule colonne avec tous les avis */}
        <div className="mx-auto mt-14 max-w-xl lg:hidden">
          <Column items={visible} duration={Math.max(visible.length * 6, 60)} />
        </div>
        {/* Desktop : trois colonnes en sens alternés */}
        <div className="mt-14 hidden grid-cols-3 gap-4 lg:grid">
          <Column items={cols[0]} duration={Math.max(cols[0].length * 7, 40)} />
          <Column items={cols[1]} reverse duration={Math.max(cols[1].length * 8, 44)} />
          <Column items={cols[2]} duration={Math.max(cols[2].length * 7.5, 42)} />
        </div>
      </div>
    </section>
  );
}
