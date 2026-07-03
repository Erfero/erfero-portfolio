"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { Link } from "@/i18n/navigation";
import MagneticButton from "@/components/ui/MagneticButton";
import GradientBlob from "@/components/ui/GradientBlob";
import { visibleProjects } from "@/data/projects";
import { getScreenshotUrl } from "@/lib/screenshot";

const floatConfigs = [
  { x: "2%", y: "4%", rotate: -6, duration: 6, delay: 0 },
  { x: "34%", y: "20%", rotate: 4, duration: 7, delay: 0.6 },
  { x: "12%", y: "48%", rotate: -3, duration: 6.5, delay: 1.2 },
];

function HeroShowcase() {
  const t = useTranslations("projects");

  return (
    <div className="relative hidden h-[520px] w-full lg:block">
      {visibleProjects.slice(0, 3).map((project, i) => {
        const cfg = floatConfigs[i % floatConfigs.length];
        const item = t.raw(`items.${project.id}`) as { name: string };

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
              src={getScreenshotUrl(project.url, 500, 700)}
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

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-28">
      <GradientBlob className="left-[-10%] top-[-10%] size-[38rem] bg-lime/25" />
      <GradientBlob className="right-[-15%] top-[20%] size-[32rem] bg-violet/25" />

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
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display max-w-4xl text-4xl font-medium leading-[1.05] tracking-tight sm:text-6xl lg:text-6xl xl:text-7xl"
            >
              {t("titleLine1")}{" "}
              <span className="text-gradient">{t("titleHighlight")}</span>
            </motion.h1>

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

        <HeroShowcase />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs text-ink-muted sm:flex"
      >
        {t("scrollHint")}
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          <ChevronDown className="size-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
