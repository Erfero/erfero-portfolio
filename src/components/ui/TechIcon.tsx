import { techLogos, type TechKey } from "@/data/techLogos";
import { cn } from "@/lib/utils";

/** Logo officiel d'une technologie (couleur de marque par défaut, ou forcée). */
export default function TechIcon({
  name,
  className,
  color,
}: {
  name: TechKey;
  className?: string;
  /** Force une couleur (sinon la couleur de marque). */
  color?: string;
}) {
  const logo = techLogos[name];
  return (
    <svg
      viewBox="0 0 24 24"
      role="img"
      aria-label={logo.title}
      className={cn("size-6 shrink-0", className)}
      fill={color ?? logo.color}
    >
      <path d={logo.path} />
    </svg>
  );
}

/** Tuile de logo, sobre : logo monochrome (couleur du texte) sur fond neutre.
 * Shopify et Liquid — le cœur du métier — ressortent en vert. */
export function TechTile({
  name,
  size = "md",
  className,
}: {
  name: TechKey;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const core = name === "shopify" || name === "liquid";
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center rounded-2xl border",
        core ? "border-accent/30 bg-accent/10 text-accent" : "border-line bg-ink/[0.05] text-ink",
        size === "lg" ? "size-16 sm:size-20" : size === "sm" ? "size-10 rounded-xl" : "size-12 sm:size-14",
        className
      )}
    >
      <TechIcon
        name={name}
        color="currentColor"
        className={size === "lg" ? "size-8 sm:size-10" : size === "sm" ? "size-5" : "size-6 sm:size-7"}
      />
    </span>
  );
}
