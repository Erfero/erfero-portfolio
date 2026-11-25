import { useTranslations } from "next-intl";
import { MessageSquare, CalendarCheck2, Code2, Quote } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const icons = [MessageSquare, CalendarCheck2, Code2, Quote];

export default function Trust({ index }: { index?: string }) {
  const t = useTranslations("trust");
  const items = t.raw("items") as { title: string; description: string }[];

  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} index={index} />

        <div className="mt-14 grid border-l border-t border-white/10 sm:grid-cols-2">
          {items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={item.title} delay={i * 0.06} className="border-b border-r border-white/10">
                <div className="group relative h-full overflow-hidden p-8 sm:p-10">
                  <span className="absolute inset-0 origin-bottom scale-y-0 bg-lime/[0.04] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-y-100" />
                  <div className="relative">
                    <span className="grid size-12 place-items-center rounded-2xl bg-lime/10 text-lime transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="font-display mt-8 text-2xl font-medium tracking-tight">{item.title}</h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-muted sm:text-base">
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
