"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Capture de boutique en deux temps, pour un chargement rapide :
 * - au repos, l'aperçu léger (haut de la boutique, même cadrage que la carte) ;
 * - au premier survol / focus de la carte (.shot-trigger), la capture pleine
 *   page prend le relais et défile (voir .shot-scroll dans globals.css).
 * Le navigateur garde l'aperçu affiché tant que la grande image se charge.
 */
export default function ShotImage({
  preview,
  full,
  alt,
  eager = false,
  className,
}: {
  preview: string;
  full: string;
  alt: string;
  eager?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLImageElement>(null);
  const [wantFull, setWantFull] = useState(false);

  useEffect(() => {
    if (preview === full) return;
    const trigger = ref.current?.closest(".shot-trigger");
    if (!trigger) return;
    const load = () => setWantFull(true);
    trigger.addEventListener("pointerenter", load, { once: true });
    trigger.addEventListener("focusin", load, { once: true });
    return () => {
      trigger.removeEventListener("pointerenter", load);
      trigger.removeEventListener("focusin", load);
    };
  }, [preview, full]);

  return (
    // eslint-disable-next-line @next/next/no-img-element -- captures WebP pré-optimisées
    <img
      ref={ref}
      src={wantFull ? full : preview}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className={className}
    />
  );
}
