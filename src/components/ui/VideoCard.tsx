"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { PlayCircle, Video as VideoIcon } from "lucide-react";
import type { VideoEntry } from "@/data/videos";

export default function VideoCard({
  video,
  caption,
}: {
  video: VideoEntry;
  caption: string;
}) {
  const t = useTranslations("common");
  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Autoplay au scroll (mobile/tactile) en plus du hover (desktop).
  useEffect(() => {
    const el = containerRef.current;
    if (!el || failed) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.play().catch(() => {});
          setPlaying(true);
        } else {
          videoRef.current?.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.6 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [failed]);

  return (
    <motion.div
      ref={containerRef}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="group relative aspect-[9/16] w-full shrink-0 overflow-hidden rounded-2xl border border-border"
      style={{
        background: `linear-gradient(160deg, ${video.accent}22, #0c0e11 75%)`,
      }}
      onMouseEnter={() => {
        videoRef.current?.play().catch(() => {});
        setPlaying(true);
      }}
      onMouseLeave={() => {
        videoRef.current?.pause();
      }}
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

      {(failed || !playing) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-t from-black/70 via-black/10 to-transparent p-4 text-center">
          {failed ? (
            <>
              <VideoIcon className="size-6 text-ink-muted/60" />
              <span className="text-xs text-ink-muted/60">
                {t("videoPending")}
              </span>
            </>
          ) : (
            <PlayCircle className="size-9 text-white/80 transition-transform group-hover:scale-110" />
          )}
        </div>
      )}

      <span className="absolute bottom-3 left-3 right-3 truncate text-sm font-medium text-white/90">
        {caption}
      </span>
    </motion.div>
  );
}
