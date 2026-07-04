"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ShoppingBag, MousePointer2, CheckCircle2, TrendingUp } from "lucide-react";
import type { Project } from "@/data/projects";
import { getScreenshotUrl } from "@/lib/screenshot";
import { TrustpilotStar } from "@/components/ui/BrandIcons";

function hostnameOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

const enter = { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const };

/**
 * Scène "A" : maquette animée d'une boutique en pleine construction
 * (navigateur + téléphone, curseur qui clique, toast de vente) — alterne
 * avec la scène "B" (HeroShowcase) dans HeroSceneSwitcher.
 */
export default function HeroSceneBrowser({ projects }: { projects: Project[] }) {
  const locale = useLocale() as "fr" | "en";
  const t = useTranslations("hero.mock");
  const main = projects[0];
  if (!main) return null;

  const pool = projects.length > 1 ? projects.slice(1) : projects;
  const products = Array.from({ length: 3 }, (_, i) => pool[i % pool.length]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
      className="absolute inset-0"
    >
      {/* Fenêtre navigateur */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, filter: "blur(6px)" }}
        transition={enter}
        className="absolute inset-x-0 top-0 mx-auto w-[88%] overflow-hidden rounded-xl border border-white/10 bg-surface shadow-2xl shadow-black/50 sm:w-[82%] lg:w-[78%]"
      >
        <div className="flex items-center gap-1.5 border-b border-white/5 bg-white/[0.03] px-3 py-2">
          <span className="size-2 rounded-full bg-white/15" />
          <span className="size-2 rounded-full bg-white/15" />
          <span className="size-2 rounded-full bg-white/15" />
          <div className="ml-2 flex-1 truncate rounded-full bg-white/5 px-3 py-1 text-center text-[9px] text-ink-muted sm:text-[10px]">
            {hostnameOf(main.url)}
          </div>
        </div>

        <div className="hidden items-center justify-between border-b border-white/5 px-4 py-2.5 sm:flex">
          <span className="font-display truncate text-xs font-semibold">
            {main.name[locale]}
          </span>
          <div className="flex items-center gap-3 text-[10px] text-ink-muted">
            <span>Shop</span>
            <span>New</span>
            <span>Sale</span>
          </div>
          <ShoppingBag className="size-3.5 text-ink-muted" />
        </div>

        <div className="relative h-24 overflow-hidden sm:h-32 lg:h-40">
          <motion.img
            src={main.thumbnailOverride || getScreenshotUrl(main.url, 700, 500)}
            alt=""
            loading="lazy"
            className="absolute inset-0 size-full object-cover object-top"
            initial={{ scale: 1 }}
            animate={{ scale: 1.14 }}
            transition={{ duration: 7, ease: "linear" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/30 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center gap-1.5 px-4">
            <span className="w-fit rounded-full bg-lime px-2 py-0.5 text-[8px] font-semibold text-bg sm:text-[9px]">
              {t("badge")}
            </span>
            <p className="font-display text-sm font-medium leading-tight text-white sm:text-lg lg:text-xl">
              {t("heading")}
              <br />
              {t("headingLine2")}
            </p>
            <span className="mt-1 w-fit rounded-full border border-white/40 px-2.5 py-1 text-[8px] font-medium text-white sm:text-[10px]">
              {t("cta")}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 p-2.5 sm:gap-3 sm:p-3">
          {products.map((p, i) => (
            <div key={`${p.id}-${i}`} className="overflow-hidden rounded-lg bg-white/5">
              <img
                src={p.thumbnailOverride || getScreenshotUrl(p.url, 220, 220)}
                alt=""
                loading="lazy"
                className="aspect-square w-full object-cover object-top"
              />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Mockup téléphone */}
      <motion.div
        initial={{ opacity: 0, x: -16, rotate: -12 }}
        animate={{ opacity: 1, x: 0, rotate: -6 }}
        exit={{ opacity: 0, x: -16, transition: { duration: 0.3 } }}
        transition={{ ...enter, delay: 0.25 }}
        className="absolute bottom-0 left-0 w-[30%] max-w-[110px] overflow-hidden rounded-[1.3rem] border-4 border-white/10 bg-bg shadow-2xl shadow-black/60 sm:max-w-[140px] sm:rounded-[1.6rem]"
        style={{ aspectRatio: "9/18" }}
      >
        <div className="absolute left-1/2 top-1.5 h-1.5 w-6 -translate-x-1/2 rounded-full bg-black/60" />
        <img
          src={main.thumbnailOverride || getScreenshotUrl(main.url, 300, 500)}
          alt=""
          loading="lazy"
          className="size-full object-cover object-top"
        />
        <div className="absolute inset-x-1.5 bottom-1.5 flex items-center justify-center gap-1 rounded-full bg-lime py-1 text-[7px] font-semibold text-bg sm:text-[8px]">
          <ShoppingBag className="size-2.5" />
          {t("addToCart")}
        </div>
      </motion.div>

      {/* Curseur + clic + toast, synchronisés sur un cycle de 6s en boucle */}
      <motion.div
        aria-hidden
        className="absolute z-20 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]"
        initial={{ left: "80%", top: "72%", scale: 1 }}
        animate={{
          left: ["80%", "80%", "58%", "58%", "58%", "80%"],
          top: ["72%", "72%", "46%", "46%", "46%", "72%"],
          scale: [1, 1, 1, 0.75, 1, 1],
        }}
        transition={{ duration: 6, times: [0, 0.15, 0.42, 0.48, 0.55, 1], repeat: Infinity, ease: "easeInOut" }}
      >
        <MousePointer2 className="size-4 sm:size-5" fill="white" />
      </motion.div>

      <motion.span
        aria-hidden
        className="absolute z-10 size-6 rounded-full border-2 border-lime"
        style={{ left: "56%", top: "44%" }}
        initial={{ opacity: 0, scale: 0.4 }}
        animate={{ opacity: [0, 0, 0.9, 0], scale: [0.4, 0.4, 1.8, 2.2] }}
        transition={{ duration: 6, times: [0, 0.46, 0.5, 0.68], repeat: Infinity, ease: "easeOut" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: [0, 0, 1, 1, 0], y: [10, 10, 0, 0, 10] }}
        transition={{ duration: 6, times: [0, 0.52, 0.6, 0.85, 1], repeat: Infinity, ease: "easeInOut" }}
        className="glass absolute bottom-[8%] left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-xl px-3 py-2 text-[10px] shadow-xl sm:text-xs"
      >
        <CheckCircle2 className="size-4 text-lime" />
        <div>
          <div className="font-semibold text-ink">{t("toastTitle")}</div>
          <div className="text-ink-muted">{t("toastSub")}</div>
        </div>
      </motion.div>

      {/* Chips flottants */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: -8 }}
        animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
        exit={{ opacity: 0, transition: { duration: 0.3 } }}
        transition={{
          opacity: { duration: 0.5, delay: 0.9 },
          scale: { duration: 0.5, delay: 0.9 },
          y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.9 },
        }}
        className="glass absolute -top-2 right-2 z-20 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-lime shadow-lg sm:right-4"
      >
        <TrendingUp className="size-3.5" />
        {t("growth")}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: [0, 8, 0] }}
        exit={{ opacity: 0, transition: { duration: 0.3 } }}
        transition={{
          opacity: { duration: 0.5, delay: 1.1 },
          scale: { duration: 0.5, delay: 1.1 },
          y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.1 },
        }}
        className="glass absolute bottom-2 right-0 z-20 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold shadow-lg sm:bottom-6"
      >
        <TrustpilotStar className="size-4" />
        {t("rating")}
      </motion.div>
    </motion.div>
  );
}