import { useTranslations } from "next-intl";
import { Check, ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

interface Plan {
  name: string;
  price: string;
  description: string;
  features: string[];
}

export default function Pricing() {
  const t = useTranslations("pricing");
  const plans = t.raw("plans") as Plan[];

  return (
    <section className="relative py-16 sm:py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <Reveal delay={0.1} className="mx-auto mt-8 max-w-2xl">
          <p className="rounded-full border border-lime/30 bg-lime/6 px-5 py-2.5 text-center text-sm text-lime">
            {t("guarantee")}
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan, i) => {
            const popular = i === 0;
            return (
              <Reveal key={plan.name} delay={i * 0.08}>
                <div
                  className={`relative flex h-full flex-col rounded-2xl border p-7 ${
                    popular
                      ? "border-lime/50 bg-lime/[0.04] shadow-[0_0_60px_-20px_var(--color-lime)]"
                      : "border-border bg-white/[0.02]"
                  }`}
                >
                  {popular && (
                    <span className="absolute -top-3 left-7 rounded-full bg-lime px-3 py-1 text-[11px] font-semibold text-bg">
                      {t("popular")}
                    </span>
                  )}
                  <h3 className="font-display text-xl font-semibold">
                    {plan.name}
                  </h3>
                  <p className="mt-2 text-lg font-medium text-lime">
                    {plan.price}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                    {plan.description}
                  </p>

                  <ul className="mt-5 flex flex-1 flex-col gap-2.5">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-sm text-ink-muted"
                      >
                        <Check className="mt-0.5 size-4 shrink-0 text-lime" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/#contact"
                    className={`mt-6 inline-flex items-center justify-center gap-1.5 rounded-full px-5 py-3 text-sm font-medium transition-transform hover:scale-[1.02] ${
                      popular ? "bg-lime text-bg" : "border border-border text-ink"
                    }`}
                  >
                    {t("cta")}
                    <ArrowUpRight className="size-4" />
                  </Link>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
