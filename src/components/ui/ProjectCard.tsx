"use client";

import { useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import type { VideoEntry } from "@/data/videos";
import { getScreenshotUrl } from "@/lib/screenshot";

export default function ProjectCard({
  project,
  relatedVideo,
  thumbWidth = 900,
  thumbHeight = 1400,
}: {
  project: Project;
  relatedVideo?: VideoEntry;
  /** Réduit la taille demandée à thum.io pour les cartes plus petites
   * (carrousels), afin d'alléger le poids réseau/décodage quand des dizaines
   * de cartes sont affichées en même temps. */
  thumbWidth?: number;
  thumbHeight?: number;
}) {
  const t = useTranslations("projects");
  const locale = useLocale() as "fr" | "en";
  const item = {
    name: project.name[locale],
    tagline: project.tagline[locale],
    description: project.description[locale],
    tags: project.tags[locale],
  };

  const ref = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 200, damping: 32 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 32 });
  const glowX = useTransform(springY, [-4, 4], [0, 100]);
  const glowY = useTransform(springX, [4, -4], [0, 100]);

  // Tilt volontairement discret (±4°) : un effet trop marqué déplace le
  // bouton "Voir la boutique" sous le curseur et le rend difficile à cliquer.
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * 8);
    rotateX.set((0.5 - py) * 8);
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
    setHovering(false);
  };

  return (
    <motion.article
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={reset}
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 1000 }}
      animate={{
        borderColor: hovering ? project.accent : "var(--color-border)",
        boxShadow: hovering
          ? `0 0 0 1px ${project.accent}55, 0 24px 60px -20px ${project.accent}66`
          : "0 0 0 0px transparent, 0 0px 0px 0px transparent",
      }}
      transition={{ duration: 0.35 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-bg-soft"
    >
      <a
        href={project.url}
        target="_blank"
        rel="noreferrer"
        className="relative block aspect-[4/3] overflow-hidden"
      >
        <motion.img
          src={
            project.thumbnailOverride ||
            getScreenshotUrl(project.url, thumbWidth, thumbHeight)
          }
          alt={item.name}
          loading="lazy"
          animate={{ scale: hovering && !relatedVideo ? 1.06 : 1 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 size-full object-cover object-top"
        />

        {relatedVideo && (
          <motion.video
            src={relatedVideo.src}
            muted
            loop
            playsInline
            preload="none"
            animate={{ opacity: hovering ? 1 : 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 size-full object-cover"
            ref={(el) => {
              if (!el) return;
              if (hovering) el.play().catch(() => {});
              else el.pause();
            }}
          />
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

        <motion.div
          aria-hidden
          style={{
            background: `radial-gradient(320px circle at ${glowX}% ${glowY}%, ${project.accent}33, transparent 70%)`,
          }}
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />

        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/30 px-3 py-1 text-[11px] font-medium text-ink backdrop-blur">
          {t("badges.live")}
        </span>

        <h3 className="absolute bottom-3 left-3 right-3 font-display text-lg font-semibold text-white drop-shadow-sm sm:bottom-4 sm:left-4 sm:right-4 sm:text-2xl">
          {item.name}
        </h3>
      </a>

      <div className="flex flex-1 flex-col p-4 sm:p-6">
        <p className="text-sm font-medium text-lime">{item.tagline}</p>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-muted sm:line-clamp-none">
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

        <div className="mt-4 flex items-center justify-between border-t border-border pt-3 sm:mt-5 sm:pt-4">
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="group/link inline-flex items-center gap-1 text-sm font-medium text-ink hover:text-lime"
          >
            {t("viewLive")}
            <ArrowUpRight className="size-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}
