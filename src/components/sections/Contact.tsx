import { useTranslations } from "next-intl";
import { ArrowUpRight, CalendarCheck2, Mail } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import GradientBlob from "@/components/ui/GradientBlob";
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
    },
    {
      href: siteConfig.calendlyUrl,
      icon: CalendarCheck2,
      label: t("calendlyCta"),
    },
    {
      href: `mailto:${siteConfig.email}`,
      icon: Mail,
      label: t("emailCta"),
    },
  ];

  return (
    <section id="contact" className="relative scroll-mt-28 py-24 sm:py-32">
      <GradientBlob className="left-1/2 top-0 size-[36rem] -translate-x-1/2 bg-violet/15" />

      <div className="container-page relative">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
          align="center"
          className="mb-14"
        />

        <div className="mx-auto grid max-w-4xl gap-6 lg:grid-cols-[1.3fr_1fr]">
          <Reveal className="rounded-2xl border border-border bg-white/[0.02] p-6 sm:p-8">
            <ContactForm />
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-3">
            {links.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between gap-3 rounded-2xl border border-border bg-white/[0.02] p-5 transition-colors hover:border-lime/40 hover:bg-white/[0.04]"
              >
                <span className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-xl bg-lime/10 text-lime">
                    <Icon className="size-5" />
                  </span>
                  <span className="text-sm font-medium">{label}</span>
                </span>
                <ArrowUpRight className="size-4 text-ink-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-lime" />
              </a>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
