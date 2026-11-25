"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site.config";
import LocaleSwitcher from "./LocaleSwitcher";

export default function Navbar({ showCv }: { showCv?: boolean }) {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const menu = useRef<HTMLDivElement>(null);

  // En-tête "intelligent" : se masque en descendant, revient en remontant.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > 240);
        last = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Ferme le menu mobile à chaque changement de page (ajustement d'état
  // pendant le rendu, motif recommandé par React plutôt qu'un effet).
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setOpen(false);
  }

  // Bloque le défilement seulement pendant que le menu mobile est ouvert, et
  // restaure ensuite la valeur précédente (sans écraser un autre verrou,
  // comme celui du préchargeur).
  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const previous = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = previous;
    };
  }, [open]);

  useGSAP(
    () => {
      if (!open) return;
      gsap.fromTo(
        ".mm-link",
        { yPercent: 110 },
        { yPercent: 0, duration: 0.9, ease: "expo.out", stagger: 0.05, delay: 0.1 }
      );
    },
    { scope: menu, dependencies: [open] }
  );

  const homeHref = locale === "en" ? "/en" : "/";
  const links = [
    { href: "/realisations", label: t("projects") },
    { href: "/services", label: t("services") },
    { href: "/process", label: t("process") },
    { href: "/faq", label: t("faq") },
    ...(showCv ? [{ href: "/cv", label: t("cv") }] : []),
    { href: "/contact", label: t("contactMenu") },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-[var(--ease-out-expo)] print:hidden",
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        )}
      >
        <div className="container-page pt-4">
          <div
            className={cn(
              "flex items-center justify-between gap-x-6 rounded-full py-2.5 pl-5 pr-2.5 transition-all duration-500",
              scrolled || open
                ? "border border-white/10 bg-[#0c0e11]/80 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl"
                : "border border-transparent bg-transparent"
            )}
          >
            <a href={homeHref} className="flex items-center gap-3" aria-label={siteConfig.name}>
              <span className="font-display text-xl font-semibold tracking-tight">
                {siteConfig.shortName}
                <span className="text-lime">.</span>
              </span>
              <span className="hidden h-4 w-px bg-white/15 xl:block" />
              <span className="hidden text-[11px] text-ink-muted xl:block">{siteConfig.role}</span>
            </a>

            <nav className="hidden items-center gap-7 md:flex" aria-label="Navigation principale">
              {links.slice(0, -1).map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group relative text-sm transition-colors",
                      active ? "text-ink" : "text-ink-muted hover:text-ink"
                    )}
                  >
                    {link.label}
                    <span
                      className={cn(
                        "absolute -bottom-1 left-0 h-px w-full origin-left bg-lime transition-transform duration-500",
                        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      )}
                    />
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <LocaleSwitcher className="hidden sm:flex" />
              <Link
                href="/contact"
                className="group hidden items-center gap-1.5 rounded-full bg-lime px-4 py-2.5 text-sm font-semibold text-bg md:inline-flex"
              >
                {t("cta")}
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
              </Link>
              <button
                type="button"
                aria-label="Menu"
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className="relative grid size-11 place-items-center rounded-full border border-white/10 bg-white/[0.04] md:hidden"
              >
                <span
                  className={cn(
                    "absolute h-px w-4 bg-ink transition-transform duration-500",
                    open ? "rotate-45" : "-translate-y-[3px]"
                  )}
                />
                <span
                  className={cn(
                    "absolute h-px w-4 bg-ink transition-transform duration-500",
                    open ? "-rotate-45" : "translate-y-[3px]"
                  )}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Menu mobile plein écran */}
      <div
        ref={menu}
        className={cn(
          "fixed inset-0 z-40 flex flex-col justify-between bg-bg px-5 pb-8 pt-28 transition-[clip-path] duration-700 ease-[var(--ease-out-expo)] md:hidden print:hidden",
          open ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]"
        )}
        aria-hidden={!open}
      >
        <nav className="flex flex-col" aria-label="Menu mobile">
          {links.map((link, i) => (
            <span key={link.href} className="overflow-hidden border-b border-white/10">
              <Link
                href={link.href}
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
                className="mm-link font-display flex items-baseline justify-between py-4 text-4xl font-medium tracking-tight"
              >
                {link.label}
                <span className="text-xs tabular-nums text-ink-muted">{String(i + 1).padStart(2, "0")}</span>
              </Link>
            </span>
          ))}
        </nav>
        <div className="flex items-center justify-between">
          <LocaleSwitcher />
          <Link
            href="/contact"
            tabIndex={open ? 0 : -1}
            onClick={() => setOpen(false)}
            className="inline-flex items-center gap-1.5 rounded-full bg-lime px-5 py-3 text-sm font-semibold text-bg"
          >
            {t("cta")}
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </>
  );
}
