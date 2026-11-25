"use client";

import { useLocale } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "@/i18n/navigation";

/**
 * Fondu entre les pages. Volontairement en opacité seule : une transformation
 * (translate/scale) sur ce conteneur deviendrait le référentiel des éléments
 * `position: fixed` à l'intérieur (épinglage GSAP, lightbox vidéo), qui ne
 * resteraient alors plus fixés à l'écran.
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={`${locale}-${pathname}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
