import { useTranslations } from "next-intl";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import TestimonialCard from "@/components/ui/TestimonialCard";
import type { Testimonial } from "@/data/testimonials";

export default function Testimonials({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const t = useTranslations("testimonials");

  // Les emplacements "screenshot"/"video" restent masqués tant qu'aucun média
  // réel n'a été ajouté depuis /admin/testimonials (évite d'afficher une
  // preuve vide ou fabriquée).
  const visible = testimonials.filter(
    (item) => (item.type !== "screenshot" && item.type !== "video") || item.mediaUrl
  );

  return (
    <section className="relative py-16 sm:py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {visible.map((testimonial, i) => (
            <Reveal
              key={testimonial.id}
              delay={i * 0.05}
              className="mb-4 break-inside-avoid"
            >
              <TestimonialCard testimonial={testimonial} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
