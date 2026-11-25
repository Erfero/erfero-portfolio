"use client";

import { useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";
import VideoMarqueeCard from "@/components/ui/VideoMarqueeCard";
import VideoLightbox from "@/components/ui/VideoLightbox";
import type { VideoEntry } from "@/data/videos";

const HOME_VIDEO_LIMIT = 24;

function MarqueeRow({
  videos,
  reverse,
  locale,
  onOpen,
  cursorLabel,
}: {
  videos: VideoEntry[];
  reverse?: boolean;
  locale: "fr" | "en";
  onOpen: (video: VideoEntry) => void;
  cursorLabel: string;
}) {
  const doubled = [...videos, ...videos];
  return (
    <div className="marquee-pause overflow-hidden">
      <div
        className="marquee-track flex w-max gap-5 sm:gap-7"
        style={
          {
            "--marquee-name": reverse ? "marquee-x-reverse" : "marquee-x",
            "--marquee-duration": `${Math.max(videos.length * 5, 40)}s`,
          } as React.CSSProperties
        }
      >
        {doubled.map((video, i) => (
          <VideoMarqueeCard
            key={`${video.id}-${i}`}
            video={video}
            caption={video.caption[locale]}
            onOpen={() => onOpen(video)}
            ariaHidden={i >= videos.length}
            cursorLabel={cursorLabel}
          />
        ))}
      </div>
    </div>
  );
}

export default function VideoReels({ videos, index }: { videos: VideoEntry[]; index?: string }) {
  const t = useTranslations("videoReels");
  const locale = useLocale() as "fr" | "en";
  const [active, setActive] = useState<VideoEntry | null>(null);
  const root = useRef<HTMLElement>(null);
  const rows = useRef<HTMLDivElement>(null);

  // L'accueil montre les 24 vidéos les plus récentes (deux bandes de 12) pour
  // rester léger sur mobile ; le mur complet est sur /realisations#videos.
  const shown = videos.slice(0, HOME_VIDEO_LIMIT);
  const half = Math.ceil(shown.length / 2);
  const rowA = shown.slice(0, half);
  const rowB = shown.slice(half).length > 0 ? shown.slice(half) : shown;

  // Les rangées s'inclinent légèrement selon la vitesse de défilement.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const skewTo = gsap.quickTo(rows.current, "skewX", { duration: 0.6, ease: "power3" });
        const clamp = gsap.utils.clamp(-7, 7);
        let idle: ReturnType<typeof setTimeout> | undefined;
        ScrollTrigger.create({
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            skewTo(clamp(self.getVelocity() / -260));
            clearTimeout(idle);
            idle = setTimeout(() => skewTo(0), 120);
          },
        });
        return () => clearTimeout(idle);
      });
    },
    { scope: root }
  );

  if (videos.length === 0) return null;

  return (
    <section ref={root} className="relative overflow-hidden py-24 sm:py-32">
      <div className="container-page flex flex-wrap items-end justify-between gap-6">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} index={index} />
        <Link
          href="/realisations#videos"
          className="group mb-1 hidden shrink-0 items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-ink sm:inline-flex"
        >
          {t("cta")}
          <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
        </Link>
      </div>

      <div ref={rows} className="mt-14 flex flex-col gap-6 will-change-transform sm:gap-8">
        <MarqueeRow videos={rowA} locale={locale} onOpen={setActive} cursorLabel={t("play")} />
        <MarqueeRow videos={rowB} reverse locale={locale} onOpen={setActive} cursorLabel={t("play")} />
      </div>

      <div className="container-page mt-10 flex justify-center sm:hidden">
        <Link
          href="/realisations#videos"
          className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-6 py-3 text-sm font-medium"
        >
          {t("cta")}
          <ArrowUpRight className="size-4" />
        </Link>
      </div>

      <VideoLightbox video={active} caption={active?.caption[locale]} onClose={() => setActive(null)} />
    </section>
  );
}
