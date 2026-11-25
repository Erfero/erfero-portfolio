"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Défilement fluide (inertie douce) à la molette, synchronisé avec GSAP
 * ScrollTrigger. Activé seulement à la souris et si l'utilisateur n'a pas
 * demandé à réduire les animations : au doigt, le défilement natif reste.
 *
 * Tant qu'un verrou de défilement est posé sur <html> (préchargeur, menu
 * mobile), Lenis est mis en pause pour ne jamais faire défiler la page
 * cachée dessous.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const ok = window.matchMedia(
      "(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)"
    ).matches;
    if (!ok) return;

    const lenis = new Lenis({
      lerp: 0.12,
      smoothWheel: true,
      anchors: true,
      prevent: (node) => !!node.closest?.("[data-lenis-prevent], [role='dialog']"),
    });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const html = document.documentElement;
    const sync = () => {
      if (html.style.overflow === "hidden") lenis.stop();
      else lenis.start();
    };
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(html, { attributes: true, attributeFilter: ["style"] });

    return () => {
      observer.disconnect();
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return null;
}
