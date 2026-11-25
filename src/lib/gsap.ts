"use client";

// Point d'entrée unique de GSAP côté client : les plugins sont enregistrés une
// seule fois ici, et tous les composants importent gsap/ScrollTrigger/SplitText
// depuis ce fichier (jamais directement depuis "gsap/..."), ce qui garantit que
// l'enregistrement a bien eu lieu avant la première animation.

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
  gsap.defaults({ ease: "power3.out", duration: 0.9 });
}

/** Courbe "expo" douce utilisée partout pour les apparitions. */
export const EASE_OUT = "expo.out";

/** Requête média partagée : animations complètes uniquement si l'utilisateur
 * n'a pas demandé à réduire les animations. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

export { gsap, ScrollTrigger, SplitText, useGSAP };
