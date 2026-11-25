"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Lock, Star } from "lucide-react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { onIntroReady } from "@/lib/intro";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { projectHost, projectShot, type ProjectCard as Project } from "@/lib/projectMedia";
import TechIcon from "./TechIcon";

export interface HeroMock {
  badge: string;
  heading: string;
  headingLine2: string;
  cta: string;
  addToCart: string;
  toastTitle: string;
  toastSub: string;
  growth: string;
  growthSub: string;
  rating: string;
}

const CYCLE_MS = 4200;
const BARS = [34, 48, 42, 60, 72, 66, 88, 100];

/**
 * Visuel du Hero : une fenêtre de navigateur qui fait défiler de vraies
 * boutiques livrées, entourée de widgets vivants (vente confirmée, hausse
 * des ventes, note clients, fiche produit). Une petite histoire tourne en
 * boucle : le curseur clique sur « Ajouter au panier » → la vente tombe.
 * L'ensemble s'incline légèrement en suivant la souris.
 */
export default function HeroShowcase({ shops, mock }: { shops: Project[]; mock: HeroMock }) {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const count = shops.length;

  useEffect(() => {
    if (reduced || count < 2) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % count), CYCLE_MS);
    return () => window.clearInterval(id);
  }, [reduced, count]);

  useGSAP(
    () => {
      const el = root.current!;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.set(".hs-toast", { autoAlpha: 0 });
        // Entrée : la scène bascule en place, puis les widgets « popent ».
        const intro = gsap.timeline({ paused: true, defaults: { ease: "expo.out" } });
        intro
          .fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 }, 0)
          .fromTo(".hs-browser", { y: 60, rotationX: 18, scale: 0.94 }, { y: 0, rotationX: 0, scale: 1, duration: 1.6 }, 0)
          .fromTo(
            ".hs-widget",
            { autoAlpha: 0, scale: 0.6, y: 30 },
            { autoAlpha: 1, scale: 1, y: 0, duration: 1, ease: "back.out(1.7)", stagger: 0.12 },
            0.45
          );
        const stopIntro = onIntroReady(() => intro.play());

        // Histoire en boucle : clic sur « Ajouter au panier » → vente confirmée.
        const story = gsap.timeline({ repeat: -1, repeatDelay: 0.8, delay: 2.4 });
        story
          .set(".hs-toast", { autoAlpha: 0, x: -24, scale: 0.92 })
          .fromTo(
            ".hs-cursor",
            { x: 150, y: -70, autoAlpha: 0 },
            { x: 0, y: 0, autoAlpha: 1, duration: 1.1, ease: "power3.inOut" }
          )
          .to(".hs-cart", { scale: 0.9, duration: 0.12, yoyo: true, repeat: 1, ease: "power2.inOut" })
          .to(".hs-cursor", { scale: 0.8, duration: 0.12, yoyo: true, repeat: 1 }, "<")
          .to(".hs-toast", { autoAlpha: 1, x: 0, scale: 1, duration: 0.7, ease: "back.out(1.8)" })
          .to(".hs-cursor", { autoAlpha: 0, duration: 0.4 }, "<0.15")
          .fromTo(
            ".hs-bar",
            { scaleY: 0.15 },
            { scaleY: 1, duration: 0.8, stagger: 0.05, ease: "expo.out" },
            "<"
          )
          .to(".hs-toast", { autoAlpha: 0, x: -16, duration: 0.45, ease: "power2.in" }, "+=2.6");

        // Inclinaison 3D qui suit la souris (souris uniquement).
        let removeMove = () => {};
        if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
          const stage = el.querySelector<HTMLElement>(".hs-stage")!;
          const rx = gsap.quickTo(stage, "rotationX", { duration: 0.9, ease: "power3" });
          const ry = gsap.quickTo(stage, "rotationY", { duration: 0.9, ease: "power3" });
          const layers = gsap.utils.toArray<HTMLElement>("[data-depth]", el).map((node) => ({
            depth: Number(node.dataset.depth),
            x: gsap.quickTo(node, "x", { duration: 1, ease: "power3" }),
            y: gsap.quickTo(node, "y", { duration: 1, ease: "power3" }),
          }));
          const onMove = (e: PointerEvent) => {
            const nx = e.clientX / window.innerWidth - 0.5;
            const ny = e.clientY / window.innerHeight - 0.5;
            ry(nx * 10);
            rx(-ny * 8);
            layers.forEach((l) => {
              l.x(nx * l.depth);
              l.y(ny * l.depth);
            });
          };
          window.addEventListener("pointermove", onMove, { passive: true });
          removeMove = () => window.removeEventListener("pointermove", onMove);
        }

        return () => {
          stopIntro();
          removeMove();
        };
      });
    },
    { scope: root }
  );

  const current = shops[active];

  return (
    <div ref={root} data-reveal aria-hidden className="relative mx-auto w-full max-w-[640px] [perspective:1600px]">
      <div className="hs-stage relative [transform-style:preserve-3d]">
        {/* Halo coloré derrière la fenêtre */}
        <div
          aria-hidden
          className="absolute -inset-[12%] -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(157,140,255,0.45),rgba(255,111,208,0.18)_55%,transparent)] blur-2xl"
        />

        {/* Fenêtre de navigateur : vraies boutiques en fondu enchaîné */}
        <div className="hs-browser relative overflow-hidden rounded-2xl border border-white/15 bg-surface shadow-[0_50px_120px_-40px_rgba(109,77,255,0.75)]">
          <div className="flex h-9 items-center gap-2 border-b border-white/10 bg-[#100e2e] px-3.5">
            <span className="flex gap-1.5" aria-hidden>
              <span className="size-2.5 rounded-full bg-[#ff5f57]" />
              <span className="size-2.5 rounded-full bg-[#febc2e]" />
              <span className="size-2.5 rounded-full bg-[#28c840]" />
            </span>
            <span className="mx-auto flex min-w-0 max-w-[65%] items-center gap-1.5 rounded-md bg-white/[0.07] px-3 py-1 text-[11px] text-ink-muted">
              <Lock className="size-3 shrink-0 text-success" aria-hidden />
              <span className="truncate">{current ? projectHost(current) : ""}</span>
            </span>
            <span className="w-10" aria-hidden />
          </div>
          <div className="relative aspect-[16/10] bg-[#100e2e]">
            {shops.map((shop, i) => (
              // eslint-disable-next-line @next/next/no-img-element -- captures WebP pré-optimisées
              <img
                key={shop.id}
                src={projectShot(shop)}
                alt=""
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
                className={`absolute inset-0 size-full object-cover object-top transition-opacity duration-700 ease-out ${
                  i === active ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

            <span className="hs-cart absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-[#0b0920] shadow-[0_10px_30px_-8px_rgba(0,0,0,0.6)] sm:text-sm">
              {mock.addToCart}
            </span>
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="hs-cursor absolute bottom-1 left-24 size-7 opacity-0 drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)] sm:left-28"
            >
              <path d="M4 2l15 9-6.5 1.6L9.6 19 4 2z" fill="#fff" stroke="#0b0920" strokeWidth="1.4" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Vente confirmée */}
        <div data-depth="34" className="absolute -left-3 top-[44%] sm:-left-10">
          <div className="hs-widget">
            <div className="hs-toast hs-card flex items-center gap-3 rounded-2xl py-2.5 pl-2.5 pr-4 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)]">
              <span className="grid size-9 place-items-center rounded-full bg-success/20 text-success">
                <Check className="size-4" strokeWidth={3} />
              </span>
              <span>
                <span className="block text-sm font-semibold text-ink">{mock.toastTitle}</span>
                <span className="block text-xs text-ink-muted">{mock.toastSub}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Note clients */}
        <div data-depth="22" className="absolute -right-2 -top-5 sm:-right-6">
          <div className="hs-widget hs-card flex items-center gap-2 rounded-full px-3.5 py-2 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)]">
            <span className="flex text-amber" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-3.5 fill-current" />
              ))}
            </span>
            <span className="font-display text-sm font-bold">{mock.rating}</span>
          </div>
        </div>

        {/* Hausse des ventes */}
        <div data-depth="58" className="absolute -right-2 top-[20%] sm:-right-8">
          <div className="hs-widget hs-card w-40 rounded-2xl p-4 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.95)] sm:w-48">
            <p className="text-gradient font-display text-2xl font-extrabold leading-none sm:text-3xl">{mock.growth}</p>
            <p className="mt-1 text-xs text-ink-muted">{mock.growthSub}</p>
            <div className="mt-3 flex h-10 items-end gap-1 sm:h-12" aria-hidden>
              {BARS.map((h, i) => (
                <span
                  key={i}
                  className="hs-bar flex-1 origin-bottom rounded-sm bg-gradient-to-t from-brand-deep to-pink"
                  style={{ height: `${h}%`, opacity: 0.45 + (i / BARS.length) * 0.55 }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Fiche produit */}
        <div data-depth="46" className="absolute -bottom-10 -right-2 hidden sm:-right-6 sm:block">
          <div className="hs-widget hs-card flex w-56 items-center gap-3 rounded-2xl p-3 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.95)]">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#95BF47]/15 ring-1 ring-[#95BF47]/40">
              <TechIcon name="shopify" className="size-6" />
            </span>
            <span className="min-w-0">
              <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-pink">{mock.badge}</span>
              <span className="font-display block text-sm font-bold leading-tight">
                {mock.heading} {mock.headingLine2}
              </span>
              <span className="mt-1 inline-block rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-ink">
                {mock.cta}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
