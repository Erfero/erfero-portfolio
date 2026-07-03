"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// GSAP/ScrollTrigger étaient importés ici sans qu'aucun ScrollTrigger ne soit
// jamais créé ailleurs dans le code — du poids mort au chargement (JS parsé/
// exécuté pour rien) qui ralentissait le site sans apporter aucune animation.
// Toutes les animations au scroll passent par framer-motion (voir Reveal.tsx).
export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let frame: number;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
