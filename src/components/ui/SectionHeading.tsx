import Reveal from "./Reveal";
import SplitHeading from "./SplitHeading";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  /** Numéro de section (ex. "03"), en serif italique vert. */
  index?: string;
  size?: "md" | "lg";
  /** "split" : numéro + intitulé à gauche, grand titre à droite (éditorial).
   *  "stack" : tout empilé (colonnes étroites). */
  layout?: "split" | "stack";
}

/** En-tête de section éditorial : petit numéro en serif italique + intitulé,
 * grand titre serif dont les mots clés `*...*` passent en italique vert, et
 * sous-titre bien lisible. */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
  index,
  size = "md",
  layout = "stack",
}: SectionHeadingProps) {
  const label = (
    <Reveal y={12}>
      <p className={cn("flex items-baseline gap-3", align === "center" && "justify-center")}>
        {index && <span className="font-serif text-2xl italic leading-none text-accent">{index}</span>}
        <span className="text-xs font-medium uppercase tracking-[0.16em] text-ink-muted">{eyebrow}</span>
      </p>
    </Reveal>
  );
  const heading = (
    <>
      <SplitHeading
        text={title}
        className={cn(
          "font-serif font-normal leading-[1] tracking-[-0.015em] text-balance",
          layout === "stack" && "mt-5",
          size === "lg" ? "text-[2.9rem] sm:text-[4.4rem] lg:text-[5.6rem]" : "text-[2.6rem] sm:text-6xl lg:text-[4.6rem]"
        )}
      />
      {subtitle && (
        <Reveal delay={0.12} y={16}>
          <p
            className={cn(
              "mt-6 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg",
              align === "center" && "mx-auto"
            )}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </>
  );

  if (layout === "split") {
    return (
      <div className={cn("grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,2.6fr)] md:gap-10", className)}>
        <div className="md:pt-4">{label}</div>
        <div className="max-w-4xl">{heading}</div>
      </div>
    );
  }

  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {label}
      {heading}
    </div>
  );
}
