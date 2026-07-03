"use client";

import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export default function LocaleSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "relative flex items-center rounded-full border border-border p-1",
        className
      )}
    >
      {routing.locales.map((loc) => {
        const active = loc === locale;
        return (
          <Link
            key={loc}
            href={pathname}
            locale={loc}
            aria-current={active}
            className={cn(
              "relative z-10 px-3 py-1 text-xs font-medium uppercase tracking-wide transition-colors duration-200",
              active ? "text-bg" : "text-ink-muted hover:text-ink"
            )}
          >
            {loc}
            {active && (
              <motion.span
                layoutId="locale-pill"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
                className="absolute inset-0 -z-10 rounded-full bg-lime"
              />
            )}
          </Link>
        );
      })}
    </div>
  );
}
