"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { ArrowUp, ArrowUpRight, Mail } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { siteConfig } from "@/data/site.config";
import { GithubIcon, InstagramIcon, LinkedinIcon, WhatsappIcon } from "@/components/ui/BrandIcons";

export default function Footer({ showCv }: { showCv?: boolean }) {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const root = useRef<HTMLElement>(null);
  const year = new Date().getFullYear();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(".ft-letter", {
          yPercent: 100,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.05,
          scrollTrigger: { trigger: ".ft-mark", start: "top 95%", once: true },
        });
      });
    },
    { scope: root }
  );

  const socials = [
    { href: siteConfig.socials.linkedin, icon: LinkedinIcon, label: "LinkedIn" },
    { href: siteConfig.socials.github, icon: GithubIcon, label: "GitHub" },
    { href: siteConfig.socials.instagram, icon: InstagramIcon, label: "Instagram" },
    { href: `https://wa.me/${siteConfig.whatsappNumber}`, icon: WhatsappIcon, label: "WhatsApp" },
    { href: `mailto:${siteConfig.email}`, icon: Mail, label: "Email" },
  ].filter((s) => s.href);

  const pages = [
    { href: "/realisations", label: nav("projects") },
    { href: "/services", label: nav("services") },
    { href: "/process", label: nav("process") },
    { href: "/faq", label: nav("faq") },
    ...(showCv ? [{ href: "/cv", label: nav("cv") }] : []),
    { href: "/contact", label: nav("contact") },
  ];

  return (
    <footer ref={root} data-hide-cta className="relative overflow-hidden border-t border-white/10 print:hidden">
      <div className="container-page grid gap-12 pb-10 pt-20 md:grid-cols-[1.3fr_1fr_1fr]">
        <div className="max-w-sm">
          <p className="font-display text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
            {t("tagline")}
          </p>
          <Link
            href="/contact"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3.5 text-sm font-semibold text-bg"
          >
            {nav("cta")}
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
          </Link>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-ink-muted/70">{t("pages")}</p>
          <ul className="mt-5 flex flex-col gap-3">
            {pages.map((p) => (
              <li key={p.href}>
                <Link href={p.href} className="text-ink-muted transition-colors hover:text-ink">
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-ink-muted/70">{t("elsewhere")}</p>
          <ul className="mt-5 flex flex-col gap-3">
            {socials.map(({ href, icon: Icon, label }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 text-ink-muted transition-colors hover:text-ink"
                >
                  <Icon className="size-4" />
                  {label}
                  <ArrowUpRight className="size-3.5 opacity-0 transition-all group-hover:rotate-45 group-hover:opacity-100" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="ft-mark container-page select-none overflow-hidden" aria-hidden>
        <p className="font-display flex text-[25vw] font-semibold leading-[0.78] tracking-[-0.07em] lg:text-[21.5vw] 2xl:text-[290px]">
          {siteConfig.shortName.split("").map((ch, i) => (
            <span key={i} className="ft-letter inline-block">
              {ch}
            </span>
          ))}
          <span className="ft-letter inline-block text-lime">.</span>
        </p>
      </div>

      <div className="container-page flex flex-col gap-3 border-t border-white/10 py-6 text-xs text-ink-muted/70 sm:flex-row sm:items-center sm:justify-between">
        <span>
          © {year} {siteConfig.name}. {t("rights")}
        </span>
        <span>{t("madeWith")}</span>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="inline-flex items-center gap-1.5 self-start text-ink-muted transition-colors hover:text-ink sm:self-auto"
        >
          {t("backToTop")}
          <ArrowUp className="size-3.5" />
        </button>
      </div>
    </footer>
  );
}
