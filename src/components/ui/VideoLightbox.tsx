"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { VideoEntry } from "@/data/videos";

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

  // Le navigateur évalue l'autorisation d'autoplay dès l'attachement de
  // l'élément, avant que React n'applique la prop `muted` comme propriété
  // DOM — avec `autoPlay` seul en JSX, la vidéo reste bloquée sur un cadre
  // vide. On force donc `muted` puis `play()` explicitement ici.
  useEffect(() => {
    const el = videoRef.current;
    if (el) {
      el.muted = true;
      el.currentTime = 0;
      el.play().catch(() => {});
    }
    if (video?.musicSrc) {
      audioRef.current?.play().catch(() => {});
    }
    return () => {
      audioRef.current?.pause();
    };
  }, [video]);

  return (
    <AnimatePresence>
      {video && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 p-6 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="relative aspect-[9/16] w-full max-w-sm overflow-hidden rounded-3xl border border-white/10 shadow-2xl"
          >
            <video
              ref={videoRef}
              key={video.id}
              src={video.src}
              loop
              muted
              playsInline
              className="size-full object-cover"
            />
            {video.musicSrc && (
              <audio ref={audioRef} src={video.musicSrc} loop />
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            {caption && (
              <span className="pointer-events-none absolute bottom-4 left-4 right-4 text-sm font-semibold text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                {caption}
              </span>
            )}
          </motion.div>

          <button
            onClick={onClose}
            aria-label="Fermer"
            className="absolute right-6 top-6 grid size-10 place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur"
          >
            <X className="size-5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
