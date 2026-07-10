"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site.config";
import LocaleSwitcher from "./LocaleSwitcher";

export default function Navbar({ showCv }: { showCv?: boolean }) {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const homeHref = locale === "en" ? "/en" : "/";
  const tagline =
    siteConfig.tagline[locale as keyof typeof siteConfig.tagline] ??
    siteConfig.tagline.fr;

  const goHome = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    window.location.href = homeHref;
  };

  const links = [
    { href: "/services", label: t("services") },
    { href: "/realisations", label: t("projects") },
    { href: "/process", label: t("process") },
    { href: "/faq", label: t("faq") },
    { href: "/contact", label: t("contactMenu") },
  ];
  const cvLabel = t("cv");

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 print:hidden",
        scrolled ? "py-3" : "py-5"
      )}
    >
      <div className="container-page">
        <div
          className={cn(
            "flex items-center justify-between gap-x-6 rounded-full px-4 py-2.5 transition-all duration-300",
            scrolled
              ? "border border-border bg-surface/85 shadow-lg shadow-black/20 backdrop-blur-xl"
              : "border border-transparent bg-surface/45 backdrop-blur-md"
          )}
        >
          <a
            href={homeHref}
            onClick={goHome}
            className="flex items-center gap-3"
          >
            <span className="font-display text-xl font-semibold tracking-tight">
              {siteConfig.shortName}
              <span className="ml-0.5 align-baseline text-3xl leading-none text-lime">.</span>
            </span>
            <span className="hidden h-4 w-px bg-border xl:block" />
            <span className="hidden text-[11px] text-ink-muted xl:block">
              {tagline}
            </span>
          </a>

          <nav className="hidden items-center gap-6 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-ink-muted transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
            {showCv && (
              <Link
                href="/cv"
                className="text-sm text-ink-muted transition-colors hover:text-ink"
              >
                {cvLabel}
              </Link>
            )}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <LocaleSwitcher />
            <Link
              href="/contact"
              className="group inline-flex items-center gap-1.5 rounded-full bg-lime px-4 py-2 text-sm font-medium text-bg transition-transform hover:scale-105"
            >
              {t("cta")}
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="grid size-9 place-items-center rounded-full border border-border md:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>

        {open && (
          <div className="glass mt-2 flex flex-col gap-1 rounded-3xl p-4 md:hidden">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm text-ink-muted hover:bg-white/5 hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
            {showCv && (
              <Link
                href="/cv"
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm text-ink-muted hover:bg-white/5 hover:text-ink"
              >
                {cvLabel}
              </Link>
            )}
            <div className="mt-2 flex items-center justify-between px-3">
              <LocaleSwitcher />
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-1.5 rounded-full bg-lime px-4 py-2 text-sm font-medium text-bg"
              >
                {t("cta")}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
