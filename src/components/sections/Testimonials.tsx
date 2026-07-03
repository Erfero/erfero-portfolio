"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import TestimonialCard from "@/components/ui/TestimonialCard";
import type { Testimonial } from "@/data/testimonials";

const PER_PAGE = 9;

export default function Testimonials({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const t = useTranslations("testimonials");
  const [page, setPage] = useState(0);

  // Les emplacements "screenshot"/"video" restent masqués tant qu'aucun média
  // réel n'a été ajouté depuis /admin/testimonials (évite d'afficher une
  // preuve vide ou fabriquée).
  const visible = useMemo(
    () =>
      testimonials.filter(
        (item) => (item.type !== "screenshot" && item.type !== "video") || item.mediaUrl
      ),
    [testimonials]
  );

  const pageCount = Math.max(Math.ceil(visible.length / PER_PAGE), 1);
  const current = Math.min(page, pageCount - 1);
  const pageItems = visible.slice(current * PER_PAGE, current * PER_PAGE + PER_PAGE);

  const goTo = (next: number) => {
    setPage(Math.min(Math.max(next, 0), pageCount - 1));
  };

  return (
    <section className="relative py-16 sm:py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {pageItems.map((testimonial, i) => (
            <Reveal
              key={testimonial.id}
              delay={i * 0.05}
              className="mb-4 break-inside-avoid"
            >
              <TestimonialCard testimonial={testimonial} />
            </Reveal>
          ))}
        </div>

        {pageCount > 1 && (
          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              onClick={() => goTo(current - 1)}
              disabled={current === 0}
              aria-label={t("prevPage")}
              className="grid size-10 place-items-center rounded-full border border-border text-ink-muted transition-colors hover:border-lime/40 hover:text-lime disabled:opacity-30 disabled:hover:border-border disabled:hover:text-ink-muted"
            >
              <ChevronLeft className="size-4" />
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: pageCount }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`${t("page")} ${i + 1}`}
                  className={`size-2 rounded-full transition-all ${
                    i === current ? "w-6 bg-lime" : "bg-border hover:bg-ink-muted"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => goTo(current + 1)}
              disabled={current === pageCount - 1}
              aria-label={t("nextPage")}
              className="grid size-10 place-items-center rounded-full border border-border text-ink-muted transition-colors hover:border-lime/40 hover:text-lime disabled:opacity-30 disabled:hover:border-border disabled:hover:text-ink-muted"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
