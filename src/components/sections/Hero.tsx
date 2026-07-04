"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { Link } from "@/i18n/navigation";
import MagneticButton from "@/components/ui/MagneticButton";
import GradientBlob from "@/components/ui/GradientBlob";
import { ShopifyBagIcon, TrustpilotStar } from "@/components/ui/BrandIcons";
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

const floatConfigs = [
  { x: "0%", y: "2%", rotate: -6, duration: 6, delay: 0 },
  { x: "38%", y: "6%", rotate: 5, duration: 7, delay: 0.6 },
  { x: "4%", y: "44%", rotate: -3, duration: 6.5, delay: 1.2 },
  { x: "44%", y: "50%", rotate: 4, duration: 7.5, delay: 0.3 },
  { x: "20%", y: "72%", rotate: -5, duration: 6.8, delay: 0.9 },
];

function HeroShowcase({ projects }: { projects: Project[] }) {
  const locale = useLocale() as "fr" | "en";

  return (
    <div className="relative hidden h-[640px] w-full lg:block">
      {projects.slice(0, 5).map((project, i) => {
        const cfg = floatConfigs[i % floatConfigs.length];
        const item = { name: project.name[locale] };

        return (
          <motion.a
            key={project.id}
            href={project.url}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -16, 0],
            }}
            transition={{
              opacity: { duration: 0.6, delay: 0.4 + i * 0.15 },
              scale: { duration: 0.6, delay: 0.4 + i * 0.15 },
              y: {
                duration: cfg.duration,
                delay: cfg.delay,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            whileHover={{ scale: 1.05, zIndex: 20 }}
            style={{ left: cfg.x, top: cfg.y, rotate: cfg.rotate }}
            className="group absolute w-56 overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/40"
          >
            <img
              src={project.thumbnailOverride || getScreenshotUrl(project.url, 500, 700)}
              alt={item.name}
              loading="lazy"
              className="aspect-[5/7] w-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <span className="absolute bottom-3 left-3 text-sm font-medium text-white">
              {item.name}
            </span>
          </motion.a>
        );
      })}
    </div>
  );
}

export default function Hero({ projects }: { projects: Project[] }) {
  const t = useTranslations("hero");

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-28">
      <GradientBlob className="left-[-10%] top-[-10%] size-[38rem] bg-lime/25" />
      <GradientBlob className="right-[-15%] top-[20%] size-[32rem] bg-violet/25" />
      <HeroDecor />

      <div className="container-page relative z-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="flex flex-col gap-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-white/[0.03] px-4 py-1.5 text-xs text-ink-muted"
          >
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-lime opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-lime" />
            </span>
            {t("badge")}
          </motion.div>

          <div>
            <h1 className="font-display max-w-4xl text-4xl font-medium leading-[1.05] tracking-tight sm:text-6xl lg:text-6xl xl:text-7xl">
              <span className="inline-block overflow-hidden align-bottom">
                {t("titleLine1").split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.1 + i * 0.07,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="inline-block"
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-gradient inline-block"
              >
                {t("titleHighlight")}
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-6 max-w-xl text-lg text-ink-muted"
            >
              {t("subtitle")}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="flex flex-wrap items-center gap-4"
          >
            <MagneticButton
              href="/#contact"
              className="bg-lime text-bg hover:shadow-[0_0_40px_-10px_var(--color-lime)]"
            >
              {t("ctaPrimary")}
              <ArrowUpRight className="size-4" />
            </MagneticButton>

            <Link
              href="/realisations"
              className="group inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:border-lime/50"
            >
              {t("ctaSecondary")}
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-8"
          >
            {t.raw("stats").map((stat: { value: string; label: string }) => (
              <div key={stat.label}>
                <div className="font-display text-2xl font-semibold sm:text-3xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs text-ink-muted">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <HeroShowcase projects={projects} />
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
