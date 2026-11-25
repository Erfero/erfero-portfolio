"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";

/**
 * Bouton "Lancer mon projet" flottant : apparaît après le Hero et s'efface
 * au-dessus des zones marquées `data-hide-cta` (vitrine horizontale, contact,
 * pied de page) et pendant qu'on fait défiler vers le bas, pour ne jamais
 * gêner la lecture. Sur desktop c'est une pastille compacte qui s'ouvre au
 * survol.
 */
export default function FloatingCTA() {
  const t = useTranslations("floatingCta");
  const pathname = usePathname();
  const [pastHero, setPastHero] = useState(false);
  const [scrollingDown, setScrollingDown] = useState(false);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    // Masqué pendant qu'on descend (lecture), visible dès qu'on remonte.
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setPastHero(y > window.innerHeight * 0.9);
      if (Math.abs(y - last) > 8) {
        setScrollingDown(y > last);
        last = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const visible = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target);
          else visible.delete(e.target);
        }
        setBlocked(visible.size > 0);
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    // Laisse le temps à la nouvelle page de monter (transition de page).
    const timer = window.setTimeout(() => {
      document.querySelectorAll("[data-hide-cta]").forEach((el) => io.observe(el));
    }, 700);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(timer);
      io.disconnect();
    };
  }, [pathname]);

  if (pathname === "/contact") return null;
  const visible = pastHero && !blocked && !scrollingDown;

  return (
    <Link
      href="/contact"
      aria-label={t("label")}
      tabIndex={visible ? 0 : -1}
      className={`group fixed bottom-5 right-5 z-40 flex items-center rounded-full bg-brand-gradient p-1.5 text-sm font-bold text-[#0b0920] shadow-[0_20px_50px_-15px_rgba(255,111,208,0.6)] transition-all duration-500 ease-[var(--ease-out-expo)] sm:bottom-8 sm:right-8 print:hidden ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-24 opacity-0"
      }`}
    >
      <span className="max-w-40 overflow-hidden whitespace-nowrap pl-3.5 pr-2 transition-[max-width,padding] duration-500 ease-[var(--ease-out-expo)] lg:max-w-0 lg:px-0 lg:group-hover:max-w-40 lg:group-hover:pl-3.5 lg:group-hover:pr-2">
        {t("label")}
      </span>
      <span className="grid size-10 place-items-center rounded-full bg-[#0b0920] text-white transition-transform duration-500 group-hover:rotate-45">
        <ArrowUpRight className="size-4" />
      </span>
    </Link>
  );
}
