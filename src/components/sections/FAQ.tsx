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
    <section id="faq" className="tone-light relative scroll-mt-24 py-24 sm:py-36">
      <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} index={index} />
        </div>

        <div className="flex flex-col border-t border-ink/20">
          {items.map((item, i) => {
            const isOpen = open === i;
            const id = `faq-${i}`;
            return (
              <Reveal key={item.q} delay={Math.min(i, 6) * 0.03} y={12}>
                <div
                  className={cn(
                    "border-b border-ink/20 transition-colors duration-500"
                  )}
                >
                  <h3>
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="group flex w-full items-start justify-between gap-6 py-6 text-left"
                      aria-expanded={isOpen}
                      aria-controls={id}
                    >
                      <span className="font-serif text-[1.45rem] leading-snug transition-colors group-hover:text-accent sm:text-[1.7rem]">{item.q}</span>
                      <span
                        className={cn(
                          "mt-1.5 grid size-8 shrink-0 place-items-center rounded-full transition-all duration-500",
                          isOpen ? "rotate-45 bg-ink text-bg" : "text-ink"
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
                        <p className="pb-7 pr-14 text-[15px] leading-relaxed text-ink-muted sm:text-base">
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
