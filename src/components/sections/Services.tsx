import { useTranslations } from "next-intl";
import {
  Rocket,
  Wrench,
  Gauge,
  Blocks,
  SearchX,
  ShieldCheck,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const icons = [Rocket, Wrench, Gauge, Blocks, SearchX, ShieldCheck];

export default function Services() {
  const t = useTranslations("services");
  const items = t.raw("items") as { title: string; description: string }[];

  return (
    <section id="services" className="relative scroll-mt-28 py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={item.title} delay={i * 0.05} y={16}>
                <div className="h-full bg-bg-soft p-7 transition-colors hover:bg-white/[0.03]">
                  <Icon className="size-6 text-lime" />
                  <h3 className="font-display mt-5 text-lg font-medium">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
