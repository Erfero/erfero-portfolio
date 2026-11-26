import { useTranslations } from "next-intl";
import { Check, ArrowUpRight, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

interface Plan {
  name: string;
  price: string;
  description: string;
  features: string[];
}


/** Offres : 4 cartes, la plus demandée entourée d'un faisceau lumineux animé. */
export default function Pricing() {
  const t = useTranslations("pricing");
  const plans = t.raw("plans") as Plan[];

  return (
    <section id="tarifs" className="tone-light relative scroll-mt-24 py-28 sm:py-40">
      <div className="container-page">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />

        <Reveal delay={0.1} className="mt-8">
          <p className="inline-flex items-center gap-2.5 rounded-2xl border border-success/30 bg-success/10 px-5 py-3 text-sm font-medium text-ink">
            <ShieldCheck className="size-5 shrink-0 text-success" />
            {t("guarantee")}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan, i) => {
            const popular = i === 0;
            return (
              <Reveal key={plan.name} delay={i * 0.08} className="h-full">
                <div
                  className={`h-full rounded-3xl transition-transform duration-500 hover:-translate-y-1.5 ${
                    popular ? "shadow-[0_40px_90px_-40px_rgba(14,19,17,0.6)]" : ""
                  }`}
                >
                <div className={`spotlight flex h-full flex-col p-7 ${popular ? "tone-dark" : ""}`}>
                  {popular && (
                    <span className="absolute -top-3.5 left-7 inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-on-accent shadow-lg">
                      <Sparkles className="size-3.5" />
                      {t("popular")}
                    </span>
                  )}
                  <h3 className="font-serif text-[1.8rem] leading-tight">{plan.name}</h3>
                  <p className="mt-3 font-serif text-4xl leading-none tracking-[-0.01em] text-accent">
                    {plan.price}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">{plan.description}</p>
                  <ul className="mt-6 flex flex-1 flex-col gap-3 border-t border-line pt-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm text-ink">
                        <span
                          className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent/15 text-accent"
                        >
                          <Check className="size-3" strokeWidth={3} />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/contact?plan=${encodeURIComponent(plan.name)}`}
                    className={`mt-7 px-5 py-3.5 text-sm ${popular ? "btn-primary" : "btn-ghost"}`}
                  >
                    {t("cta")}
                    <ArrowUpRight className="size-4" />
                  </Link>
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
