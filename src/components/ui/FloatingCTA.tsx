"use client";

import { useEffect, useId, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";

/**
 * Badge circulaire « Démarrer un projet » : un disque vert dont le texte
 * tourne lentement autour d'une flèche. Il apparaît après le Hero et
 * s'efface au-dessus des zones marquées `data-hide-cta` (vitrine
 * horizontale, contact, pied de page) et pendant qu'on fait défiler vers le
 * bas, pour ne jamais gêner la lecture.
 */
export default function FloatingCTA() {
  const t = useTranslations("floatingCta");
  const pathname = usePathname();
  const pathId = `cta-circle-${useId().replace(/:/g, "")}`;
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
  const ring = `${t("label")} • ${t("label")} • `;

  return (
    <Link
      href="/contact"
      aria-label={t("label")}
      tabIndex={visible ? 0 : -1}
      className={`group fixed bottom-5 right-5 z-40 grid size-[5.5rem] place-items-center rounded-full bg-[#008060] text-white shadow-[0_18px_40px_-14px_rgba(0,0,0,0.55)] transition-all duration-500 ease-[var(--ease-out-expo)] hover:scale-105 sm:bottom-8 sm:right-8 sm:size-28 print:hidden ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-24 opacity-0"
      }`}
    >
      <svg viewBox="0 0 100 100" aria-hidden className="spin-slow absolute inset-0 size-full">
        <defs>
          <path id={pathId} d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
        </defs>
        <text className="fill-white font-mono text-[8.6px] font-medium uppercase tracking-[0.12em]">
          <textPath href={`#${pathId}`} textLength="230">
            {ring}
          </textPath>
        </text>
      </svg>
      <span className="grid size-9 place-items-center rounded-full bg-white text-[#0e1311] transition-transform duration-500 group-hover:rotate-45 sm:size-11">
        <ArrowUpRight className="size-4 sm:size-5" />
      </span>
    </Link>
  );
}
