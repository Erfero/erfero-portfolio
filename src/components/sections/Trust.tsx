import { useTranslations } from "next-intl";
import { MessageSquare, CalendarCheck2, Code2, Quote } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const icons = [MessageSquare, CalendarCheck2, Code2, Quote];
const COLORS = ["#4fdcff", "#a594ff", "#ff6fd0", "#ffbe6b"];

/** Pourquoi me faire confiance : 4 engagements en cartes lumineuses. */
export default function Trust({ index }: { index?: string }) {
  const t = useTranslations("trust");
  const items = t.raw("items") as { title: string; description: string }[];

  return (
    <section className="relative py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} index={index} />

        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {items.map((item, i) => {
            const Icon = icons[i % icons.length];
            const color = COLORS[i % COLORS.length];
            return (
              <Reveal key={item.title} delay={i * 0.06} className="h-full">
                <div className="spotlight group h-full p-7 sm:p-9" style={{ "--spot": color } as React.CSSProperties}>
                  <span
                    className="grid size-14 place-items-center rounded-2xl transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"
                    style={{ background: `${color}22`, color, boxShadow: `0 0 34px -10px ${color}` }}
                  >
                    <Icon className="size-6" />
                  </span>
                  <h3 className="font-display mt-7 text-2xl font-bold tracking-tight">{item.title}</h3>
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
