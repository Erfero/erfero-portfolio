"use client";

// Coordination préchargeur -> animations d'entrée : le Hero ne lance son
// intro qu'une fois le rideau du préchargeur en train de se lever (ou tout de
// suite si le préchargeur a déjà été vu dans cette session).

const EVENT = "erfero:intro";

declare global {
  interface Window {
    __erferoIntroDone?: boolean;
  }
}

export function signalIntroDone() {
  if (typeof window === "undefined") return;
  window.__erferoIntroDone = true;
  window.dispatchEvent(new Event(EVENT));
}

/** Appelle `cb` dès que l'intro peut démarrer. Retourne une fonction de
 * nettoyage. Filet de sécurité : démarre quoi qu'il arrive après 3,5 s. */
export function onIntroReady(cb: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  if (
    window.__erferoIntroDone ||
    document.documentElement.hasAttribute("data-preloaded")
  ) {
    cb();
    return () => {};
  }
  let done = false;
  const run = () => {
    if (done) return;
    done = true;
    cb();
  };
  window.addEventListener(EVENT, run, { once: true });
  const timer = window.setTimeout(run, 3500);
  return () => {
    window.removeEventListener(EVENT, run);
    window.clearTimeout(timer);
  };
}
