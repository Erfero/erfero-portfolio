import { cn } from "@/lib/utils";

// Géométrie du sceau (repère 100 × 100), reprise du dessin de public/brand/.
const R = 38.28; // ligne de base du texte circulaire
const RING = `M50 ${50 - R} a${R} ${R} 0 1 1 0 ${2 * R} a${R} ${R} 0 1 1 0 ${-2 * R}`;
const TEXT_LENGTH = (2 * Math.PI * R).toFixed(1); // le texte fait exactement le tour

/**
 * Sceau : nom et métier en cercle autour de « EK. » (initiales en serif,
 * point en couleur). Décoratif (le nom figure ailleurs sur la page). Taille,
 * couleurs et fond se règlent par `className` ; `spin` fait tourner lentement
 * l'anneau de texte, jamais les initiales.
 */
export default function Seal({
  label,
  className,
  dotClassName = "bg-accent",
  spin = false,
}: {
  /** Texte de l'anneau, en capitales, terminé par « • ». */
  label: string;
  className?: string;
  dotClassName?: string;
  spin?: boolean;
}) {
  const id = `seal-${label.length}-${spin ? "s" : "f"}`;
  return (
    <span aria-hidden className={cn("relative block aspect-square [container-type:inline-size]", className)}>
      <svg viewBox="0 0 100 100" className={cn("absolute inset-0 size-full", spin && "spin-seal")}>
        <defs>
          <path id={id} d={RING} />
        </defs>
        <circle cx="50" cy="50" r="29.3" fill="none" stroke="currentColor" strokeOpacity="0.3" strokeWidth="0.4" />
        <text className="fill-current font-mono text-[5.86px] font-medium">
          <textPath href={`#${id}`} textLength={TEXT_LENGTH} lengthAdjust="spacing">
            {label}
          </textPath>
        </text>
      </svg>
      <span className="absolute inset-0 grid place-items-center">
        <span className="inline-flex items-baseline font-serif text-[37cqw] leading-none tracking-[-0.02em]">
          EK
          <span className={cn("ml-[0.04em] inline-block size-[0.15em] rounded-full", dotClassName)} />
        </span>
      </span>
    </span>
  );
}

/** Texte de l'anneau pour une langue : « ERFERO KEOULA • DÉVELOPPEUR SHOPIFY • ». */
export function sealLabel(name: string, role: string) {
  // Espaces insécables : en SVG, l'espace final serait supprimé et le dernier
  // « • » viendrait se coller au début de l'anneau.
  return `${name} • ${role} • `.toUpperCase().replace(/ /g, "\u00a0");
}
