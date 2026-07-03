"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import VideoMarqueeCard from "@/components/ui/VideoMarqueeCard";
import VideoLightbox from "@/components/ui/VideoLightbox";
import type { VideoEntry } from "@/data/videos";

function MarqueeRow({
  videos,
  reverse,
  locale,
  onOpen,
}: {
  videos: VideoEntry[];
  reverse?: boolean;
  locale: "fr" | "en";
  onOpen: (video: VideoEntry) => void;
}) {
  const doubled = [...videos, ...videos];

  return (
    <div className="overflow-hidden">
      <div
        className="marquee-track flex w-max gap-7"
        style={
          {
            "--marquee-name": reverse ? "marquee-x-reverse" : "marquee-x",
            "--marquee-duration": `${videos.length * 4}s`,
          } as React.CSSProperties
        }
      >
        {doubled.map((video, i) => (
          <VideoMarqueeCard
            key={`${video.id}-${i}`}
            video={video}
            caption={video.caption[locale]}
            onOpen={() => onOpen(video)}
          />
        ))}
      </div>
    </div>
  );
}

export default function VideoReels({ videos }: { videos: VideoEntry[] }) {
  const t = useTranslations("videoReels");
  const locale = useLocale() as "fr" | "en";
  const [active, setActive] = useState<VideoEntry | null>(null);

  const half = Math.ceil(videos.length / 2);
  const rowA = videos.slice(0, half);
  const rowB = videos.slice(half).length > 0 ? videos.slice(half) : videos;

  return (
    <section className="relative overflow-hidden py-16 sm:py-20">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            subtitle={t("subtitle")}
          />
          <Link
            href="/realisations"
            className="group mb-1 hidden shrink-0 items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-ink sm:inline-flex"
          >
            {t("cta")}
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>

      <Reveal className="mt-10 flex flex-col gap-10">
        <MarqueeRow videos={rowA} locale={locale} onOpen={setActive} />
        <MarqueeRow videos={rowB} reverse locale={locale} onOpen={setActive} />
      </Reveal>

      <div className="container-page mt-8 flex justify-center sm:hidden">
        <Link
          href="/realisations"
          className="inline-flex items-center gap-1.5 rounded-full border border-border px-6 py-3 text-sm font-medium"
        >
          {t("cta")}
          <ArrowUpRight className="size-4" />
        </Link>
      </div>

      <VideoLightbox
        video={active}
        caption={active?.caption[locale]}
        onClose={() => setActive(null)}
      />
    </section>
  );
}
