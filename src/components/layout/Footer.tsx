"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { ArrowUp, ArrowUpRight, Mail } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { siteConfig } from "@/data/site.config";
import { GithubIcon, InstagramIcon, LinkedinIcon, WhatsappIcon } from "@/components/ui/BrandIcons";
import Wordmark from "@/components/ui/Wordmark";
import ShareLinks from "@/components/ui/ShareLinks";

export default function Footer({ showCv }: { showCv?: boolean }) {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const root = useRef<HTMLElement>(null);
  const year = new Date().getFullYear();

  // Le pied de page reste monté d'une page à l'autre : un déclencheur au
  // scroll (ScrollTrigger) garderait la position calculée sur la page
  // précédente et pourrait ne jamais se déclencher sur une page plus courte.
  // On lance donc l'apparition du grand logo à l'aide d'un
  // IntersectionObserver, qui réagit à la visibilité réelle à l'écran.
  useGSAP(
    () => {
      const mark = root.current?.querySelector<HTMLElement>(".ft-mark");
      if (!mark) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const letters = gsap.utils.toArray<HTMLElement>(".ft-letter", mark);
        gsap.set(letters, { yPercent: 105 });
        const observer = new IntersectionObserver(
          (entries) => {
            if (!entries.some((e) => e.isIntersecting)) return;
            observer.disconnect();
            gsap.to(letters, { yPercent: 0, duration: 1.2, ease: "expo.out", stagger: 0.05 });
          },
          { threshold: 0.15 }
        );
        observer.observe(mark);
        return () => {
          observer.disconnect();
          gsap.set(letters, { clearProps: "transform" });
        };
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
    <footer ref={root} data-hide-cta className="tone-light px-2 pt-2 sm:px-3 print:hidden">
      <div className="tone-green relative isolate overflow-hidden rounded-t-[2rem] sm:rounded-t-[3rem]">
        <div className="container-page grid gap-12 pb-10 pt-20 md:grid-cols-[1.5fr_1fr_1fr] md:pt-24">
          <div className="max-w-md">
            <p className="font-serif text-[2rem] leading-[1.08] sm:text-[2.6rem]">{t("tagline")}</p>
            <Link
              href="/contact"
              className="group mt-8 inline-flex items-center gap-2 border-b border-ink/40 pb-1 text-sm font-medium transition-colors hover:border-ink"
            >
              {nav("cta")}
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
            </Link>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-ink-dim">{t("pages")}</p>
            <ul className="mt-5 flex flex-col gap-2.5">
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
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-ink-dim">{t("elsewhere")}</p>
            <ul className="mt-5 flex flex-col gap-2.5">
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

        {/* Grand logo sur toute la largeur du contenu : taille calculée sur la
            largeur du conteneur (unités cqw). Marges internes pour que rien ne
            soit rogné par le masque de l'animation. */}
        <div className="container-page select-none [container-type:inline-size]" aria-hidden>
          <div className="ft-mark overflow-hidden pb-[0.1em] pt-[0.04em] text-[44cqw]">
            <Wordmark
              split
              letterClassName="ft-letter"
              dotClassName="bg-[#9be3c4]"
              className="leading-[0.86] tracking-[-0.02em] text-ink"
            />
          </div>
        </div>

        <div className="container-page flex flex-col gap-3 border-t border-line py-6 text-xs text-ink-dim sm:flex-row sm:items-center sm:justify-between">
          {/* Triple-clic sur ce texte : panneau privé des liens à partager. */}
          <ShareLinks>
            © {year} {siteConfig.name}. {t("rights")}
          </ShareLinks>
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
      </div>
    </footer>
  );
}
