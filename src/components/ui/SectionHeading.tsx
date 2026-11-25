import Reveal from "./Reveal";
import SplitHeading from "./SplitHeading";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  /** Numéro de section affiché dans la pastille (ex. "03"). */
  index?: string;
  size?: "md" | "lg";
}

/** En-tête de section : pastille (numéro + intitulé), grand titre dont les
 * mots clés `*...*` passent en dégradé, et sous-titre bien lisible. */
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
        <span className="glass inline-flex items-center gap-2.5 rounded-full py-1.5 pl-2 pr-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink sm:text-xs">
          {index ? (
            <span className="bg-brand-gradient font-display grid h-6 min-w-6 place-items-center rounded-full px-1.5 text-[11px] tracking-normal text-[#0b0920]">
              {index}
            </span>
          ) : (
            <span className="bg-brand-gradient ml-1 size-2 rounded-full" />
          )}
          {eyebrow}
        </span>
      </Reveal>
      <SplitHeading
        text={title}
        className={cn(
          "font-display mt-6 font-bold leading-[1.02] tracking-[-0.035em] text-balance",
          size === "lg" ? "text-[2.6rem] sm:text-6xl lg:text-7xl" : "text-[2.2rem] sm:text-5xl lg:text-[3.6rem]"
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
