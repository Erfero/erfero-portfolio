"use client";

import { useState } from "react";
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

  return (
    <motion.button
      onClick={onOpen}
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
          className="absolute inset-0 size-full object-cover"
          src={video.src}
          muted
          loop
          autoPlay
          playsInline
          preload="metadata"
          onError={() => setFailed(true)}
        />
      )}

      {failed && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <VideoIcon className="size-6 text-ink-muted/60" />
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <span className="absolute right-2 top-2 grid size-7 place-items-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
        <Maximize2 className="size-3.5" />
      </span>

      <span className="absolute bottom-2 left-2 right-2 truncate text-xs font-medium text-white/90">
        {caption}
      </span>
    </motion.button>
  );
}
