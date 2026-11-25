"use client";

import { useSyncExternalStore } from "react";

/** Abonnement à une media query, sans setState dans un effet. Côté serveur
 * (et au premier rendu d'hydratation) la valeur vaut `serverValue`. */
export function useMediaQuery(query: string, serverValue = false): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => serverValue
  );
}
