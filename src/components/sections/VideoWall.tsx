"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import VideoCard from "@/components/ui/VideoCard";
import VideoLightbox from "@/components/ui/VideoLightbox";
import Reveal from "@/components/ui/Reveal";
import type { VideoEntry } from "@/data/videos";

/** Mur de toutes les vidéos (format téléphone) ; un clic ouvre la lightbox avec musique. */
export default function VideoWall({ videos }: { videos: VideoEntry[] }) {
  const locale = useLocale() as "fr" | "en";
  const t = useTranslations("videoReels");
  const [active, setActive] = useState<VideoEntry | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">
        {videos.map((video, i) => (
          <Reveal key={video.id} delay={(i % 5) * 0.05}>
            <VideoCard
              video={video}
              caption={video.caption[locale]}
              onOpen={() => setActive(video)}
              cursorLabel={t("play")}
            />
          </Reveal>
        ))}
      </div>
      <VideoLightbox video={active} caption={active?.caption[locale]} onClose={() => setActive(null)} />
    </>
  );
}
