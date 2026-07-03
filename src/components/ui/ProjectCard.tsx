import { useTranslations } from "next-intl";
import { ArrowUpRight, Lock, Clock } from "lucide-react";
import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  const t = useTranslations("projects");
  const item = t.raw(`items.${project.id}`) as {
    name: string;
    tagline: string;
    description: string;
    tags: string[];
  };
  const badgeLabel = t(`badges.${project.status}`);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-bg-soft">
      <div
        className="relative flex aspect-[4/5] items-end p-5"
        style={{
          background: `radial-gradient(120% 100% at 20% 0%, ${project.accent}33, transparent 60%), linear-gradient(160deg, ${project.accent}22, #0c0e11 70%)`,
        }}
      >
        <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/30 px-3 py-1 text-[11px] font-medium text-ink backdrop-blur">
          {project.status !== "live" &&
            (project.status === "password-protected" ? (
              <Lock className="size-3" />
            ) : (
              <Clock className="size-3" />
            ))}
          {badgeLabel}
        </span>

        <h3 className="font-display text-3xl font-semibold text-white/90 mix-blend-plus-lighter">
          {item.name}
        </h3>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm font-medium text-lime">{item.tagline}</p>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">
          {item.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border px-2.5 py-1 text-[11px] text-ink-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
          {project.status === "live" ? (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="group/link inline-flex items-center gap-1 text-sm font-medium text-ink hover:text-lime"
            >
              {t("viewLive")}
              <ArrowUpRight className="size-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </a>
          ) : (
            <span className="text-sm text-ink-muted/60">
              {project.status === "password-protected"
                ? t("viewLiveDisabled")
                : t("comingSoon")}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
