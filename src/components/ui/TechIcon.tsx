import { techLogos, type TechKey } from "@/data/techLogos";
import { cn } from "@/lib/utils";

/** Logo officiel d'une technologie, dans sa couleur de marque. */
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

/** Tuile de logo : fond teinté de la couleur de marque + halo au survol. */
export function TechTile({
  name,
  size = "md",
  className,
}: {
  name: TechKey;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const logo = techLogos[name];
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center rounded-2xl border transition-[transform,box-shadow] duration-500 ease-[var(--ease-out-expo)]",
        size === "lg" ? "size-16 sm:size-20" : size === "sm" ? "size-10 rounded-xl" : "size-12 sm:size-14",
        className
      )}
      style={{
        background: `linear-gradient(145deg, ${logo.color}2e, ${logo.color}0d)`,
        borderColor: `${logo.color}40`,
        boxShadow: `0 10px 30px -14px ${logo.color}99`,
      }}
    >
      <TechIcon
        name={name}
        className={size === "lg" ? "size-8 sm:size-10" : size === "sm" ? "size-5" : "size-6 sm:size-7"}
      />
    </span>
  );
}
