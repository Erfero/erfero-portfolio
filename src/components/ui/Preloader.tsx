"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { signalIntroDone } from "@/lib/intro";
import { siteConfig } from "@/data/site.config";

const STORAGE_KEY = "erfero-preloaded";

/**
 * Rideau d'ouverture : compteur 0 → 100 puis le rideau se lève sur le site.
 * Affiché uniquement à la première visite de la session (voir le script
 * inline du root layout qui le masque avant même le premier rendu sinon) et
 * volontairement court (~1,6 s) : un recruteur ne doit jamais attendre.
 */
export default function Preloader({ role }: { role: string }) {
  const root = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const [gone, setGone] = useState(false);

  useGSAP(
    () => {
      const html = document.documentElement;
      let seen = false;
      try {
        seen = !!sessionStorage.getItem(STORAGE_KEY);
      } catch {
        // stockage indisponible (navigation privée stricte) : on l'affiche
      }
      if (seen || html.hasAttribute("data-preloaded")) {
        setGone(true);
        signalIntroDone();
        return;
      }
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const prevOverflow = html.style.overflow;
      html.style.overflow = "hidden";

      const finish = () => {
        html.style.overflow = prevOverflow;
        // Marqué « vu » seulement une fois l'animation réellement terminée :
        // si elle est interrompue (remontage du composant), elle rejouera.
        try {
          sessionStorage.setItem(STORAGE_KEY, "1");
        } catch {}
        setGone(true);
        // La barre de défilement réapparaît : on recalcule les positions des
        // déclencheurs au scroll (sections épinglées, révélations...).
        requestAnimationFrame(() => ScrollTrigger.refresh());
      };

      // Nettoyage (démontage ou ré-exécution) : on ne laisse jamais la page
      // bloquée sans défilement.
      const release = () => {
        html.style.overflow = prevOverflow;
      };

      if (reduced) {
        gsap.to(root.current, {
          autoAlpha: 0,
          duration: 0.3,
          delay: 0.2,
          onStart: signalIntroDone,
          onComplete: finish,
        });
        return release;
      }

      const progress = { v: 0 };
      const tl = gsap.timeline({ onComplete: finish });
      tl.from(".pl-word", { yPercent: 110, duration: 0.8, ease: "expo.out", stagger: 0.06 })
        .to(
          progress,
          {
            v: 100,
            duration: 1.1,
            ease: "power2.inOut",
            onUpdate: () => {
              if (counter.current) {
                counter.current.textContent = String(Math.round(progress.v)).padStart(3, "0");
              }
            },
          },
          0
        )
        .to(".pl-bar", { scaleX: 1, duration: 1.1, ease: "power2.inOut" }, 0)
        .to(".pl-word", { yPercent: -110, duration: 0.5, ease: "expo.in", stagger: 0.03 }, ">-0.05")
        .add(signalIntroDone, ">-0.15")
        .to(root.current, { yPercent: -100, duration: 0.9, ease: "expo.inOut" }, "<");
      return release;
    },
    { scope: root }
  );

  if (gone) return null;

  return (
    <div
      ref={root}
      aria-hidden
      className="preloader fixed inset-0 z-[100] flex flex-col justify-between bg-bg bg-[radial-gradient(ellipse_70%_50%_at_50%_45%,rgba(109,77,255,0.35),transparent_70%)] p-5 text-ink sm:p-10 print:hidden"
    >
      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.25em] text-ink-muted">
        <span className="overflow-hidden">
          <span className="pl-word inline-block">{siteConfig.name}</span>
        </span>
        <span className="overflow-hidden">
          <span className="pl-word inline-block">Portfolio — {new Date().getFullYear()}</span>
        </span>
      </div>

      <div className="flex items-center justify-center">
        <span className="overflow-hidden pb-2">
          <span className="pl-word font-display inline-block text-[18vw] font-extrabold leading-[0.85] tracking-[-0.05em] sm:text-[11vw]">
            {siteConfig.shortName}
            <span className="text-gradient">.</span>
          </span>
        </span>
      </div>

      <div>
        <div className="flex items-end justify-between gap-6">
          <span className="overflow-hidden">
            <span className="pl-word inline-block max-w-[14rem] text-xs leading-relaxed text-ink-muted sm:text-sm">
              {role}
            </span>
          </span>
          <span
            ref={counter}
            className="text-gradient font-display text-5xl font-extrabold tabular-nums tracking-tight sm:text-7xl"
          >
            000
          </span>
        </div>
        <div className="mt-5 h-px w-full bg-border">
          <div className="pl-bar bg-brand-gradient h-full w-full origin-left scale-x-0" />
        </div>
      </div>
    </div>
  );
}
