import { ArrowUpRight, Lock } from "lucide-react";
import type { ProjectCard } from "@/lib/projectMedia";
import { projectHost, projectShot, projectTop } from "@/lib/projectMedia";
import ShotImage from "./ShotImage";
import { cn } from "@/lib/utils";

/**
 * Carte de boutique : un cadre de navigateur avec la capture pleine page qui
 * défile lentement au survol (CSS pur, voir .shot-scroll), et toute la carte
 * est un lien vers la vraie boutique, ouverte dans un nouvel onglet.
 */
export default function ShopCard({
  project,
  locale,
  nicheLabel,
  visitLabel,
  index,
  size = "md",
  className,
  eager = false,
}: {
  project: ProjectCard;
  locale: "fr" | "en";
  nicheLabel?: string;
  visitLabel: string;
  index?: number;
  size?: "md" | "lg";
  className?: string;
  eager?: boolean;
}) {
  const host = projectHost(project);
  const name = project.name[locale];

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor={visitLabel}
      aria-label={`${name} — ${visitLabel} (${host})`}
      className={cn("shot-trigger group block", className)}
    >
      <div className="relative overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_26px_60px_-40px_rgba(14,19,17,0.45)] transition-[border-color,box-shadow,transform] duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-1.5 group-hover:border-ink/30 group-hover:shadow-[0_40px_80px_-40px_rgba(14,19,17,0.55)]">
        <div className="flex h-9 items-center gap-2 border-b border-line bg-bg-soft px-3.5">
          <span className="flex gap-1.5" aria-hidden>
            <span className="size-2.5 rounded-full bg-ink/15" />
            <span className="size-2.5 rounded-full bg-ink/15" />
            <span className="size-2.5 rounded-full bg-ink/15" />
          </span>
          <span className="mx-auto flex min-w-0 max-w-[62%] items-center gap-1.5 rounded-md bg-ink/[0.06] px-3 py-0.5 font-mono text-[11px] text-ink-muted">
            <Lock className="size-3 shrink-0 text-success" aria-hidden />
            <span className="truncate">{host}</span>
          </span>
          <ArrowUpRight className="size-4 text-ink-muted transition-colors group-hover:text-ink" aria-hidden />
        </div>
        <div className={"relative aspect-[16/10] overflow-hidden bg-bg-soft"}>
          <ShotImage
            preview={projectTop(project)}
            full={projectShot(project)}
            alt={`${name} — boutique Shopify`}
            eager={eager}
            className="shot-scroll absolute inset-0 size-full"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/35 to-transparent transition-opacity duration-500 group-hover:opacity-0" />
          {nicheLabel && (
            <span className="absolute left-3 top-3 rounded-full bg-[#0e1311]/75 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
              {nicheLabel}
            </span>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-baseline gap-3">
            {typeof index === "number" && (
              <span className="font-mono text-sm font-medium tabular-nums text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
            )}
            <h3
              className={cn(
                "font-display truncate font-semibold tracking-[-0.03em]",
                size === "lg" ? "text-2xl sm:text-3xl" : "text-xl"
              )}
            >
              {name}
            </h3>
          </div>
          <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-ink-muted">{project.tagline[locale]}</p>
        </div>
        <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line transition-all duration-500 group-hover:rotate-45 group-hover:border-transparent group-hover:bg-ink group-hover:text-bg">
          <ArrowUpRight className="size-4" aria-hidden />
        </span>
      </div>
    </a>
  );
}
