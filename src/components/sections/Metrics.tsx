import { useTranslations } from "next-intl";
import { Clock, Store, Video, Truck, Star } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import StatCounter from "@/components/ui/StatCounter";

const icons = [Clock, Store, Video, Truck, Star];

export default function Metrics() {
  const t = useTranslations("metrics");
  const items = t.raw("items") as {
    value: string;
    suffix: string;
    label: string;
  }[];

  return (
    <section className="relative border-y border-border bg-white/[0.015] py-20">
      <div className="container-page">
        <Reveal className="mx-auto max-w-xl text-center">
          <span className="text-xs font-medium uppercase tracking-widest text-lime">
            {t("eyebrow")}
          </span>
          <h2 className="font-display mt-3 text-2xl font-medium sm:text-3xl">
            {t("title")}
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-5">
          {items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal
                key={item.label}
                delay={i * 0.08}
                className="text-center"
              >
                <div className="mx-auto mb-3 grid size-10 place-items-center rounded-xl bg-lime/10 text-lime">
                  <Icon className="size-5" />
                </div>
                <div className="font-display text-3xl font-semibold sm:text-4xl">
                  <StatCounter value={item.value} suffix={item.suffix} />
                </div>
                <div className="mt-2 text-xs text-ink-muted sm:text-sm">
                  {item.label}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
