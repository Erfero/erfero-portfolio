"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useMediaQuery } from "@/lib/useMediaQuery";

/**
 * Curseur personnalisé (souris uniquement, désactivé au tactile et en
 * "mouvement réduit") : un point qui suit la souris avec inertie, qui grossit
 * sur les liens/boutons et affiche une étiquette sur les éléments marqués
 * `data-cursor="Texte"` (ex. "Visiter" sur les cartes de boutiques).
 *
 * Positions via gsap.quickTo (une seule écriture par frame, transform
 * uniquement) et détection de survol par délégation sur mouseover : aucun
 * travail coûteux sur chaque mousemove.
 */
export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const enabled = useMediaQuery(
    "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)"
  );

  useEffect(() => {
    if (!enabled || !dot.current) return;
    const el = dot.current;
    gsap.set(el, { xPercent: -50, yPercent: -50, x: -100, y: -100 });
    const xTo = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3" });

    let mode: "default" | "hover" | "label" = "default";
    const setMode = (next: typeof mode, text = "") => {
      if (next === mode && next !== "label") return;
      mode = next;
      if (labelRef.current) labelRef.current.textContent = text;
      gsap.to(el, {
        width: next === "label" ? 92 : next === "hover" ? 44 : 12,
        height: next === "label" ? 92 : next === "hover" ? 44 : 12,
        backgroundColor: next === "hover" ? "rgba(255,111,208,0.12)" : next === "label" ? "rgb(255,255,255)" : "rgb(255,111,208)",
        borderColor: next === "hover" ? "rgba(255,111,208,0.8)" : "rgba(255,111,208,0)",
        duration: 0.35,
        ease: "power3.out",
        overwrite: "auto",
      });
      gsap.to(labelRef.current, { autoAlpha: next === "label" ? 1 : 0, duration: 0.2 });
    };

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const labelled = target?.closest<HTMLElement>("[data-cursor]");
      if (labelled) {
        setMode("label", labelled.dataset.cursor ?? "");
        return;
      }
      if (target?.closest("a, button, [role='button'], input, textarea, select, label")) {
        setMode("hover");
        return;
      }
      setMode("default");
    };
    const onLeave = () => gsap.to(el, { autoAlpha: 0, duration: 0.2 });
    const onEnter = () => gsap.to(el, { autoAlpha: 1, duration: 0.2 });

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={dot}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[90] grid size-3 place-items-center rounded-full border border-transparent bg-pink shadow-[0_10px_40px_-6px_rgba(255,111,208,0.7)] print:hidden"
    >
      <span
        ref={labelRef}
        className="invisible text-[11px] font-bold uppercase tracking-wider text-[#0b0920] opacity-0"
      />
    </div>
  );
}
