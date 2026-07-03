"use client";

import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Check,
  CheckCheck,
  Heart,
  Star,
  PackageCheck,
  ImagePlus,
  PlayCircle,
  Video as VideoIcon,
} from "lucide-react";
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
  const t = useTranslations("testimonials");
  const quote = testimonial.quote[locale];
  const role = testimonial.authorRole?.[locale];

  if (testimonial.type === "whatsapp") {
    return (
      <motion.div
        whileHover={{ y: -5, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className="rounded-2xl border border-[#25D366]/25 bg-[#0b1410] p-4 shadow-[0_10px_30px_-15px_rgba(37,211,102,0.4)]"
      >
        <div className="flex items-center gap-2 border-b border-white/5 pb-3">
          <span
            className="grid size-9 place-items-center rounded-full text-xs font-semibold text-bg"
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
        <div className="relative mt-3 max-w-[92%] rounded-xl rounded-tl-sm bg-[#1f2c26] px-3 py-2.5 text-sm leading-relaxed text-ink/95">
          {quote}
          <span className="mt-1.5 flex items-center justify-end gap-1 text-[10px] text-ink-muted">
            21:42 <CheckCheck className="size-3 text-[#53bdeb]" />
          </span>
        </div>
      </motion.div>
    );
  }

  if (testimonial.type === "instagram") {
    return (
      <motion.div
        whileHover={{ y: -5, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className="rounded-2xl border border-[#E1306C]/25 bg-bg-soft p-4 shadow-[0_10px_30px_-15px_rgba(225,48,108,0.35)]"
      >
        <div className="flex items-center gap-2 border-b border-white/5 pb-3">
          <span
            className="grid size-9 place-items-center rounded-full p-[2px] text-xs font-semibold text-white"
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
        whileHover={{ y: -5, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
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

  if (testimonial.type === "screenshot") {
    return (
      <motion.div
        whileHover={{ y: -5, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className="overflow-hidden rounded-2xl border border-border bg-bg-soft"
      >
        {testimonial.mediaUrl ? (
          <img
            src={testimonial.mediaUrl}
            alt={testimonial.authorName}
            className="w-full object-cover"
          />
        ) : (
          <div
            className="flex aspect-[4/5] flex-col items-center justify-center gap-2 border-b border-dashed border-white/15 p-4 text-center"
            style={{ background: `${testimonial.accent}11` }}
          >
            <ImagePlus className="size-7 text-ink-muted/50" />
            <span className="text-xs text-ink-muted/70">
              {t("placeholderImage")}
            </span>
          </div>
        )}
        <p className="px-4 py-3 text-xs font-medium text-ink-muted">
          {testimonial.authorName}
        </p>
      </motion.div>
    );
  }

  if (testimonial.type === "video") {
    return (
      <motion.div
        whileHover={{ y: -5, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className="overflow-hidden rounded-2xl border border-border bg-bg-soft"
      >
        {testimonial.mediaUrl ? (
          <div className="relative aspect-[4/5]">
            <video
              src={testimonial.mediaUrl}
              muted
              loop
              autoPlay
              playsInline
              className="absolute inset-0 size-full object-cover"
            />
            <PlayCircle className="absolute inset-0 m-auto size-10 text-white/80" />
          </div>
        ) : (
          <div
            className="flex aspect-[4/5] flex-col items-center justify-center gap-2 border-b border-dashed border-white/15 p-4 text-center"
            style={{ background: `${testimonial.accent}11` }}
          >
            <VideoIcon className="size-7 text-ink-muted/50" />
            <span className="text-xs text-ink-muted/70">
              {t("placeholderVideo")}
            </span>
          </div>
        )}
        <p className="px-4 py-3 text-xs font-medium text-ink-muted">
          {testimonial.authorName}
        </p>
      </motion.div>
    );
  }

  // agency
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
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
