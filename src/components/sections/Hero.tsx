"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { Link } from "@/i18n/navigation";
import MagneticButton from "@/components/ui/MagneticButton";
import GradientBlob from "@/components/ui/GradientBlob";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-28">
      <GradientBlob className="left-[-10%] top-[-10%] size-[38rem] bg-lime/25" />
      <GradientBlob className="right-[-15%] top-[20%] size-[32rem] bg-violet/25" />

      <div className="container-page relative z-10 flex flex-col gap-10">
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
            className="font-display max-w-4xl text-4xl font-medium leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
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
