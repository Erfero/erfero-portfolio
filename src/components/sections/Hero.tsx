"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { ShopifyBagIcon, TrustpilotStar } from "@/components/ui/BrandIcons";
import HeroSceneBrowser from "@/components/sections/HeroSceneBrowser";
import type { Project } from "@/data/projects";
import { getScreenshotUrl } from "@/lib/screenshot";

interface FloatItem {
  style: React.CSSProperties;
  sizeClass: string;
  opacity: number;
  duration: number;
  delay: number;
  x: number[];
  y: number[];
  rotate: number[];
}

// 5 étoiles (vert Trustpilot) qui dérivent lentement dans des trajectoires
// irrégulières (x/y/rotate en plusieurs points), chacune à sa propre vitesse
// et son propre décalage pour un mouvement organique, pas synchronisé.
const starConfigs: FloatItem[] = [
  {
    style: { top: "9%", left: "3%" },
    sizeClass: "size-10 sm:size-16 lg:size-24",
    opacity: 0.85,
    duration: 9,
    delay: 0,
    x: [0, 16, -10, 4, 0],
    y: [0, -20, 8, -6, 0],
    rotate: [0, 30, -18, 12, 0],
  },
  {
    style: { top: "22%", right: "6%" },
    sizeClass: "size-7 sm:size-11 lg:size-16",
    opacity: 0.6,
    duration: 11,
    delay: 1.1,
    x: [0, -14, 10, -4, 0],
    y: [0, 14, -12, 6, 0],
    rotate: [0, -25, 18, -10, 0],
  },
  {
    style: { bottom: "26%", left: "11%" },
    sizeClass: "size-6 sm:size-9 lg:size-12",
    opacity: 0.7,
    duration: 8,
    delay: 0.5,
    x: [0, 10, -12, 5, 0],
    y: [0, -12, 14, -8, 0],
    rotate: [0, 22, -20, 8, 0],
  },
  {
    style: { bottom: "10%", right: "18%" },
    sizeClass: "size-9 sm:size-12 lg:size-18",
    opacity: 0.65,
    duration: 13,
    delay: 2,
    x: [0, -12, 16, -6, 0],
    y: [0, 16, -10, 8, 0],
    rotate: [0, -16, 26, -12, 0],
  },
  {
    style: { top: "48%", left: "6%" },
    sizeClass: "size-6 sm:size-8 lg:size-9",
    opacity: 0.5,
    duration: 10,
    delay: 1.6,
    x: [0, 8, -10, 4, 0],
    y: [0, -14, 8, -4, 0],
    rotate: [0, 15, -22, 10, 0],
  },
];

// 5 sacs Shopify qui flottent dans le même esprit, positions décalées par
// rapport aux étoiles pour bien répartir la composition.
const bagConfigs: FloatItem[] = [
  {
    style: { top: "6%", right: "12%" },
    sizeClass: "size-7 sm:size-10 lg:size-14",
    opacity: 0.9,
    duration: 7,
    delay: 0.2,
    x: [0, -10, 8, 0],
    y: [0, -16, 10, 0],
    rotate: [-8, 8, -6, -8],
  },
  {
    style: { bottom: "18%", left: "6%" },
    sizeClass: "size-6 sm:size-8 lg:size-11",
    opacity: 0.75,
    duration: 8.5,
    delay: 0.9,
    x: [0, 12, -8, 0],
    y: [0, 12, -10, 0],
    rotate: [6, -10, 6, 6],
  },
  {
    style: { top: "38%", right: "4%" },
    sizeClass: "size-6 sm:size-8 lg:size-9",
    opacity: 0.6,
    duration: 9.5,
    delay: 1.6,
    x: [0, -8, 10, 0],
    y: [0, -10, 12, 0],
    rotate: [-6, 10, -8, -6],
  },
  {
    style: { bottom: "4%", left: "42%" },
    sizeClass: "size-7 sm:size-8 lg:size-10",
    opacity: 0.65,
    duration: 10.5,
    delay: 0.6,
    x: [0, 10, -12, 0],
    y: [0, 10, -8, 0],
    rotate: [8, -8, 10, 8],
  },
  {
    style: { top: "3%", left: "38%" },
    sizeClass: "size-6 sm:size-7 lg:size-8",
    opacity: 0.55,
    duration: 12,
    delay: 2.3,
    x: [0, -6, 8, 0],
    y: [0, 8, -10, 0],
    rotate: [-5, 8, -6, -5],
  },
];

