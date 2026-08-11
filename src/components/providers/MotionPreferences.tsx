"use client";

// Sans ça, chaque animation Framer Motion du site (Reveal, hovers, Hero...) ignore la préférence
// système "réduire les animations" — seul Hero.tsx la respectait, ponctuellement, via son propre
// useReducedMotion(). reducedMotion="user" applique le réglage à toutes les animations du site en
// un seul endroit, sans toucher chaque composant individuellement.

import { MotionConfig } from "framer-motion";

export default function MotionPreferences({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
