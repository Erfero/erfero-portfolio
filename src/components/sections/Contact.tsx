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
    {
      href: `https://wa.me/${siteConfig.whatsappNumber}`,
      icon: WhatsappIcon,
      label: t("whatsappCta"),
      meta: siteConfig.phone,
      color: "#25D366",
    },
    { href: siteConfig.calendlyUrl, icon: CalendarCheck2, label: t("calendlyCta"), meta: t("calendlyMeta"), color: "#4fdcff" },
    { href: `mailto:${siteConfig.email}`, icon: Mail, label: t("emailCta"), meta: siteConfig.email, color: "#ff6fd0" },
  ];

  return (
    <section id="contact" data-hide-cta className="relative isolate scroll-mt-24 overflow-hidden py-20 sm:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="glow-orb left-1/2 top-40 h-[30rem] w-[56rem] -translate-x-1/2 bg-brand-deep/35" />
        <div className="glow-orb -right-20 bottom-0 h-[26rem] w-[26rem] bg-pink/25" />
        <div className="bg-grid mask-radial absolute inset-0 opacity-50" />
      </div>
      <div className="container-page">
        <Reveal y={12}>
          <span className="glass inline-flex items-center gap-2.5 rounded-full py-1.5 pl-3 pr-4 text-sm font-medium">
            <span className="pulse-dot size-2 rounded-full bg-success" />
            {t("availability")}
          </span>
        </Reveal>
        <SplitHeading
          text={t("bigTitle")}
          className="font-display mt-7 max-w-[14ch] text-[clamp(2.8rem,7.5vw,7.5rem)] font-extrabold leading-[0.95] tracking-[-0.045em]"
        />
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">{t("subtitle")}</p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
          <Reveal>
            <div className="spotlight p-6 sm:p-9">
              <ContactForm selectedPlan={selectedPlan} />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-3">
            {links.map(({ href, icon: Icon, label, meta, color }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="spotlight group flex items-center justify-between gap-4 p-5 sm:p-6"
                style={{ "--spot": color } as React.CSSProperties}
              >
                <span className="flex min-w-0 items-center gap-4">
                  <span
                    className="grid size-14 shrink-0 place-items-center rounded-2xl transition-transform duration-500 group-hover:scale-110"
                    style={{ background: `${color}22`, color, boxShadow: `0 0 30px -10px ${color}` }}
                  >
                    <Icon className="size-6" />
                  </span>
                  <span className="min-w-0">
                    <span className="font-display block text-xl font-bold tracking-tight sm:text-2xl">{label}</span>
                    <span className="mt-0.5 block truncate text-sm text-ink-muted">{meta}</span>
                  </span>
                </span>
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white/10 transition-all duration-500 group-hover:rotate-45 group-hover:bg-white group-hover:text-[#0b0920]">
                  <ArrowUpRight className="size-4" />
                </span>
              </a>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