function HeroDecor() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-20">
      {starConfigs.map((cfg, i) => (
        <motion.div
          key={`star-${i}`}
          className={`absolute ${cfg.sizeClass}`}
          style={{ ...cfg.style, opacity: cfg.opacity }}
          initial={{ x: 0, y: 0, rotate: 0 }}
          animate={{ x: cfg.x, y: cfg.y, rotate: cfg.rotate }}
          transition={{ duration: cfg.duration, delay: cfg.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          <TrustpilotStar className="size-full drop-shadow-[0_2px_10px_rgba(0,182,122,0.6)]" />
        </motion.div>
      ))}

      {bagConfigs.map((cfg, i) => (
        <motion.div
          key={`bag-${i}`}
          className={`absolute ${cfg.sizeClass}`}
          style={{ ...cfg.style, opacity: cfg.opacity }}
          initial={{ x: 0, y: 0, rotate: 0 }}
          animate={{ x: cfg.x, y: cfg.y, rotate: cfg.rotate }}
          transition={{ duration: cfg.duration, delay: cfg.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          <ShopifyBagIcon className="size-full drop-shadow-[0_2px_8px_rgba(149,191,71,0.6)]" />
        </motion.div>
      ))}
    </div>
  );
}

// Chaque carte dérive sur x/y/rotate (pas juste un rebond vertical) pour un
// mouvement flottant plus organique, façon "cartes qui respirent".
// Les 6 boutiques à mettre en avant en priorité dans le Hero, dans cet ordre.
const FEATURED_PROJECT_IDS = [
  "kyraCosmetic",
  "curmaParis",
  "silke",
  "rsBodyFrance",
  "suenoPerfecto",
  "meinShop",
];

function pickFeaturedProjects(projects: Project[]): Project[] {
  const byId = new Map(projects.map((p) => [p.id, p]));
  const featured = FEATURED_PROJECT_IDS.map((id) => byId.get(id)).filter(
    (p): p is Project => Boolean(p),
  );
  if (featured.length >= 6) return featured;
  const rest = projects.filter((p) => !featured.includes(p));
  return [...featured, ...rest].slice(0, 6);
}

// Positions en % (coin haut-gauche de chaque carte) réparties autour du
// centre de la boîte, avec un `top` volontairement bas (max ~22%) pour que
// même la boîte la plus petite (mobile, cartes plus hautes en proportion)
// ne déborde jamais sur le texte en dessous.
const floatConfigs = [
  {
    x: "20%",
    y: "10%",
    z: 10,
    duration: 6,
    delay: 0,
    drift: { x: [0, 5, -4, 0], y: [0, -14, 5, 0], rotate: [-4, 1, -7, -4] },
  },
  {
    x: "4%",
    y: "6%",
    z: 4,
    duration: 7,
    delay: 0.6,
    drift: { x: [0, -6, 4, 0], y: [0, -12, 6, 0], rotate: [-8, -3, -11, -8] },
  },
  {
    x: "38%",
    y: "2%",
    z: 3,
    duration: 6.5,
    delay: 1.2,
    drift: { x: [0, 5, -6, 0], y: [0, -13, 5, 0], rotate: [7, 12, 3, 7] },
  },
  {
    x: "10%",
    y: "22%",
    z: 6,
    duration: 7.5,
    delay: 0.3,
    drift: { x: [0, -5, 6, 0], y: [0, -12, 4, 0], rotate: [-2, 3, -6, -2] },
  },
  {
    x: "42%",
    y: "18%",
    z: 2,
    duration: 6.8,
    delay: 0.9,
    drift: { x: [0, 6, -5, 0], y: [0, -11, 6, 0], rotate: [5, 9, 1, 5] },
  },
  {
    x: "30%",
    y: "14%",
    z: 5,
    duration: 7.2,
    delay: 0.45,
    drift: { x: [0, -4, 5, 0], y: [0, -13, 5, 0], rotate: [-1, 4, -5, -1] },
  },
];

function HeroShowcase({ projects }: { projects: Project[] }) {
  const locale = useLocale() as "fr" | "en";
  const featured = pickFeaturedProjects(projects);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
      className="absolute inset-0"
    >
      {featured.map((project, i) => {
        const cfg = floatConfigs[i % floatConfigs.length];
        const item = { name: project.name[locale] };

        return (
          <motion.a
            key={project.id}
            href={project.url}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: cfg.drift.x,
              y: cfg.drift.y,
              rotate: cfg.drift.rotate,
            }}
            transition={{
              opacity: { duration: 0.6, delay: 0.4 + i * 0.15 },
              scale: {
                type: "spring",
                stiffness: 140,
                damping: 14,
                delay: 0.4 + i * 0.15,
              },
              x: { duration: cfg.duration, delay: cfg.delay, repeat: Infinity, ease: "easeInOut" },
              y: { duration: cfg.duration, delay: cfg.delay, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: cfg.duration, delay: cfg.delay, repeat: Infinity, ease: "easeInOut" },
            }}
            whileHover={{
              scale: 1.08,
              rotate: 0,
              zIndex: 20,
              transition: { duration: 0.3, ease: "easeOut" },
            }}
            style={{ left: cfg.x, top: cfg.y, zIndex: cfg.z }}
            className="group absolute w-24 overflow-hidden rounded-xl border border-white/10 shadow-2xl shadow-black/40 transition-shadow duration-300 hover:shadow-[0_25px_60px_-15px_rgba(185,255,92,0.35)] sm:w-36 sm:rounded-2xl lg:w-56"
          >
            <img
              src={project.thumbnailOverride || getScreenshotUrl(project.url, 500, 625)}
              alt={item.name}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <span className="absolute bottom-1.5 left-1.5 text-[10px] font-medium text-white sm:bottom-3 sm:left-3 sm:text-sm">
              {item.name}
            </span>
          </motion.a>
        );
      })}

      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
        exit={{ opacity: 0, transition: { duration: 0.3 } }}
        transition={{
          opacity: { duration: 0.6, delay: 1.2 },
          scale: { duration: 0.6, delay: 1.2 },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.2 },
        }}
        className="glass absolute bottom-2 right-1 z-20 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold shadow-lg sm:bottom-4 sm:right-2"
      >
        <TrustpilotStar className="size-4" />
        4.8
      </motion.div>
    </motion.div>
  );
}

