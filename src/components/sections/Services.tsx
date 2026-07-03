"use client";

import { useTranslations } from "next-intl";
import {
  Rocket,
  Wrench,
  Gauge,
  Blocks,
  SearchX,
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const icons = [Rocket, Wrench, Gauge, Blocks, SearchX, ShieldCheck];

export default function Services() {
  const t = useTranslations("services");
  const items = t.raw("items") as { title: string; description: string }[];

  return (
    <section id="services" className="relative scroll-mt-28 py-16 sm:py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={item.title} delay={i * 0.05} y={16}>
                <motion.div
                  whileHover={{ scale: 1.03, zIndex: 10 }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                  className="group relative h-full bg-bg-soft p-7"
                >
                  <motion.div
                    whileHover={{ rotate: -8, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="inline-block"
                  >
                    <Icon className="size-6 text-lime" />
                  </motion.div>
                  <h3 className="font-display mt-5 text-lg font-medium">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {item.description}
                  </p>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
