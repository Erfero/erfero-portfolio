"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight, ArrowUpRight, Play, Volume2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { useMediaQuery } from "@/lib/useMediaQuery";
import SectionHeading from "@/components/ui/SectionHeading";
import VideoLightbox from "@/components/ui/VideoLightbox";
import type { VideoEntry } from "@/data/videos";

const VISIBLE_RANGE = 4; // téléphones montés de chaque côté (le 4e est invisible, prêt à entrer)
const AUTO_ADVANCE_MS = 6500;

/** Écran d'un téléphone : la vidéo ne joue que sur le téléphone central. */
function Screen({ video, playing }: { video: VideoEntry; playing: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !playing) return;
    // `muted` doit être une propriété DOM avant play() pour l'autoplay.
    el.muted = true;
    el.play().catch(() => {});
    return () => el.pause();
  }, [playing]);

  return (
    <div
      className="relative aspect-[9/16] overflow-hidden rounded-[1.9rem] bg-[#0d0b26]"
      style={{ background: `linear-gradient(160deg, ${video.accent}55, #0d0b26 70%)` }}
    >
      {video.poster && (
        // eslint-disable-next-line @next/next/no-img-element -- affiches JPEG légères
        <img src={video.poster} alt="" loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover" />
      )}
      {playing && (
        <video
          ref={ref}
          src={video.src}
          poster={video.poster}
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 size-full object-cover"
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
    </div>
  );
}

/**
 * Vidéos de réalisations en carrousel 3D de téléphones : le téléphone
 * central est grand et joue sa vidéo, les voisins s'inclinent en
 * perspective. Navigation au glisser, aux flèches, au clavier, ou en
 * cliquant sur un téléphone ; un clic sur le téléphone central ouvre la
 * vidéo en grand (avec musique). Défilement automatique quand la section est
 * visible et que la souris n'est pas dessus.
 */
export default function VideoReels({ videos, index }: { videos: VideoEntry[]; index?: string }) {
  const t = useTranslations("videoReels");
  const locale = useLocale() as "fr" | "en";
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; moved: boolean } | null>(null);
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<VideoEntry | null>(null);
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState(false);
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const count = videos.length;

  const go = useCallback((dir: number) => setActive((a) => (a + dir + count) % count), [count]);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || hovered || lightbox || reduced || count < 2) return;
    const id = window.setTimeout(() => go(1), AUTO_ADVANCE_MS);
    return () => window.clearTimeout(id);
  }, [active, inView, hovered, lightbox, reduced, count, go]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(".vr-stage", {
          y: 80,
          autoAlpha: 0,
          scale: 0.92,
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: { trigger: ".vr-stage", start: "top 95%", once: true },
        });
      });
    },
    { scope: root }
  );

  if (count === 0) return null;
  const current = videos[active];

  const onPointerDown = (e: React.PointerEvent) => {
    drag.current = { x: e.clientX, moved: false };
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 40) {
      d.moved = true;
      go(dx < 0 ? 1 : -1);
    }
  };
  const onPhoneClick = (i: number, video: VideoEntry) => {
    if (drag.current?.moved) {
      drag.current = null;
      return;
    }
    drag.current = null;
    if (i === active) setLightbox(video);
    else setActive(i);
  };

  return (
    <section ref={root} id="videos" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28">
      {/* Halo aux couleurs de la vidéo en cours */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[46rem] w-[46rem] -translate-x-1/2 rounded-full opacity-60 blur-[110px] transition-[background-color] duration-1000"
        style={{ backgroundColor: `${current.accent}55` }}
      />

      <div className="container-page flex flex-wrap items-end justify-between gap-6">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} index={index} />
        <Link href="/realisations#videos" className="btn-ghost mb-1 px-5 py-3 text-sm">
          {t("cta")}
          <ArrowUpRight className="size-4" />
        </Link>
      </div>

      <div
        ref={stage}
        role="region"
        aria-roledescription="carousel"
        aria-label={t("eyebrow")}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(1);
          if (e.key === "ArrowLeft") go(-1);
        }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="vr-stage relative mx-auto mt-14 w-full touch-pan-y select-none outline-none [--ph:58vw] [perspective:1800px] sm:[--ph:34vw] lg:[--ph:clamp(210px,19vw,280px)]"
        style={{ height: "calc(var(--ph) * 16 / 9 + 1rem)" }}
      >
        <div className="absolute inset-0 [transform-style:preserve-3d]">
          {videos.map((video, i) => {
            let k = (((i - active) % count) + count) % count;
            if (k > count / 2) k -= count;
            const abs = Math.abs(k);
            if (abs > VISIBLE_RANGE) return null;
            const isActive = k === 0;
            return (
              <button
                key={video.id}
                type="button"
                onClick={() => onPhoneClick(i, video)}
                tabIndex={abs <= 1 ? 0 : -1}
                aria-hidden={abs === VISIBLE_RANGE || undefined}
                aria-label={`${video.caption[locale]}${isActive ? ` — ${t("play")}` : ""}`}
                data-cursor={isActive ? t("play") : undefined}
                className="absolute left-1/2 top-0 rounded-[2.4rem] border border-white/15 bg-[#0b0a1f] p-1.5 text-left shadow-[0_40px_80px_-30px_rgba(0,0,0,0.95)] transition-[transform,opacity,filter] duration-[900ms] ease-[var(--ease-out-expo)]"
                style={{
                  width: "var(--ph)",
                  transform: `translateX(calc(-50% + ${k} * var(--ph) * 0.72)) translateZ(${-abs * 140}px) rotateY(${k * -20}deg) scale(${1 - abs * 0.05})`,
                  zIndex: 20 - abs,
                  opacity: abs === VISIBLE_RANGE ? 0 : 1 - abs * 0.14,
                  filter: isActive ? "none" : `brightness(${1 - abs * 0.2}) saturate(${1 - abs * 0.15})`,
                  boxShadow: isActive ? `0 40px 100px -30px ${video.accent}` : undefined,
                }}
              >
                <span aria-hidden className="absolute left-1/2 top-3 z-10 h-1.5 w-14 -translate-x-1/2 rounded-full bg-black/80" />
                <Screen video={video} playing={isActive && inView && !lightbox} />
                {isActive && (
                  <span className="pointer-events-none absolute inset-x-4 bottom-5 flex items-end justify-between gap-3">
                    <span className="line-clamp-2 text-sm font-semibold leading-snug text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)] sm:text-base">
                      {video.caption[locale]}
                    </span>
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white text-[#0b0920] shadow-lg">
                      <Play className="size-4 translate-x-px fill-current" />
                    </span>
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="container-page mt-10 flex flex-col items-center gap-5">
        <div className="flex items-center gap-4">
          <button type="button" onClick={() => go(-1)} aria-label={t("prev")} className="btn-ghost size-12 p-0">
            <ArrowLeft className="size-5" />
          </button>
          <span className="font-display min-w-24 text-center text-lg font-bold tabular-nums">
            <span className="text-gradient">{String(active + 1).padStart(2, "0")}</span>
            <span className="text-ink-dim"> / {String(count).padStart(2, "0")}</span>
          </span>
          <button type="button" onClick={() => go(1)} aria-label={t("next")} className="btn-ghost size-12 p-0">
            <ArrowRight className="size-5" />
          </button>
        </div>
        <p className="flex items-center gap-2 text-sm text-ink-muted">
          <Volume2 className="size-4 text-pink" aria-hidden />
          {t("hint")}
        </p>
      </div>

      <VideoLightbox video={lightbox} caption={lightbox?.caption[locale]} onClose={() => setLightbox(null)} />
    </section>
  );
}
