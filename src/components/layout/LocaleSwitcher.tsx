"use client";

import { useId } from "react";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export default function LocaleSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  // layoutId unique par instance : l'en-tête et le menu mobile affichent
  // chacun un sélecteur, et un layoutId partagé faisait disparaître la
  // pastille de l'un des deux.
  const pillId = `locale-pill-${useId()}`;

  return (
    <div className={cn("relative isolate flex items-center rounded-full border border-border p-1", className)}>
      {routing.locales.map((loc) => {
        const active = loc === locale;
        return (
          <Link
            key={loc}
            href={pathname}
            locale={loc}
            aria-current={active}
            className={cn(
              "relative isolate px-3 py-1 text-xs font-medium uppercase tracking-wide transition-colors duration-200",
              active ? "font-bold text-[#0b0920]" : "text-ink-muted hover:text-ink"
            )}
          >
            {active && (
              <motion.span
                layoutId={pillId}
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
                className="bg-brand-gradient absolute inset-0 -z-10 rounded-full"
              />
            )}
            {loc}
          </Link>
        );
      })}
    </div>
  );
}