// Durée de la scène A = durée réelle du cycle CSS de la maquette (10s,
// smChrome/smCursor/etc. sont tous en "10s linear infinite") : on ne bascule
// vers la scène B qu'une fois ce cycle terminé, comme demandé.
const SCENE_A_MS = 10000;
const SCENE_B_MS = 6400;

function HeroSceneSwitcher({ projects }: { projects: Project[] }) {
  const prefersReducedMotion = useReducedMotion();
  const [scene, setScene] = useState<"a" | "b">("a");

  useEffect(() => {
    if (prefersReducedMotion) return;
    const duration = scene === "a" ? SCENE_A_MS : SCENE_B_MS;
    const id = setTimeout(() => setScene((s) => (s === "a" ? "b" : "a")), duration);
    return () => clearTimeout(id);
  }, [scene, prefersReducedMotion]);

  const activeScene = prefersReducedMotion ? "b" : scene;

  return (
    <div
      id="mockup-box"
      className="relative w-[602px] h-[464px] max-lg:w-[518px] max-lg:h-[400px] max-[720px]:w-[340px] max-[720px]:h-[262px] max-[380px]:w-[300px] max-[380px]:h-[232px]"
      style={{ animation: "heroFloatY 7s ease-in-out infinite" }}
    >
      <AnimatePresence mode="wait">
        {activeScene === "a" ? (
          <HeroSceneBrowser key="scene-a" projects={projects} />
        ) : (
          <HeroShowcase key="scene-b" projects={projects} />
        )}
      </AnimatePresence>
    </div>
  );
}

// Sépare le badge combiné ("Développeur Shopify freelance · Disponible...")
// en ses deux pastilles, exactement comme les deux badges de la maquette.
function splitBadge(raw: string): [string, string] {
  const [first, ...rest] = raw.split(" · ");
  return [first ?? raw, rest.join(" · ")];
}

// Anime chaque mot du titre comme des lignes empilées (heroWordUp), au même
// tempo que la maquette (délai +0.13s par ligne).
function TitleLine({
  children,
  delay,
  className = "",
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
}) {
  return (
    <span
      className={`block ${className}`}
      style={{ animation: `heroWordUp 0.7s ${delay}s ease both` }}
    >
      {children}
    </span>
  );
}

