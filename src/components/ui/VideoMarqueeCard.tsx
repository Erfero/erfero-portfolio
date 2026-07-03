"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Maximize2, Video as VideoIcon } from "lucide-react";
import type { VideoEntry } from "@/data/videos";

export default function VideoMarqueeCard({
  video,
  caption,
  onOpen,
}: {
  video: VideoEntry;
  caption: string;
  onOpen: () => void;
}) {
  const [failed, setFailed] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Avec des dizaines de vidéos dans le carrousel, autoplay sur toutes en
  // même temps rend le site très lent : seule la vidéo réellement visible
  // à l'écran doit décoder et jouer.
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

  const playMusic = () => {
    if (!video.musicSrc) return;
    audioRef.current?.play().catch(() => {});
  };

  const stopMusic = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  return (
    <motion.button
      onClick={() => {
        onOpen();
        playMusic();
      }}
      onMouseEnter={playMusic}
      onMouseLeave={stopMusic}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="group relative aspect-[9/16] w-40 shrink-0 overflow-hidden rounded-2xl border border-border text-left sm:w-48"
      style={{
        background: `linear-gradient(160deg, ${video.accent}22, #0c0e11 75%)`,
      }}
    >
      {!failed && (
        <video
          ref={videoRef}
          className="absolute inset-0 size-full object-cover"
          src={video.src}
          muted
          loop
          playsInline
          preload="none"
          onError={() => setFailed(true)}
        />
      )}

      {video.musicSrc && <audio ref={audioRef} src={video.musicSrc} loop />}

      {failed && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <VideoIcon className="size-6 text-ink-muted/60" />
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

      <span className="absolute right-2 top-2 grid size-7 place-items-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
        <Maximize2 className="size-3.5" />
      </span>

      <span className="absolute bottom-2.5 left-2.5 right-2.5 truncate text-xs font-semibold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
        {caption}
      </span>
    </motion.button>
  );
}
