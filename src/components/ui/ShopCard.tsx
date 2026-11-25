import { ArrowUpRight } from "lucide-react";
import type { ProjectCard } from "@/lib/projectMedia";
import { projectHost, projectShot } from "@/lib/projectMedia";
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
      style={{ "--accent": project.accent } as React.CSSProperties}
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-surface shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)] transition-[border-color,box-shadow,transform] duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-1 group-hover:border-[color-mix(in_srgb,var(--accent)_55%,transparent)] group-hover:shadow-[0_40px_90px_-40px_var(--accent)]">
        <div className="flex h-8 items-center gap-2 border-b border-white/[0.07] bg-[#0d0f12] px-3 sm:h-9">
          <span className="flex gap-1.5" aria-hidden>
            <span className="size-2 rounded-full bg-white/15" />
            <span className="size-2 rounded-full bg-white/15" />
            <span className="size-2 rounded-full bg-white/15" />
          </span>
          <span className="mx-auto max-w-[70%] truncate rounded-md bg-white/[0.05] px-3 py-0.5 text-[10px] text-ink-muted sm:text-[11px]">
            {host}
          </span>
          <ArrowUpRight className="size-3.5 text-ink-muted transition-colors group-hover:text-lime" aria-hidden />
        </div>
        <div className={cn("relative overflow-hidden bg-[#0d0f12]", size === "lg" ? "aspect-[16/10]" : "aspect-[4/3]")}>
          {/* eslint-disable-next-line @next/next/no-img-element -- captures déjà optimisées (WebP) */}
          <img
            src={projectShot(project)}
            alt={`${name} — boutique Shopify`}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            className="shot-scroll absolute inset-0 size-full"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/45 to-transparent opacity-100 transition-opacity duration-500 group-hover:opacity-0" />
        </div>
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-baseline gap-3">
            {typeof index === "number" && (
              <span className="font-display text-xs tabular-nums text-ink-muted/60">
                {String(index + 1).padStart(2, "0")}
              </span>
            )}
            <h3
              className={cn(
                "font-display truncate font-medium tracking-tight",
                size === "lg" ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl"
              )}
            >
              {name}
            </h3>
          </div>
          <p className="mt-1 truncate text-sm text-ink-muted">
            {nicheLabel ? <span className="text-ink/80">{nicheLabel}</span> : null}
            {nicheLabel ? " · " : null}
            {project.tagline[locale]}
          </p>
        </div>
        <span className="grid size-10 shrink-0 place-items-center rounded-full border border-white/10 text-ink transition-all duration-500 group-hover:rotate-45 group-hover:border-lime group-hover:bg-lime group-hover:text-bg">
          <ArrowUpRight className="size-4" aria-hidden />
        </span>
      </div>
    </a>
  );
}
