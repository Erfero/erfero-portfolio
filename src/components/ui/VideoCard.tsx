"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import type { VideoEntry } from "@/data/videos";

/**
 * Vidéo en format téléphone pour le mur de vidéos : l'affiche s'affiche
 * d'abord, l'aperçu muet se lance au survol (souris) et un clic ouvre la
 * vidéo en grand avec sa musique.
 */
export default function VideoCard({
  video,
  caption,
  onOpen,
  cursorLabel,
}: {
  video: VideoEntry;
  caption: string;
  onOpen: () => void;
  cursorLabel: string;
}) {
  const [preview, setPreview] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !preview) return;
    el.muted = true;
    el.play().catch(() => {});
    return () => el.pause();
  }, [preview]);

  return (
    <button
      type="button"
      onClick={onOpen}
      onMouseEnter={() => setPreview(true)}
      onMouseLeave={() => setPreview(false)}
      data-cursor={cursorLabel}
      aria-label={`${caption} — ${cursorLabel}`}
      className="group relative block w-full rounded-[2rem] border border-black/10 bg-[#0e1311] p-1.5 text-left shadow-[0_30px_60px_-34px_rgba(14,19,17,0.75)] transition-[transform,box-shadow] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-2 hover:shadow-[0_40px_70px_-30px_rgba(14,19,17,0.8)]"
    >
      <span aria-hidden className="absolute left-1/2 top-3 z-10 h-1 w-10 -translate-x-1/2 rounded-full bg-black/80" />
      <span
        className="relative block aspect-[9/16] overflow-hidden rounded-[1.6rem] bg-[#18201c]"
      >
        {video.poster && (
          // eslint-disable-next-line @next/next/no-img-element -- affiches JPEG légères
          <img
            src={video.poster}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105"
          />
        )}
        {preview && (
          <video
            ref={ref}
            src={video.src}
            poster={video.poster}
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 size-full object-cover"
          />
        )}
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <span className="absolute left-1/2 top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-white/15 text-white backdrop-blur-md transition-all duration-500 group-hover:scale-110 group-hover:bg-white group-hover:text-[#0e1311]">
          <Play className="size-5 translate-x-px fill-current" />
        </span>
        <span className="absolute inset-x-3 bottom-3 line-clamp-2 text-sm font-semibold leading-snug text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
          {caption}
        </span>
      </span>
    </button>
  );
}
