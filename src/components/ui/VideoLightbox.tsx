"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Music2, X } from "lucide-react";
import type { VideoEntry } from "@/data/videos";

const noopSubscribe = () => () => {};

/** Vidéo en grand, dans un cadre de téléphone, avec sa musique de fond.
 * Rendue directement dans <body> (portail) pour passer au-dessus de
 * l'en-tête fixe, quel que soit le conteneur qui l'ouvre. */
export default function VideoLightbox({
  video,
  caption,
  onClose,
}: {
  video: VideoEntry | null;
  caption?: string;
  onClose: () => void;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  // Vrai seulement côté navigateur (le portail a besoin de document.body).
  const isClient = useSyncExternalStore(noopSubscribe, () => true, () => false);

  // Fermeture au clavier (Échap) tant que la lightbox est ouverte.
  useEffect(() => {
    if (!video) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [video, onClose]);

  // `muted` doit être posé comme propriété DOM avant play() (autoplay), puis
  // la musique démarre ; à la fermeture on coupe l'élément audio qui jouait.
  useEffect(() => {
    const el = videoRef.current;
    if (el) {
      el.muted = true;
      el.currentTime = 0;
      el.play().catch(() => {});
    }
    const audio = audioRef.current;
    if (video?.musicSrc) {
      audio?.play().catch(() => {});
    }
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [video]);

  if (!isClient) return null;

  return createPortal(
    <AnimatePresence>
      {video && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={caption}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[#05041a]/90 p-5 backdrop-blur-md"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-[120px]"
            style={{ background: video.accent }}
          />
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 240, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[min(24rem,calc((100svh-6rem)*9/16))] rounded-[2.6rem] border border-white/20 bg-[#0b0a1f] p-2 shadow-[0_60px_140px_-40px_rgba(0,0,0,1)]"
          >
            <span aria-hidden className="absolute left-1/2 top-4 z-10 h-1.5 w-16 -translate-x-1/2 rounded-full bg-black/80" />
            <div className="relative aspect-[9/16] overflow-hidden rounded-[2.1rem]">
              <video
                ref={videoRef}
                key={video.id}
                src={video.src}
                poster={video.poster}
                loop
                muted
                playsInline
                preload="auto"
                className="size-full object-cover"
              />
              {video.musicSrc && <audio ref={audioRef} src={video.musicSrc} loop />}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              {caption && (
                <span className="pointer-events-none absolute bottom-5 left-5 right-5 text-base font-semibold text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                  {caption}
                </span>
              )}
              {video.musicSrc && (
                <span className="pointer-events-none absolute left-4 top-9 grid size-8 place-items-center rounded-full bg-black/45 text-white backdrop-blur">
                  <Music2 className="size-4" />
                </span>
              )}
            </div>
          </motion.div>

          <button
            onClick={onClose}
            aria-label="Fermer"
            className="btn-ghost absolute right-5 top-5 size-12 p-0 sm:right-8 sm:top-8"
          >
            <X className="size-5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
