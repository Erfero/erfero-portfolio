"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight, Hand, Play } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";
import VideoLightbox from "@/components/ui/VideoLightbox";
import type { VideoEntry } from "@/data/videos";

/** Vitesse de rotation automatique (degrés / seconde). */
const AUTO_SPEED = 3.2;

/** Aperçu muet de la vidéo face au visiteur. */
function FrontPreview({ video }: { video: VideoEntry }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.muted = true;
    el.play().catch(() => {});
    return () => el.pause();
  }, []);
  return (
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
  );
}

/**
 * « En coulisses » : les vidéos de réalisations posées sur un anneau 3D, à
 * faire tourner au doigt ou à la souris (avec inertie). L'anneau tourne
 * doucement tout seul, la vidéo face au visiteur se lance en aperçu muet, et
 * un clic ouvre n'importe quelle vidéo en grand, avec sa musique.
 */
export default function VideoReels({ videos, index }: { videos: VideoEntry[]; index?: string }) {
  const t = useTranslations("videoReels");
  const locale = useLocale() as "fr" | "en";
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<VideoEntry | null>(null);
  const [front, setFront] = useState(0);
  const [inView, setInView] = useState(false);
  const count = videos.length;
  const step = 360 / Math.max(count, 1);
  const lightboxRef = useRef(false);
  useEffect(() => {
    lightboxRef.current = !!lightbox;
  }, [lightbox]);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Rotation de l'anneau : auto + glisser avec inertie.
  useEffect(() => {
    const el = stage.current;
    const r = ring.current;
    if (!el || !r || count === 0) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cards = Array.from(r.querySelectorAll<HTMLElement>(".vr-card"));
    let angle = 0;
    let velocity = 0;
    let dragging = false;
    let hovered = false;
    let lastX = 0;
    let moved = 0;
    let current = -1;

    const radius = () => {
      const w = cards[0]?.offsetWidth ?? 168;
      return (w + (window.innerWidth < 640 ? 14 : 22)) / (2 * Math.sin((step * Math.PI) / 360));
    };
    let R = radius();

    const apply = () => {
      r.style.transform = `translateZ(${-R}px) rotateY(${-angle}deg)`;
      cards.forEach((card, i) => {
        const a = ((i * step - angle) % 360 + 540) % 360 - 180;
        const abs = Math.abs(a);
        const o = abs < 34 ? 1 : abs > 70 ? 0 : 1 - (abs - 34) / 36;
        card.style.opacity = o.toFixed(3);
        card.style.pointerEvents = o > 0.3 ? "auto" : "none";
        card.style.transform = `rotateY(${i * step}deg) translateZ(${R}px)`;
      });
      const f = ((Math.round(angle / step) % count) + count) % count;
      if (f !== current) {
        current = f;
        setFront(f);
      }
    };

    const tick = (_t: number, dt: number) => {
      const s = Math.min(dt, 64) / 1000;
      if (!dragging) {
        if (Math.abs(velocity) > 0.01) {
          angle += velocity;
          velocity *= 0.93;
        } else if (!reduced && !hovered && !lightboxRef.current) {
          angle += AUTO_SPEED * s;
        }
      }
      apply();
    };
    gsap.ticker.add(tick);

    const down = (e: PointerEvent) => {
      dragging = true;
      moved = 0;
      lastX = e.clientX;
      velocity = 0;
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      moved += Math.abs(dx);
      const delta = -dx * 0.11;
      angle += delta;
      velocity = delta;
    };
    const up = () => {
      dragging = false;
    };
    const click = (e: MouseEvent) => {
      // Un vrai glisser ne doit pas ouvrir de vidéo.
      if (moved > 6) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    const enter = () => (hovered = true);
    const leave = () => {
      hovered = false;
      dragging = false;
    };
    const resize = () => (R = radius());

    el.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerup", up);
    el.addEventListener("click", click, true);
    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", leave);
    window.addEventListener("resize", resize);
    return () => {
      gsap.ticker.remove(tick);
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      el.removeEventListener("click", click, true);
      el.removeEventListener("mouseenter", enter);
      el.removeEventListener("mouseleave", leave);
      window.removeEventListener("resize", resize);
    };
  }, [count, step]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(".vr-stage", {
          autoAlpha: 0,
          y: 60,
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: { trigger: ".vr-stage", start: "top 92%", once: true },
        });
      });
    },
    { scope: root }
  );

  if (count === 0) return null;

  return (
    <section ref={root} id="videos" className="tone-dark scroll-mt-24 px-2 pb-3 sm:px-3 sm:pb-4">
      <div className="tone-dark relative overflow-hidden rounded-[2rem] !bg-bg-soft py-20 ring-1 ring-line sm:rounded-[3rem] sm:py-28">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(0,128,96,0.22),transparent)]" />
        <div className="container-page relative">
          <SectionHeading layout="split" eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} index={index} />
        </div>

        <div
          ref={stage}
          role="region"
          aria-roledescription="carousel"
          aria-label={t("eyebrow")}
          className="vr-stage relative mt-14 h-[27rem] cursor-grab touch-pan-y select-none [perspective:2200px] active:cursor-grabbing sm:mt-16 sm:h-[36rem]"
        >
          <div ref={ring} className="absolute left-1/2 top-1/2 size-0 [transform-style:preserve-3d]">
            {videos.map((video, i) => {
              const isFront = i === front;
              return (
                <button
                  key={video.id}
                  type="button"
                  onClick={() => setLightbox(video)}
                  aria-label={`${video.caption[locale]} — ${t("play")}`}
                  data-cursor={t("play")}
                  className="vr-card absolute left-0 top-0 -ml-[5.25rem] -mt-[9.33rem] block w-[10.5rem] overflow-hidden rounded-[1.1rem] bg-[#15291f] text-left shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)] ring-1 ring-white/10 [backface-visibility:hidden] sm:-ml-[7.5rem] sm:-mt-[13.33rem] sm:w-[15rem] sm:rounded-[1.5rem]"
                  style={{ opacity: 0 }}
                >
                  <span className="relative block aspect-[9/16]">
                    {video.poster && (
                      // eslint-disable-next-line @next/next/no-img-element -- affiches JPEG légères
                      <img
                        src={video.poster}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                        className="absolute inset-0 size-full object-cover"
                      />
                    )}
                    {isFront && inView && !lightbox && <FrontPreview video={video} />}
                    <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent" />
                    <span className="pointer-events-none absolute inset-x-2.5 bottom-2.5 line-clamp-2 text-xs font-medium leading-snug text-white sm:inset-x-4 sm:bottom-4 sm:text-sm">
                      {video.caption[locale]}
                    </span>
                    {isFront && (
                      <span className="pointer-events-none absolute right-2.5 top-2.5 grid size-8 place-items-center rounded-full bg-white text-[#0e1311]">
                        <Play className="size-3.5 translate-x-px fill-current" />
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="container-page relative mt-10 flex flex-col items-start justify-between gap-6 sm:mt-14 sm:flex-row sm:items-center">
          <div>
            <p className="font-serif text-3xl italic">{t("countLabel", { count })}</p>
            <p className="mt-2 flex items-center gap-2 text-sm text-ink-muted">
              <Hand className="size-4 text-accent" aria-hidden />
              {t("hint")}
            </p>
          </div>
          <Link
            href="/realisations#videos"
            className="group inline-flex items-center gap-2 rounded-full border border-ink/25 px-6 py-3 text-sm font-medium transition-colors hover:bg-ink hover:text-bg"
          >
            {t("cta")}
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
          </Link>
        </div>
      </div>

      <VideoLightbox video={lightbox} caption={lightbox?.caption[locale]} onClose={() => setLightbox(null)} />
    </section>
  );
}
