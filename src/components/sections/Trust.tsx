import { useTranslations } from "next-intl";
import { MessageSquare, CalendarCheck2, Code2, Quote } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const icons = [MessageSquare, CalendarCheck2, Code2, Quote];

/** Pourquoi me faire confiance : 4 engagements en cartes lumineuses. */
export default function Trust({ index }: { index?: string }) {
  const t = useTranslations("trust");
  const items = t.raw("items") as { title: string; description: string }[];

  return (
    <section className="tone-stone relative py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} index={index} />

        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={item.title} delay={i * 0.06} className="h-full">
                <div className="spotlight group h-full p-7 sm:p-9">
                  <span
                    className="grid size-14 place-items-center rounded-2xl border border-accent/25 bg-accent/10 text-accent transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"
                  >
                    <Icon className="size-6" />
                  </span>
                  <h3 className="font-display mt-7 text-2xl font-semibold tracking-[-0.03em]">{item.title}</h3>
                  <p className="mt-3 max-w-md text-base leading-relaxed text-ink-muted">{item.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
