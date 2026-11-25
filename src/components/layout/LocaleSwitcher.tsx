"use client";

import { useEffect, useId, useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { getPathname, usePathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

/**
 * Sélecteur FR / EN instantané :
 * - la page dans l'autre langue est préchargée en arrière-plan dès
 *   l'affichage (le lien de langue de next-intl, lui, désactive ce
 *   préchargement) ;
 * - la pastille bascule tout de suite au clic, sans attendre la navigation.
 */
export default function LocaleSwitcher({ className }: { className?: string }) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  // layoutId unique par instance : l'en-tête et le menu mobile affichent
  // chacun un sélecteur.
  const pillId = `locale-pill-${useId()}`;
  const [pending, setPending] = useState<Locale | null>(null);
  const [seenLocale, setSeenLocale] = useState(locale);
  if (seenLocale !== locale) {
    setSeenLocale(locale);
    setPending(null);
  }
  const shown = pending ?? locale;

  useEffect(() => {
    for (const loc of routing.locales) {
      if (loc !== locale) router.prefetch(getPathname({ href: pathname, locale: loc }));
    }
  }, [locale, pathname, router]);

  return (
    <div className={cn("relative isolate flex items-center rounded-full border border-line p-1", className)}>
      {routing.locales.map((loc) => {
        const active = loc === shown;
        return (
          <NextLink
            key={loc}
            href={getPathname({ href: pathname, locale: loc })}
            hrefLang={loc}
            aria-current={loc === locale}
            onClick={() => setPending(loc)}
            className={cn(
              "relative isolate px-3 py-1 text-xs font-medium uppercase tracking-wide transition-colors duration-200",
              active ? "font-semibold text-bg" : "text-ink-muted hover:text-ink"
            )}
          >
            {active && (
              <motion.span
                layoutId={pillId}
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
                className="absolute inset-0 -z-10 rounded-full bg-ink"
              />
            )}
            {loc}
          </NextLink>
        );
      })}
    </div>
  );
}
