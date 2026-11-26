"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "@/i18n/navigation";
import { ScrollTrigger } from "@/lib/gsap";

/**
 * Fondu entre les pages. Volontairement en opacité seule : une transformation
 * (translate/scale) sur ce conteneur deviendrait le référentiel des éléments
 * `position: fixed` à l'intérieur (épinglage GSAP, lightbox vidéo), qui ne
 * resteraient alors plus fixés à l'écran.
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        // Clé = page seulement (sans la langue) : changer de langue remplace
        // le texte instantanément, sans fondu ni attente.
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        // Court : la page suivante apparaît sans temps mort.
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        // Nouvelle page affichée : toutes les positions des animations au
        // scroll sont recalculées (la hauteur de page a changé).
        onAnimationComplete={() => ScrollTrigger.refresh()}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
