import { useTranslations } from "next-intl";
import { Mail } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/data/site.config";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "@/components/ui/BrandIcons";

export default function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const year = new Date().getFullYear();

  const socials = [
    { href: siteConfig.socials.instagram, icon: InstagramIcon, label: "Instagram" },
    { href: siteConfig.socials.linkedin, icon: LinkedinIcon, label: "LinkedIn" },
    { href: siteConfig.socials.github, icon: GithubIcon, label: "GitHub" },
    { href: `mailto:${siteConfig.email}`, icon: Mail, label: "Email" },
  ].filter((s) => s.href);

  return (
    <footer className="border-t border-border">
      <div className="container-page flex flex-col gap-8 py-14 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <Link href="/" className="font-display text-lg font-semibold">
            {siteConfig.shortName}
          </Link>
          <p className="mt-3 text-sm text-ink-muted">{t("tagline")}</p>
          <div className="mt-5 flex items-center gap-3">
            {socials.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="grid size-9 place-items-center rounded-full border border-border text-ink-muted transition-colors hover:border-lime/50 hover:text-lime"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm sm:flex sm:gap-16">
          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-wide text-ink-muted/70">
              {nav("home")}
            </span>
            <Link href="/#services" className="text-ink-muted hover:text-ink">
              {nav("services")}
            </Link>
            <Link href="/realisations" className="text-ink-muted hover:text-ink">
              {nav("projects")}
            </Link>
            <Link href="/#faq" className="text-ink-muted hover:text-ink">
              {nav("faq")}
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-wide text-ink-muted/70">
              Contact
            </span>
            <a href={`mailto:${siteConfig.email}`} className="text-ink-muted hover:text-ink">
              {siteConfig.email}
            </a>
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="text-ink-muted hover:text-ink"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="container-page flex flex-col gap-2 border-t border-border py-6 text-xs text-ink-muted/70 sm:flex-row sm:items-center sm:justify-between">
        <span>
          © {year} {siteConfig.name}. {t("rights")}
        </span>
        <span>{t("madeWith")}</span>
      </div>
    </footer>
  );
}
