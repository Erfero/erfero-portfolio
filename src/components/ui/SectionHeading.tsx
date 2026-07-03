import Reveal from "./Reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-lime">
        <span className="h-px w-6 bg-lime" />
        {eyebrow}
      </span>
      <h2 className="font-display mt-4 text-3xl font-medium leading-tight tracking-tight sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base text-ink-muted sm:text-lg">{subtitle}</p>
      )}
    </Reveal>
  );
}
