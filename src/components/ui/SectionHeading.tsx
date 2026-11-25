import Reveal from "./Reveal";
import SplitHeading from "./SplitHeading";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  /** Numéro de section affiché devant l'eyebrow (ex. "03"). */
  index?: string;
  size?: "md" | "lg";
}

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
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <Reveal y={12}>
        <span
          className={cn(
            "inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em] text-lime",
            align === "center" && "justify-center"
          )}
        >
          {index && <span className="font-display text-ink-muted/60">{index}</span>}
          <span className="h-px w-8 bg-lime/70" />
          {eyebrow}
        </span>
      </Reveal>
      <SplitHeading
        text={title}
        className={cn(
          "font-display mt-5 font-medium leading-[1.02] tracking-[-0.035em] text-balance",
          size === "lg"
            ? "text-[2.6rem] sm:text-6xl lg:text-7xl"
            : "text-[2.15rem] sm:text-5xl lg:text-[3.6rem]"
        )}
      />
      {subtitle && (
        <Reveal delay={0.15} y={16}>
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
