"use client";

import { useState } from "react";
import { PlayCircle, Video as VideoIcon } from "lucide-react";
import type { VideoEntry } from "@/data/videos";

export default function VideoCard({
  video,
  caption,
}: {
  video: VideoEntry;
  caption: string;
}) {
  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState(false);

  return (
    <div
      className="group relative aspect-[9/16] w-full shrink-0 overflow-hidden rounded-2xl border border-border"
      style={{
        background: `linear-gradient(160deg, ${video.accent}22, #0c0e11 75%)`,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget.querySelector("video");
        el?.play().catch(() => {});
        setPlaying(true);
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget.querySelector("video");
        el?.pause();
        setPlaying(false);
      }}
    >
      {!failed && (
        <video
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
                Vidéo à venir
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
    </div>
  );
}