export default function Hero({ projects }: { projects: Project[] }) {
  const t = useTranslations("hero");
  const [badgeFreelance, badgeAvailable] = splitBadge(t("badge"));
  const titleWords = t("titleLine1").split(" ");
  const titleLastWord = titleWords.pop();
  const titleFirstLine = titleWords.join(" ");
  const stats = t.raw("stats") as { value: string; label: string }[];

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 bg-[radial-gradient(120%_120%_at_78%_8%,#0d160c_0%,#080b08_46%,#050705_100%)]">
      <div
        className="pointer-events-none absolute -left-[120px] -top-[140px] size-[520px] rounded-full blur-[46px]"
        style={{
          background: "radial-gradient(circle, rgba(120,200,90,.34), transparent 62%)",
          animation: "heroFlA 16s ease-in-out infinite",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-[180px] right-[120px] size-[560px] rounded-full blur-[52px]"
        style={{
          background: "radial-gradient(circle, rgba(60,150,120,.28), transparent 64%)",
          animation: "heroFlB 19s ease-in-out infinite",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px)",
          backgroundSize: "46px 46px",
          WebkitMaskImage: "radial-gradient(120% 90% at 30% 40%, #000 30%, transparent 78%)",
          maskImage: "radial-gradient(120% 90% at 30% 40%, #000 30%, transparent 78%)",
        }}
      />
      <HeroDecor />

      <div className="container-page relative z-10 flex flex-col items-center gap-6 lg:flex-row lg:items-center">
        <div className="order-last w-full max-w-[660px] lg:order-first lg:w-[560px] lg:max-w-none lg:flex-none">
          <div
            className="mb-[30px] flex flex-wrap gap-2.5"
            style={{ animation: "heroFadeUp 0.7s ease both" }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(194,242,78,.28)] bg-[rgba(194,242,78,.06)] py-2 pl-[11px] pr-[15px] text-[13.5px] font-semibold text-[#d8e9b9]">
              <ShopifyBagIcon className="size-[15px] flex-none" />
              {badgeFreelance}
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] py-2 pl-3 pr-[15px] text-[13.5px] text-[#c3ccbe]">
              <span
                className="size-2 flex-none rounded-full bg-lime"
                style={{ animation: "heroDotPulse 2s ease-out infinite" }}
              />
              {badgeAvailable}
            </div>
          </div>

          <h1
            className="font-display m-0 mb-[26px] text-[40px] font-bold leading-[1.02] tracking-[-0.02em] text-[#f0f4ee] max-lg:text-[56px] lg:text-[66px] lg:leading-[1.0]"
          >
            <TitleLine delay={0.05}>{titleFirstLine}</TitleLine>
            <TitleLine delay={0.18}>{titleLastWord}</TitleLine>
            <TitleLine delay={0.32} className="text-gradient">
              {t("titleHighlight")}
            </TitleLine>
          </h1>

          <p
            className="mb-9 max-w-[470px] text-[16.5px] leading-[1.6] text-[#98a292] lg:max-w-[600px] lg:text-[19px]"
            style={{ animation: "heroFadeUp 0.7s 0.5s ease both" }}
          >
            {t("subtitle")}
          </p>

          <div
            id="cta-row"
            className="mb-[52px] flex flex-col flex-wrap gap-3.5 sm:flex-row sm:items-center"
            style={{ animation: "heroFadeUp 0.7s 0.62s ease both" }}
          >
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center gap-2 rounded-[14px] bg-lime px-[26px] py-4 text-base font-bold text-[#0a0d09] no-underline shadow-[0_14px_34px_-12px_rgba(194,242,78,.55)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_44px_-12px_rgba(194,242,78,.7)]"
            >
              {t("ctaPrimary")} <span className="text-[15px]">→</span>
            </Link>

            <Link
              href="/realisations"
              className="inline-flex items-center justify-center gap-2 rounded-[14px] border border-white/[0.16] px-6 py-4 text-base font-semibold text-[#e6ece2] no-underline transition-all duration-200 hover:border-white/30 hover:bg-white/[0.06]"
            >
              {t("ctaSecondary")} <span className="text-[15px]">→</span>
            </Link>
          </div>

          <div
            id="stats-row"
            className="flex flex-wrap justify-center gap-x-[34px] gap-y-[26px] border-t border-white/10 pt-[30px] sm:justify-start"
            style={{ animation: "heroFadeUp 0.7s 0.74s ease both" }}
          >
            {stats.map((stat, i) => {
              const match = stat.value.match(/^(\d+(?:\.\d+)?)(.*)$/);
              const num = match?.[1];
              const rest = match?.[2] ?? "";
              const restIsAccent = rest.startsWith("+") || rest.startsWith("/");
              const canCount = i < 2 && num !== undefined && Number.isInteger(Number(num));

              return (
                <div key={stat.label} className="text-center sm:text-left">
                  <div className="font-display text-[30px] font-bold leading-none text-[#f0f4ee] lg:text-[38px]">
                    {canCount ? (
                      <span className={i === 0 ? "hero-counter-200" : "hero-counter-5"} />
                    ) : (
                      num ?? stat.value
                    )}
                    {restIsAccent ? <span className="text-lime">{rest}</span> : rest}
                  </div>
                  <div className="mt-[7px] text-[13.5px] text-[#8b9585]">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="order-first flex w-full items-center justify-center lg:order-last lg:w-auto lg:flex-1 lg:self-stretch">
          <HeroSceneSwitcher projects={projects} />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-xs uppercase tracking-widest text-ink-muted sm:flex"
      >
        <span>{t("scrollHint")}</span>
        <div className="relative flex h-10 w-6 justify-center rounded-full border border-border/80 bg-white/[0.02] p-1">
          <motion.span
            className="block size-1.5 rounded-full bg-lime shadow-[0_0_8px_1px_var(--color-lime)]"
            animate={{ y: [0, 16, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          <ChevronDown className="size-3.5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
