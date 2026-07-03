"use client";

import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Check, CheckCheck, Heart, Star, PackageCheck } from "lucide-react";
import type { Testimonial } from "@/data/testimonials";
import { WhatsappIcon, InstagramIcon } from "./BrandIcons";

function initials(name: string) {
  return name
    .split(/[\s._]/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const locale = useLocale() as "fr" | "en";
  const quote = testimonial.quote[locale];
  const role = testimonial.authorRole?.[locale];

  if (testimonial.type === "whatsapp") {
    return (
      <motion.div
        whileHover={{ y: -4 }}
        className="rounded-2xl border border-border bg-[#0b1410] p-4"
      >
        <div className="flex items-center gap-2 border-b border-white/5 pb-3">
          <span
            className="grid size-8 place-items-center rounded-full text-xs font-semibold text-bg"
            style={{ background: testimonial.accent }}
          >
            {initials(testimonial.authorName)}
          </span>
          <div>
            <p className="text-sm font-medium text-ink">{testimonial.authorName}</p>
            {role && <p className="text-[11px] text-ink-muted">{role}</p>}
          </div>
          <WhatsappIcon className="ml-auto size-4 text-[#25D366]" />
        </div>
        <div className="relative mt-3 max-w-[92%] rounded-xl rounded-tl-sm bg-[#1f2c26] px-3 py-2 text-sm leading-relaxed text-ink/90">
          {quote}
          <span className="mt-1 flex items-center justify-end gap-1 text-[10px] text-ink-muted">
            21:42 <CheckCheck className="size-3 text-[#53bdeb]" />
          </span>
        </div>
      </motion.div>
    );
  }

  if (testimonial.type === "instagram") {
    return (
      <motion.div
        whileHover={{ y: -4 }}
        className="rounded-2xl border border-border bg-bg-soft p-4"
      >
        <div className="flex items-center gap-2 border-b border-white/5 pb-3">
          <span
            className="grid size-8 place-items-center rounded-full p-[2px] text-xs font-semibold text-white"
            style={{
              background:
                "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
            }}
          >
            <span className="grid size-full place-items-center rounded-full bg-bg-soft text-ink">
              {initials(testimonial.authorName)}
            </span>
          </span>
          <p className="text-sm font-medium text-ink">{testimonial.authorName}</p>
          <InstagramIcon className="ml-auto size-4 text-[#E1306C]" />
        </div>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">{quote}</p>
        <div className="mt-3 flex items-center gap-1 text-[#E1306C]">
          <Heart className="size-4 fill-current" />
          <span className="text-xs text-ink-muted">Envoyé</span>
        </div>
      </motion.div>
    );
  }

  if (testimonial.type === "delivery") {
    return (
      <motion.div
        whileHover={{ y: -4 }}
        className="flex items-center gap-3 rounded-2xl border border-border bg-bg-soft p-4"
      >
        <span
          className="grid size-10 shrink-0 place-items-center rounded-full"
          style={{ background: `${testimonial.accent}22`, color: testimonial.accent }}
        >
          <PackageCheck className="size-5" />
        </span>
        <div>
          <p className="text-sm font-medium text-ink">{testimonial.authorName}</p>
          <p className="text-xs text-ink-muted">{quote}</p>
        </div>
        <Check className="ml-auto size-4 shrink-0 text-lime" />
      </motion.div>
    );
  }

  // agency
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="flex h-full flex-col rounded-2xl border border-border bg-bg-soft p-5"
    >
      {testimonial.rating && (
        <div className="flex gap-0.5 text-lime">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} className="size-3.5 fill-current" />
          ))}
        </div>
      )}
      <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
        &ldquo;{quote}&rdquo;
      </p>
      <div className="mt-4 border-t border-border pt-3">
        <p className="text-sm font-medium text-ink">{testimonial.authorName}</p>
        {role && <p className="text-xs text-ink-muted">{role}</p>}
      </div>
    </motion.div>
  );
}
