import { useTranslations } from "next-intl";
import { MessageSquare, CalendarCheck2, Code2, Quote } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const icons = [MessageSquare, CalendarCheck2, Code2, Quote];

export default function Trust() {
  const t = useTranslations("trust");
  const items = t.raw("items") as { title: string; description: string }[];

  return (
    <section className="relative py-16 sm:py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={item.title} delay={i * 0.06}>
                <div className="flex h-full items-start gap-4 rounded-2xl border border-border bg-white/[0.02] p-6">
                  <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-lime/10 text-lime">
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-medium">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
