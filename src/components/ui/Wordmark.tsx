import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site.config";

/**
 * Logo texte « Erfero. » en serif : le point est un vrai disque (couleur
 * d'accent du ton courant) et non le caractère « . », dimensionné en em — il
 * suit la taille du texte et ne peut jamais être rogné.
 */
export default function Wordmark({
  className,
  letterClassName,
  dotClassName,
  split = false,
}: {
  className?: string;
  /** Classe ajoutée à chaque lettre (animations lettre par lettre). */
  letterClassName?: string;
  dotClassName?: string;
  /** Une <span> par lettre (pour les animations), sinon un seul bloc. */
  split?: boolean;
}) {
  const name = siteConfig.shortName;
  return (
    <span className={cn("inline-flex items-baseline whitespace-nowrap font-serif font-normal", className)}>
      {split ? (
        name.split("").map((ch, i) => (
          <span key={i} className={cn("inline-block", letterClassName)}>
            {ch}
          </span>
        ))
      ) : (
        <span>{name}</span>
      )}
      <span
        aria-hidden
        className={cn(
          "ml-[0.04em] inline-block size-[0.15em] shrink-0 rounded-full bg-accent",
          letterClassName,
          dotClassName
        )}
      />
    </span>
  );
}
