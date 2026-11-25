"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Video as VideoIcon } from "lucide-react";
import type { VideoEntry } from "@/data/videos";

export default function VideoMarqueeCard({
  video,
  caption,
  onOpen,
  ariaHidden,
  cursorLabel = "Play",
}: {
  video: VideoEntry;
  caption: string;
  onOpen: () => void;
  /** Étiquette du curseur personnalisé au survol (traduite). */
  cursorLabel?: string;
  /** Copie de la boucle infinie : masquée aux lecteurs d'écran et au clavier. */
  ariaHidden?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Avec des dizaines de vidéos dans le carrousel, seule la vidéo réellement
  // visible à l'écran doit décoder et jouer (sinon le site rame).
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // La musique de fond n'appartient qu'à la lightbox (voir VideoLightbox) :
  // la carte elle-même ne joue jamais de son.
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-hidden={ariaHidden || undefined}
      tabIndex={ariaHidden ? -1 : undefined}
      data-cursor={cursorLabel}
      className="group relative aspect-[9/16] w-40 shrink-0 overflow-hidden rounded-[1.4rem] border border-white/10 bg-surface text-left shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)] transition-transform duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-2 hover:scale-[1.03] sm:w-52 lg:w-60"
      style={{ background: `linear-gradient(160deg, ${video.accent}22, #0c0e11 75%)` }}
    >
      {!failed && (
        <video
          ref={videoRef}
          className="absolute inset-0 size-full object-cover"
          src={video.src}
          poster={video.poster}
          muted
          loop
          playsInline
          preload="none"
          onError={() => setFailed(true)}
        />
      )}

      {failed && (
        <div className="absolute inset-0 grid place-items-center">
          <VideoIcon className="size-6 text-ink-muted/60" />
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/5 to-transparent" />

      <span className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
        <Play className="size-3.5 fill-current" />
      </span>

      <span className="absolute bottom-3 left-3 right-3 line-clamp-2 text-xs font-semibold leading-snug text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] sm:text-sm">
        {caption}
      </span>
    </button>
  );
}
