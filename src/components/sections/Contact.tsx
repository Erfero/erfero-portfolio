import { useTranslations } from "next-intl";
import { ArrowUpRight, CalendarCheck2, Mail } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SplitHeading from "@/components/ui/SplitHeading";
import { WhatsappIcon } from "@/components/ui/BrandIcons";
import ContactForm from "./ContactForm";
import { siteConfig } from "@/data/site.config";

export default function Contact({ selectedPlan }: { selectedPlan?: string }) {
  const t = useTranslations("contact");

  const links = [
    { href: `https://wa.me/${siteConfig.whatsappNumber}`, icon: WhatsappIcon, label: t("whatsappCta"), meta: siteConfig.phone },
    { href: siteConfig.calendlyUrl, icon: CalendarCheck2, label: t("calendlyCta"), meta: t("calendlyMeta") },
    { href: `mailto:${siteConfig.email}`, icon: Mail, label: t("emailCta"), meta: siteConfig.email },
  ];

  return (
    <section id="contact" data-hide-cta className="relative scroll-mt-28 overflow-hidden py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[38rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(185,255,92,0.10),transparent)] blur-2xl"
      />
      <div className="container-page">
        <Reveal y={12}>
          <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] py-1.5 pl-2.5 pr-4 text-xs text-ink/90">
            <span className="pulse-dot size-2 rounded-full bg-lime" />
            {t("availability")}
          </span>
        </Reveal>
        <SplitHeading
          text={t("bigTitle")}
          className="font-display mt-8 max-w-[14ch] text-[clamp(2.8rem,8vw,8rem)] font-semibold leading-[0.92] tracking-[-0.045em]"
        />
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">{t("subtitle")}</p>
        </Reveal>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <Reveal className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-10">
            <ContactForm selectedPlan={selectedPlan} />
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col border-t border-white/10">
            {links.map(({ href, icon: Icon, label, meta }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 border-b border-white/10 py-6 sm:py-8"
              >
                <span className="flex min-w-0 items-center gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-lime/10 text-lime transition-colors duration-500 group-hover:bg-lime group-hover:text-bg">
                    <Icon className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="font-display block text-xl font-medium tracking-tight transition-transform duration-500 group-hover:translate-x-1 sm:text-2xl">
                      {label}
                    </span>
                    <span className="mt-0.5 block truncate text-sm text-ink-muted">{meta}</span>
                  </span>
                </span>
                <ArrowUpRight className="size-5 shrink-0 text-ink-muted transition-all duration-500 group-hover:rotate-45 group-hover:text-lime" />
              </a>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
