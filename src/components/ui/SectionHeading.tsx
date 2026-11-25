import Reveal from "./Reveal";
import SplitHeading from "./SplitHeading";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  /** Numéro de section (ex. "03"), affiché en vert devant l'intitulé. */
  index?: string;
  size?: "md" | "lg";
}

/** En-tête de section éditorial : numéro + intitulé en petites capitales
 * « code », grand titre dont les mots clés `*...*` passent en serif italique
 * vert, et sous-titre bien lisible. */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
  index,
  size = "md",
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <Reveal y={12}>
        <p className={cn("label-mono flex items-center gap-3", align === "center" && "justify-center")}>
          {index && <span className="font-semibold text-accent">{index}</span>}
          <span aria-hidden className="h-px w-8 bg-ink/30" />
          <span className="text-ink-muted">{eyebrow}</span>
        </p>
      </Reveal>
      <SplitHeading
        text={title}
        className={cn(
          "font-display mt-5 font-semibold leading-[1.03] tracking-[-0.04em] text-balance",
          size === "lg" ? "text-[2.6rem] sm:text-6xl lg:text-[4.6rem]" : "text-[2.25rem] sm:text-5xl lg:text-[3.7rem]"
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
    </div>
  );
}
