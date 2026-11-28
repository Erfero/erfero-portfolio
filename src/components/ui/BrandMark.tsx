import { cn } from "@/lib/utils";

/**
 * Symbole « balise » : le E (cadre, couleur du texte) et les branches du K qui
 * forment le chevron « < » du code (couleur d'accent du ton courant). Cadré
 * au plus près du dessin : sa hauteur suit `className` (1em par défaut).
 * Fichiers complets (fond, PNG) : public/brand/.
 */
export default function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="131 123 250 266"
      aria-hidden
      className={cn("h-[1em] w-auto shrink-0", className)}
      fill="none"
      strokeWidth={38}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M362 142H150V370H362" stroke="currentColor" />
      <path d="M362 206L150 256L362 306" stroke="var(--color-accent)" />
    </svg>
  );
}
