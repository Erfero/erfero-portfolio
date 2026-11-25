"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

export default function FAQ({ index }: { index?: string }) {
  const t = useTranslations("faq");
  const items = t.raw("items") as { q: string; a: string }[];
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative scroll-mt-28 py-24 sm:py-32">
      <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} index={index} />
        </div>

        <div className="border-t border-white/10">
          {items.map((item, i) => {
            const isOpen = open === i;
            const id = `faq-${i}`;
            return (
              <Reveal key={item.q} delay={i * 0.03} y={12} className="border-b border-white/10">
                <h3>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-start justify-between gap-6 py-6 text-left"
                    aria-expanded={isOpen}
                    aria-controls={id}
                  >
                    <span
                      className={`font-display text-lg font-medium leading-snug transition-colors sm:text-xl ${
                        isOpen ? "text-ink" : "text-ink/75 group-hover:text-ink"
                      }`}
                    >
                      {item.q}
                    </span>
                    <span
                      className={`grid size-9 shrink-0 place-items-center rounded-full border transition-all duration-500 ${
                        isOpen ? "rotate-45 border-lime bg-lime text-bg" : "border-white/15 text-lime"
                      }`}
                    >
                      <Plus className="size-4" />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={id}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-6 pr-12 text-sm leading-relaxed text-ink-muted sm:text-base">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
