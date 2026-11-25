"use client";

import { useEffect } from "react";

/**
 * Un seul écouteur pour tout le site : sous la souris, la carte `.spotlight`
 * la plus proche reçoit la position du pointeur (--mx / --my), utilisée par
 * le CSS pour son halo et sa bordure lumineuse. Aucun travail si la souris
 * n'est pas au-dessus d'une carte.
 */
export default function SpotlightTracker() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let frame = 0;
    let last: PointerEvent | null = null;
    const apply = () => {
      frame = 0;
      const e = last;
      if (!e) return;
      const card = (e.target as HTMLElement | null)?.closest<HTMLElement>(".spotlight");
      if (!card) return;
      const box = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - box.left}px`);
      card.style.setProperty("--my", `${e.clientY - box.top}px`);
    };
    const onMove = (e: PointerEvent) => {
      last = e;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);
  return null;
}
