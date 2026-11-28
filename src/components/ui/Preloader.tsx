"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { signalIntroDone } from "@/lib/intro";
import { siteConfig } from "@/data/site.config";
import Wordmark from "./Wordmark";
import BrandMark from "./BrandMark";

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
      // Déjà effacé par le filet de sécurité CSS (JS arrivé tard sur une
      // connexion lente) : on ne rejoue pas l'animation, le site s'affiche.
      const hiddenByCss = !!root.current && getComputedStyle(root.current).visibility === "hidden";
      if (seen || hiddenByCss || html.hasAttribute("data-preloaded")) {
        if (hiddenByCss) {
          try {
            sessionStorage.setItem(STORAGE_KEY, "1");
          } catch {}
        }
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
      // Court (~1,3 s) : on montre le site au plus vite.
      tl.from(".pl-word", { yPercent: 110, duration: 0.5, ease: "expo.out", stagger: 0.05 })
        .to(
          progress,
          {
            v: 100,
            duration: 0.65,
            ease: "power2.inOut",
            onUpdate: () => {
              if (counter.current) {
                counter.current.textContent = String(Math.round(progress.v)).padStart(3, "0");
              }
            },
          },
          0
        )
        .to(".pl-bar", { scaleX: 1, duration: 0.65, ease: "power2.inOut" }, 0)
        .to(".pl-word", { yPercent: -110, duration: 0.3, ease: "expo.in", stagger: 0.03 }, ">-0.05")
        .add(signalIntroDone, ">-0.1")
        .to(root.current, { yPercent: -100, duration: 0.6, ease: "expo.inOut" }, "<");
      return release;
    },
    { scope: root }
  );

  if (gone) return null;

  return (
    <div
      ref={root}
      aria-hidden
      className="preloader tone-dark fixed inset-0 z-[100] flex flex-col justify-between p-5 sm:p-10 print:hidden"
    >
      <div className="label-mono flex items-center justify-between text-ink-muted">
        <span className="overflow-hidden">
          <span className="pl-word inline-flex items-center gap-2">
            <BrandMark className="h-[1.15em] text-ink" />
            {siteConfig.name}
          </span>
        </span>
        <span className="overflow-hidden">
          <span className="pl-word inline-block">Portfolio — {new Date().getFullYear()}</span>
        </span>
      </div>

      <div className="flex items-center justify-center">
        {/* Marges internes : rien n'est rogné (ni le point, ni les lettres). */}
        <span className="overflow-hidden px-[0.08em] pb-[0.12em] pt-[0.04em] text-[18vw] sm:text-[11vw]">
          <span className="pl-word inline-block">
            <Wordmark className="leading-[0.95] tracking-[-0.02em]" />
          </span>
        </span>
      </div>

      <div>
        <div className="flex items-end justify-between gap-6">
          <span className="overflow-hidden">
            <span className="pl-word inline-block max-w-[16rem] text-xs leading-relaxed text-ink-muted sm:text-sm">
              {role}
            </span>
          </span>
          <span
            ref={counter}
            className="font-mono text-4xl font-medium tabular-nums tracking-tight text-ink sm:text-6xl"
          >
            000
          </span>
        </div>
        <div className="mt-5 h-px w-full bg-line">
          <div className="pl-bar h-full w-full origin-left scale-x-0 bg-accent" />
        </div>
      </div>
    </div>
  );
}
