import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site.config";

/**
 * Logo texte « Erfero. » : le point est un vrai disque vert (et non le
 * caractère « . »), dimensionné en em — il suit la taille du texte et ne
 * peut jamais être rogné, quelle que soit la police ou l'interlettrage.
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
    <span className={cn("inline-flex items-baseline whitespace-nowrap", className)}>
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
          "ml-[0.05em] inline-block size-[0.17em] shrink-0 rounded-full bg-accent",
          letterClassName,
          dotClassName
        )}
      />
    </span>
  );
}
