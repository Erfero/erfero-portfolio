import { useTranslations } from "next-intl";
import { ArrowUpRight, CalendarCheck2, Mail } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SplitHeading from "@/components/ui/SplitHeading";
import { WhatsappIcon } from "@/components/ui/BrandIcons";
import ContactForm from "./ContactForm";
import { siteConfig } from "@/data/site.config";

export default function Contact() {
  const t = useTranslations("contact");

  const links = [
    {
      href: `https://wa.me/${siteConfig.whatsappNumber}`,
      icon: WhatsappIcon,
      label: t("whatsappCta"),
      meta: siteConfig.phone,
    },
    { href: siteConfig.calendlyUrl, icon: CalendarCheck2, label: t("calendlyCta"), meta: t("calendlyMeta") },
    { href: `mailto:${siteConfig.email}`, icon: Mail, label: t("emailCta"), meta: siteConfig.email },
  ];

  return (
    <section id="contact" data-hide-cta className="tone-light scroll-mt-24 px-2 py-4 sm:px-3">
      <div className="tone-dark relative isolate overflow-hidden rounded-[2rem] py-20 sm:rounded-[3rem] sm:py-28">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="bg-grid mask-radial absolute inset-0" />
          <div className="absolute -right-32 -top-32 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(closest-side,rgba(0,128,96,0.25),transparent)]" />
        </div>
        <div className="container-page">
          <Reveal y={12}>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-line py-1.5 pl-3 pr-4 text-sm font-medium text-ink-muted">
              <span className="pulse-dot size-2 shrink-0 rounded-full bg-accent" />
              {t("availability")}
            </span>
          </Reveal>
          <SplitHeading
            text={t("bigTitle")}
            className="mt-7 max-w-[14ch] font-serif text-[clamp(3.2rem,8vw,8rem)] font-normal leading-[0.95] tracking-[-0.02em]"
          />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">{t("subtitle")}</p>
          </Reveal>

          <div className="mt-14 grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-10">
            <Reveal>
              <ContactForm />
            </Reveal>

            <Reveal delay={0.1} className="flex flex-col">
              {links.map(({ href, icon: Icon, label, meta }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 border-b border-line py-5 first:border-t"
                >
                  <span className="flex min-w-0 items-center gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-full border border-line text-accent transition-transform duration-500 group-hover:scale-110">
                      <Icon className="size-6" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-serif text-2xl leading-tight">{label}</span>
                      <span className="mt-0.5 block truncate text-sm text-ink-muted">{meta}</span>
                    </span>
                  </span>
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-ink/10 transition-all duration-500 group-hover:rotate-45 group-hover:bg-ink group-hover:text-bg">
                    <ArrowUpRight className="size-4" />
                  </span>
                </a>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
