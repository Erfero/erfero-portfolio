"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

/** Questions fréquentes en accordéon (une question ouverte à la fois). */
export default function FAQ({ index }: { index?: string }) {
  const t = useTranslations("faq");
  const items = t.raw("items") as { q: string; a: string }[];
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="tone-light relative scroll-mt-24 py-24 sm:py-32">
      <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} index={index} />
        </div>

        <div className="flex flex-col gap-3">
          {items.map((item, i) => {
            const isOpen = open === i;
            const id = `faq-${i}`;
            return (
              <Reveal key={item.q} delay={Math.min(i, 6) * 0.03} y={12}>
                <div
                  className={cn(
                    "rounded-2xl border transition-colors duration-500",
                    isOpen ? "border-ink/25 bg-surface" : "border-line bg-surface/60 hover:border-ink/25"
                  )}
                >
                  <h3>
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-start justify-between gap-6 px-5 py-5 text-left sm:px-6"
                      aria-expanded={isOpen}
                      aria-controls={id}
                    >
                      <span className="font-display text-base font-semibold leading-snug sm:text-lg">{item.q}</span>
                      <span
                        className={cn(
                          "grid size-9 shrink-0 place-items-center rounded-full transition-all duration-500",
                          isOpen ? "rotate-45 bg-accent-fill text-on-accent" : "bg-ink/[0.07] text-ink"
                        )}
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
                        <p className="px-5 pb-6 pr-14 text-sm leading-relaxed text-ink-muted sm:px-6 sm:text-base">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
