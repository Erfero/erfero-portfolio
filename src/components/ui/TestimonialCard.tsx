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
        className="rounded-2xl border border-line bg-surface p-4 shadow-[0_14px_34px_-24px_rgba(14,19,17,0.5)]"
      >
        <div className="flex items-center gap-2 border-b border-line pb-3">
          <span className="grid size-9 place-items-center rounded-full bg-ink text-xs font-semibold text-bg">
            {initials(testimonial.authorName)}
          </span>
          <div>
            <p className="text-sm font-medium text-ink">{testimonial.authorName}</p>
            {role && <p className="text-[11px] text-ink-muted">{role}</p>}
          </div>
          <WhatsappIcon className="ml-auto size-4 text-accent" />
        </div>
        <div className="relative mt-3 max-w-[92%] rounded-xl rounded-tl-sm bg-[#dcf3d0] px-3 py-2.5 text-sm leading-relaxed text-[#0e1311]">
          {quote}
          <span className="mt-1.5 flex items-center justify-end gap-1 text-[10px] text-[#0e1311]/55">
            21:42 <CheckCheck className="size-3 text-[#007a5b]" />
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
        className="rounded-2xl border border-line bg-surface p-4 shadow-[0_14px_34px_-24px_rgba(14,19,17,0.5)]"
      >
        <div className="flex items-center gap-2 border-b border-line pb-3">
          <span className="grid size-9 place-items-center rounded-full bg-ink p-[2px] text-xs font-semibold">
            <span className="grid size-full place-items-center rounded-full bg-bg-soft text-ink">
              {initials(testimonial.authorName)}
            </span>
          </span>
          <p className="text-sm font-medium text-ink">{testimonial.authorName}</p>
          <InstagramIcon className="ml-auto size-4 text-ink" />
        </div>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">{quote}</p>
        <div className="mt-3 flex items-center gap-1 text-ink">
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
        className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-4"
      >
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">
          <PackageCheck className="size-5" />
        </span>
        <div>
          <p className="text-sm font-medium text-ink">{testimonial.authorName}</p>
          <p className="text-xs text-ink-muted">{quote}</p>
        </div>
        <Check className="ml-auto size-4 shrink-0 text-success" />
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
            className="flex aspect-[4/5] flex-col items-center justify-center gap-2 border-b border-dashed border-line bg-ink/[0.03] p-4 text-center"
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
            className="flex aspect-[4/5] flex-col items-center justify-center gap-2 border-b border-dashed border-line bg-ink/[0.03] p-4 text-center"
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
      className="flex h-full flex-col rounded-2xl border border-line bg-surface p-5"
    >
      {testimonial.rating && (
        <div className="flex gap-0.5 text-accent">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} className="size-3.5 fill-current" />
          ))}
        </div>
      )}
      <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink/90">
        &ldquo;{quote}&rdquo;
      </p>
      <div className="mt-4 border-t border-border pt-3">
        <p className="text-sm font-medium text-ink">{testimonial.authorName}</p>
        {role && <p className="text-xs text-ink-muted">{role}</p>}
      </div>
    </motion.div>
  );
}
