import { useTranslations } from "next-intl";
import { MessageSquare, CalendarCheck2, Code2, HeartHandshake } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const icons = [MessageSquare, CalendarCheck2, Code2, HeartHandshake];

/** « Une seule promesse » : grand titre serif, puis 4 engagements en
 * colonnes séparées par un filet, sobres et lisibles. */
export default function Trust({ index }: { index?: string }) {
  const t = useTranslations("trust");
  const items = t.raw("items") as { title: string; description: string }[];

  return (
    <section className="tone-light relative py-24 sm:py-36">
      <div className="container-page">
        <SectionHeading layout="split" size="lg" eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} index={index} />

        <div className="mt-20 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={item.title} delay={i * 0.08} className="border-t border-ink/20 pt-6">
                <Icon className="size-5 text-accent" aria-hidden />
                <h3 className="mt-5 font-serif text-[1.65rem] leading-[1.1]">{item.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">{item.description}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
